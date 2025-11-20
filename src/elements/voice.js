import React from "react";
import { getVoicesForPlatform } from "../data/voices";
import { useEditor, ReactEditor, useSelected } from "slate-react";
import { Transforms } from "slate";
import { useRef, useEffect, useState } from "react";
import { moveToNext, moveToPrevious } from "../libs/utils";
import { AutoGrowInput } from "../components/autogrowinput/autogrowinput";
import {
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  InputGroup,
  Button,
} from "@blueprintjs/core";

// Custom voice element that displays voice name but stores voice ID
export const VoiceElement = ({
  attributes,
  children,
  element,
  platform = "amazon-alexa",
}) => {
  const editor = useEditor();
  const selected = useSelected();
  const inputRef = useRef(null);
  const [availableModifier, setAvailableModifier] = useState([]);

  let { value } = element;

  // Get platform-specific voices
  const platformVoices = getVoicesForPlatform(platform);

  // Find the voice object for the current voice ID
  const currentVoice = platformVoices.find((v) => v.id === element.voice);
  const displayVoiceName = currentVoice ? currentVoice.name : element.voice;

  // Full list of all possible modifiers for this platform
  const ALL_MODIFIERS = [
    {
      name: "voice",
      values: platformVoices,
    },
    {
      name: "lang",
      values: [false],
    },
    {
      name: "pitch",
      values: ["x-low", "low", "medium", "high", "x-high"],
    },
    {
      name: "rate",
      values: ["x-slow", "slow", "medium", "fast", "x-fast"],
    },
    {
      name: "volume",
      values: ["silent", "x-soft", "soft", "medium", "loud", "x-loud"],
    },
  ];

  useEffect(() => {
    if (selected && inputRef && inputRef.current) {
      inputRef.current.focus(editor.lastKeyDown !== "ArrowRight");
    }
  }, [selected, editor.lastKeyDown]);

  useEffect(() => {
    if (ALL_MODIFIERS.length === 1) {
      setAvailableModifier(ALL_MODIFIERS);
    } else {
      setAvailableModifier(
        ALL_MODIFIERS.filter((modifier) => element[modifier.name] !== undefined)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    element.voice,
    element.lang,
    element.pitch,
    element.rate,
    element.volume,
    platform,
  ]);

  return (
    <span {...attributes} contentEditable={false}>
      {value !== undefined && (
        <React.Fragment>
          (
          <AutoGrowInput
            value={value}
            onNext={() => {
              moveToNext(editor);
            }}
            onPrevious={() => {
              moveToPrevious(editor);
            }}
            onChange={(e) => {
              const path = ReactEditor.findPath(editor, element);
              Transforms.setNodes(
                editor,
                { value: e.target.value },
                { at: path }
              );
            }}
            ref={inputRef}
          />
          )
        </React.Fragment>
      )}
      [
      {availableModifier.map((modifier, index) => {
        const { name, values } = modifier;
        const isVoiceModifier = name === "voice";

        return (
          <React.Fragment key={name}>
            <span>{name}</span>
            {values && (
              <React.Fragment>
                <span>:</span>
                <Popover
                  content={
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      <Menu>
                        {values.map((value) => {
                          // Handle voice objects vs string values
                          if (isVoiceModifier && typeof value === "object") {
                            return (
                              <MenuItem
                                key={value.id}
                                text={value.name}
                                onClick={() => {
                                  const path = ReactEditor.findPath(
                                    editor,
                                    element
                                  );
                                  Transforms.setNodes(
                                    editor,
                                    { [name]: value.id },
                                    { at: path }
                                  );
                                }}
                              />
                            );
                          } else if (value) {
                            return (
                              <MenuItem
                                key={value}
                                text={value}
                                onClick={() => {
                                  const path = ReactEditor.findPath(
                                    editor,
                                    element
                                  );
                                  Transforms.setNodes(
                                    editor,
                                    { [name]: value },
                                    { at: path }
                                  );
                                }}
                              />
                            );
                          } else {
                            return (
                              <React.Fragment key="input">
                                {values.length > 1 && <MenuDivider />}
                                <InputGroup
                                  placeholder="1s"
                                  defaultValue={element[name]}
                                  onChange={(e) => {
                                    const path = ReactEditor.findPath(
                                      editor,
                                      element
                                    );
                                    Transforms.setNodes(
                                      editor,
                                      { [name]: e.target.value },
                                      { at: path }
                                    );
                                  }}
                                />
                              </React.Fragment>
                            );
                          }
                        })}
                      </Menu>
                    </div>
                  }
                >
                  <span className="options">
                    &quot;
                    {isVoiceModifier
                      ? displayVoiceName
                      : element[name] || values[0]}
                    &quot;
                  </span>
                </Popover>
                {index < availableModifier.length - 1 && ";"}
              </React.Fragment>
            )}
          </React.Fragment>
        );
      })}
      {availableModifier.length !== ALL_MODIFIERS.length && (
        <Popover
          content={
            <Menu>
              {ALL_MODIFIERS.filter(
                (modifier) =>
                  !availableModifier.find((am) => am.name === modifier.name)
              ).map((modifier) => {
                return (
                  <MenuItem
                    key={modifier.name}
                    title={modifier.name}
                    text={modifier.name}
                    onClick={() => {
                      const path = ReactEditor.findPath(editor, element);
                      const firstValue =
                        modifier.name === "voice"
                          ? platformVoices[0]?.id || ""
                          : modifier.values[0] || "";
                      Transforms.setNodes(
                        editor,
                        { [modifier.name]: firstValue },
                        { at: path }
                      );
                    }}
                  />
                );
              })}
            </Menu>
          }
        >
          <Button small={true} minimal={true} icon={"add"} />
        </Popover>
      )}
      ]{children}
    </span>
  );
};
