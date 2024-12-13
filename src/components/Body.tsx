import React, { useState } from "react";
import "./Body.css";
import TaskTable from "./TaskTable";
import TaskForm from "./TaskForm";

const Body: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  return (
    <div className="main-body">
      <div>
        <TaskForm open={open} setOpen={setOpen} updateModal={updateModal} setUpdateModal={setUpdateModal} />
      </div>
      <div className="table-container">
        <TaskTable setOpen={setOpen} setUpdateModal={setUpdateModal} />
      </div>
    </div>
  );
};

export default Body;
