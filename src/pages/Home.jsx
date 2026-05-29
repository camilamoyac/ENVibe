
import { Link } from "react-router-dom";
import "../App.css"

export default function Home() {
  return (
    <section>
      <nav className="home-nav">
        <img src="#" alt="Logo" />
        <Link className="links">
          <p className="login">Login</p>
        </Link>
      </nav>
          <div>
            <h1 className="home-h1">Welcome to ENVibe</h1>
            <p className="home-p">This website is created to give you the music that you're feeling. Wether you're reading, cooking, exercising and you want music to fit your mood we've got you. <br></br>Now what are you waiting for, start your playlist today.</p>
            <button className="home-btn">Create Vibe</button>
          </div>
    </section>
  );
}