// src/components/routes/Record.js


import React, { useState, useEffect } from "react";
import './Record.css' ;


const Record = () => {
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  // const [recordedChunks, setRecordedChunks] = useState([]);
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
      <h2 class="title">Record video</h2>
      {permissionDenied ? (
        <p>Permission to access the camera and microphone was denied.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <video
            height="400"
            width="1200"
            ref={(videoElement) => {
              if (videoElement && mediaStream) {
                videoElement.srcObject = mediaStream;
              }
            }}
            autoPlay
            muted
          ></video>
          <div>
            <button onClick={handleStartRecording} disabled={recording} class="start">
              Start Recording
            </button>
            <button onClick={handleStopRecording} disabled={!recording} class="stop">
              Stop Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Record;
