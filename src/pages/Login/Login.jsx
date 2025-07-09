import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Lottie from "lottie-react";
import pharmacyLottie from "../../assets/lottie/login-animation.json"; // use a relevant Lottie file
import { useAuth } from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const { googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/"); // or dashboard
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await githubLogin();
      toast.success("Logged in with GitHub!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-900">
        {/* Lottie Animation */}
        <div className="hidden md:flex items-center justify-center p-8 bg-blue-50 dark:bg-blue-900">
          <Lottie
            animationData={pharmacyLottie}
            loop={true}
            className="max-w-md w-full"
          />
        </div>

        {/* Login Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-blue-500 dark:bg-gray-800 dark:text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-blue-500 dark:bg-gray-800 dark:text-white"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Or login with
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FcGoogle className="text-xl" />
                Google
              </button>

              <button
                onClick={handleGithubLogin}
                className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FaGithub className="text-xl text-gray-800 dark:text-gray-200" />
                GitHub
              </button>
            </div>
            <div className="p-8">
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don’t have an account?{" "}
                  <a
                    href="/register"
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Register here
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

export default Login;
