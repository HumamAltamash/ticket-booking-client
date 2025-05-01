import { message, Modal } from "antd";
import { deleteMovie } from "../api/movies";
import { Movie } from "../types/movies";

interface DeleteMovieModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  getData: () => void;
}

function DeleteMovieModal(props: DeleteMovieModalProps) {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedMovie,
    setSelectedMovie,
    getData,
  } = props;

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleDelete = async () => {
    if (!selectedMovie) {
      message.error("No movie selected for deletion.");
      return;
    }
    const response = await deleteMovie(selectedMovie._id);
    console.log(response);
    if (!response || !response.success) {
      message.error(response);
      return;
    }
    setIsModalOpen(false);
    setSelectedMovie(null);
    getData();
    message.success(response.message);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleDelete}>
      Are you sure you want to delete this movie?
    </Modal>
  );
}

export default DeleteMovieModal;
