//fe delete 
// "use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface cafe {
  id: number;
  name: string;
  gia: number;
  soluong: number;
 
}

const Home = () => {
  const [cafe, setcafe] = useState<cafe[]>([]);
  const [deletecafeId, setDeletecafeId] = useState("");

  useEffect(() => {
    fetchcafe();
  }, []);

  const fetchcafe = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cafe");
      setcafe(response.data);
    } catch (error) {
      console.error("Error fetching cafe:", error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`http://localhost:5000/cafe/${deletecafeId}`);
      fetchcafe();
      setDeletecafeId("");
    } catch (error) {
      console.error("Error deleting cafe:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cafe</h1>
      <img className="img" src="https://th.bing.com/th/id/OIP.RtJ7BGy7tnTXzZ-3qRmjiwHaEo?w=311&h=193&c=7&r=0&o=5&dpr=3&pid=1.7" ></img>
      <div className="form-container">
        <h2>Delete</h2>
        <input
          type="text"
          value={deletecafeId}
          onChange={(e) => setDeletecafeId(e.target.value)}
          className="input-field"
          placeholder="Enter cafe ID to delete"
        />
        <button onClick={handleDeleteItem} className="button">
          Delete
        </button>
      </div>
      <ul>
        {cafe.map((item) => (
          <li key={item.id}>
            ID: {item.id}, Name: {item.name}, Gia: {item.gia}, SoLuong: {item.soluong}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
