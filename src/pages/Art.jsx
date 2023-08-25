import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
  


function Art({image, audio, keyTrigger, caption }) {
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

  // Checks if we're in a browser
  const isBrowser = typeof window !== "undefined";
  const isMobileDevice = isBrowser && /Mobi/i.test(navigator.userAgent);

  const handleEvent = isMobileDevice
    ? { onClick: playNote }
    : { onMouseEnter: playNote };


  // Return Function
  return (
    <div {...handleEvent}>
      <Image className=
      {`PullMid shadow-2xl ease-linear Smoother 
      dark:shadow-lg  -p-8
      hover:shadow-Ind 
      transform ${isKeyPressed ? 'scale-90 bg-coal inline-block transition duration-150 opacity-100 animate-spin dark:shadow-2xl dark:border-sky-500 rounded-full dark:border-2 dark:shadow-DarkTeal' : ' rounded-md dark:-rotate-45 lg:dark:opacity-0  dark:shadow-PlanetDark shadow-black'}`} 
      src={image} 
      alt='' />
      <p className='pt-2 dark:hidden'>{caption}</p>


      <audio ref={audioRef} src={audio}></audio>

    </div>
  )
}

export default Art