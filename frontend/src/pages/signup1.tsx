import { CheckIcon, Eye, EyeOff, LoaderCircle, XCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSignupStep1Mutation } from "../services/user";
import { Link, useNavigate } from "react-router-dom";

type Signup1 = {
  email: string;
  password: string;
};
function SignUp1() {
  const [userSignUp1, setUserSignUp1] = useState<Signup1>({
    email: "",
    password: "",
  });
  const [userSignUp1Error, setUserSignUp1Error] = useState<Partial<Signup1>>(
    {}
  );
  const [apiError, setApiError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // validate password
  const validpassword = (password: string) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const ValidPasswordCheck = validpassword(userSignUp1.password);

  const handlePassword = Object.values(ValidPasswordCheck).every(Boolean);
  const enableContinue =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userSignUp1.email) && handlePassword;

  const renderPassword = (valid: boolean, showValidText: string) => {
    return (
      <div className="flex items-center gap-2">
        <div className="">
          {valid ? <CheckIcon size={16} /> : <XCircle size={16} />}
        </div>
        <span className="text-sm">{showValidText}</span>
      </div>
    );
  };
  const navigate = useNavigate();
  const [signupStep1, { isLoading: SignupLoading }] = useSignupStep1Mutation();
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };
    if (!userSignUp1.email) {
      newErrors.email = "Email is required";
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userSignUp1.email) === false) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!userSignUp1.password) {
      newErrors.password = "Password is required";
    }
    if (Object.values(newErrors).some((error) => error !== "")) {
      setUserSignUp1Error(newErrors);
      return;
    }
    setUserSignUp1Error({});
    try {
      const response: any = await signupStep1({
        email: userSignUp1.email,
        password: userSignUp1.password,
      }).unwrap();
      if (response.data.status === "success") {
        navigate("/signup-step2");
      }
      console.log("Response sign up :", response);
    } catch (err: any) {
      console.log("error sign up :", err);
      setApiError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full md:max-w-sm md:px-0 px-6">
          <h1 className="font-[600] text-[18px] mb-4 text-center">Sign up</h1>
          <div className="w-full">
            <form
              className="h-auto overflow-y-auto flex flex-col gap-4 w-full max-w-lg"
              onSubmit={handleFormSubmit}
            >
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Please enter your email"
                  value={userSignUp1.email}
                  onChange={(e) => {
                    setUserSignUp1({ ...userSignUp1, email: e.target.value });
                    setUserSignUp1Error((prev) => ({ ...prev, email: "" }));
                    setApiError("");
                  }}
                  className="w-full py-2 px-2 border border-[#D8DADC] rounded-md focus:outline-none focus-visible:ring-0 focus:!border-black placeholder:font-normal"
                />
                {userSignUp1Error.email && (
                  <p className="text-red-500 text-sm">
                    {userSignUp1Error.email}
                  </p>
                )}
              </div>
              <div className="">
                <div className="relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Please enter password"
                    className="w-full py-2 px-2 pr-10 border border-[#D8DADC] rounded-md focus:outline-none focus-visible:ring-0 focus:!border-black placeholder:font-normal"
                    value={userSignUp1.password}
                    onChange={(e) =>
                    {
                        setUserSignUp1({
                          ...userSignUp1,
                          password: e.target.value,
                        })
                        setUserSignUp1Error((prev) => ({ ...prev, password: "" }));
                        setApiError("");
                    }
                    }
                  />
                  <div className="mt-2 text-[sm] text-gray-600">
                    {renderPassword(
                      ValidPasswordCheck.length,
                      "At least 8 characters"
                    )}
                    {renderPassword(
                      ValidPasswordCheck.uppercase,
                      "At least one uppercase letter"
                    )}
                    {renderPassword(
                      ValidPasswordCheck.lowercase,
                      "At least one lowercase letter"
                    )}
                    {renderPassword(
                      ValidPasswordCheck.number,
                      "At least one number"
                    )}
                    {renderPassword(
                      ValidPasswordCheck.specialChar,
                      "At least one special character"
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {userSignUp1Error.password && (
                  <p className="text-red-500 text-sm">
                    {userSignUp1Error.password}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={!enableContinue || SignupLoading}  // disabled button works on the true condition if property with in is true then it will be disabled  
                className={`py-2 px-4 border rounded-lg bg-blue-900 text-white ${
                  enableContinue
                    ? "cursor-pointer"
                    : "opacity-25 cursor-not-allowed"
                }`}
              >
                {SignupLoading ? (
                  <div className="flex items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
              <p className="text-[14px] font-[500]">If you already have an account <span className="text-blue-600 underline"><Link to="/login">Login</Link></span></p>
              {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp1;
