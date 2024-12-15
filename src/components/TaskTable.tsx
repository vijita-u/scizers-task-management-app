import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { DataType } from "../types";

interface TaskTableProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateModalOpen: boolean;
  setUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentEdit: Dispatch<SetStateAction<DataType | null>>;
  tableData: DataType[];
}

const TaskTable: React.FC<TaskTableProps> = ({
  setUpdateModalOpen,
  setCurrentEdit,
  tableData,
}) => {
  const handleEdit = (record: DataType) => {
    setUpdateModalOpen(true)
    setCurrentEdit(record)
  };

  useEffect(() => {
    console.log(tableData)
  }, [tableData])

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
          <a>
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
