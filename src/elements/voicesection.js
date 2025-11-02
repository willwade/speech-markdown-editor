import React, { useState, useEffect } from "react";
import { Transforms } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import { Menu, MenuItem, Popover, Button } from "@blueprintjs/core";
import { getVoicesForPlatform } from "../data/voices";

const languages = [
  "en-US",
  "en-GB",
  "en-AU",
  "en-IN",
  "de-DE",
  "es-ES",
  "fr-FR",
  "it-IT",
  "ja-JP",
  "pt-BR",
  "zh-CN",
];

export const VoiceSectionElement = (props) => {
  const { attributes, children, element, platform = "amazon-alexa" } = props;
  const editor = useSlate();
  const [voice, setVoice] = useState(element.voice || "brian");
  const [lang, setLang] = useState(element.lang || "en-US");

  // Get platform-specific voices
  const platformVoices = getVoicesForPlatform(platform);

  // Find the voice object for the current voice ID
  const currentVoice = platformVoices.find((v) => v.id === voice);
  const displayVoiceName = currentVoice ? currentVoice.name : voice;

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
                {platformVoices.map((v) => (
                  <MenuItem
                    key={v.id}
                    text={v.name}
                    onClick={() => {
                      setVoice(v.id);
                      const path = ReactEditor.findPath(editor, element);
                      Transforms.setNodes(
                        editor,
                        { voice: v.id },
                        { at: path }
                      );
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
            {displayVoiceName}
          </span>
        </Popover>
        {lang && (
          <>
            <span>; lang:</span>
            <span
              className="section-input"
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {lang}
            </span>
          </>
        )}
        <Popover
          content={
            <Menu>
              {languages.map((l) => (
                <MenuItem
                  key={l}
                  text={l}
                  onClick={() => {
                    setLang(l);
                    const path = ReactEditor.findPath(editor, element);
                    Transforms.setNodes(editor, { lang: l }, { at: path });
                  }}
                />
              ))}
            </Menu>
          }
        >
          <Button
            icon="plus"
            minimal
            small
            style={{ marginLeft: "5px" }}
            title="Add language"
          />
        </Popover>
      </div>
      <div className="section-content">{children}</div>
    </div>
  );
};
