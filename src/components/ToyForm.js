import React,{useState} from "react";

function ToyForm({ onToySubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    likes: 0, // You can initialize likes as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to create the new toy
    try {
      const response = await fetch("http://localhost:3001/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new toy");
      }

      const newToyData = await response.json();

      // Pass the newly created toy data back to the parent component
      onToySubmit(newToyData);

      // Reset the form
      setFormData({
        name: "",
        image: "",
        likes: 0,
      });
    } catch (error) {
      console.error("Error creating a new toy:", error);
    }
  };
   
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;