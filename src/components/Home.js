import React, { useState, useEffect } from "react";
import ListContainer from "./ListContainer";
import Loading from "./Loading";
import "./Home.css"; 

const API_URL = "https://apis.ccbp.in/list-creation/lists"; 

const Home = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [isListCreationMode, setIsListCreationMode] = useState(false);

  
  const fetchLists = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch lists");
      const data = await response.json();
      setLists(data.lists || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleSelectList = (listNumber) => {
    if (selectedLists.includes(listNumber)) {
      setSelectedLists(selectedLists.filter((num) => num !== listNumber));
    } else {
      setSelectedLists([...selectedLists, listNumber]);
    }
  };

  const createNewList = () => {
    if (selectedLists.length !== 2) {
      alert("You should select exactly 2 lists to create a new list");
      return;
    }
    setIsListCreationMode(true);
  };

  const cancelListUpdate = () => {
    setIsListCreationMode(false);
    setSelectedLists([]);
  };

  return (
    <div className="home">
      <h1>List Creation</h1>
      {loading && <Loading />}
      {error && <p>Failed to load lists. Please try again later.</p>}
      {!loading && !error && (
        <>
          <button onClick={createNewList} className="create-btn">
            Create a New List
          </button>
          <div className="list-container">
            {[1, 2].map((num) => (
              <ListContainer
                key={num}
                listNumber={num}
                lists={lists.filter((list) => list.list_number === num)}
                selected={selectedLists.includes(num)}
                onSelect={() => handleSelectList(num)}
              />
            ))}
          </div>
          {isListCreationMode && (
            <div>
              {}
              <button onClick={cancelListUpdate}>Cancel</button>
              <button>Update</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;