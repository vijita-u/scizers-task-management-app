import React, { useEffect, useState } from "react";
import "./Body.css";
import TaskTable from "./TaskTable";
import TaskForm from "./TaskForm";
import { DataType } from "../types";

const Body: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<DataType | null>(null);
  const [tableData, setTableData] = useState<DataType[]>([]);

  return (
    <div className="main-body">
      <div>
        <TaskForm
          open={open}
          setOpen={setOpen}
          updateModalOpen={updateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          currentEdit={currentEdit}
          setCurrentEdit={setCurrentEdit}
          setTableData={setTableData}
        />
      </div>
      <div className="table-container">
        <TaskTable
          setOpen={setOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          setCurrentEdit={setCurrentEdit}
          tableData={tableData}
          updateModalOpen={updateModalOpen}
        />
      </div>
    </div>
  );
};

export default Body;
