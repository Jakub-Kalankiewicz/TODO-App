"use client";

import Container from "../components/Container";
import TodoTable from "./components/TodoTable";

const HomePage = () => {
  return (
    <Container title="TODO's" fullWidth>
      <TodoTable />
    </Container>
  );
};

export default HomePage;
