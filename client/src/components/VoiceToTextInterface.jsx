import React, { useState, useEffect } from "react";

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = speechRecognition ? new speechRecognition() : null;

if (mic) {
  mic.continuous = true;
}

const VoiceToTextInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (mic) {
      mic.onstart = () => {
        console.log("Mics in on. Listening...");
      };
      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setText(transcript);
      };
      mic.onend = () => {
        console.log("Mics is off. Not listening...");
        if (isListening) {
          mic.start();
        }
      };
    } else {
      console.log("Your browser does not support speech recognition");
    }
  }, [isListening]);

  const startListening = () => {
    if (mic) {
      mic.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (mic) {
      mic.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="bg-slate-900 h-screen">
      <button
        className="p-2 border-2 rounded-xl bg-white mr-5"
        onClick={startListening}
        disabled={isListening}
      >
        Start Listening
      </button>
      <button
        className="p-2 border-2 rounded-xl bg-white "
        onClick={stopListening}
        disabled={!isListening}
      >
        Stop Listening
      </button>
      <p className="text-white">{text}</p>
    </div>
  );
};

export default VoiceToTextInterface;
