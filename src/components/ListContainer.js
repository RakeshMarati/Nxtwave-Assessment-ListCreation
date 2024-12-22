import React from "react";
import ListItem from "./ListItem";

const ListContainer = ({ listNumber, lists, onSelect, selected, isListCreationMode, setLists }) => {
  const handleItemMove = (id, direction) => {
    if (setLists) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === id
            ? { ...list, list_number: direction === "left" ? 1 : 2 }
            : list
        )
      );
    }
  };

  return (
    <div className={`list-container ${selected ? "selected" : ""}`}>
      {!isListCreationMode && (
        <input type="checkbox" onChange={onSelect} checked={selected} />
      )}
      <h3>List {listNumber}</h3>
      {lists.length > 0 ? (
        lists.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onMove={(direction) => handleItemMove(item.id, direction)}
            isListCreationMode={isListCreationMode}
          />
        ))
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default ListContainer;