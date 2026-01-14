import { useState } from "react";
import { useSignupStep2Mutation } from "../services/user";
import { LoaderCircle } from "lucide-react";

type Profileinfo = {
  firstname: string;
  lastname: string;
  mobileNumber: string;
};
const SignUp2 = () => {
  const [profileinfo, setProfileinfo] = useState<Profileinfo>({
    firstname: "",
    lastname: "",
    mobileNumber: "",
  });
  const [profileinfoErrors, setProfileinfoErrors] = useState<
    Partial<Profileinfo>
  >({});

  const [signupStep2, { isLoading: signup2Loading }] = useSignupStep2Mutation();
  const handleFormSubmit = async () => {
    const newErrors = {
      firstname: "",
      lastname: "",
      mobileNumber: "",
    };
    if (!profileinfo.firstname) {
      newErrors.firstname = "First name is required";
    }
    if (!profileinfo.lastname) {
      newErrors.lastname = "Last name is required";
    }
    if (!profileinfo.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    }
    if (profileinfo.mobileNumber && profileinfo.mobileNumber.length !== 10) {
      newErrors.mobileNumber = "Mobile number must be 10 digits";
    }
    if (Object.values(newErrors).some((error) => error !== "")) {
      setProfileinfoErrors(newErrors);
      return;
    }
    try {
      const response = await signupStep2({
        firstname: profileinfo.firstname,
        lastname: profileinfo.lastname,
        mobileNumber: profileinfo.mobileNumber,
      });
      console.log("Response Sign up step 2 :", response);
    } catch (err) {
      console.log("Error sign up step 2 :", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full md:max-w-sm md:px-0 px-6">
          <h1>Before continuing, please tell us about yourself more</h1>
          <form className="w-full flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <div className="">
              <input
                type="text"
                className="w-full py-2 px-2 border border-[#D8DADC] rounded-md focus:outline-none focus-visible:ring-0 focus:!border-black"
                placeholder="Enter your first name"
                value={profileinfo.firstname}
                onChange={(e) =>
                  setProfileinfo({ ...profileinfo, firstname: e.target.value })
                }
                required
                maxLength={50}
              />
              {profileinfoErrors.firstname && (
                <p className="text-sm text-red-500 mt-1">
                  {profileinfoErrors.firstname}
                </p>
              )}
            </div>
            <div className="">
              <input
                type="text"
                className="w-full py-2 px-2 border border-[#D8DADC] rounded-md focus:outline-none focus-visible:ring-0 focus:!border-black"
                placeholder="Enter your last name"
                value={profileinfo.lastname}
                onChange={(e) =>
                  setProfileinfo({ ...profileinfo, lastname: e.target.value })
                }
                required
                maxLength={50}
              />
              {profileinfoErrors.lastname && (
                <p className="text-sm text-red-500 mt-1">
                  {profileinfoErrors.lastname}
                </p>
              )}
            </div>
            <div className="">
              <input
                type="tel"
                className="w-full py-2 px-2 border border-[#D8DADC] rounded-md focus:outline-none focus-visible:ring-0 focus:!border-black"
                placeholder="Enter your mobile number"
                value={profileinfo.mobileNumber}
                onChange={(e) => {
                  const stringNumber = e.target.value.replace(/[^0-9]/g, "");
                  setProfileinfo({
                    ...profileinfo,
                    mobileNumber: stringNumber,
                  });
                }}
                required
                maxLength={10}
              />
              {profileinfoErrors.mobileNumber && (
                <p className="text-sm text-red-500 mt-1">{profileinfoErrors.mobileNumber}</p>
              )}
            </div>
            <button className={`py-2 px-4 border rounded-lg`}>
              {signup2Loading ? (
                <div className="flex items-center justify-center">
                  <LoaderCircle className="animate-spin" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp2;
