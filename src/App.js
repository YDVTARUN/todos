import React, { useState } from "react";
import "./index.css"; // Ensure Tailwind CSS is imported here

function App() {
  const [state, setState] = useState("");
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  function addItem() {
    setItems((prevItems) => [...prevItems, state]);
  }

  function updateItem(index, newValue) {
    const updatedItems = items.map((item, i) => (i === index ? newValue : item));
    setItems(updatedItems);
    setEditingIndex(null);
  }

  function SubmitHandler(event) {
    event.preventDefault(); // Prevent form submission
    if (state !== "") {
      if (editingIndex !== null) {
        updateItem(editingIndex, state);
        setEditingIndex(null);
      } else {
        addItem();
      }
      setState(""); // Reset the input field after adding or updating the item
    }
  }

  function deleteTheTodo(index) {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    if (editingIndex === index) {
      setEditingIndex(null); // Reset editing index if the item being edited is deleted
    }
  }

  function EditMessage(index) {
    setState(items[index]);
    setEditingIndex(index);
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 p-4 bg-black z-10">
        <form onSubmit={SubmitHandler} className="flex gap-6">
          <input
            type="text"
            placeholder="Enter your text here"
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="p-5 border border-gray-400 bg-gray-800 text-white rounded-2xl w-80"
          />
          <button
            type="submit"
            className="p-4 flex items-center bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            {editingIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>
      </header>

      <main className="pt-24 p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-500 pb-2">
          TODO
        </h1>

        <div className="space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto w-80">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-700 p-4 rounded-lg min-w-full"
            >
              <div className="flex-1 text-lg overflow-x-auto">{item}</div>
              <button
                onClick={() => deleteTheTodo(index)}
                className="ml-4 p-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => EditMessage(index)}
                className="ml-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
