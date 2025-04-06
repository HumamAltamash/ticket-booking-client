import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getMovies } from "../../api/movies";
import { Movie } from "../../types/movies";
import MovieForm from "./MovieForm";

export interface MovieTableData {
  key: string;
  poster: string;
  title: string;
  description: string;
  rating: number;
  genre: string;
  duration: number; // in minutes
  releaseDate: string; // ISO date string format
  language: string;
}

function MoviesList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([] as MovieTableData[]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text: string) => (
        <img src={text} alt="poster" height="115" width="75" />
      ),
    },
    { title: "Movie Name", dataIndex: "title" },
    { title: "Description", dataIndex: "description" },
    { title: "Rating", dataIndex: "rating" },
    {
      title: "Genre",
      dataIndex: "genre",
      render: (genre: string[] | string) =>
        Array.isArray(genre) ? genre.join(", ") : genre,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text: number) => `${text} min`,
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text: string, data: any) => {
        return moment(data.releaseDate).format("YYYY-MM-DD");
      },
    },
    { title: "Language", dataIndex: "language" },
    {
      title: "Action",
      render: (text: string, data: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              danger
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  async function getData() {
    const response = await getMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map((movie: Movie) => ({
        ...movie,
        key: movie._id,
      }))
    );
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
    </>
  );
}

export default MoviesList;
