import React from "react";
import { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
// import { client, ApolloProvider } from "../client";

function ToolTips({ optionButtons }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <div ref={ref}>
      <button
        type="button"
        className="btn btn-secondary btn-sm py-2 me-2 mt-1"
        onClick={handleClick}
      >
        Options
      </button>

      <Overlay
        show={show}
        target={target}
        placement="bottom-end"
        container={ref}
      >
        <Popover id="popover-contained">
          <Popover.Body className="p-2">{optionButtons()}</Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default ToolTips;
