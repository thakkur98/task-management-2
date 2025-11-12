import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface AddTaskPopupProps {
  show: boolean;
  setShow: (val: boolean) => void;
  updateOrAdd: any;
  selectedTask: any;
  setTaskdata?: any;
  tasksData: any;
}

const AddTaskPopup: React.FC<AddTaskPopupProps> = ({  tasksData, setShow , updateOrAdd , selectedTask, setTaskdata}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setStatus(selectedTask.status);
    } else {
      // Reset when no task is selected
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }, [selectedTask]);
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setShow(false); 
  };

 const handleUpdate = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; 

  const taskData = {
    title,
    description,
    status,
    date: formattedDate, 
  };

  if(updateOrAdd === "Edit") {
    let newTasksData = { ...tasksData };   
    
    switch(status) {
    case "Pending":
      newTasksData.inPending.forEach((task: any) =>{
        if(task.id === selectedTask.id ){
          task.title = title;
          task.description = description;
          task.status = status;
        }
        return task;
    })
      break;
    case "In Progress":
      newTasksData.inProgress.forEach((task: any) =>{
        if(task.id === selectedTask.id ){
          task.title = title;
          task.description = description;
          task.status = status;
        }
        return task;
    })
      break;
    case "Completed":
      newTasksData.completed.forEach((task: any) =>{
        if(task.id === selectedTask.id ){
          task.title = title;
          task.description = description;
          task.status = status;
        }
        return task;
    })
      break;
  }

  setTaskdata(newTasksData);
} else {
  // Add mode (as before)
  switch(status) {
    case "Pending":
      setTaskdata({
        ...tasksData,
        inPending: [...tasksData.inPending, taskData],
      });
      break;
    case "In Progress":
      setTaskdata({
        ...tasksData,
        inProgress: [...tasksData.inProgress, taskData],
      });
      break;
    case "Completed":
      setTaskdata({
        ...tasksData,
        completed: [...tasksData.completed, taskData],
      });
      break;
  }
}


  handleCancel();
};

  return (
    <Overlay>
      <PopupContent>
        <div className="head-section">
          <h2>{updateOrAdd}</h2>
        </div>

        <div className="form">
          <div className="form-group">
           
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div className="form-group">
           
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="button-group">
            <button className="cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="update" onClick={handleUpdate}>
            {updateOrAdd === "Edit" ? "Update" : "Add"}
          </button>
          </div>
        </div>
      </PopupContent>
    </Overlay>
  );
};

export default AddTaskPopup;

// Styled Components

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* dark transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  position: relative;
  background: #fff;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  .head-section {
    background: #034ea2;
    height: 50px;
    margin-top: -20px;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      color: #fff;
    }
  }
  .form{
      margin : 10px 20px;
  }

  .form .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    label {
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    input,
    textarea,
    select {
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }
  }

  .form .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;

    button {
      padding: 0.6rem 1.2rem;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: 0.3s;
    }

    .cancel {
      background: #fff;
      border: 1px solid #034EA2;
      color: #034EA2;

    
    }

    .update {
      background: #034EA2;
      color: #fff;

     
    }
  }
`;
