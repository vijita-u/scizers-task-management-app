import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Switch,
} from "antd";
import "./TaskForm.css";
import type { FormProps } from "antd";
import { DataType } from "../utils/types";
import dayjs from "dayjs";
import { addTasks, updateTask } from "../api/apiUtils";

interface TaskFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateModalOpen: boolean;
  setUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  currentEdit: DataType | null;
  setCurrentEdit: Dispatch<SetStateAction<DataType | null>>;
  setTableData: Dispatch<SetStateAction<DataType[]>>;
  tableData: DataType[];
}

const TaskForm: React.FC<TaskFormProps> = ({
  open,
  setOpen,
  updateModalOpen,
  setUpdateModalOpen,
  setCurrentEdit,
  currentEdit,
  setTableData,
  tableData,
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (currentEdit && updateModalOpen && form) {
      form.setFieldsValue({
        ...currentEdit,
        date: currentEdit.date
          ? String(dayjs(currentEdit.date, "MMMM DD, YYYY").valueOf())
          : undefined,
      });
    }
  }, [currentEdit, updateModalOpen]);

  const showModal = () => {
    if (form) {
      form.resetFields();
    }
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setUpdateModalOpen(false);
    form.resetFields();
  };

  const handleFinish: FormProps<DataType>["onFinish"] = async (values) => {
    const newTask = {
      ...values,
      key: values.title + String(Date.now()),
      date: values.date
        ? dayjs(Number(values.date)).format("MMMM DD, YYYY")
        : null,
      status: values.status ? "Completed" : "Not completed",
    };

    try {
      if (updateModalOpen && currentEdit) {
        // Update existing task on server
        const updatedTask = await updateTask(
          currentEdit?.id as string,
          newTask as DataType
        ); // Assuming currentEdit has the 'id' property

        console.log(updatedTask)
        // Update local state
        setTableData((prev) =>
          prev.map((task) =>
            task.key === currentEdit.key ? updatedTask : task
          )
        );
      } else {
        // Add a new task
        const addedTask = await addTasks(newTask as DataType);

        // Update local state
        setTableData((prev) => [...prev, addedTask]);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }

    // setTableData((prev) => {
    //   if (updateModalOpen && currentEdit) {
    //     // if updating an existing task
    //     return prev.map((task) =>
    //       task.key === currentEdit.key ? (newTask as DataType) : task
    //     );
    //   } else {
    //     // Add a new task
    //     return [...prev, newTask as DataType];
    //   }
    // });

    // Close modal
    setTimeout(() => {
      setOpen(false);
      setUpdateModalOpen(false);
    }, 500);

    api.open({
      message: "Success",
      description: updateModalOpen
        ? "Task updated successfully"
        : "Task added successfully",
      duration: 2,
    });
  };

  return (
    <>
      <Button color="default" variant="solid" onClick={showModal}>
        Add task
      </Button>
      {contextHolder}
      <Modal
        key={updateModalOpen ? "open" : "closed"}
        title="Add Task"
        open={open ? open : updateModalOpen}
        onCancel={handleCancel}
        okText={updateModalOpen ? "Update" : "Ok"}
        // onOk={handleOk}
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="getValueProps"
            onFinish={handleFinish}
            onFinishFailed={() => {
              api.open({
                message: "ERROR",
                description: "Something went wrong, please try again.",
                duration: 2,
              });
            }}
          >
            {dom}
          </Form>
        )}
      >
        <div className="task-form">
          <Form.Item
            shouldUpdate
            name="title"
            label="Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            shouldUpdate
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="High">
                <span className="high-priority">
                  <div></div>High
                </span>
              </Select.Option>
              <Select.Option value="Medium">
                <span className="medium-priority">
                  <div></div>Medium
                </span>
              </Select.Option>
              <Select.Option value="Low">
                <span className="low-priority">
                  <div></div>Low
                </span>
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            shouldUpdate
            name="date"
            label="Due Date"
            rules={[{ required: true }]}
            getValueProps={(value) => ({
              value: value && dayjs(Number(value)),
            })}
            normalize={(value) => value && `${dayjs(value).valueOf()}`}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            shouldUpdate
            name="status"
            label="Status"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Completed"
              unCheckedChildren="Not completed"
            />
          </Form.Item>
        </div>
      </Modal>
    </>
  );
};

export default TaskForm;
