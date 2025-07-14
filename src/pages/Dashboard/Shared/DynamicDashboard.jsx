// DynamicDashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import Container from "../../../components/Container";
import Loading from "../../../components/Loading";

const DynamicDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole();

  // Global stats for admin
  const { data: adminStats = {}, isLoading: adminLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
    enabled: role === "admin",
  });

  // Tutor-specific data
  const { data: tutorStats = {}, isLoading: tutorLoading } = useQuery({
    queryKey: ["tutor-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/stats/${user.email}`);
      return res.data;
    },
    enabled: role === "tutor",
  });

  // Student-specific data
  const { data: studentStats = {}, isLoading: studentLoading } = useQuery({
    queryKey: ["student-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student/stats/${user.email}`);
      return res.data;
    },
    enabled: role === "student",
  });

  const chartData =
    role === "admin"
      ? adminStats.chartData
      : role === "tutor"
      ? tutorStats.chartData
      : studentStats.chartData;

  const userStats =
    role === "admin"
      ? adminStats
      : role === "tutor"
      ? tutorStats
      : studentStats;

  const isLoading = adminLoading || tutorLoading || studentLoading;

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="py-10">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Welcome back, {user?.displayName || "User"}!
        </h2>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {Object.entries(userStats?.summary || {}).map(
            ([label, value], idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral p-6 rounded-xl shadow border border-base-300"
              >
                <p className="text-gray-500 text-sm mb-1">
                  {label.replace(/([A-Z])/g, " $1")}
                </p>
                <h3 className="text-xl font-bold text-primary">{value}</h3>
              </div>
            )
          )}
        </div>

        {/* Chart */}
        {chartData && chartData.length > 0 && (
          <div className="bg-white dark:bg-neutral p-6 rounded-xl shadow border border-base-300">
            <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Container>
  );
};

export default DynamicDashboard;
