import React, { useState } from "react";
import "./Trp.css"; // Import CSS file

const Trp = () => {
  // State for Efficiency & TRP Section
  const [sousElements, setSousElements] = useState([]);
  const [sousElementText, setSousElementText] = useState("");
  const [sousElementDate, setSousElementDate] = useState("");



  //TRP formula TRP= Quantite/capacite
  //Efficience= quantité/ capacité
  //H perdu = minutes*cadence/ H1000


  // Handle adding a new sous-élément
  const addSousElement = () => {
    setSousElements([
      ...sousElements,
      { text: sousElementText, date: sousElementDate, id: Date.now() },
    ]);
    setSousElementText("");
    setSousElementDate("");
  };

  // Handle updating a sous-élément
  const updateSousElement = (id, newText) => {
    const updatedSousElements = sousElements.map((element) =>
      element.id === id ? { ...element, text: newText } : element
    );
    setSousElements(updatedSousElements);
  };

  return (
    <div className="efficiency-trp">
      <h2>Efficiency & TRP</h2>
      <input
        type="date"
        value={sousElementDate}
        onChange={(e) => Date(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sous-éléments"
        value={sousElementText}
        onChange={(e) => setSousElementText(e.target.value)}
      />
      <button onClick={addSousElement}>Add Sous-élément</button>

      <ul>
        {sousElements.map((element) => (
          <li key={element.id}>
            <input
              type="text"
              value={element.text}
              onChange={(e) => updateSousElement(element.id, e.target.value)}
            />
            <span>{element.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trp;