import { useParams } from "react-router-dom";
import API from "../services/api";

function ApplyHostel(){

 const { id } = useParams();

 const applyHostel = async () => {

   try {

     const token = localStorage.getItem("token");

     await API.post("/applications",
      { hostel:id },
      { headers:{ Authorization:`Bearer ${token}` }}
     );

     alert("Application submitted successfully");

   } catch {

     alert("Application failed");

   }

 };

 return(

  <div>

   <h2>Hostel Application</h2>

   <button onClick={applyHostel}>
     Apply for this Hostel
   </button>

  </div>

 );

}

export default ApplyHostel;