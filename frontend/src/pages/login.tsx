import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useUserLoginMutation } from "../services/user";
import { Link, useNavigate } from "react-router-dom";

type LoginType = {
  email: string;
  password: string;
};
const Login = () => {
  const [logincre, setLogincre] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [logincreError, setLogincreError] = useState<Partial<LoginType>>();
  const [apiError, setApiError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const enableContine =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(logincre.email) &&
    logincre.password.length > 0;

  const navigate = useNavigate();
  // Login credential Api integration
  const [userLogin, { isLoading: isSubmitLoading }] = useUserLoginMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = {
      email: "",
      password: "",
    };
    if (!logincre.email) {
      newError.email = "Email is required";
    }
    if (!logincre.password) {
      newError.password = "Password is required";
    }
    if (Object.values(newError).some((err) => err !== "")) {
      setLogincreError(newError);
      return;
    }
    setLogincreError({});

    try {
      const response = await userLogin({
        email: logincre.email,
        password: logincre.password,
      }).unwrap();
      if (response?.status === "success") {
        navigate("/chatapp");
      }
    } catch (err: any) {
      if (err?.status === 401) {
        setApiError("Invalid email or password");
        return;
      }
      setApiError(err?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="w-full min-h-screen max-w-full flex justify-center items-center">
        <div className="w-full md:max-w-sm md:px-0 px-6">
          <h1 className="font-[600] text-[18px] mb-4 text-center">Login</h1>
          <form
            className="h-auto overflow-y-auto flex flex-col gap-4 w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full py-2 px-2 border border-[#D8DADC] rounded-md focus-visible:ring-0 focus:outline-none focus:!border-black"
                value={logincre.email}
                onChange={(e) => {
                  setLogincre({ ...logincre, email: e.target.value });
                }}
              />
              {logincreError?.email && (
                <p className="text-red-500 text-sm">{logincreError.email}</p>
              )}
            </div>
            <div className="w-full">
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Enter your password"
                  className="w-full py-2 px-2 border border-[#D8DADC] rounded-md focus-visible:ring-0 focus:outline-none focus:!border-black"
                  value={logincre.password}
                  onChange={(e) => {
                    setLogincre({ ...logincre, password: e.target.value });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-3 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {logincreError?.password && (
                <p className="text-red-500 text-sm">{logincreError.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!enableContine || isSubmitLoading}
              className={`py-2 px-4 border rounded-lg bg-blue-900 text-white ${
                enableContine
                  ? "cursor-pointer"
                  : "opacity-25 cursor-not-allowed"
              }`}
            >
              {isSubmitLoading ? (
                <div className="flex justify-center items-center">
                  <LoaderCircle className="animate-spin" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
            <p className="text-[14px] font-[500]">
              New to chat App{" "}
              <span className="text-blue-600 underline">
                <Link to="/">Sign up</Link>
              </span>
            </p>
            {apiError && (
                <p className="text-red-500 text-sm">{apiError}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
