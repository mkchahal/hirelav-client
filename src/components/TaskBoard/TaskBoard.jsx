import React, { useEffect, useState } from "react";
import './TaskBoard.scss';
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
        name: "Coding",
        items: applications.filter(app => app.status === 'Coding')
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
    <div className="taskboard__wrapper">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="taskboard__column" key={columnId}>
              <h2>{column.name}</h2>
              <div className="taskboard__boards">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="taskboard__board"
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#4527A0"
                            : "#B39DDB"
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
                                    className="taskboard__task"
                                    style={{
                                      userSelect: "none",
                                      backgroundColor: snapshot.isDragging
                                        ? "#929292"
                                        : "black",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <p>👋 {item.firstName} {item.lastName}</p>  
                                    <p>💼 {item.job_id}</p>                               
                                    <p>☎️ {item.phone}</p>                                    
                                    {console.log(item)}
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
