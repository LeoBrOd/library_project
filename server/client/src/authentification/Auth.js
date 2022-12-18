import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = (props) => {
  const [redirect, setRedirect] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(
          "/token",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 200) {
          setRedirect(true);
        }
      } catch (e) {
        navigate("/login");
      }
    };
    verify();
  }, []);
  return redirect ? props.children : "";
};
