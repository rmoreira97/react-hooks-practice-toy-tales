import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    // Fetch the initial toy data when the component mounts
    fetchToys();
  }, []);

  const fetchToys = async () => {
    try {
      const response = await fetch("http://localhost:3001/toys");
      if (!response.ok) {
        throw new Error("Failed to fetch toys");
      }
      const toyData = await response.json();
      setToys(toyData);
    } catch (error) {
      console.error("Error fetching toys:", error);
    }
  };

  const handleToySubmit = (newToyData) => {
    // Add the newly created toy to the list of toys
    setToys([...toys, newToyData]);
  };

  const handleClick = () => {
    setShowForm((showForm) => !showForm);
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm onToySubmit={handleToySubmit} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
