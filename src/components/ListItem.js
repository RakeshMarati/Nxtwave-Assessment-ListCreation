import React from "react";

const ListItem = ({ item, onMove, isListCreationMode }) => (
  <div className="list-item">
    <p>{item.name}</p>
    {isListCreationMode && (
      <div className="item-buttons">
        <button onClick={() => onMove("left")}>⬅️</button>
        <button onClick={() => onMove("right")}>➡️</button>
      </div>
    )}
  </div>
);

export default ListItem;