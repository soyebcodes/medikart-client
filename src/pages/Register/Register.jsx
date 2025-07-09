import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Lottie from "lottie-react";
import pharmacyLottie from "../../assets/lottie/pharmacy-register.json";
import { useAuth } from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Register = () => {
  const { googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password, role, photo } = data;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: username,
        photoURL: photo,
      });

      toast.success("Account created successfully!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      toast.success("Signed up with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      await githubLogin();
      toast.success("Signed up with GitHub!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-base-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-base-200 shadow-xl rounded-xl overflow-hidden">
        {/* Lottie Animation */}
        <div className="hidden md:flex items-center justify-center bg-primary/10 p-6">
          <Lottie
            animationData={pharmacyLottie}
            loop={true}
            className="max-w-sm w-full"
          />
        </div>

        {/* Registration Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block mb-1 font-medium text-base-content">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="w-full input input-bordered"
              />
              {errors.username && (
                <p className="text-error text-sm">Username is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-base-content">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full input input-bordered"
              />
              {errors.email && (
                <p className="text-error text-sm">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-base-content">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full input input-bordered"
              />
              {errors.password && (
                <p className="text-error text-sm">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block mb-1 font-medium text-base-content">
                Photo URL
              </label>
              <input
                type="url"
                {...register("photo", { required: true })}
                className="w-full input input-bordered"
              />
              {errors.photo && (
                <p className="text-error text-sm">Photo URL is required</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block mb-1 font-medium text-base-content">
                Select Role
              </label>
              <select
                {...register("role", { required: true })}
                className="w-full select select-bordered"
              >
                <option value="">-- Choose Role --</option>
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
              {errors.role && (
                <p className="text-error text-sm">Role is required</p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          {/* Social Signups */}
          <div className="mt-6">
            <p className="text-center text-sm text-base-content">
              or sign up with
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="btn btn-outline flex items-center gap-2"
              >
                <FcGoogle className="text-xl" />
                Google
              </button>

              <button
                type="button"
                onClick={handleGithubSignup}
                className="btn btn-outline flex items-center gap-2"
              >
                <FaGithub className="text-xl" />
                GitHub
              </button>
            </div>
            <div className="p-8">
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
