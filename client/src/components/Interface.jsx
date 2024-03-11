import React, { useState, useRef, useEffect } from "react";

const Interface = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  let stream = null;

  const toggleCamera = async () => {
    if (!isCameraOn) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    setIsCameraOn(!isCameraOn);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-slate-900 w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full m-auto h-full flex flex-col justify-center items-center">
        <div className="w-1/2 ">
          <button className="text-white" onClick={toggleCamera}>
            {isCameraOn ? "Turn camera off" : "Turn camera on"}
          </button>
        </div>
        <div className=" w-1/2 h-1/2 border rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-full object-cover"
          ></video>
        </div>
        <div className="w-1/2">
          <span className="flex items-center">
            <span className="text-white p-2">User: </span>
            <span className="text-white">asd</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Interface;
