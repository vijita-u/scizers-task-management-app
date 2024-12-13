import React, { Dispatch, SetStateAction, useState } from "react";
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

interface TaskFormProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  updateModal: boolean
  setUpdateModal: Dispatch<SetStateAction<boolean>>
}

interface Values {
  title?: string;
  priority?: 'High' | 'Medium' | 'Low';
  date?: string;
  status?: Boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({open, setOpen, updateModal, setUpdateModal}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [formValues, setFormValues] = useState<Values>();
  

  const onCreate = (values: Values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpen(false);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 500);
    setTimeout(() => {
      // send notification
      api.open({
        message: "",
        description: "Task list updated",
        duration: 2,
      });
    }, 1000);
  };

  const showModal = () => {
    // If editing task -> pre-fill the values
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setUpdateModal(false)

  };

  return (
    <>
      <Button color="default" variant="solid" onClick={showModal}>
        Add task
      </Button>
      {contextHolder}
      <Modal
        title="Add Task"
        open={open || updateModal}
        onCancel={handleCancel}
        okText={updateModal ? "Update" : "Ok"}
        onOk={handleOk}
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <div className="task-form">
          <Form.Item
            label="Title"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Priority"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select>
              <Select.Option value="high">
                <span className="high-priority">
                  <div></div>High
                </span>
              </Select.Option>
              <Select.Option value="medium">
                <span className="medium-priority">
                  <div></div>Medium
                </span>
              </Select.Option>
              <Select.Option value="low">
                <span className="low-priority">
                  <div></div>Low
                </span>
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Due Date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Status" valuePropName="unchecked">
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
