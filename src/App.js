import React, { useRef, useState } from "react";
import { Editor } from "./components/editor/editor";
import { Tabs, Tab, Tag, Switch } from "@blueprintjs/core";
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
  const [bixby, setBixby] = useState("");
  const [azure, setAzure] = useState("");
  const [sapi, setSapi] = useState("");
  const [polly, setPolly] = useState("");
  const [pollyNeural, setPollyNeural] = useState("");
  const [w3c, setW3c] = useState("");
  const [elevenlabs, setElevenlabs] = useState("");
  const [plainText, setPlaintext] = useState("");
  const [rawMode, setRawMode] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState("");
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
              setRawMode(newRawMode);
              if (newRawMode) {
                // Switching to raw mode - get current markdown from editor
                const currentSmd = editorRef.current.getMarkdown();
                setRawMarkdown(currentSmd);
              } else {
                // Switching back to visual mode - update editor with raw markdown
                editorRef.current.setMarkdown(rawMarkdown);
              }
            }}
            style={{ marginLeft: "10px" }}
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
                setGoogle(
                  speech.toSSML(smd, { platform: "google-assistant" })
                );
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
              onChange={(smd) => {
                setRawMarkdown(smd);
                setAlexa(speech.toSSML(smd, { platform: "amazon-alexa" }));
                setGoogle(
                  speech.toSSML(smd, { platform: "google-assistant" })
                );
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
        <Tabs>
          <Tab
            id="alexa"
            title="Alexa"
            panel={<div style={{ minHeight: "100px" }}>{alexa}</div>}
          />
          <Tab
            id="google"
            title="Google Assistant"
            panel={<div style={{ minHeight: "100px" }}>{google}</div>}
          />
          <Tab
            id="azure"
            title="Azure"
            panel={<div style={{ minHeight: "100px" }}>{azure}</div>}
          />
          <Tab
            id="sapi"
            title="SAPI"
            panel={<div style={{ minHeight: "100px" }}>{sapi}</div>}
          />
          <Tab
            id="polly"
            title="Polly"
            panel={<div style={{ minHeight: "100px" }}>{polly}</div>}
          />
          <Tab
            id="polly-neural"
            title="Polly Neural"
            panel={<div style={{ minHeight: "100px" }}>{pollyNeural}</div>}
          />
          <Tab
            id="w3c"
            title="W3C"
            panel={<div style={{ minHeight: "100px" }}>{w3c}</div>}
          />
          <Tab
            id="elevenlabs"
            title="ElevenLabs"
            panel={<div style={{ minHeight: "100px" }}>{elevenlabs}</div>}
          />
          {/* <Tab
            id="bixby"
            title="Bixby"
            panel={<div style={{ height: "100px" }}>{bixby}</div>}
          /> */}
          <Tab
            id="plaintext"
            title="Plain Text"
            panel={<div style={{ minHeight: "100px" }}>{plainText}</div>}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default App;
