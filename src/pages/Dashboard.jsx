import { Stack } from "@mui/material";
import { Link } from "react-router-dom"
import "../App.css"

export default function Dashboard() {
  return (
    <Stack className="stack" p={2} sx={{ position: "sticky", top: 0, justifyContent: "space-between"}}>
      {/* <h1>Dashboard</h1>
      <p>Coming Soon...</p> */}
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/create">Create Vibe | </Link>
        <Link to="/save">Save Vibe</Link>
      </nav>
    </Stack>
  );
}