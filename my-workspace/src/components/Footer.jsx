function Footer() {
  return (
    <footer style={{ background: "#282c34", color: "white", padding: "10px", textAlign: "center" }}>
      <p>© {new Date().getFullYear()} My React App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
