import React, { useRef, useEffect, useState } from "react";

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
const mic = speechRecognition ? new speechRecognition() : null;

if (mic) {
  mic.continuous = true;
}

const Interface = () => {
  const videoRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    let stream = null;
    const enableCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    };
    enableCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (mic) {
      mic.onstart = () => {
        console.log("Mics in on. Listening...");
      };
      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((results) => results[0])
          .map((results) => results.transcript)
          .join("");
        setText(transcript);
      };
      mic.onend = () => {
        console.log("Mics is off. Not listening...");
      };
    } else {
      console.log("Your browser does not support speech recognition");
    }
  }, [isListening]);

  const startListening = () => {
    if (mic) {
      setText("");
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
    <div className="bg-slate-950 w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full m-auto h-full flex justify-center items-center">
        <div className="w-1/2 h-2/3 border rounded-3xl overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
          ></video>
        </div>
        <div className="w-[500px] h-[500px] border rounded-3xl ml-5 p-4">
          <div className="">
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
          </div>
          <div className="text-white flex flex-col">
            <span className="font-bold">You</span>
            <span>{text}</span>

            <span className="font-bold mt-5">Luna</span>
            <span>Hello there</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
