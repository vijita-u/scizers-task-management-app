import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import './TaskTable.css'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { DataType } from "../utils/types";
import { fetchTasks, deleteTask } from "../api/apiUtils";

interface TaskTableProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateModalOpen: boolean;
  setUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentEdit: Dispatch<SetStateAction<DataType | null>>;
  tableData: DataType[];
  setTableData: Dispatch<SetStateAction<DataType[]>>;
}

const TaskTable: React.FC<TaskTableProps> = ({
  setUpdateModalOpen,
  setCurrentEdit,
  tableData,
  setTableData
}) => {

  // Fetch tasks
  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasksList = await fetchTasks();
      setTableData(fetchedTasksList)
    }
    getTasks()
    console.log(tableData)
  }, [])

  const handleEdit = (record: DataType) => {
    setUpdateModalOpen(true)
    setCurrentEdit(record)
  };

  const handleDelete = async (record: DataType) => {
    // Update UI
    setTableData((data) => data.filter((task) => task.key !== record.key))

    // Update server
    await deleteTask(record?.id as string)
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (_, { priority }) => {
        let color =
          priority === "High"
            ? "#F26262"
            : priority === "Medium"
            ? "#fad60a"
            : "#87d068";
        return (
          <div>
            <Tag color={color} key={priority}>
              {priority?.toUpperCase()}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Due Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (i, { status }) => {
        let color = status == "Completed" ? "green" : "default";
        let icon =
          status == "Completed" ? (
            <CheckCircleOutlined />
          ) : (
            <ClockCircleOutlined />
          );
        return (
          <Tag icon={icon} color={color} key={status + i}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <SettingFilled />
          </a>
          <a onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TaskTable;
