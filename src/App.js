import React, { useEffect, useState } from "react";
import ListContainer from "./components/ListContainer";
import "./App.css";

const API_URL = "https://apis.ccbp.in/list-creation/lists";

function App() {
  const [lists, setLists] = useState([]); // All fetched lists
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]); // Tracks selected lists
  const [tempLists, setTempLists] = useState([]); // Temporary state for list updates
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
    setTempLists([...lists]);
    setIsListCreationMode(true);
  };

  const cancelListUpdate = () => {
    setIsListCreationMode(false);
    setTempLists([]);
  };

  const updateLists = () => {
    setLists(tempLists);
    setIsListCreationMode(false);
  };

  return (
    <div className="app">
      <h1>List Creation</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <div>
          <p>Something went wrong!</p>
          <button onClick={fetchLists}>Try Again</button>
        </div>
      )}
      {!loading && !error && (
        <>
          {!isListCreationMode ? (
            <>
              <button onClick={createNewList} className="create-btn">
                Create A New List
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
            </>
          ) : (
            <>
              <div className="list-container">
                <ListContainer
                  listNumber={1}
                  lists={tempLists.filter((list) => list.list_number === selectedLists[0])}
                  setLists={setTempLists}
                  isListCreationMode
                />
                <ListContainer listNumber={3} lists={[]} setLists={setTempLists} isListCreationMode />
                <ListContainer
                  listNumber={2}
                  lists={tempLists.filter((list) => list.list_number === selectedLists[1])}
                  setLists={setTempLists}
                  isListCreationMode
                />
              </div>
              <div className="buttons">
                <button onClick={updateLists} className="update-btn">Update</button>
                <button onClick={cancelListUpdate} className="cancel-btn">Cancel</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;