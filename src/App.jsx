import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";



const App = () => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState();
  const [disc, setDisc] = useState();
  const [date, setDate] = useState();
  const [hource, setHource] = useState();

   


  useEffect(() => {
    axios.get(`http://localhost:5000/userget`);
    setUser.data;
  }, []);

  return (
    <div>
      <input type="text" placeholder="name of employe" onChange={(e)=>setName=e.target.value} />
      <input type="text" placeholder="discption of the work" onChange={(e)=>setDisc=e.target.value} />
      <input type="date" onChange={(e)=>setDate=e.target.value}/>
      <input type="text" placeholder="work hour" onChange={(e)=>setHource=e.target.value} />
      <button>Submit</button>

      <table border={2}>
         <thead>
          <th>Name</th>
          <th>disk</th>
          <th>Date</th>
          <th>hours</th>
         </thead>
         <tbody></tbody>
      </table>
    </div>
  );
};

export default App;
