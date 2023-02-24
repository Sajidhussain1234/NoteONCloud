import React, { useContext, useState } from "react";
import AlertContext from "../context/AlertContext";
import noteContex from "../context/noteContext";

const AddNote = () => {

  const context = useContext(noteContex);
  const context1 = useContext(AlertContext)
  const {  addNote } = context;
  const { showAlert } = context1;
  
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();  
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""})
    
    showAlert("Note added Successfully ");   // Displaying alert message on note adding

    // console.log(context1); 
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container"> 
    <h3 className="mx-2"> Add New Note: </h3>
      <form className="container shadow-sm p-3 mb-5 bg-body rounded">
        <div className="mb-3">
          <label htmlFor="title" className="form-label" minlenght={3}>
            Enter Note Title:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            minlenght={5}
          />
          <label htmlFor="description" className="form-label">
            Note Description:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.description}
          />
          <label htmlFor="tag" className="form-label">
            Enter Note Tag:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.tag}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your note with anyone else.
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<3 || note.description.length<5 || note.tag.length<1}>
          Save Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
