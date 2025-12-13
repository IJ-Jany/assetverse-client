import { Navigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import useRole from "../hooks/useRole";

const HrRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { role, loading } = useRole(user?.email);

  if (loading) return <LoadingSpinner />;

  if (role === "hr") return children;

  return <Navigate to="/" replace />;
};

export default HrRoute;
