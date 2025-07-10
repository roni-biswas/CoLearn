import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";
import Container from "../../../components/Container";
import loginLottie from "../../../assets/animation/lottie-login.json";
import PageHero from "../../../components/PageHero";
import heroImg from "../../../assets/page-hero.jpg";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHero title="Login" heroBg={heroImg} />
      <div className="min-h-screen flex items-center justify-center bg-base-200 ">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Left: Lottie */}
            <div className="flex-1 hidden md:flex justify-center">
              <Player
                autoplay
                loop
                src={loginLottie}
                className="w-full max-w-md"
              />
            </div>

            {/* Right: Form */}
            <div className="flex-1 w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                Login to Your Account
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="input input-bordered w-full"
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="input input-bordered w-full"
                    placeholder="********"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-secondary w-full text-white"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary font-semibold">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
