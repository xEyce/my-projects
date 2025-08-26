import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ background: "#282c34", padding: "15px" }}>
      <nav style={{ display: "flex", gap: "20px", color: "white" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
