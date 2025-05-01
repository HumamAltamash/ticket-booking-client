import { Tabs } from "antd";
import MoviesList from "../../components/MoviesList";
import TheatreTable from "../../components/TheatreTable";

function Partner() {
  const tabItems = [
    { key: "1", label: "Movies", children: <MoviesList /> },
    { key: "2", label: "Theatres", children: <TheatreTable /> },
  ];

  return (
    <div>
      <h1>Partner Page</h1>
      <Tabs items={tabItems} />
    </div>
  );
}

export default Partner;
