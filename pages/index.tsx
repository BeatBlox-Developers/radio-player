import { NavBar } from "@/components/NavBar";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePause } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import WaveSurfer from "wavesurfer.js";

// TODO: refactor this into separate components
export default function Home() {
  const [volume, setVolume] = useState(1); // Initial volume set to 1 (maximum)
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState(null); // Initial waveform set to null
  const [secondsPlayed, setSecondsPlayed] = useState(0); // Initial seconds played set to 0
  const videoRef = useRef(null);

  const waveformRef = useRef(null);
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current!,
      waveColor: "white",
      progressColor: "white",
      cursorColor: "gray",
      cursorWidth: 2,
      url: "/video-mockup.mp4",
      barWidth: 3,
      height: 40,
    });
    setWaveform(wavesurfer as any);

    wavesurfer.load("/video-mockup.mp4");
    // Event listener for audioprocess to update secondsPlayed
    wavesurfer.on("audioprocess", () => {
      setSecondsPlayed(wavesurfer.getCurrentTime().toFixed(0));
    });

    // Clean up the WaveSurfer instance when the component is unmounted
    return () => {
      wavesurfer.destroy();
    };
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  useEffect(() => {
    if (waveform) {
      waveform.setVolume(volume);
    }
  }, [volume]); // Run this effect whenever the volume changes

  const handleVolumeChange = (event: any) => {
    console.log(event.target.value);
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && waveform) {
      waveform.play();
      videoRef.current!.play();
      return;
    }
    if (isPlaying && waveform) {
      waveform.pause();
      videoRef.current!.pause();
      return;
    }
  };

  return (
    <main className="h-full w-screen bg-black">
      <NavBar secondsPlayed={secondsPlayed} />
      <div className="flex justify-center items-center h-full">
        <video ref={videoRef} className="h-96 w-96 mt-0" loop muted>
          <source src="/video-mockup.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="w-full flex  items-end justify-center  fixed bottom-5  text-white">
        <div className="w-fit py-3 px-8 border border-white rounded-[2.2rem] flex flex-row justify-between gap-10">
          <button
            className="rounded-full bg-white text-black h-10 w-10 flex justify-center items-center"
            onClick={handlePlayPause}
          >
            {isPlaying ? <AiOutlinePause size={24} /> : <FiPlay size={24} />}
          </button>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnZwcezVPVhgI3TxA4DNNFbgBHgJTW6IP7g&usqp=CAU"
            alt=""
            className="h-12 rounded-xl"
          />
          <div className="flex flex-col justify-center items-center">
            <span className="text-lg">Track name</span>
            <span className="text-xs">Artist name</span>
          </div>
          <div className="w-64 h-full " ref={waveformRef}></div>
          <div className="flex flex-col justify-center items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-2 rounded-full bg-white "
            />
          </div>
        </div>
      </div>
    </main>
  );
}
