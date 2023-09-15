import React, { useState, useEffect } from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys }) {
  const [toyList, setToyList] = useState(toys);

  useEffect(() => { 
    setToyList(toys);
  }
  , [toys]);


  const handleDelete = (toyId) => {
    // Remove the toy from the toyList state
    const updatedToyList = toyList.filter((toy) => toy.id !== toyId);
    setToyList(updatedToyList);
  };

  return (
    <div id="toy-collection">
      {toyList.map((toy) => (
        <ToyCard key={toy.id} toy={toy} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default ToyContainer;
