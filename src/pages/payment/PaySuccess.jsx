import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const PaySuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post("http://localhost:5001/verify-payment", {
          sessionId,
        });

        if (res.data.success) {
          setStatus("Payment Successful! Package Activated 🎉");
        } else {
          setStatus("Payment verification failed ❌");
        }
      } catch (err) {
        console.error("Verification Error:", err);
        setStatus("Server Error. Try again.");
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center mb-4">Payment Status</h1>
        <p className="text-xl text-center">{status}</p>

        <div className="mt-6 flex justify-center">
          <a href="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaySuccess;
