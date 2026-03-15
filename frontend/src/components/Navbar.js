import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    navigate("/");

  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      background: "#2c3e50",
      color: "white"
    }}>

      <h2>UniNest</h2>

      <div>

        <Link to="/hostels" style={{marginRight:"15px", color:"white"}}>Hostels</Link>

        <Link to="/allocation" style={{marginRight:"15px", color:"white"}}>My Room</Link>

        <button onClick={logout}>Logout</button>

      </div>

    </div>

  );

}

export default Navbar;