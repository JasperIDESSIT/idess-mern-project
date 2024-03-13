// TaskForm.js

import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // Import SweetAlert

const TaskForm = ({ fetchActiveTasks }) => {
  // Accept fetchActiveTasks as a prop
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const options = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const task = { title, content, tags: selectedTags };
  
    try {
      const response = await fetch("/api/tasks/create-task", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setTitle("");
        setContent("");
        // setSelectedTags([]);
        Swal.fire({
          icon: "success",
          title: "Task Added!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        console.log("New task added!");
  
        fetchActiveTasks();

        console.log(setSelectedTags)
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions.map((option) => option.value));
  };

  return (
    <form
      className="card p-2 mt-2 shadow-sm bg-light bg-gradient"
      onSubmit={handleSubmit}
    >
      <h3 className="fw-bold">Create Task</h3>

      <div className="form-floating">
        <input
          className="form-control"
          type="text"
          id="title-input"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <label htmlFor="title-input">Title</label>
      </div>

      <div className="form-floating mt-2">
        <textarea
          className="form-control"
          id="content-input"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required
        />
        <label htmlFor="content-input">Content</label>
      </div>

      <label className="ms-2 small mt-2 text-muted">Day/s</label>
      <Select
        options={options}
        isMulti
        onChange={handleTagChange}
        required
        closeMenuOnSelect={false}
        />

      <button className="btn btn-sm btn-success mt-2" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
