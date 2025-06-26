import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

const Text = () => {
  const nodeRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState("Double Click to Edit");

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} onDoubleClick={() => setEditMode(true)}>
        {editMode ? (
          <input
            value={val}
            autoFocus
            onBlur={() => setEditMode(false)}
            onChange={(e) => setVal(e.target.value)}
          />
        ) : (
          <h1>{val}</h1>
        )}
      </div>
    </Draggable>
  );
};

export default Text;
