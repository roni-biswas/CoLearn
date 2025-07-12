import useDashboardNav from "../../../hooks/useDashboardNav";

const DashboardTopMenu = () => {
  const { goBack, goHome, currentPath } = useDashboardNav();

  return (
    <div className="w-full bg-base-100 p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Left: Title and current path */}
        <div>
          <h2 className="text-xl font-bold text-primary">
            Dashboard Navigation
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
            Current: <span className="font-mono">{currentPath}</span>
          </p>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button onClick={goBack} className="btn btn-outline btn-sm">
            Go Back
          </button>
          <button onClick={goHome} className="btn btn-primary btn-sm">
            Dashboard Home
          </button>
          {/* <button
            onClick={() => goTo("/dashboard/admin-sessions")}
            className="btn btn-secondary btn-sm"
          >
            Admin Sessions
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardTopMenu;
