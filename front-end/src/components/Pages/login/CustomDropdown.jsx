import { useState } from "react";

const CustomDropdown = ({ options, selected, setSelected, width }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{width:width}}  className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selected || "Selecione uma categoria"}
      </div>
      {isOpen && (
        <div className="dropdown-list">
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
      )}
    </div>
  );
};

export default CustomDropdown;
