import React from "react";

const ErrorElement = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">Oops!</h1>
      <p className="error-message">Something went wrong.</p>
      <p className="error-subtext">Please try again later.</p>
    </div>
  );
};

export default ErrorElement;
