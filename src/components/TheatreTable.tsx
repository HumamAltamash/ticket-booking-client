import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Theatre } from "../types/theatre";
import { getAllTheatres } from "../api/theatre";
import TheatreForm from "./TheatreForm";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { useAuth } from "../hooks/useAuth";

export interface TheatreTableData {
  key: string;
  name: string;
  location: string;
  owner: string;
  phone: string;
  email: string;
  isActive: boolean;
}

function TheatreTable() {
  const [theatres, setTheatres] = useState([] as TheatreTableData[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedTheatre, setSelectedTheatre] =
    useState<TheatreTableData | null>(null);

  const { role } = useAuth();
  console.log(role);

  const getData = async () => {
    const response = await getAllTheatres();
    const allTheatres = response.data;
    setTheatres(
      allTheatres.map((theatre: Theatre) => ({
        key: theatre._id,
        ...theatre,
      }))
    );
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Location", dataIndex: "location" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      render: (_text: string, data: any) => (
        <>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setFormType("edit");
              setSelectedTheatre(data);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            danger
            onClick={() => {
              setIsDeleteModalOpen(true);
              setSelectedTheatre(data);
            }}
          >
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
          setSelectedTheatre(null);
        }}
      >
        Add Theatre
      </Button>
      <Table dataSource={theatres} columns={columns} />

      {isModalOpen && (
        <TheatreForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          formType={formType}
          getData={getData}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
    </>
  );
}

export default TheatreTable;
