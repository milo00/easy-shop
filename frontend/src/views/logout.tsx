import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { logout } from "../store/slices/accountSlice";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <Navigate to="/login" replace />;
};

export default Logout;
