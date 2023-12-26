import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import {
  actionToDo,
  statusToDo,
} from "../../../../interface/enum/toDo/toDo.interface";
import { addToDo, updateToDo } from "../../../../service/todo.service";
// import addToDo from "../../../../service/todo.service";

interface ModalActionProps {
  data?: any;
  action?: actionToDo;
  modalOpen: boolean;
  setModalOpen: any;
  fetchData: any;
}

const ModalAction: React.FC<ModalActionProps> = ({
  data,
  action,
  modalOpen,
  setModalOpen,
  fetchData,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [status, setStatus] = useState([
    { value: "TODO", label: "To do" },
    { value: "INPROGRESS", label: "In progress" },
    { value: "DONE", label: "Done" },
  ]);
  const [modalText, setModalText] = useState("Content of the modal");

  useEffect(() => {
    setOpen(modalOpen);
    console.log("🚀 ~ file: modalAction.tsx:40 ~ useEffect ~ data:", data);
    if (action === actionToDo.UPDATE) {
      form.setFieldsValue({
        title: data?.title,
        status: data?.status,
        desc: data?.description,
      });
    } else {
      form.resetFields();
    }
  }, [action, modalOpen, data, form]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setModalOpen(false);
  };

  const onFinish = async (values: any) => {
    console.log("🚀 ~ file: modalAction.tsx:48 ~ onFinish ~ values:", values);
    setConfirmLoading(true);

    if (action === actionToDo.CREATE) {
      const data = {
        title: values.title,
        description: values.desc,
        status: values.status,
        updateDate: new Date(),
        createDate: new Date(),
      };
      const res = await addToDo(data);
      console.log("🚀 ~ file: modalAction.tsx:60 ~ onFinish ~ res:", res);

      if (res?.status === 201) {
        alert("Successfully");
      } else {
        alert("Failed ");
      }
      setConfirmLoading(false);
    } else if (action === actionToDo.UPDATE) {
      const body = {
        title: values.title,
        description: values.desc,
        status: values.status,
        updateDate: new Date(),
      };
      const res = await updateToDo(body, data._id);
    }
    setConfirmLoading(false);
    form.resetFields();
    fetchData();
    handleCancel();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title={action === actionToDo.CREATE ? "Create Task !" : "Update Task"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input your status!" }]}
          >
            <Select
              //   defaultValue={statusToDo.TODO}
              style={{ width: 120 }}
              allowClear
              options={status}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAction;
