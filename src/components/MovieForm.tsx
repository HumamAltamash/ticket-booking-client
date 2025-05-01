import { Form, Input, InputNumber, Modal, Select, DatePicker } from "antd";
import { useEffect } from "react";
import moment from "moment";
import { addMovie, updateMovie } from "../api/movies";

const { TextArea } = Input;
const { Option } = Select;

function MovieForm(props: any) {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedMovie,
    setSelectedMovie,
    formType,
    getData,
  } = props;

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    form.resetFields();
  };

  const handleFinish = async (values: any) => {
    const payload = {
      ...values,
      releaseDate: values.releaseDate.format("YYYY-MM-DD"),
    };
    console.log("payload", payload);
    console.log("selectedMovie", selectedMovie);

    if (formType === "add") {
      await addMovie(payload);
    } else {
      // console.log("selectedMovie", selectedMovie._id);
      await updateMovie({ ...payload, _id: selectedMovie._id });
    }

    handleCancel();
    getData();
  };

  useEffect(() => {
    if (formType === "edit" && selectedMovie) {
      form.setFieldsValue({
        ...selectedMovie,
        releaseDate: moment(selectedMovie.releaseDate),
      });
    } else {
      form.resetFields();
    }
  }, [formType, selectedMovie, form]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      title={formType === "add" ? "Add Movie" : "Edit Movie"}
      okText={formType === "add" ? "Add" : "Update"}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="poster"
          label="Poster URL"
          rules={[{ required: true, message: "Please enter poster URL" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="Movie Title"
          rules={[{ required: true, message: "Please enter movie title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please enter rating" }]}
        >
          <InputNumber min={0} max={10} step={0.1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="genre"
          label="Genres"
          rules={[
            { required: true, message: "Please select at least one genre" },
          ]}
        >
          <Select mode="multiple" allowClear placeholder="Select genres">
            <Option value="Action">Action</Option>
            <Option value="Comedy">Comedy</Option>
            <Option value="Drama">Drama</Option>
            <Option value="Thriller">Thriller</Option>
            <Option value="Romance">Romance</Option>
            <Option value="Horror">Horror</Option>
            <Option value="Sci-Fi">Sci-Fi</Option>
            <Option value="Fantasy">Fantasy</Option>
            <Option value="Animation">Animation</Option>
            <Option value="Documentary">Documentary</Option>
            <Option value="Adventure">Adventure</Option>
            <Option value="Musical">Musical</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration (minutes)"
          rules={[{ required: true, message: "Please enter duration" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="releaseDate"
          label="Release Date"
          rules={[{ required: true, message: "Please select release date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="language"
          label="Language"
          rules={[{ required: true, message: "Please enter language" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MovieForm;
