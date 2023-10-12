// src/components/routes/Record.js


import React, { useState, useEffect } from "react";
import './Record.css' ;


const Record = () => {
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState([]);

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
      if (error.name === 'NotAllowedError') {
        // Handle permission denied
        console.log('Permission to access camera and microphone denied.');
      } else {
        console.log('Error accessing media devices:', error.message);
      }
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

      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(blob);
      setRecordedVideos([...recordedVideos, { blob, videoURL }]);
    }
  };

  // const handlePlayRecording = () => {
  //   const blob = new Blob(recordedChunks, { type: 'video/webm' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'recorded-video.webm';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // };

  return (
    <div>
      <h2 className="title">Record video</h2>
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
            <button onClick={handleStartRecording} disabled={recording} className="start">
              Start Recording
            </button>
            <button onClick={handleStopRecording} disabled={!recording} className="stop">
              Stop Recording
            </button>
          </div>
        </div>
      )}
  
      {/* Display recorded video */}
      {recordedVideos.length > 0 && (
        <div>
          <h2 className="title">Recorded Video</h2>
          <video
            controls
            width="800"
            ref={(videoElement) => {
              if (videoElement) {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                videoElement.src = URL.createObjectURL(blob);
              }
            }}
          ></video>
        </div>
      )}
    </div>
  );
};  
export default Record;

//   return (
//     <div>
//       <h2 className="title">Record video</h2>
//       {permissionDenied ? (
//         <p>Permission to access the camera and microphone was denied.</p>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <video
//             height="400"
//             width="1200"
//             ref={(videoElement) => {
//               if (videoElement && mediaStream) {
//                 videoElement.srcObject = mediaStream;
//               }
//             }}
//             autoPlay
//             muted
//           ></video>
//           <div>
//             <button onClick={handleStartRecording} disabled={recording} className="start">
//               Start Recording
//             </button>
//             <button onClick={handleStopRecording} disabled={!recording} className="stop">
//               Stop Recording
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Display recorded chunks */}
//       {recordedChunks.length > 0 && (
//       <div>
//         <h2 className="title">Recorded Video</h2>
//         <video
//           controls
//           width="800"
//           ref={(videoElement) => {
//             if (videoElement) {
//               const blob = new Blob(recordedChunks, { type: 'video/webm' });
//               videoElement.src = URL.createObjectURL(blob);
//             }
//           }}
//         ></video>
//         </div>
//       )}
//     </div>
//   );
// };



// export default Record;
