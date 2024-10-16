import { useContext, useEffect } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

import { AppContext } from "../../context/appContext/AppContext";
import axios from "axios";

const PrivateRoute = () => {
  const { dispatch } = useContext(AppContext);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  const getLoggedIn = async () => {
    const res = await axios.get("https://yoga-xrrk.onrender.com/api/private/getuser", config);
    if (res) {
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } else {
      dispatch({ type: "EMPTY_STATE" });
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);
  return localStorage.getItem("authToken") ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
