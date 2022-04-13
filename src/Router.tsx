import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import AddCoffeeShop from "./pages/AddCoffeeShop";
import EditCoffeeShop from "./pages/EditCoffeeShop";

const Router = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn === true ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddCoffeeShop />} />
            <Route path="/shop/:id" element={<EditCoffeeShop />} />
          </>
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
