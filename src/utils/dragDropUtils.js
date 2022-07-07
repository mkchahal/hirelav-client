import axios from "axios";
import { APPLICATIONS_URL } from "./APIUtils";

const onDragEnd = (result, columns, setColumns) => {
  const { source, destination } = result;
  if (!destination) return;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    let token = sessionStorage.getItem('authToken');
    axios.put(`${APPLICATIONS_URL}/${Number(removed.id)}`,
      {
        status: destColumn.name
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(err => console.log(err.response.data))
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

export { onDragEnd }