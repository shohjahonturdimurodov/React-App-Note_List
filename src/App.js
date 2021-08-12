import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Alert display
      showAlert(true, "danger", 'Please fill in the form')
    } else if (name && isEditing) {
      // edit
    } else {
      showAlert(true, "success", 'note is added successfully')
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({show, type, msg})
  }
  const clearList = () => {
    showAlert(true, "danger", "notes are removed")
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, "danger", "note is removed")
    setList(list.filter((item) => item.id !== id))
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h3>List Notes</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Place for a note"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Change" : "Add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem}/>
          <button onClick={clearList} className="clear-btn">Clear</button>
        </div>
      )}
    </section>
  );
}

export default App;
