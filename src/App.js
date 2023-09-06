import "./App.css";
import { useHuddle01 } from "@huddle01/react";
import { useEffect } from "react";
import { useLobby, useAudio, useVideo, useRoom } from "@huddle01/react/hooks";

function App() {
  const { initialize, isInitialized, roomState } = useHuddle01();
  const { joinLobby } = useLobby();
  const { fetchAudioStream, stopAudioStream, error: micError } = useAudio();
  const { fetchVideoStream, stopVideoStream, error: camError } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize(process.env.REACT_APP_PROJECT_ID);
  }, []);

  return (
    <div className="App">
      {roomState}

      <button
        disabled={!joinLobby.isCallable}
        onClick={() => joinLobby(process.env.REACT_APP_ROOM_ID)}
      >
        Join Lobby
      </button>

      {/* Mic */}
      <button
        disabled={!fetchAudioStream.isCallable}
        onClick={fetchAudioStream}
      >
        FETCH_AUDIO_STREAM
      </button>

      {/* Webcam */}
      <button
        disabled={!fetchVideoStream.isCallable}
        onClick={fetchVideoStream}
      >
        FETCH_VIDEO_STREAM
      </button>

      <button disabled={!joinRoom.isCallable} onClick={joinRoom}>
        JOIN_ROOM
      </button>

      <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
        LEAVE_ROOM
      </button>
    </div>
  );
}

export default App;
