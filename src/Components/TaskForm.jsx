import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const TaskForm = () => {
  const taskList = useSelector((state) => state.tasksRoot.tasklist);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    createdAt: new Date().toISOString().split("T")[0],
  });
  const { taskId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (taskId && taskList) {
      const currenttask = taskList.filter((item) => item._id === taskId);
      setFormData(currenttask[0]);
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await axios.put(`http://localhost:8080/tasks/${taskId}`, formData, {
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
        });
        dispatch({
          type: "SET_ALERT",
          payload: { message: "Task updated successfull", isError: false },
        });
      } else {
        await axios.post("http://localhost:8080/tasks", formData, {
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
        });
        dispatch({
          type: "SET_ALERT",
          payload: { message: "Task added successfull", isError: false },
        });
      }
      navigate("/");
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { message: err.response.data, isError: true },
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {taskId ? "Edit Task" : "Add Task"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          select
          required
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        {taskId && (
          <TextField
            disabled
            label="Created Date"
            name="createdDate"
            type="date"
            value={new Date(formData.createdAt).toISOString().split("T")[0]}
          />
        )}
        <Button type="submit" variant="contained" color="primary">
          {taskId ? "Update Task" : "Add Task"}
        </Button>
      </Box>
    </Box>
  );
};
