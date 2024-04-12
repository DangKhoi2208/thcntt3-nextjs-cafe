//fe update
// "use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface cafe {
  id: number;
  name: string;
  gia: number;
  soluong: number;
  img:string;
}

const Home = () => {
  const [cafe, setcafe] = useState<cafe[]>([]);
  const [updatecafeName, setUpdatecafeName] = useState("");
  const [updatecafegia, setUpdatecafegia] = useState("");
  const [updatecafesoluong, setUpdatecafesoluong] = useState("");
  const [updatecafeId, setUpdatecafeId] = useState("");
  const [updatecafeimg, setUpdatecafeimg] = useState("");

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

  const handleUpdatecafe = async () => {
    try {
      await axios.put(`http://localhost:5000/cafe/${updatecafeId}`, {
        name: updatecafeName,
        gia: updatecafegia,
        soluong: updatecafesoluong,
        img: updatecafeimg,
      });
      fetchcafe();
      setUpdatecafeName("");
      setUpdatecafeId("");
      setUpdatecafegia("");
      setUpdatecafesoluong("");
      setUpdatecafeimg("");
    } catch (error) {
      console.error("Error updating cafe:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cafe</h1>
      <img className="img" src="https://th.bing.com/th/id/OIP.I5NiyDGcmqix0OXj94affgHaEo?w=291&h=182&c=7&r=0&o=5&dpr=3&pid=1.7" ></img>

      <div className="form-container">
        <h2>Update Cafe</h2>
        <input
          type="text"
          value={updatecafeName}
          onChange={(e) => setUpdatecafeName(e.target.value)}
          className="input-field"
          placeholder="Enter updated cafe name"
        />
        <input
          type="text"
          value={updatecafegia}
          onChange={(e) => setUpdatecafegia(e.target.value)}
          className="input-field"
          placeholder="Enter updated gia"
        />
        <input
          type="text"
          value={updatecafesoluong}
          onChange={(e) => setUpdatecafesoluong(e.target.value)}
          className="input-field"
          placeholder="Enter updated soluong"
        />
        <input
          type="text"
          value={updatecafeId}
          onChange={(e) => setUpdatecafeId(e.target.value)}
          className="input-field"
          placeholder="Enter item ID to update"
        />
        <button onClick={handleUpdatecafe} className="button">
          Update
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
