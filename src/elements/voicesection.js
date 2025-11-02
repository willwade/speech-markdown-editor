import React, { useState, useEffect } from "react";
import { Transforms } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import { InputGroup, Menu, MenuItem, Popover } from "@blueprintjs/core";

const voices = [
  "Ivy",
  "Joanna",
  "Joey",
  "Justin",
  "Kendra",
  "Kimberly",
  "Matthew",
  "Salli",
  "Nicole",
  "Russell",
  "Amy",
  "Brian",
  "Emma",
  "Aditi",
  "Raveena",
  "Hans",
  "Marlene",
  "Vicki",
  "Conchita",
  "Enrique",
  "Carla",
  "Giorgio",
  "Mizuki",
  "Takumi",
  "Celine",
  "Lea",
  "Mathieu",
];

export const VoiceSectionElement = (props) => {
  const { attributes, children, element } = props;
  const editor = useSlate();
  const [voice, setVoice] = useState(element.voice || "Brian");
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
        <span className="section-label">voice:</span>
        <Popover
          content={
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Menu>
                {voices.map((v) => (
                  <MenuItem
                    key={v}
                    text={v}
                    onClick={() => {
                      setVoice(v);
                      const path = ReactEditor.findPath(editor, element);
                      Transforms.setNodes(editor, { voice: v }, { at: path });
                    }}
                  />
                ))}
              </Menu>
            </div>
          }
        >
          <span
            className="section-input"
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {voice}
          </span>
        </Popover>
        <span>; lang:</span>
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

