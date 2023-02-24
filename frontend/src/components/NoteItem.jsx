import React from "react";
import { useContext } from "react";
import noteContex from "../context/noteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;

  const context = useContext(noteContex); 
  const {deleteNote} = context;


  return (
    <>
      <div className="col-md-4">
        <div className="card  my-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{note.title}</h5>
              
              <div>
                <i className="fa-solid fa-pen-to-square mx-1" role="button" onClick={()=>{updateNote(note)}}></i>
                <i className="fa-sharp fa-solid fa-trash mx-1" role="button" onClick={()=>{deleteNote(note._id)}}></i>
              </div>
            </div>
            <p className="card-text">{note.description} </p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
