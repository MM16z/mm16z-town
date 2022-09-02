import Axios from "axios";

const getUserauth = () => {
  const response = Axios.post(
    "https://mm16-town-nodejsexpress-bn2ae2zur-mm16z.vercel.app/auth",
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
