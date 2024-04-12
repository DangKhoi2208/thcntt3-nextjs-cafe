//fe add
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./globals.css";


interface cafe {
  id: number;
  name: string;
  gia: number;
  soluong: number;
  img:string;
}

const Home = () => {
  const [cafe, setcafe] = useState<cafe[]>([]);
  const [newcafeName, setNewcafeName] = useState("");
  const [newcafegia, setNewcafegia] = useState("");
  const [newcafesoluong, setNewcafesoluong] = useState("");
  const [newcafeimg, setNewcafeimg] = useState("");
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

  const handleAddItems = async () => {
    try {
      await axios.post("http://localhost:5000/cafe", {
        name: newcafeName,
        gia: newcafegia,
        soluong: newcafesoluong,
        img: newcafeimg,
       
      });
      fetchcafe();
      setNewcafeName("");
      setNewcafegia("");
      setNewcafesoluong("");
      setNewcafeimg("");
      
    } catch (error) {
      console.error("Error adding cafe:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cafe List</h1>
      <img className="img" src="https://th.bing.com/th?id=OIP.FXtuFm-zS-QwvOtA0Gg_MwHaIR&w=236&h=264&c=8&rs=1&qlt=90&o=6&dpr=3&pid=3.1&rm=2" ></img>
      <div className="form-container">
        <h2> ADD Cafe</h2>
        <input
          type="text"
          value={newcafeName}
          onChange={(e) => setNewcafeName(e.target.value)}
          className="input-field"
          placeholder="Enter new cafe name"
        />
        <input
          type="text"
          value={newcafegia}
          onChange={(e) => setNewcafegia(e.target.value)}
          className="input-field"
          placeholder="Enter new cafe gia"
        />
        <input
          type="text"
          value={newcafesoluong}
          onChange={(e) => setNewcafesoluong(e.target.value)}
          className="input-field"
          placeholder="Enter new cafe soluong"
        />
        <button onClick={handleAddItems} className="button">
          Add
        </button>
      </div>
      <ul>
        {cafe.map((item) => (
          <li key={item.id}>
            ID: {item.id}, Name: {item.name}, Gia: {item.gia}, Soluong: {item.soluong}
            <img src={item.img} alt={item.name} className="cafe-image" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

