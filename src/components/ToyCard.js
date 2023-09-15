import React, { useState } from "react";

function ToyCard({ toy, onDelete }) {
  const [likes, setLikes] = useState(toy.likes);

  const handleLike = () => {
    // Send a PATCH request to update the likes on the server
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes + 1 }), // Increment the likes
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the likes in the component's state when the request is successful
        setLikes(data.likes);
        console.log("Like button clicked");
      })
      .catch((error) => {
        console.error("Error updating likes:", error);
        // You may want to handle errors here
      });
  };

  const handleDeleteClick = () => {
    // Send a DELETE request to remove the toy from the server
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Call the onDelete callback to remove the toy from the DOM
        onDelete(toy.id);
      })
      .catch((error) => {
        console.error("Error deleting toy:", error);
        // You may want to handle errors here
      });
  };

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like ❤️
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
