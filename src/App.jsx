import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [reports, setReports] = useState([]);
  const [name, setName] = useState("");
  const [disc, setDisc] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // get all reports when page loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/userget")
      .then((res) => setReports(res.data))
      .catch((err) => console.log("error while getting", err));
  }, []);

  // add new report
  const handleSubmit = () => {
    if (!name || !disc || !date || !hours) {
      alert("please fill all fields");
      return;
    }
    axios
      .post("http://localhost:5000/userpost", {
        name: name,
        disc: disc,
        date: date,
        hours: hours,
      })
      .then((res) => {
        setReports([...reports, res.data]);
        setName("");
        setDisc("");
        setDate("");
        setHours("");
      })
      .catch((err) => console.log("error while adding", err));
  };

  // filter by date
  const handleFilter = () => {
    if (!filterDate) {
      axios
        .get("http://localhost:5000/userget")
        .then((res) => setReports(res.data));
      return;
    }
    axios
      .get(`http://localhost:5000/userget/filter?date=${filterDate}`)
      .then((res) => setReports(res.data))
      .catch((err) => console.log("error while filtering", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Daily Report</h2>

      {/* form to add report */}
      <div>
        <input
          type="text"
          placeholder="name of employee"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="description of work"
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="work hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* filter by date */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
        <button
          onClick={() => {
            setFilterDate("");
            axios
              .get("http://localhost:5000/userget")
              .then((res) => setReports(res.data));
          }}
        >
          Clear
        </button>
      </div>

      {/* table to show reports */}
      <table border={2} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, i) => (
            <tr key={i}>
              <td>{report.name}</td>
              <td>{report.disc}</td>
              <td>{report.date}</td>
              <td>{report.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
