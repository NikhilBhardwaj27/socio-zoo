import React from "react";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import "../others/others.css";

const Loading = () => {
  const authLoading = useSelector((state) => state.auth.loading)
  const profileLoading = useSelector((state) => state.profile.loading)
  return (
    <div>
      {authLoading || profileLoading ? (
        <div className="loading">
          <Loader type="Bars" color="#8c00ff" height={100} width={100} />
        </div>
      ) : null}
    </div>
  );
};

export default Loading;
