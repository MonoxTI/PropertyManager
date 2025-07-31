<h1 align="left">Property Manager</h1>

###

<p align="left">My name is Ditebogo Monokoane.</p>

###

<h2 align="center">The project is about me</h2>

###

<p align="left">This project is a Property Management System designed to help users efficiently manage rental properties. Users can add new properties by entering key details such as the property's name, location, rent, levy, and bond information. The system stores and organizes this data, making it easy to track and update property records over time.</p>

###

<h2 align="center">I code with</h2>

###

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
</div>

###

<h1> Back End</h1>
<p>Open integrated Terminal in server.js </p>
npm start server
<h2>POST Man</h2>
<h3>POST</h3>
<p>
  localhost:4000/api/Prop
  Users are able to add new property and details into the database.
  {
   "PropertyName": "Bougainvillia",
   "location": "Montana",
   "Rent" : 20000,
   "Levy" : 2000,
   "Bond" : 5000,
   "Tenant" : yes
  }

  localhost:4000/api/Amount
  User are able to search for a property and add the rent, levy and bond amounts. This is done monthly and the values are save on to a database. 
  {
   "PropertyName": "Bougainvillia",
   "location": "Montana",
   "Rent" : 20000,
   "Levy" : 2000,
   "Bond" : 5000
  }
</p>
<h3>GET</h3>
<p>
  localhost:4000/api/getProperty
  This gets all properties within the databse.
  
  localhost:4000/api/Detail
  Users are able to search for a specific property. Once found within the databse is displays the total rent, levy, bond and profit. These values are calculated using the monthly amount entries.
    {
   "PropertyName": "Bougainvillia",
   "location": "Montana"
   }
</p>
