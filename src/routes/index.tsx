import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className='p-2'>
      <h3>Welcome Home TEST!</h3>
      <Link to='/blog'>blog</Link>
      <Link to='/blog/$slug' params={{ slug: "hejsan" }}>
        blog / hejsan
      </Link>
      <div>
        <AudioRecorder />
      </div>
    </div>
  );
}

interface AudioDevice {
  deviceId: string;
  label: string;
}

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices
          .filter((device) => device.kind === "audioinput")
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Microphone ${device.deviceId.slice(0, 5)}`,
          }));
        setDevices(audioInputs);
        if (audioInputs.length > 0) {
          setSelectedDevice(audioInputs[0].deviceId);
        }
      } catch (error) {
        console.error("Error getting audio devices:", error);
      }
    };

    getDevices();

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        },
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        chunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      if (audioRef.current) {
        audioRef.current.remove();
        audioRef.current = null;
      }
      setAudioUrl(null);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const response = await fetch("YOUR_BACKEND_URL_HERE", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Audio uploaded successfully");
        // Handle successful upload (e.g., show a success message)
      } else {
        console.error("Failed to upload audio");
        // Handle upload failure (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
      // Handle upload error (e.g., show an error message)
    }
  };

  const playAudio = () => {
    if (audioUrl && !audioRef.current) {
      const audio = new Audio(audioUrl);
      audio.controls = true;
      document.body.appendChild(audio);
      audioRef.current = audio;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <select
        value={selectedDevice}
        onChange={(e) => setSelectedDevice(e.target.value)}
        style={{ width: "300px", padding: "0.5rem" }}
      >
        <option value=''>Select a microphone</option>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={startRecording}
          disabled={isRecording || !selectedDevice}
          style={{
            backgroundColor: "#22c55e",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
          }}
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
          }}
        >
          Stop Recording
        </button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={playAudio}
          disabled={!audioUrl}
          style={{
            backgroundColor: "#8b5cf6",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
          }}
        >
          Play Recording
        </button>
        <button
          onClick={uploadAudio}
          disabled={!audioBlob}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
          }}
        >
          Upload Audio
        </button>
      </div>
    </div>
  );
};
