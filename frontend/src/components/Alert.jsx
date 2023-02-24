import React, { useContext } from "react";
import AlertContext from "../context/AlertContext";

const Alert = () => {
  const context1 = useContext(AlertContext);
  const { alertMsg } = context1;

  return (
    <div style={{height: "58px"}}>
    {alertMsg && (
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>{alertMsg} </strong>
      </div>
    )}
    </div>
  );
};

export default Alert;
