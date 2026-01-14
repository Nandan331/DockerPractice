// import { Eye, EyeOff } from "lucide-react";
// import { useState, type FormEvent } from "react";
// import { useSignupStep1Mutation } from "./services/user";

// type Signup1 = {
//   email: string;
//   password: string;
// };
// function App() {
//   const [userSignUp1, setUserSignUp1] = useState<Signup1>({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState<boolean>(false);

//   const [signupStep1] = useSignupStep1Mutation();
//   const handleFormSubmit = async(e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try{
//       const response = await signupStep1({
//         email: userSignUp1.email,
//         password: userSignUp1.password
//       })
//       console.log("Response sign up :", response);
//     }catch(err){
//       console.log("error sign up :", err);
//     }

//   }

//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="">
//           <h1>Sign up</h1>
//           <div className="w-full max-w-full">
//             <form className="h-auto overflow-y-auto flex flex-col gap-4 w-full max-w-lg" onSubmit={handleFormSubmit}>
//               <div className="w-full">
//                 <input
//                   type="email"
//                   placeholder="Please enter your email"
//                   value={userSignUp1.email}
//                   onChange={(e) =>
//                     setUserSignUp1({ ...userSignUp1, email: e.target.value })
//                   }
//                   className="w-full py-2 px-2 border border-[#D8DADC] rounded-md focus:outline-none focus-visible:ring-0 focus:!border-black placeholder:font-normal"
//                 />
//               </div>
//               <div className="relative">
//                 <input
//                   type={`${showPassword ? "text" : "password"}`}
//                   placeholder="Please enter password"
//                   className="w-full py-2 px-2 pr-10 border border-[#D8DADC] rounded-md focus:outline-none focus-visible:ring-0 focus:!border-black placeholder:font-normal"
//                   value={userSignUp1.password}
//                   onChange={(e) =>
//                     setUserSignUp1({ ...userSignUp1, password: e.target.value })
//                   }
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-2 top-3 text-gray-500 cursor-pointer"
//                 >
//                   {showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}
//                 </button>
//               </div>
//               <button type="submit" className="py-2 px-4 border rounded-lg cursor-pointer">Submit</button>
//             </form>
//             <div className="">
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
