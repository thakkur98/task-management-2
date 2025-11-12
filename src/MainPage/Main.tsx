import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Component/Header/Header";
import AddTask from "../Component/AddTask/AddTask";
import AddTaskPopup from "../Component/AddTask/AddTask";

const MainDashboard = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const data = {
  inPending: [
    {
      id: "p1",
      title: "Design Landing Page",
      description: "Create the initial design for the landing page including header, footer, and hero section.",
      status: "Pending",
      date: "2025-11-10",
    },
    {
      id: "p2",
      title: "Prepare Marketing Plan",
      description: "Draft a marketing plan for the upcoming product launch.",
      status: "Pending",
      date: "2025-11-11",
    },
  ],
  inProgress: [
    {
      id: "ip1",
      title: "Develop Login Feature",
      description: "Implement login functionality with form validation and JWT authentication.",
      status: "In Progress",
      date: "2025-11-09",
    },
    {
      id: "ip2",
      title: "Setup Database Schema",
      description: "Design and create the initial MongoDB schema for the project.",
      status: "In Progress",
      date: "2025-11-08",
    },
  ],
  completed: [
    {
      id: "c1",
      title: "Project Kickoff Meeting",
      description: "Conduct the initial project kickoff meeting with the team and stakeholders.",
      status: "Completed",
      date: "2025-10-30",
    },
    {
      id: "c2",
      title: "Requirement Gathering",
      description: "Collect all project requirements from the client and document them properly.",
      status: "Completed",
      date: "2025-10-28",
    },
  ],
};


  const [tasksData, setTaskdata] = useState(data);

  const toggleAccordion = (section: string) => {
    if (openAccordion === section) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(section);
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const [updateOrAdd, setAddOrUpdate] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  const handleAdd = () => {
    setAddOrUpdate("Add");
    setShowPopup(true);
    setSelectedTask("");
  };

  const handleEdit = (task: any) => {
    setAddOrUpdate("Edit");
    setSelectedTask(task);
    setShowPopup(true);
  };

  const handleDelete = (task: any) => {
    let newTasksData = { ...tasksData };
    switch (task.status) {
      case "Pending":
        newTasksData.inPending = newTasksData.inPending.filter(
          (t: any) => t.id !== task.id
        );
        break;
      case "In Progress":
        newTasksData.inProgress = newTasksData.inProgress.filter(
          (t: any) => t.id !== task.id
        );
        break;
      case "Completed":
        newTasksData.completed = newTasksData.completed.filter(
          (t: any) => t.id !== task.id
        );
        break;
    }

    setTaskdata(newTasksData);
  };

  return (
    <>
      <Header />
      <MainDashboardStyle>
        <div className="search-bar-div">
          <input type="text" placeholder="Search tasks..." />
        </div>
        <div className="accordion-container">
          <div className="accordion-section">
            <div
              className="accordion-header"
              onClick={() => toggleAccordion("inProgress")}
            >
              <p>{`In Progress (${tasksData.inProgress.length})`}</p>
              <span className="down-arrow">
                {openAccordion === "inProgress" ? "▲" : "▼"}
              </span>
            </div>
            {openAccordion === "inProgress" && (
              <div className="accordion-data">
                {tasksData.inProgress.map((task, i) => (
                  <div key={i} className="main-data">
                    <div className="logo-task">
                      <span>{task.title.split("")[0]}</span>
                    </div>
                    <div className="content-task">
                      <div className="title-section">
                        <span className="title">{task.title}</span>
                        <span
                          className={`status ${task.status
                            .replace(" ", "-")
                            .toLowerCase()}`}
                        >
                          <span className="status-dot"></span>
                          {task.status}
                        </span>
                      </div>
                      <div className="desc-section">
                        <div className="desc">{task.description}</div>
                        <div className="date-section">
                          <p className="date">{task.date}</p>
                          <span>
                            <img
                              src="/images/Pencil.png"
                              onClick={() => handleEdit(task)}
                            />
                            <img
                              src="/images/Trash.png"
                              onClick={() => handleDelete(task)}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="accordion-section">
            <div
              className="accordion-header"
              onClick={() => toggleAccordion("inPending")}
            >
              <p>{`In Pending (${tasksData.inPending.length})`}</p>
              <span className="down-arrow">
                {openAccordion === "inPending" ? "▲" : "▼"}
              </span>
            </div>
            {openAccordion === "inPending" && (
              <div className="accordion-data">
                {tasksData.inPending.map((task, i) => (
                  <div key={i} className="main-data">
                    <div className="logo-task">
                      <span>{task.title.split("")[0]}</span>
                    </div>
                    <div className="content-task">
                      <div className="title-section">
                        <span className="title">{task.title}</span>
                        <span
                          className={`status ${task.status
                            .replace(" ", "-")
                            .toLowerCase()}`}
                        >
                          <span className="status-dot"></span>
                          {task.status}
                        </span>
                      </div>
                      <div className="desc-section">
                        <div className="desc">{task.description}</div>
                        <div className="date-section">
                          <p className="date">{task.date}</p>
                          <span>
                            <img
                              src="/images/Pencil.png"
                              onClick={() => handleEdit(task)}
                            />
                            <img
                              src="/images/Trash.png"
                              onClick={() => handleDelete(task)}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="accordion-section">
            <div
              className="accordion-header"
              onClick={() => toggleAccordion("completed")}
            >
              <p>{`Completed (${tasksData.completed.length})`}</p>
              <span className="down-arrow">
                {openAccordion === "completed" ? "▲" : "▼"}
              </span>
            </div>
            {openAccordion === "completed" && (
              <div className="accordion-data">
                {tasksData.completed.map((task, i) => (
                  <div key={i} className="main-data">
                    <div className="logo-task">
                      <span>{task.title.split("")[0]}</span>
                    </div>
                    <div className="content-task">
                      <div className="title-section">
                        <span className="title">{task.title}</span>
                        <span
                          className={`status ${task.status
                            .replace(" ", "-")
                            .toLowerCase()}`}
                        >
                          <span className="status-dot"></span>
                          {task.status}
                        </span>
                      </div>
                      <div className="desc-section">
                        <div className="desc">{task.description}</div>
                        <div className="date-section">
                          <p className="date">{task.date}</p>
                          <span className="edit-delete">
                            <img
                              src="/images/Pencil.png"
                              onClick={() => handleEdit(task)}
                            />
                            <img
                              src="/images/Trash.png"
                              onClick={() => handleDelete(task)}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="add-task-btn">
          <button onClick={handleAdd}>Add Task</button>
        </div>
      </MainDashboardStyle>
      {showPopup && (
        <AddTaskPopup
          tasksData={tasksData}
          setTaskdata={setTaskdata}
          selectedTask={selectedTask}
          show={showPopup}
          setShow={setShowPopup}
          updateOrAdd={updateOrAdd}
        />
      )}
    </>
  );
};

export default MainDashboard;

const MainDashboardStyle = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  .search-bar-div {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    input {
      width: 100%;
      max-width: 400px;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 1rem;
      &:focus {
        outline: none;
        border-color: teal;
      }
    }
  }
  .accordion-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .accordion-section {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      .accordion-header {
        padding: 5px;
        background: #f3f6f9;
        color: #231f20;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-weight: 500;
        font-size: 1rem;
      }

      .accordion-data {
        padding: 1rem;
        background: #ffff;

        p {
          margin: 0.3rem 0;
        }
        .main-data {
          display: flex;
          gap: 50px;
          .logo-task {
            border: 1px solid #034ea2;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              color: #034ea2;
            }
          }
          .content-task {
            width: 100%;
            .title-section {
              display: flex;
              justify-content: space-between;
              .status {
                display: flex;
                align-items: center;
                gap: 0.5rem;
              }

              .status-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                display: inline-block;
              }

              /* Status colors */
              .status.in-pending .status-dot {
                background-color: #d0d0d0;
              }

              .status.in-progress .status-dot {
                background-color: #ffb03c;
              }

              .status.completed .status-dot {
                background-color: #368a04;
              }
            }
            .title-section .title {
              color: #034ea2;
              font-size: 20px;
              font-weight: 600;
            }
            .desc-section {
              margin-top: 10px;
              color: #231f20;
              font-size: 16px;
              font-weight: 400;

              .date-section {
                margin-top: 4px;
                display: flex;
                justify-content: space-between;
                .date {
                  color: #767676;
                }
              }
            }
          }
        }
      }
    }
  }
  .add-task-btn {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    button {
      padding: 0.7rem 1.5rem;
      font-size: 18px;
      background: #034ea2;
      border: none;
      color: #fff;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background: #023e8a;
      }
    }
  }
`;
