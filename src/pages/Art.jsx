import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
  


function Art({image, audio, keyTrigger }) {
  // Audio Player
  const audioRef = useRef(null);

  const playNote = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Add event listener to trigger audio playback on keydown
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === keyTrigger) {
        playNote();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyTrigger]);

  // Checks if we're in a browser
  const isBrowser = typeof window !== "undefined";
  const isMobileDevice = isBrowser && /Mobi/i.test(navigator.userAgent);

  const handleEvent = isMobileDevice
    ? { onClick: playNote }
    : { onMouseEnter: playNote };

  // Keydown Scale
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === keyTrigger) {
        setIsKeyPressed(true);
      }
    }

    function handleKeyUp(event) {
      if (event.key === keyTrigger) {
        setIsKeyPressed(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyTrigger]);


  // Return Function
  return (
    <div {...handleEvent}>
      <Image className=
      {`PullMid shadow-2xl rounded-md 
      dark:shadow-PlanetDark dark:shadow-lg ease-out 
      hover:shadow-Ind 
      transform ${isKeyPressed ? 'scale-125 -rotate-45 dark:-rotate-90 dark:shadow-DarkTeal shadow-DarkTeal' : 'dark:-rotate-45 shadow-black'}`} 
      src={image} 
      alt='/' />


      <audio ref={audioRef} src={audio}></audio>

    </div>
  )
}

export default Art