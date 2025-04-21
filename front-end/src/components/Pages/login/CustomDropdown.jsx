import { useState } from "react";
import "./CustomDropdown.css";

const CustomDropdown = ({ options, selected, setSelected, width }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ width: width }} className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected || "Selecione uma categoria"}</span>
        <span className={`dropdown-icon ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      <div className={`dropdown-list ${isOpen ? "open" : ""}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => {
              setSelected(option);
              setIsOpen(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;
