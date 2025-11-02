import React, { useState } from "react";
import {
  Button,
  Drawer,
  Menu,
  MenuItem,
  Card,
  Classes,
} from "@blueprintjs/core";

const tagHelp = {
  address: {
    name: "address",
    description: "Formats text as an address",
    example: "(123 Main St)[address]",
    platforms: "All platforms",
  },
  audio: {
    name: "audio",
    description: "Inserts an audio file",
    example: '!["https://example.com/audio.mp3"]',
    platforms: "Most platforms (not all support audio)",
  },
  break: {
    name: "break",
    description: "Inserts a pause/break in speech",
    example: '[break:"1s"] or [break:"weak"]',
    shortForm: "[break:'1s']",
    platforms: "All platforms",
  },
  cardinal: {
    name: "cardinal",
    description: "Speaks a number as a cardinal number",
    example: "(123)[cardinal]",
    platforms: "All platforms",
  },
  characters: {
    name: "characters / chars",
    description: "Spells out text character by character",
    example: "(ABC)[characters]",
    platforms: "All platforms",
  },
  date: {
    name: "date",
    description: "Formats and speaks a date",
    example: '(2024-01-15)[date:"mdy"]',
    platforms: "All platforms",
  },
  defaults: {
    name: "defaults (section)",
    description: "Sets default voice properties for the entire document",
    example: "#[defaults]",
    platforms: "All platforms",
  },
  disappointed: {
    name: "disappointed",
    description: "Speaks with a disappointed tone",
    example: "(Oh no)[disappointed:'medium'] or #[disappointed]",
    platforms: "Amazon platforms (Alexa, Polly Neural)",
  },
  dj: {
    name: "dj (section)",
    description: "Uses DJ speaking style",
    example: "#[dj]",
    platforms: "Amazon Polly Neural",
  },
  emphasis: {
    name: "emphasis",
    description: "Adds emphasis to speech",
    example: "(important)[emphasis:'strong']",
    shortForm: "**strong** or *moderate*",
    platforms: "All platforms",
  },
  excited: {
    name: "excited",
    description: "Speaks with an excited tone",
    example: "(Wow)[excited:'high'] or #[excited]",
    platforms: "Amazon platforms (Alexa, Polly Neural)",
  },
  expletive: {
    name: "expletive / bleep",
    description: "Bleeps out profanity",
    example: "(damn)[expletive]",
    platforms: "Amazon Alexa",
  },
  fraction: {
    name: "fraction",
    description: "Speaks a fraction",
    example: "(3/4)[fraction]",
    platforms: "All platforms",
  },
  interjection: {
    name: "interjection",
    description: "Speaks text as an interjection",
    example: "(wow)[interjection]",
    platforms: "Amazon Alexa",
  },
  ipa: {
    name: "ipa",
    description: "Uses IPA (International Phonetic Alphabet) pronunciation",
    example: "(tomato)['təˈmeɪtoʊ][ipa]",
    shortForm: "(tomato)/'təˈmeɪtoʊ/ or /təˈmeɪtoʊ/",
    platforms: "All platforms",
    note: "Use IPA symbols without slashes in the modifier. Short form uses slashes.",
  },
  lang: {
    name: "lang",
    description: "Sets the language for text or section",
    example: "(bonjour)[lang:'fr-FR'] or #[lang:'fr-FR']",
    platforms: "All platforms",
  },
  mark: {
    name: "mark",
    description: "Inserts a marker/bookmark for synchronization",
    example: '[mark:"bookmark1"]',
    platforms: "Most platforms (for timing/sync)",
  },
  newscaster: {
    name: "newscaster (section)",
    description: "Uses newscaster speaking style",
    example: "#[newscaster]",
    platforms: "Amazon Polly Neural",
  },
  number: {
    name: "number",
    description: "Speaks a number",
    example: "(123)[number]",
    platforms: "All platforms",
  },
  ordinal: {
    name: "ordinal",
    description: "Speaks a number as an ordinal",
    example: "(1)[ordinal] → first",
    platforms: "All platforms",
  },
  phone: {
    name: "phone / telephone",
    description: "Speaks a phone number",
    example: "(555-1234)[phone]",
    platforms: "All platforms",
  },
  pitch: {
    name: "pitch",
    description: "Adjusts pitch of voice",
    example: "(high voice)[pitch:'x-high']",
    platforms: "Most platforms (via voice modifier)",
    note: "Use as part of voice modifier",
  },
  rate: {
    name: "rate",
    description: "Adjusts speaking rate/speed",
    example: "(fast speech)[rate:'fast']",
    platforms: "All platforms (via voice modifier)",
    note: "Use as part of voice modifier",
  },
  sub: {
    name: "sub",
    description: "Substitutes spoken text for written text",
    example: "(Al){aluminum}",
    shortForm: "(Al){aluminum}",
    platforms: "All platforms",
  },
  time: {
    name: "time",
    description: "Speaks a time",
    example: '(2:30pm)[time:"hms12"]',
    platforms: "All platforms",
  },
  unit: {
    name: "unit",
    description: "Speaks a unit of measurement",
    example: "(5m)[unit]",
    platforms: "All platforms",
  },
  voice: {
    name: "voice",
    description: "Changes the voice or voice properties",
    example: "(text)[voice:'Brian'] or #[voice:'Brian';lang:'en-GB']",
    platforms: "Platform-specific voices",
    note: "Voice names vary by platform. Common voices: Alexa (Joanna, Matthew), Google (en-US-Wavenet-A)",
  },
  volume: {
    name: "volume / vol",
    description: "Adjusts volume/loudness",
    example: "(loud)[volume:'x-loud']",
    platforms: "All platforms (via voice modifier)",
    note: "Use as part of voice modifier",
  },
  whisper: {
    name: "whisper",
    description: "Speaks in a whisper",
    example: "(secret)[whisper]",
    platforms: "Amazon Alexa",
  },
};

