import { useState } from "react";
import "./style.css";

const API_URL = "https://api.github.com"; //url for API calls

async function fetchResults(query) {
  try{

    const response = await fetch(`${API_URL}/search/users?q=${query}`);   //fetching user data from the github api based on query
    const json = await response.json();   //parsing response data as json
    return json.items || [];  //returning an array of user items from the json response

  } catch(e) {

    throw new Error(e); 

  }
}

export default function App() {
  const [query, setQuery] = useState("");   //declaring query and function setQuery to update value
  const [results, setResults] = useState([]); //declaring results and function setResults to update value

  function onSearchChange(event) {
    setQuery(event.target.value);   //updating query state with value entered in search input
  }

  async function onSearchSubmit(event) {
    event.preventDefault();   //preventing default form submission behavior
    const results = await fetchResults(query);  //fetching search results using fetchResults function
    setResults(results);  //updating results state with fetched search results
  }

  return (
    <div className="app">
      <main className="main">
        <h2>GitHub User Search</h2>

        <Form 
        // rendering FORM component and passing event handlers and values as props
        onChange={onSearchChange} 
        onSubmit={onSearchSubmit} 
        value={query}
        />

        <h3>Results</h3>
        <div id="results">
        <div>
          {results.map((user) => (
            <User
            //rendering USER component for each user in the results array
            key={user.login}
            avatar={user.avatar_url}
            url={user.html_url}
            username={user.login}
            />
          ))}
        </div>
        </div>
      </main>
    </div>
  )

}

//for user component
function User({avatar, url, username}) {
  return (

    <div className="user">
      {/* displaying avatar */}
      <img src={avatar} alt="Profile" width="50" height="50" />
      {/* displaying username */}
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
        </a>
    </div>

  );
}

//for form component
function Form({onSubmit, onChange, value}) {
  return (
    // handling form submission with onSubmit prop
    <form className="search-form" onSubmit={onSubmit}>
      <input
        id="search"
        type="text"
        placeholder="Enter username or email"
        onChange={onChange}
        value={value}
      />

      <button type="submit">Search</button>
    </form>
  );

}