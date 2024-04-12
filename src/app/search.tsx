///fe find
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
  const [searchcafeId, setSearchcafeId] = useState("");
  const [searchedcafe, setSearchedcafe] = useState<cafe | null>(null);
  const [searchedcafeimg, setSearchedcafeimg] = useState<cafe | null>(null);
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

  const fetchcafeById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cafe/${searchcafeId}`
      );
      setSearchedcafe(response.data);
    } catch (error) {
      console.error("Error fetching cafe by ID:", error);
      setSearchedcafe(null);
    }
  };

  return (
    <div className="container">
      <h1>Cafe</h1>
      <img className="img" src="https://th.bing.com/th/id/OIP.TLMbgr6ZK5tD1iFRGKA_yQHaE7?w=291&h=193&c=7&r=0&o=5&dpr=3&pid=1.7" ></img>
      <div className="form-container">
        <h2>Search Cafe by ID</h2>
        <input
          type="text"
          value={searchcafeId}
          onChange={(e) => setSearchcafeId(e.target.value)}
          className="input-field"
          placeholder="Enter cafe ID"
        />
        <button onClick={fetchcafeById} className="button">
          Search
        </button>
      </div>
      {/* Display the searched item if found */}
      {searchedcafe && (
        <div>
          <h3>Searched cafe</h3>
          <p>
            ID: {searchedcafe.id}, Name: {searchedcafe.name}, Gia: {searchedcafe.gia}, Soluong: {searchedcafe.soluong}
            
          </p>
        </div>
      )}
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

