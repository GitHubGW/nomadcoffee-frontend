import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";

const Router = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  console.log("isLoggedIn", isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn === true ? (
          <Route path="/" element={<Home />} />
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
