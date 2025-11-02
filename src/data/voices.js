// Import voice data from speechmarkdown-js package
import { AMAZON_POLLY_ALL_VOICES } from "speechmarkdown-js/dist/src/formatters/data/amazonPollyVoices";
import { GOOGLE_CLOUD_TTS_VOICES } from "speechmarkdown-js/dist/src/formatters/data/googleCloudVoices";
import { MICROSOFT_AZURE_TTS_VOICES } from "speechmarkdown-js/dist/src/formatters/data/microsoftAzureVoices";
import { IBM_WATSON_TTS_VOICES } from "speechmarkdown-js/dist/src/formatters/data/ibmWatsonVoices";

// Helper function to extract voice objects with id and name from voice data
const extractVoices = (voiceData) => {
  return Object.keys(voiceData)
    .map((key) => {
      const voiceName = voiceData[key].voice?.name;
      if (!voiceName) return null;
      return {
        id: key, // lowercase voice ID for SSML
        name: voiceName, // capitalized display name
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Get all unique voices from all platforms
const getAllVoices = () => {
  const voiceMap = new Map();

  // Add voices from all platforms
  extractVoices(AMAZON_POLLY_ALL_VOICES).forEach((v) => voiceMap.set(v.id, v));
  extractVoices(GOOGLE_CLOUD_TTS_VOICES).forEach((v) => voiceMap.set(v.id, v));
  extractVoices(MICROSOFT_AZURE_TTS_VOICES).forEach((v) =>
    voiceMap.set(v.id, v)
  );
  extractVoices(IBM_WATSON_TTS_VOICES).forEach((v) => voiceMap.set(v.id, v));

  return Array.from(voiceMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

// Export all voices for use in voice elements
export const ALL_VOICES = getAllVoices();

// Platform-specific voice lists
export const PLATFORM_VOICES = {
  "amazon-alexa": extractVoices(AMAZON_POLLY_ALL_VOICES),
  "amazon-polly": extractVoices(AMAZON_POLLY_ALL_VOICES),
  "amazon-polly-neural": extractVoices(AMAZON_POLLY_ALL_VOICES),
  "google-assistant": extractVoices(GOOGLE_CLOUD_TTS_VOICES),
  "microsoft-azure": extractVoices(MICROSOFT_AZURE_TTS_VOICES),
  sapi: extractVoices(MICROSOFT_AZURE_TTS_VOICES), // SAPI uses similar voices
  "ibm-watson": extractVoices(IBM_WATSON_TTS_VOICES),
  w3c: [], // W3C doesn't have predefined voices
  elevenlabs: [], // ElevenLabs uses custom voices
};

// Get voices for a specific platform
export const getVoicesForPlatform = (platform) => {
  return PLATFORM_VOICES[platform] || [];
};

// Get default voice for a platform (returns voice object with id and name)
export const getDefaultVoiceForPlatform = (platform) => {
  const voices = getVoicesForPlatform(platform);
  if (voices.length === 0) return { id: "brian", name: "Brian" }; // Fallback

  // Platform-specific default IDs (lowercase)
  const defaultIds = {
    "amazon-alexa": "joanna",
    "amazon-polly": "joanna",
    "amazon-polly-neural": "joanna",
    "google-assistant": "en-us-neural2-a",
    "microsoft-azure": "en-us-arianeural",
    sapi: "en-us-arianeural",
    "ibm-watson": "en-us_allisonv3voice",
  };

  const defaultId = defaultIds[platform];
  const defaultVoice = voices.find((v) => v.id === defaultId);
  return defaultVoice || voices[0];
};

// Check if a platform has voice support
export const platformHasVoices = (platform) => {
  return getVoicesForPlatform(platform).length > 0;
};
