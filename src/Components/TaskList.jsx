import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DialogBox from "./DialogBox";
import { useSelector } from "react-redux";

export const TaskList = ({ tasks }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const isAdmin = useSelector((state) => state.tasksRoot.user?.isAdmin);
  const handleOpenDialog = (task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      try {
        await axios.delete(`http://localhost:8080/tasks/${selectedTask._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        window.location.reload();
      } catch (err) {
        console.error("Error deleting task:", err);
      } finally {
        handleCloseDialog();
      }
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {new Date(task.createdAt)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, "-")}
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Link to={`/edit-task/${task._id}`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                  {isAdmin && (
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDialog(task)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogBox
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        content={`Are you sure you want to delete the task "${selectedTask?.title}"?`}
      />
    </>
  );
};
