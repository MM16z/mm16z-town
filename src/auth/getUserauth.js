import Axios from "axios";

const getUserauth = () => {
  const response = Axios.post(
    "http://localhost:3001/auth",
    JSON.stringify({}),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

export default getUserauth;
