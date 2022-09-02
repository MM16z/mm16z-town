import Axios from "axios";

const getUserauth = () => {
  const response = Axios.post(
    "https://mm16z-town-crud.herokuapp.com/auth",
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
