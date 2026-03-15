import { useEffect, useState } from "react";
import API from "../services/api";

function Allocation(){

 const [allocation,setAllocation] = useState(null);

 useEffect(()=>{

   const token = localStorage.getItem("token");

   API.get("/allocations/my",{
     headers:{ Authorization:`Bearer ${token}` }
   })
   .then(res=>setAllocation(res.data));

 },[]);

 return(

  <div>

   <h2>My Room Allocation</h2>

   {allocation ? (

    <div>

     <p>Room: {allocation.room.roomNumber}</p>
     <p>Hostel: {allocation.room.hostel.name}</p>

    </div>

   ):("No allocation yet")}

  </div>

 );

}

export default Allocation;