import { useState } from 'react'
import './App.css'

function Property(){
  const [Name, setName] = useState("");
  const [location, setlocation] = useState("");
  const [Rent, setRent] = useState("");
  const [Levy, setLevy] = useState("");
  const [Bond, setBond] = useState("");
  const [Tenant, setTenant] = useState(false);
  const [loading,setloading] = useState(false);
  const [error,seterror] = useState(null);
  const [Response,setResponse] = useState(null);


    const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(null);
    setResponse(null);

    try{
      const res = await fetch("http://localhost:4000/api/Prop",
         {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({PropertyName:Name,
            location,
            Rent: Number(Rent),
            Levy: Number(Levy),
            Bond: Number(Bond),
            Tenant})
      });
     const data =await res.json();

     if(!res.ok){
      throw new Error(data.message || 'Something went wrong');
     }

     setResponse(data);
    }catch(error)
    {
      console.error("Error fetching data:", error);
    }finally{
      setloading(false);
    }
}
return(
  <div>
    
    <form onSubmit={handleSubmit}>
      <h2>Property Name:</h2>
      <input 
      type='text'
      placeholder='Property Name'
      value={Name}
      onChange={(e) =>setName(e.target.value)}
      required
      />
        <h2>Location:</h2>
      <input 
      type='text'
      placeholder='Location'
      value={location}
      onChange={(e) =>setlocation(e.target.value)}
      required
      />
        <h2>Rent:</h2>
      <input 
      type='number'
      placeholder='Rent'
      value={Rent}
      onChange={(e) =>setRent(e.target.value)}
      required
      />
        <h2>Levy:</h2>
      <input 
      type='number'
      placeholder='Levy'
      value={Levy}
      onChange={(e) =>setLevy(e.target.value)}
      required
      />
        <h2>Bond:</h2>
      <input 
      type='number'
      placeholder='Bond'
      value={Bond}
      onChange={(e) =>setBond(e.target.value)}
      required
      />
        <h2>Tenant:</h2>
     <select value={Tenant.toString()}
     onChange={(e) => setTenant(e.target.value === "true")}>
      <option value="true">True</option>
      <option value="false">False</option>
     </select>
      <button
      type='submit'
      disabled = {loading}
      >{loading ? "loading..." : "Submit"}</button>
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

function App() {

  return (
    <>
      <Property></Property>
    </>
  )
}

export default App
