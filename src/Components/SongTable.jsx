import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Pagination, Button, Icon } from "semantic-ui-react";

const SongTable = (props) => {
  const [musics, setMusics] = useState([]);
  const [pages, setPages] = useState(1);
  const [sortIcon, setSortIcon] = useState(<Icon name="angle up" />);

  useEffect(() => {
    async function fetchMusics() {
      const response = await axios.get(
        `https://klika-backapp.onrender.com/musics?singer=${props.filters.singer}&genre=${props.filters.genre}&year=${props.filters.year}&column=${props.filters.column}&order=${props.filters.order}&page=${props.filters.page}&amount=${props.filters.amount}`
      );
      setMusics(response.data.musics);
      setPages(Math.ceil(response.data.amount / props.filters.amount));
    }
    fetchMusics();
  }, [props.filters]);

  const setAmount = (event, data) => {
    props.setFilters({ ...props.filters, amount: data.children, page: 1 });
  };

  const handleSort = (clickedColumn) => () => {
    if (props.filters.column !== clickedColumn) {
      props.setFilters({
        ...props.filters,
        column: clickedColumn,
        order: "asc"
      });
      setSortIcon(<Icon name="angle up" />);
      return;
    }

    if (props.filters.order === "asc") {
      props.setFilters({
        ...props.filters,
        column: clickedColumn,
        order: "desc"
      });
      setSortIcon(<Icon name="angle down" />);
    } else {
      props.setFilters({
        ...props.filters,
        column: clickedColumn,
        order: "asc"
      });
      setSortIcon(<Icon name="angle up" />);
    }
  };

  const table = (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            onClick={handleSort("singer")}
            style={{ cursor: "pointer" }}
          >
            Исполнитель {props.filters.column === "singer" ? sortIcon : ""}
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={handleSort("name")}
            style={{ cursor: "pointer" }}
          >
            Песня {props.filters.column === "name" ? sortIcon : ""}
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={handleSort("genre")}
            style={{ cursor: "pointer" }}
          >
            Жанр {props.filters.column === "genre" ? sortIcon : ""}
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={handleSort("year")}
            style={{ cursor: "pointer" }}
          >
            Год {props.filters.column === "year" ? sortIcon : ""}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {musics.map((music) => (
          <Table.Row>
            <Table.Cell>{music.singer}</Table.Cell>
            <Table.Cell>{music.name}</Table.Cell>
            <Table.Cell>{music.genre}</Table.Cell>
            <Table.Cell>{music.year}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="4">
            <Button.Group basic size="small">
              <Button onClick={setAmount}>5</Button>
              <Button onClick={setAmount}>10</Button>
              <Button onClick={setAmount}>25</Button>
              <Button onClick={setAmount}>50</Button>
            </Button.Group>
            <Pagination
              floated="right"
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={pages}
              onPageChange={(event, data) => {
                props.setFilters({ ...props.filters, page: data.activePage });
              }}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );

  return table;
};

export default SongTable;
