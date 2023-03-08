import { Navigate } from "react-router-dom";
//import { useSelector } from "react-redux";

const AuthGuard = (Component) => {
  return function (props) {
    //const user = useSelector(state => state.translation);
    //let condition = user.username != null;

    /*
    if (condition) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/" />;
    }
    */

  };
}

export default AuthGuard;