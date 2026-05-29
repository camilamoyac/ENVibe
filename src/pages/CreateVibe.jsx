import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css"

import { fetchFromAPI } from "../utilities/fetchFromAPI";
import { Videos } from "./Videos"

const CreateVibe = () => {

  const [selectedCategory, setSelectedCategory] = useState("New")
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

  return (
    <section>
      <nav className="home-nav">
        <img src="#" alt="Logo" />
        <Link className="links">
          <p className="login">Login</p>
        </Link>
      </nav>
          <div>
            <Videos videos={videos}></Videos>
          </div>
    </section>
  );
}

export default CreateVibe