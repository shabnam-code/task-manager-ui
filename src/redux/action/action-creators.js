import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

export const signIn = (formData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8080/users/signin", formData)
      .then((res) => {
        const { username, isAdmin } = res.data.user;
        const token = res.data.token;
        if (!username || !token) {
          throw new Error("Invalid response from server");
        }
        dispatch({
          type: "SET_ALERT",
          payload: { message: "SignIn successfull", isError: false },
        });
        dispatch({
          type: "SET_USER",
          payload: { username, isAdmin },
        });
        localStorage.setItem("token", token);
      })

      .catch((err) => {
        dispatch({
          type: "SET_ALERT",
          payload: { message: err.response.data, isError: true },
        });
      });
  };
};

export const signUp = (formData, navigate) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8080/users/signup", formData)
      .then((res) => {
        const { username, isAdmin } = res.data.newUser;
        const token = res.data.token;
        if (!username || !token) {
          throw new Error("Invalid response from server");
        }
        navigate("/");
        dispatch({
          type: "SET_ALERT",
          payload: { message: "Signup successfull", isError: false },
        });
        dispatch({
          type: "SIGN_UP_USER",
          payload: { username, isAdmin },
        });
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        dispatch({
          type: "SET_ALERT",
          payload: { message: err.response.data, isError: true },
        });
      });
  };
};

export const FetchAllTask = (navigate) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in");
      navigate("/signin");
      return;
    }

    axios
      .get(`http://localhost:8080/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_ALL_TASK",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(
          "Error fetching tasks:",
          err.response?.data || err.message
        );
      });
  };
};