export const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const isMobile = window.innerWidth <= 768;

  const codeStyle = {
    backgroundColor: "#e8f5e9",
    padding: "2px 6px",
    borderRadius: "3px",
    fontSize: isMobile ? "12px" : "inherit",
  };

  return (
    <>
      <Button icon="help" text="Help" onClick={() => setIsOpen(true)} minimal />
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Speech Markdown Help"
        size={isMobile ? "90%" : "500px"}
        position="right"
      >
        <div
          className={Classes.DRAWER_BODY}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            className={Classes.DIALOG_BODY}
            style={{
              fontSize: isMobile ? "14px" : "inherit",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "18px" : "inherit",
                marginBottom: "10px",
              }}
            >
              Select a Tag
            </h3>
            <div
              style={{
                flex: selectedTag ? "0 0 auto" : "1 1 auto",
                maxHeight: selectedTag
                  ? isMobile
                    ? "150px"
                    : "200px"
                  : "none",
                overflowY: "auto",
                marginBottom: "15px",
                border: "1px solid #e1e8ed",
                borderRadius: "3px",
              }}
            >
              <Menu>
                {Object.keys(tagHelp)
                  .sort()
                  .map((key) => (
                    <MenuItem
                      key={key}
                      text={tagHelp[key].name}
                      onClick={() => setSelectedTag(key)}
                      active={selectedTag === key}
                    />
                  ))}
              </Menu>
            </div>

            {selectedTag && (
              <div
                style={{
                  flex: "1 1 auto",
                  overflowY: "auto",
                  paddingRight: "5px",
                }}
              >
                <Card
                  elevation={2}
                  style={{
                    padding: isMobile ? "10px" : "15px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      fontSize: isMobile ? "16px" : "inherit",
                    }}
                  >
                    {tagHelp[selectedTag].name}
                  </h3>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Description:</strong>
                    <div style={{ marginLeft: "10px", marginTop: "5px" }}>
                      {tagHelp[selectedTag].description}
                    </div>
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Example:</strong>
                    <div
                      style={{
                        marginLeft: isMobile ? "5px" : "10px",
                        marginTop: "5px",
                        padding: isMobile ? "6px" : "8px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "3px",
                        fontFamily: "monospace",
                        fontSize: isMobile ? "12px" : "inherit",
                        wordBreak: "break-word",
                      }}
                    >
                      {tagHelp[selectedTag].example}
                    </div>
                  </div>
                  {tagHelp[selectedTag].shortForm && (
                    <div style={{ marginBottom: "10px" }}>
                      <strong>Short Form:</strong>
                      <div
                        style={{
                          marginLeft: isMobile ? "5px" : "10px",
                          marginTop: "5px",
                          padding: isMobile ? "6px" : "8px",
                          backgroundColor: "#e8f5e9",
                          borderRadius: "3px",
                          fontFamily: "monospace",
                          fontSize: isMobile ? "12px" : "inherit",
                          wordBreak: "break-word",
                        }}
                      >
                        {tagHelp[selectedTag].shortForm}
                      </div>
                    </div>
                  )}
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Platform Support:</strong>
                    <div style={{ marginLeft: "10px", marginTop: "5px" }}>
                      {tagHelp[selectedTag].platforms}
                    </div>
                  </div>
                  {tagHelp[selectedTag].note && (
                    <div
                      style={{
                        marginTop: "15px",
                        padding: "10px",
                        backgroundColor: "#fff3e0",
                        borderLeft: "3px solid #ff9800",
                        borderRadius: "3px",
                      }}
                    >
                      <strong>
                        <span role="img" aria-label="lightbulb">
                          💡
                        </span>{" "}
                        Note:
                      </strong>{" "}
                      {tagHelp[selectedTag].note}
                    </div>
                  )}
                </Card>

                {/* Show Short-Form Syntax Guide only for tags that support it */}
                {(selectedTag === "ipa" ||
                  selectedTag === "sub" ||
                  selectedTag === "emphasis" ||
                  selectedTag === "break") && (
                  <Card
                    elevation={1}
                    style={{
                      marginTop: "20px",
                      padding: isMobile ? "10px" : "15px",
                      backgroundColor: "#f5f8fa",
                    }}
                  >
                    <h4
                      style={{
                        marginTop: 0,
                        fontSize: isMobile ? "16px" : "inherit",
                      }}
                    >
                      <span role="img" aria-label="memo">
                        📝
                      </span>{" "}
                      Short-Form Syntax Guide
                    </h4>
                    <p>
                      Speech Markdown supports convenient short-form syntax:
                    </p>
                    <ul
                      style={{
                        lineHeight: "1.8",
                        paddingLeft: isMobile ? "20px" : "inherit",
                      }}
                    >
                      <li>
                        <code style={codeStyle}>(text)/'IPA'/</code> - IPA
                        phoneme
                      </li>
                      <li>
                        <code style={codeStyle}>(text)&#123;alias&#125;</code> -
                        Substitution
                      </li>
                      <li>
                        <code style={codeStyle}>/IPA/</code> - Standalone IPA
                      </li>
                      <li>
                        <code style={codeStyle}>**text**</code> - Strong
                        emphasis
                      </li>
                      <li>
                        <code style={codeStyle}>*text*</code> - Moderate
                        emphasis
                      </li>
                      <li>
                        <code style={codeStyle}>[break:'1s']</code> -
                        Break/pause
                      </li>
                    </ul>
                    <div
                      style={{
                        marginTop: "15px",
                        padding: isMobile ? "8px" : "10px",
                        backgroundColor: "#e3f2fd",
                        borderRadius: "3px",
                        fontSize: isMobile ? "13px" : "inherit",
                      }}
                    >
                      <strong>
                        <span role="img" aria-label="lightbulb">
                          💡
                        </span>{" "}
                        Tip:
                      </strong>{" "}
                      Use "Raw Markdown Mode" toggle to type short-form syntax
                      directly!
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};
