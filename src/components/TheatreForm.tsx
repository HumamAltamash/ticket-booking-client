import { Form, Input, Modal, Switch } from "antd";
import { useEffect } from "react";
import { addTheatre, updateTheatre } from "../api/theatre";
import { useAuth } from "../hooks/useAuth";
import { TheatreFormValues } from "../types/theatre";

function TheatreForm(props: any) {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedTheatre,
    setSelectedTheatre,
    formType,
    getData,
  } = props;

  const [form] = Form.useForm();
  const user = useAuth().user;

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
    form.resetFields();
  };

  const handleFinish = async (values: TheatreFormValues) => {
    console.log("id", user);
    const payload = {
      ...values,
      owner: user,
    };
    console.log("payload", payload);

    if (formType === "add") {
      await addTheatre(payload);
    } else {
      await updateTheatre({ ...payload, id: selectedTheatre._id });
    }

    handleCancel();
    getData();
  };

  useEffect(() => {
    if (formType === "edit" && selectedTheatre) {
      form.setFieldsValue({
        ...selectedTheatre,
      });
    } else {
      form.resetFields();
    }
  }, [formType, selectedTheatre, form]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      okText={formType === "add" ? "Add" : "Update"}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Theatre Name"
          rules={[{ required: true, message: "Please enter theatre name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, type: "email", message: "Enter valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="isActive" label="Is Active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TheatreForm;
