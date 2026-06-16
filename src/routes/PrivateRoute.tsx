import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({
  children
}: Props) => {

  const token =
    localStorage.getItem(
      "accessToken"
    );

  return token
    ? children
    : <Navigate to="/login" replace />;

};

export default PrivateRoute;