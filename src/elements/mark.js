import React, { useState } from "react";
import { Transforms } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import { InputGroup } from "@blueprintjs/core";

export const MarkElement = (props) => {
  const { attributes, children, element } = props;
  const editor = useSlate();
  const [value, setValue] = useState(element.value || "");

  return (
    <span {...attributes} contentEditable={false} className="element">
      <span className="element-label">mark:</span>
      <InputGroup
        className="element-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          const path = ReactEditor.findPath(editor, element);
          Transforms.setNodes(editor, { value: e.target.value }, { at: path });
        }}
        placeholder="marker-name"
      />
      {children}
    </span>
  );
};
