// src/components/routes/Videos.js

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch the list of recorded videos from your server
    axios.get("YOUR_API_ENDPOINT/videos").then((response) => {
      setVideos(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Recorded Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <video controls width="320" height="240">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
}
