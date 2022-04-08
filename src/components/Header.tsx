import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import { isLoggedInVar } from "../apollo";

const Header = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);

  return (
    <div>
      {isLoggedIn === true ? (
        <>
          <Link to="/">Home</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </>
      )}
    </div>
  );
};

export default Header;
