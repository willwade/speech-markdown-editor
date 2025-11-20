import React from "react";
import { Popover, Menu, MenuItem, Button } from "@blueprintjs/core";
import {
  getVoicesForPlatform,
  getDefaultVoiceForPlatform,
  platformHasVoices,
} from "../data/voices";

export const MenuButton = (props) => {
  const { onSelect, platform = "amazon-alexa" } = props;
  const voices = getVoicesForPlatform(platform);
  const hasVoices = platformHasVoices(platform);
  return (
    <Popover
      position="bottom-left"
      style={{ maxHeight: "100px", overflowY: "scroll" }}
      content={
        <div style={{ display: "flex" }}>
          <Menu>
            <MenuItem
              active={true}
              text="address"
              onClick={() =>
                onSelect({
                  type: "address",
                })
              }
            />
            <MenuItem
              text="audio"
              onClick={() => onSelect({ type: "audio" })}
            />
            <MenuItem text="break">
              <MenuItem
                text="none"
                onClick={() => onSelect({ type: "break", break: "none" })}
              />
              <MenuItem
                text="x-weak"
                onClick={() => onSelect({ type: "break", break: "x-weak" })}
              />
              <MenuItem
                text="weak"
                onClick={() => onSelect({ type: "break", break: "weak" })}
              />
              <MenuItem
                text="medium"
                onClick={() => onSelect({ type: "break", break: "medium" })}
              />
              <MenuItem
                text="strong"
                onClick={() => onSelect({ type: "break", break: "strong" })}
              />
              <MenuItem
                text="x-strong"
                onClick={() => onSelect({ type: "break", break: "x-strong" })}
              />
            </MenuItem>
            <MenuItem
              text="cardinal"
              onClick={() => onSelect({ type: "cardinal" })}
            />
            <MenuItem
              text="characters"
              onClick={() => onSelect({ type: "characters" })}
            />
            <MenuItem text="date">
              <MenuItem
                text="mdy"
                onClick={() => onSelect({ type: "date", date: "mdy" })}
              />
              <MenuItem
                text="dmy"
                onClick={() => onSelect({ type: "date", date: "dmy" })}
              />
              <MenuItem
                text="ymd"
                onClick={() => onSelect({ type: "date", date: "ymd" })}
              />
              <MenuItem
                text="ydm"
                onClick={() => onSelect({ type: "date", date: "ydm" })}
              />
              <MenuItem
                text="md"
                onClick={() => onSelect({ type: "date", date: "md" })}
              />
              <MenuItem
                text="dm"
                onClick={() => onSelect({ type: "date", date: "dm" })}
              />
              <MenuItem
                text="ym"
                onClick={() => onSelect({ type: "date", date: "ym" })}
              />
              <MenuItem
                text="my"
                onClick={() => onSelect({ type: "date", date: "my" })}
              />
              <MenuItem
                text="y"
                onClick={() => onSelect({ type: "date", date: "y" })}
              />
              <MenuItem
                text="m"
                onClick={() => onSelect({ type: "date", date: "m" })}
              />
              <MenuItem
                text="d"
                onClick={() => onSelect({ type: "date", date: "d" })}
              />
            </MenuItem>
            <MenuItem
              text="defaults"
              onClick={() => onSelect({ type: "defaults" })}
            />
            <MenuItem text="disappointed">
              <MenuItem
                text="medium"
                onClick={() =>
                  onSelect({ type: "disappointed", disappointed: "medium" })
                }
              />
              <MenuItem
                text="low"
                onClick={() =>
                  onSelect({ type: "disappointed", disappointed: "low" })
                }
              />
              <MenuItem
                text="high"
                onClick={() =>
                  onSelect({ type: "disappointed", disappointed: "high" })
                }
              />
            </MenuItem>
            <MenuItem text="dj" onClick={() => onSelect({ type: "dj" })} />
            <MenuItem text="emphasis">
              <MenuItem
                text="strong"
                onClick={() =>
                  onSelect({ type: "emphasis", emphasis: "strong" })
                }
              />
              <MenuItem
                text="moderate"
                onClick={() =>
                  onSelect({ type: "emphasis", emphasis: "moderate" })
                }
              />
              <MenuItem
                text="reduced"
                onClick={() =>
                  onSelect({ type: "emphasis", emphasis: "reduced" })
                }
              />
            </MenuItem>
          </Menu>
          <Menu>
            <MenuItem text="excited">
              <MenuItem
                text="medium"
                onClick={() => onSelect({ type: "excited", excited: "medium" })}
              />
              <MenuItem
                text="low"
                onClick={() => onSelect({ type: "excited", excited: "low" })}
              />
              <MenuItem
                text="high"
                onClick={() => onSelect({ type: "excited", excited: "high" })}
              />
            </MenuItem>
            <MenuItem
              text="expletive / bleep"
              onClick={() => onSelect({ type: "expletive" })}
            />
            <MenuItem
              text="fraction"
              onClick={() => onSelect({ type: "fraction" })}
            />
            <MenuItem
              text="interjection"
              onClick={() => onSelect({ type: "interjection" })}
            />
            <MenuItem text="ipa" onClick={() => onSelect({ type: "ipa" })} />
            <MenuItem
              text="lang (modifier)"
              onClick={() => onSelect({ type: "voice", lang: "en-US" })}
            />
            <MenuItem
              text="lang (section)"
              onClick={() => onSelect({ type: "lang", lang: "en-US" })}
            />
            <MenuItem text="mark" onClick={() => onSelect({ type: "mark" })} />
            <MenuItem
              text="newscaster"
              onClick={() => onSelect({ type: "newscaster" })}
            />
            <MenuItem
              text="number"
              onClick={() => onSelect({ type: "number" })}
            />
            <MenuItem
              text="ordinal"
              onClick={() => onSelect({ type: "ordinal" })}
            />
            <MenuItem
              text="phone"
              onClick={() => onSelect({ type: "phone" })}
            />
          </Menu>
          <Menu>
            <MenuItem text="pitch">
              <MenuItem
                text="x-low"
                onClick={() => onSelect({ type: "voice", pitch: "x-low" })}
              />
              <MenuItem
                text="low"
                onClick={() => onSelect({ type: "voice", pitch: "low" })}
              />
              <MenuItem
                text="medium"
                onClick={() => onSelect({ type: "voice", pitch: "medium" })}
              />
              <MenuItem
                text="high"
                onClick={() => onSelect({ type: "voice", pitch: "high" })}
              />
              <MenuItem
                text="x-high"
                onClick={() => onSelect({ type: "voice", pitch: "x-high" })}
              />
            </MenuItem>
            <MenuItem text="rate">
              <MenuItem
                text="x-slow"
                onClick={() => onSelect({ type: "voice", rate: "x-slow" })}
              />
              <MenuItem
                text="slow"
                onClick={() => onSelect({ type: "voice", rate: "slow" })}
              />
              <MenuItem
                text="medium"
                onClick={() => onSelect({ type: "voice", rate: "medium" })}
              />
              <MenuItem
                text="fast"
                onClick={() => onSelect({ type: "voice", rate: "fast" })}
              />
              <MenuItem
                text="x-fast"
                onClick={() => onSelect({ type: "voice", rate: "x-fast" })}
              />
            </MenuItem>
            <MenuItem text="sub" onClick={() => onSelect({ type: "sub" })} />
            <MenuItem text="time">
              <MenuItem
                text="12hr"
                onClick={() => onSelect({ type: "time", time: "hms12" })}
              />
              <MenuItem
                text="24hr"
                onClick={() => onSelect({ type: "time", time: "hms24" })}
              />
            </MenuItem>
            <MenuItem text="unit" onClick={() => onSelect({ type: "unit" })} />
            <MenuItem text="voice" disabled={!hasVoices}>
              {hasVoices && (
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {voices.map((voice) => (
                    <MenuItem
                      key={voice.id}
                      text={voice.name}
                      onClick={() =>
                        onSelect({ type: "voice", voice: voice.id })
                      }
                    />
                  ))}
                </div>
              )}
            </MenuItem>
            <MenuItem
              text="voice (section)"
              disabled={!hasVoices}
              onClick={() => {
                const defaultVoice = getDefaultVoiceForPlatform(platform);
                onSelect({
                  type: "voicesection",
                  voice: defaultVoice.id,
                  lang: "en-US",
                });
              }}
            />
            <MenuItem text="volume">
              <MenuItem
                text="silent"
                onClick={() => onSelect({ type: "voice", volume: "silent" })}
              />
              <MenuItem
                text="x-soft"
                onClick={() => onSelect({ type: "voice", volume: "x-soft" })}
              />
              <MenuItem
                text="soft"
                onClick={() => onSelect({ type: "voice", volume: "soft" })}
              />
              <MenuItem
                text="medium (default)"
                onClick={() => onSelect({ type: "voice", volume: "medium" })}
              />
              <MenuItem
                text="loud"
                onClick={() => onSelect({ type: "voice", volume: "loud" })}
              />
              <MenuItem
                text="x-loud"
                onClick={() => onSelect({ type: "voice", volume: "x-loud" })}
              />
            </MenuItem>
            <MenuItem
              text="whisper"
              onClick={() => onSelect({ type: "whisper" })}
            />
          </Menu>
        </div>
      }
    >
      <Button icon="plus" />
    </Popover>
  );
};
