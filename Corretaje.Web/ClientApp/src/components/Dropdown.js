import React from "react";
import { Dropdown as DD } from "react-bootstrap";

const Dropdown = props => {
  const { onChange, options, label } = props;

  if (!options) return null;

  return (
    <DD>
      <DD.Toggle variant="success" id={label}>
        Mis Propiedades
      </DD.Toggle>

      <DD.Menu>
        {options.map((o, i) => (
          <DD.Item key={`${o.label}-${i}`} onSelect={() => onChange(o.value)}>
            {o.label}
          </DD.Item>
        ))}
      </DD.Menu>
    </DD>
  );
};

export default Dropdown;
