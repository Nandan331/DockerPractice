import { createBrowserRouter } from "react-router-dom";
import SignUp2 from "./pages/signup2";
import SignUp1 from "./pages/signup1";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignUp1/>
    },
    {
        path: "/signup-step2",
        element: <SignUp2/>
    },
    {
        path: "/login",
        // element: <
    }
])
