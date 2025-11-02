import React, { useRef, useState } from "react";
import { Editor } from "./components/editor/editor";
import { Tabs, Tab, Tag, Switch, Button } from "@blueprintjs/core";
import { SpeechMarkdown } from "speechmarkdown-js";

import { MenuButton } from "./components/menu";
import { HelpButton } from "./components/help";
import { Recent } from "./libs/storage";

import "./App.scss";

const speech = new SpeechMarkdown();

const App = () => {
  const editorRef = useRef(null);
  const [recentItems, setRecentItems] = useState(Recent.get());
  const [alexa, setAlexa] = useState("");
  const [google, setGoogle] = useState("");
  const [azure, setAzure] = useState("");
  const [sapi, setSapi] = useState("");
  const [polly, setPolly] = useState("");
  const [pollyNeural, setPollyNeural] = useState("");
  const [w3c, setW3c] = useState("");
  const [elevenlabs, setElevenlabs] = useState("");
  const [plainText, setPlaintext] = useState("");
  const [rawMode, setRawMode] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("amazon-alexa");

  // Helper function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Success - could add a toast notification here if desired
        console.log("Copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };
  return (
    <div className="root">
      <div id="logo">
        <img
          src="https://www.speechmarkdown.org/images/logos/logo-blue.svg"
          alt="Speech Markdown Logo"
        />
      </div>
      <div className="editor-box">
        <div className="toolbar">
          <MenuButton
            platform={selectedPlatform}
            onSelect={(node) => {
              editorRef.current.insert(node);
              setRecentItems(Recent.get());
            }}
          />
          <Switch
            checked={rawMode}
            label="Raw Markdown Mode"
            onChange={(e) => {
              const newRawMode = e.target.checked;
              if (newRawMode) {
                // Switching to raw mode - get current markdown from editor
                if (editorRef.current) {
                  const currentSmd = editorRef.current.getMarkdown();
                  setRawMarkdown(currentSmd);
                }
              }
              setRawMode(newRawMode);
              // Note: When switching back to visual mode, the editor will remount
              // and use the rawMarkdown state
            }}
          />
          <Button
            icon="duplicate"
            text="Copy Markdown"
            small={true}
            onClick={() => copyToClipboard(rawMarkdown)}
          />
          <HelpButton />
        </div>
        <div className="editable-container">
          {rawMode ? (
            <textarea
              className="raw-markdown-editor"
              value={rawMarkdown}
              onChange={(e) => {
                const smd = e.target.value;
                setRawMarkdown(smd);
                setAlexa(speech.toSSML(smd, { platform: "amazon-alexa" }));
                setGoogle(speech.toSSML(smd, { platform: "google-assistant" }));
                setAzure(speech.toSSML(smd, { platform: "microsoft-azure" }));
                setSapi(speech.toSSML(smd, { platform: "microsoft-sapi" }));
                setPolly(speech.toSSML(smd, { platform: "amazon-polly" }));
                setPollyNeural(
                  speech.toSSML(smd, { platform: "amazon-polly-neural" })
                );
                setW3c(speech.toSSML(smd, { platform: "w3c" }));
                setElevenlabs(speech.toSSML(smd, { platform: "elevenlabs" }));
                setPlaintext(speech.toText(smd));
              }}
              placeholder="Type Speech Markdown here... Examples:
(pecan)/'pi.kæn/ - IPA phoneme
(Al){aluminum} - Sub alias
/ˈdeɪtə/ - Standalone IPA
**strong** - Strong emphasis
*moderate* - Moderate emphasis
[break:'1s'] - Break"
              style={{
                width: "100%",
                height: "100%",
                fontFamily: "monospace",
                fontSize: "14px",
                padding: "10px",
                border: "1px solid #ccc",
                resize: "none",
              }}
            />
          ) : (
            <Editor
              ref={editorRef}
              platform={selectedPlatform}
              onChange={(smd) => {
                setRawMarkdown(smd);
                setAlexa(speech.toSSML(smd, { platform: "amazon-alexa" }));
                setGoogle(speech.toSSML(smd, { platform: "google-assistant" }));
                setAzure(speech.toSSML(smd, { platform: "microsoft-azure" }));
                setSapi(speech.toSSML(smd, { platform: "microsoft-sapi" }));
                setPolly(speech.toSSML(smd, { platform: "amazon-polly" }));
                setPollyNeural(
                  speech.toSSML(smd, { platform: "amazon-polly-neural" })
                );
                setW3c(speech.toSSML(smd, { platform: "w3c" }));
                setElevenlabs(speech.toSSML(smd, { platform: "elevenlabs" }));
                setPlaintext(speech.toText(smd));
              }}
            />
          )}
        </div>
        {recentItems.length > 0 && (
          <div className="recents">
            <span>Recent:&nbsp;</span>
            {recentItems.map((recent) => (
              <Tag
                interactive={true}
                onClick={() => {
                  editorRef.current.insert(recent.node);
                }}
                onRemove={(e) => {
                  e.stopPropagation();
                  Recent.remove(recent);
                  setRecentItems(Recent.get());
                }}
              >
                {recent.label}
              </Tag>
            ))}
          </div>
        )}
      </div>
      <div className="preview-box">
        <Tabs
          selectedTabId={selectedPlatform}
          onChange={(newTabId) => setSelectedPlatform(newTabId)}
        >
          <Tab
            id="amazon-alexa"
            title="Alexa"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy SSML"
                    small={true}
                    onClick={() => copyToClipboard(alexa)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{alexa}</div>
              </div>
            }
          />
          <Tab
            id="google-assistant"
            title="Google Assistant"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy SSML"
                    small={true}
                    onClick={() => copyToClipboard(google)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{google}</div>
              </div>
            }
          />
          <Tab
            id="microsoft-azure"
            title="Azure"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy SSML"
                    small={true}
                    onClick={() => copyToClipboard(azure)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{azure}</div>
              </div>
            }
          />
          <Tab
            id="sapi"
            title="SAPI"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy SSML"
                    small={true}
                    onClick={() => copyToClipboard(sapi)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{sapi}</div>
              </div>
            }
          />
          <Tab
            id="amazon-polly"
            title="Polly"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy SSML"
                    small={true}
                    onClick={() => copyToClipboard(polly)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{polly}</div>
              </div>
            }
          />
          <Tab
            id="amazon-polly-neural"
            title="Polly Neural"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy SSML"
                    small={true}
                    onClick={() => copyToClipboard(pollyNeural)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{pollyNeural}</div>
              </div>
            }
          />
          <Tab
            id="w3c"
            title="W3C"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy SSML"
                    small={true}
                    onClick={() => copyToClipboard(w3c)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{w3c}</div>
              </div>
            }
          />
          <Tab
            id="elevenlabs"
            title="ElevenLabs"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy SSML"
                    small={true}
                    onClick={() => copyToClipboard(elevenlabs)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{elevenlabs}</div>
              </div>
            }
          />
          {/* <Tab
            id="bixby"
            title="Bixby"
            panel={<div style={{ height: "100px" }}>{bixby}</div>}
          /> */}
          <Tab
            id="plaintext"
            title="Plain Text"
            panel={
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon="duplicate"
                    text="Copy Text"
                    small={true}
                    onClick={() => copyToClipboard(plainText)}
                  />
                </div>
                <div style={{ minHeight: "100px" }}>{plainText}</div>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>
  );
};

export default App;
