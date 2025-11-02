import React, { useState, useEffect } from "react";
import { Transforms } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import { InputGroup } from "@blueprintjs/core";

export const LangElement = (props) => {
  const { attributes, children, element } = props;
  const editor = useSlate();
  const [lang, setLang] = useState(element.lang || "en-US");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        Transforms.insertText(editor, "\n");
      }
    };

    if (editor.lastKeyDown) {
      handleKeyDown(editor.lastKeyDown);
    }
  }, [editor, editor.lastKeyDown]);

  return (
    <div {...attributes} className="section">
      <div contentEditable={false} className="section-header">
        <span className="section-label">lang:</span>
        <InputGroup
          className="section-input"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(editor, { lang: e.target.value }, { at: path });
          }}
          placeholder="en-US"
        />
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
};
