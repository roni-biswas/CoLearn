import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Container from "../../../components/Container";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieAnimation from "../../../assets/animation/lottie-register.json";
import PageHero from "../../../components/PageHero";
import heroImg from "../../../assets/page-hero.jpg";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);

  const onSubmit = (data) => {
    const { name, email, password, photo } = data;
    const file = photo[0];

    if (!file) return alert("Please upload a photo.");

    // You can now send 'file', name, email, password to Firebase/Auth API
    console.log({ name, email, password, file });

    reset();
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <PageHero title="Register" heroBg={heroImg} />
      <div className="py-12 bg-base-200">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Side - Lottie Animation or Image */}
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <Player
                autoplay
                loop
                src={lottieAnimation}
                style={{ height: "320px" }}
              />
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 bg-base-100 dark:bg-gray-900 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Create Your Account
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                      },
                    })}
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 font-medium">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message:
                          "Must include uppercase, lowercase, and a number",
                      },
                    })}
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block mb-1 font-medium">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    {...register("photo", { required: "Photo is required" })}
                    accept="image/*"
                    onChange={handlePreview}
                    className="file-input file-input-bordered w-full"
                  />
                  {errors.photo && (
                    <p className="text-red-500 text-sm">
                      {errors.photo.message}
                    </p>
                  )}
                  {preview && (
                    <div className="mt-3">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-full border border-gray-300"
                      />
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button className="btn btn-secondary w-full" type="submit">
                  Register
                </button>

                {/* Login Link */}
                <p className="text-sm text-center text-gray-500 mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Register;
