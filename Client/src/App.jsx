import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Routes, Route, Link} from 'react-router-dom';

//npm run dev
function Property(){
  const [Name, setName] = useState("");
  const [location, setlocation] = useState("");
  const [Rent, setRent] = useState("");
  const [Levy, setLevy] = useState("");
  const [Bond, setBond] = useState("");
  const [Tenant, setTenant] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [Response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(null);
    setResponse(null);

    try{
      const res = await fetch("http://localhost:4000/api/Prop", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          PropertyName: Name,
          location,
          Rent: Number(Rent),
          Levy: Number(Levy),
          Bond: Number(Bond),
          Tenant
        })
      });
      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || 'Something went wrong');
      }

      setResponse(data);
    } catch(error) {
      console.error("Error fetching data:", error);
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }

  return(
    <div>
      <Nav/>
      <form onSubmit={handleSubmit}>
        <h2>Property Name:</h2>
        <input 
          type='text'
          placeholder='Property Name'
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h2>Location:</h2>
        <input 
          type='text'
          placeholder='Location'
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          required
        />
        <h2>Rent:</h2>
        <input 
          type='number'
          placeholder='Rent'
          value={Rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />
        <h2>Levy:</h2>
        <input 
          type='number'
          placeholder='Levy'
          value={Levy}
          onChange={(e) => setLevy(e.target.value)}
          required
        />
        <h2>Bond:</h2>
        <input 
          type='number'
          placeholder='Bond'
          value={Bond}
          onChange={(e) => setBond(e.target.value)}
          required
        />
        <h2>Tenant:</h2>
        <select 
          value={Tenant.toString()}
          onChange={(e) => setTenant(e.target.value === "true")}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button
          type='submit'
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
      {Response && (
        <div>
          <h3>Property Created:</h3>
          <p>{JSON.stringify(Response, null, 2)}</p>
        </div>
      )}
    </div>
  );
}

function Monthly(){
  const [Name, setName] = useState("");
  const [location, setlocation] = useState("");
  const [Rent, setRent] = useState("");
  const [Levy, setLevy] = useState("");
  const [Bond, setBond] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [Response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(null);
    setResponse(null);

    try{
      const res = await fetch("http://localhost:4000/api/Amount", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          PropertyName: Name,
          location,
          Rent: Number(Rent),
          Levy: Number(Levy),
          Bond: Number(Bond),
        })
      });
      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "Something went wrong");
      }
      setResponse(data);
    } catch(error) {
      console.error("Error fetching data:", error);
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }

  return(
    <div>
      <Nav/>
      <form onSubmit={handleSubmit}>
        <h2>Property Name:</h2>
        <input 
          type='text'
          placeholder='Property Name'
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h2>Location:</h2>
        <input 
          type='text'
          placeholder='Location'
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          required
        />
        <h2>Rent:</h2>
        <input 
          type='number'
          placeholder='Rent'
          value={Rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />
        <h2>Levy:</h2>
        <input 
          type='number'
          placeholder='Levy'
          value={Levy}
          onChange={(e) => setLevy(e.target.value)}
          required
        />
        <h2>Bond:</h2>
        <input 
          type='number'
          placeholder='Bond'
          value={Bond}
          onChange={(e) => setBond(e.target.value)}
          required
        />
        <button
          type='submit'
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      {Response && (
        <div>
          <h3>Monthly Entries:</h3>
          <p>{JSON.stringify(Response, null, 2)}</p>
        </div>
      )}
    </div>
  );
}

function Expense(){
  const [Name, setName] = useState("");
  const [location, setlocation] = useState("");
  const [Description, setDescription] = useState("");
  const [Amount, setAmount] = useState("");
  const [loading, setloading] = useState(false);
  const [Response, setResponse] = useState(null);
  const [error, seterror] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(null);
    setResponse(null);
    
    try{
      const res = await fetch("http://localhost:4000/api/Expense", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          PropertyName: Name,
          location,
          Description: Description,
          Amount: Number(Amount)
        })
      });
      const data = await res.json();

      if(!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setResponse(data);
    } catch(error) {
      console.error("Error fetching data:", error);
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }

  return(
    <div>
      <Nav/>
      <form onSubmit={handleSubmit}>
        <h2>Property Name:</h2>
        <input 
          type='text'
          placeholder='Property Name'
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h2>Location:</h2>
        <input 
          type='text'
          placeholder='Location'
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          required
        />
        <h2>Expense Description:</h2>
        <input 
          type='text'
          placeholder='Description'
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <h2>Expense Amount:</h2>
        <input 
          type='number'
          placeholder='Expense'
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button
          type='submit'
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      {Response && (
        <div>
          <h3>Expense:</h3>
          <p>{JSON.stringify(Response, null, 2)}</p>
        </div>
      )}
    </div>
  );
}


