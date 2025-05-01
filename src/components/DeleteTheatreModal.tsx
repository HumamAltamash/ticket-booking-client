import { message, Modal } from "antd";
import { deleteTheatre } from "../api/theatre";

function DeleteTheatreModal(props: any) {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedTheatre,
    setSelectedTheatre,
    getData,
  } = props;

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
  };

  const handleDelete = async () => {
    const response = await deleteTheatre(selectedTheatre._id);
    if (!response || !response.success) {
      message.error(response?.message || "Failed to delete theatre.");
      return;
    }
    setIsModalOpen(false);
    setSelectedTheatre(null);
    getData();
    message.success(response.message);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleDelete}
      okText="Delete"
      okButtonProps={{ danger: true }}
      title="Delete Theatre"
    >
      Are you sure you want to delete this theatre?
    </Modal>
  );
}

export default DeleteTheatreModal;
