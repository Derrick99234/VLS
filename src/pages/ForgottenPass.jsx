import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgottenPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check Your Email");
        navigate("/login");
        setEmail("");
      })
      .catch((err) => {
        alert(err.code);
        toast.error(err.code);
        setEmail("");
      });
  };
  return (
    <>
      <div className="bg-[#dcdcdc] h-screen p-5 flex justify-center text-center">
        <div className="bg-white w-96 h-40 p-2">
          <h1>RESET PASSWORD</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/3 px-3 bg-slate-200 border-1 h-10 m-3 rounded-md border-blue-400"
            type="email"
          />
          <button
            onClick={handleEmailChange}
            className="bg-blue-400 text-white rounded-lg w-2/3 p-2 font-bold text-md"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ForgottenPass;
