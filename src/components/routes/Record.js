// src/components/routes/Record.js


import React, { useState, useEffect } from "react";

const Record = () => {
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMediaStream(stream);

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, e.data]);
        }
      };
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      // Handle permission denied
      setPermissionDenied(true);
    }
  };

  useEffect(() => {
    // Call the startRecording function here
    startRecording();
  }, []);

  const handleStartRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h2>Recording Example</h2>
      {permissionDenied ? (
        <p>Permission to access the camera and microphone was denied.</p>
      ) : (
        <>
          <button onClick={handleStartRecording} disabled={recording}>
            Start Recording
          </button>
          <button onClick={handleStopRecording} disabled={!recording}>
            Stop Recording
          </button>
        </>
      )}
      <video
        ref={(videoElement) => {
          if (videoElement && mediaStream) {
            videoElement.srcObject = mediaStream;
          }
        }}
        autoPlay
        muted
      ></video>
    </div>
  );
};

export default Record;