function Details() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [tenant, setTenant] = useState(false); // ✅ added tenant state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ boolean, not null
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:4000/api/Detail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PropertyName: name,
          location,
          Tenant: tenant, // ✅ include tenant
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <form onSubmit={handleSubmit}>
        <h2>Property Name:</h2>
        <input
          type="text"
          placeholder="Property Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <h2>Location:</h2>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <h2>Tenant:</h2>
        <label>
          <input
            type="checkbox"
            checked={tenant}
            onChange={(e) => setTenant(e.target.checked)}
          />
          Has Tenant
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {response?.Propertydetail && (
        <div>
          <h2>Property details</h2>
          <p>
            <strong>Property Name:</strong>{" "}
            {response.Propertydetail.PropertyName}
          </p>
          <p>
            <strong>Location:</strong> {response.Propertydetail.location}
          </p>
          <p>
            <strong>Total Rent:</strong> {response.Propertydetail.TotalRent}
          </p>
          <p>
            <strong>Total Levy:</strong> {response.Propertydetail.TotalLevy}
          </p>
          <p>
            <strong>Total Bond:</strong> {response.Propertydetail.TotalBond}
          </p>
          <p>
            <strong>Total Expense:</strong>{" "}
            {response.Propertydetail.TotalExpense}
          </p>
          <p>
            <strong>Profit:</strong> {response.Propertydetail.Profit}
          </p>

          {response.Propertydetail.Records?.length > 0 && (
            <div>
              {response.Propertydetail.Records.map((record, index) => (
                <div key={index}>
                  <p>
                    <strong>Month:</strong> {record.month}
                  </p>
                  <p>
                    Rent: ${record.Rent} | Levy: ${record.Levy} | Bond: $
                    {record.Bond}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GetProp() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  const handleGetProperties = async () => {
    setLoading(true);
    setError(null);
    setProperties([]);

    try {
      const res = await fetch("http://localhost:4000/api/getProperty", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}-${res.statusText}`);
      }

        const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error("Received non-JSON response:", text);
        throw new Error("Server returned HTML instead of JSON. Check if API endpoint is correct and server is running.");
      }

      const data = await res.json(); 
      setProperties(data.properties || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <button
        onClick={handleGetProperties}>
        Get Properties
      </button>

      {loading && <p>Loading properties...</p>}
      {error && <p>Error: {error}</p>}

      {properties.length > 0 && (
        <div>
          {properties.map((prop, index) => (
            <div
              key={index}
            >
              <h2>{prop.PropertyName}</h2>
              <p><strong>Location:</strong> {prop.location}</p>
              <p><strong>Rent:</strong> {prop.Rent}</p>
              <p><strong>Levy:</strong> {prop.Levy}</p>
              <p><strong>Bond:</strong> {prop.Bond}</p>
              <p><strong>Tenant:</strong> {prop.Tenant ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HOME(){
  return(
    <div>
      <h1>Monox Investments</h1>
      <Nav/>
    </div>
  );
}

function Nav(){
  return(
    <div>
      <Link to={"/Home"}><button>Home Page</button></Link>
      <Link to={"/see"}><button>Enter Prop</button></Link>
      <Link to={"/"}><button>Monthly Entry</button></Link>
      <Link to={"/Expense"}><button>Expense</button></Link>
      <Link to={"/get"}><button>Get Prop</button></Link>
      <Link to={"/detail"}><button>Detailed Prop</button></Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<HOME/>}/>
        <Route path="/see" element={<Property/>}/>
        <Route path="/" element={<Monthly/>}/>
        <Route path="/Expense" element={<Expense/>}/>
        <Route path="/get" element= {<GetProp/>}/>
        <Route path="/detail" element={<Details/>}/>
      </Routes>
    </div>
  );
}

export default App;