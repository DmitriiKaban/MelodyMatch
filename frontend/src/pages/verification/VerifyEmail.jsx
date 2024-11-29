import React from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.scss";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const handleResendEmail = () => {
    alert("A new verification email has been sent to your inbox.");
  };

  return (
    <div className="verify-email">
      <div className="container">
        <h1>Verify Your Email</h1>
        <p>
          Thank you for signing up! A verification link has been sent to your
          email address. Please check your inbox and click on the link to
          activate your account.
        </p>
        <div className="actions">
          <button onClick={handleResendEmail} className="resend-button">
            Resend Email
          </button>
          <button onClick={() => navigate("/")} className="home-button">
            Return to Home
          </button>
        </div>
        <div className="help-text">
          <p>
            Didn’t receive the email? Check your spam or junk folder, or click{" "}
            {}
            <span className="resend-link" onClick={handleResendEmail}>
              here
            </span>{" "}
            to resend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
