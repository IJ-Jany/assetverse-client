import { useState, useEffect } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axios.get(`https://asset-server.vercel.app/user/role/${email}`);
        setRole(res.data?.role || "");
      } catch (error) {
        console.error("ERROR FETCHING ROLE:", error);
        setRole("");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [email]);

  return {role,loading}; 
};

export default useRole;