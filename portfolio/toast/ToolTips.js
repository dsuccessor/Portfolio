import React from "react";
import { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
// import { client, ApolloProvider } from "../client";

function ToolTips({ optionButtons, id }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  
  return (
    <div ref={ref} className="p-0">
      <button
        type="button"
        className="btn btn-primary fs-13 btn-sm py-1 me-1 mt-2"
        onClick={handleClick}
      >
        Actions
      </button>

      <Overlay
        show={show}
        target={target}
        placement="bottom-end"
        container={ref}
      >
        <Popover id="popover-contained">
          <Popover.Body className="p-2">{optionButtons(id)}</Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default ToolTips;
