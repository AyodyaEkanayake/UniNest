import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Hostels() {

  const [hostels,setHostels] = useState([]);

  useEffect(() => {

    const fetchHostels = async () => {

      const res = await API.get("/hostels");

      setHostels(res.data);

    };

    fetchHostels();

  }, []);

  return (

    <div>

      <h2>Available Hostels</h2>

      {hostels.map((h) => (

        <div key={h._id} style={{
          border:"1px solid gray",
          padding:"10px",
          margin:"10px"
        }}>

          <h3>{h.name}</h3>
          <p>{h.location}</p>

          <Link to={`/apply/${h._id}`}>
            <button>Apply</button>
          </Link>

        </div>

      ))}

    </div>

  );

}

export default Hostels;