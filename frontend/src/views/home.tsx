import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <Button>
      <Link to="/logout">Wyloguj</Link>
    </Button>
  </div>
);

export default Home;
