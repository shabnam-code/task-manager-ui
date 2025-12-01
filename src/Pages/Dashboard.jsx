import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskList } from "../Components/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllTask } from "../redux/action/action-creators";

export const Dashboard = () => {
  const user = useSelector((state) => state.tasksRoot.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchAllTask(navigate));
  }, [dispatch, navigate]);
  const tasks = useSelector((state) => {
    return state.tasksRoot?.tasklist || [];
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOG_OUT" });
    navigate("/signin");
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="h6">
          Welcome, {user?.username || "Guest"} {user?.isAdmin && "(Admin)"}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>
        Task Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/add-task")}
      >
        Add Task
      </Button>
      <TaskList tasks={tasks} />
    </Box>
  );
};
