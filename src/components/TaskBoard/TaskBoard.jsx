import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import { getAllApplications } from "../../utils/APIUtils";
import { onDragEnd } from "../../utils/dragDropUtils";

function App() {
  const [applications, setApplications] = useState([]);
  const [columns, setColumns] = useState({});

  useEffect(() => {
    let token = sessionStorage.getItem('authToken');
    getAllApplications(token, setApplications);
  }, [])


  useEffect(() => {
    applications.forEach(app => app.id = String(app.id));
    setColumns({
      [uuidv4()]: {
        name: "Shortlisted",
        items: applications.filter(app => app.status === 'Shortlisted')
      },
      [uuidv4()]: {
        name: "Interview",
        items: applications.filter(app => app.status === 'Interview')
      },
      [uuidv4()]: {
        name: "Coding Challenge",
        items: applications.filter(app => app.status === 'Coding Challenge')
      },
      [uuidv4()]: {
        name: "Offer",
        items: applications.filter(app => app.status === 'Offer')
      },
      [uuidv4()]: {
        name: "Hired",
        items: applications.filter(app => app.status === 'Hired')
      }
    })
  }, [applications])

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightpink"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "red"
                                        : "black",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.firstName} {item.lastName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
