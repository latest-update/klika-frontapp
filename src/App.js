import { useState } from "react";
import { Header, Container, Grid } from "semantic-ui-react";
import FilterBlock from "./Components/FilterBlock";
import SongTable from "./Components/SongTable";

const App = () => {
  const [filters, setFilters] = useState({
    singer: "",
    genre: "",
    year: "",
    page: 1,
    amount: 5,
    order: "asc",
    column: "name"
  });

  return (
    <Container style={{ margin: 50 }}>
      <Header as="h1">Music List</Header>
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={13}>
            <SongTable filters={filters} setFilters={setFilters}></SongTable>
          </Grid.Column>
          <Grid.Column width={3}>
            <FilterBlock get={filters} set={setFilters}></FilterBlock>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default App;
