import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

const AlertComp = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.tasksRoot.alert?.message);
  const isError = useSelector((state) => state.tasksRoot.alert?.isError);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_ALERT" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <Snackbar
      open={!!message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={isError ? "error" : "success"}
        onClose={() => dispatch({ type: "CLEAR_ALERT" })}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComp;
