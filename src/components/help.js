import React, { useState } from "react";
import { Button, Drawer, Menu, MenuItem, Card } from "@blueprintjs/core";

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

  return (
    <>
      <Button
        icon="help"
        text="Help"
        onClick={() => setIsOpen(true)}
        minimal
      />
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Speech Markdown Help"
        size="500px"
      >
        <div style={{ padding: "20px" }}>
          <h3>Select a Tag</h3>
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

          {selectedTag && (
            <Card style={{ marginTop: "20px" }}>
              <h3>{tagHelp[selectedTag].name}</h3>
              <p>
                <strong>Description:</strong> {tagHelp[selectedTag].description}
              </p>
              <p>
                <strong>Example:</strong>
                <br />
                <code>{tagHelp[selectedTag].example}</code>
              </p>
              {tagHelp[selectedTag].shortForm && (
                <p>
                  <strong>Short Form:</strong>
                  <br />
                  <code>{tagHelp[selectedTag].shortForm}</code>
                </p>
              )}
              <p>
                <strong>Platform Support:</strong> {tagHelp[selectedTag].platforms}
              </p>
              {tagHelp[selectedTag].note && (
                <p>
                  <strong>Note:</strong> {tagHelp[selectedTag].note}
                </p>
              )}
            </Card>
          )}

          <Card style={{ marginTop: "20px", backgroundColor: "#f5f5f5" }}>
            <h4>Short-Form Syntax</h4>
            <p>Speech Markdown supports convenient short-form syntax:</p>
            <ul>
              <li>
                <code>(text)/'IPA'/</code> - IPA phoneme
              </li>
              <li>
                <code>(text)&#123;alias&#125;</code> - Substitution
              </li>
              <li>
                <code>/IPA/</code> - Standalone IPA
              </li>
              <li>
                <code>**text**</code> - Strong emphasis
              </li>
              <li>
                <code>*text*</code> - Moderate emphasis
              </li>
              <li>
                <code>[break:'1s']</code> - Break/pause
              </li>
            </ul>
            <p>
              <strong>Tip:</strong> Use "Raw Markdown Mode" to type short-form
              syntax directly!
            </p>
          </Card>
        </div>
      </Drawer>
    </>
  );
};

