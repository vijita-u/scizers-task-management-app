import React, { Dispatch, SetStateAction, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  SettingFilled,
} from "@ant-design/icons";

interface TaskTableProps {
  setOpen: Dispatch<SetStateAction<boolean>>
  setUpdateModal: Dispatch<SetStateAction<boolean>>
}
interface DataType {
  key: string;
  title: string;
  priority: string;
  date: string;
  status: string;
}



const data: DataType[] = [
  {
    key: "1",
    title: "Complete assignment task",
    priority: "High",
    date: "December 13, 2024",
    status: "Completed",
  },
  {
    key: "2",
    title: "Subtitling work",
    priority: "Medium",
    date: "December 14, 2024",
    status: "Not completed",
  },
  {
    key: "3",
    title: "Take dog for walk",
    priority: "Low",
    date: "December 14, 2024",
    status: "Not completed",
  },
];

const rowSelection: TableProps<DataType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    // 
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    name: record.title,
  }),
};

const TaskTable: React.FC<TaskTableProps> = ({setOpen, setUpdateModal}) => {

  const handleEdit = () => {
    // setOpen(true)
    setUpdateModal(true);
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
              {priority.toUpperCase()}
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
      render: () => (
        <Space size="middle">
          <a onClick={handleEdit}>
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
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={columns}
        dataSource={data}
        pagination={{pageSize: 5}}
      />
    </div>
  );
};

export default TaskTable;

