import { useState, useEffect } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import axios from "axios";

const FilterBlock = (filter) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://klika-backapp.onrender.com/filters`
      );
      setData(response.data);
    }
    fetchData();
  }, []);

  return (
    <Menu vertical>
      <Menu.Item>
        <Dropdown
          clearable
          placeholder="Исполнитель"
          fluid
          selection
          options={data.singers}
          onChange={(event, data) => {
            filter.set({ ...filter.get, singer: data.value });
          }}
        />
      </Menu.Item>
      <Menu.Item>
        <Dropdown
          clearable
          placeholder="Жанр"
          fluid
          selection
          options={data.genres}
          onChange={(event, data) => {
            filter.set({ ...filter.get, genre: data.value });
          }}
        />
      </Menu.Item>
      <Menu.Item>
        <Dropdown
          clearable
          placeholder="Год"
          fluid
          selection
          options={data.year}
          onChange={(event, data) => {
            filter.set({ ...filter.get, year: data.value });
          }}
        />
      </Menu.Item>
    </Menu>
  );
};

export default FilterBlock;
