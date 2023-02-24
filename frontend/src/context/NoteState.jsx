import { useState, useContext } from "react";
import AlertContext from "./AlertContext";
import NoteContext from "./noteContext";

const NoteState = (props) => {  
  
  const notesIntial = [];
  const [notes, setNotes] = useState(notesIntial);
  const context1 = useContext(AlertContext);
  const {showAlert} = context1; 
  

  const host = "http://localhost:5000";

  // Get All Notes a note
  const getNotes = async () => {
    const url = `${host}/api/note/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "atoken":
          localStorage.getItem('token')
      }
    });
    
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    const url = `${host}/api/note/createnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "atoken":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));    
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call 
    const url = `${host}/api/note/updatenote/${id}`; 
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "atoken":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });  

    const json = await response.json();
    console.log(json)
  
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);

    // Alert message on updating a node
    showAlert("Note updated successfully"); 

  };

  // Delete a note
  const deleteNote = async (id) => {
    const url =   `${host}/api/note/deletenote/${id}`; 
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "atoken":
          localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id }); 
    setNotes(newNotes);  

    // Alert message on deleting a note
    showAlert("Note deleted successfully"); 
    
  };

 

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;



// import noteContext from "./noteContext";
// import About from "../components/About";
// import Home from "../components/Home";

// const NoteState = ()=>{
//   const user = "Sajid";

//     <noteContext.Provider value={user}>
//       <About />
//       <Home />
//     </noteContext.Provider>

// };
// export default NoteState;
