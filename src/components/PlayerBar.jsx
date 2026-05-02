import React, { useState, useEffect, useRef } from 'react';
import './PlayerBar.css';

const PlayerBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      // Start from top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const scrollStep = () => {
        if (!isPlaying) return;
        
        window.scrollBy(0, 1); // Adjust speed here
        
        // Stop if reached bottom
        if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
          setIsPlaying(false);
          return;
        }
        
        scrollRef.current = requestAnimationFrame(scrollStep);
      };
      
      // Small delay to allow smooth scroll to top to finish
      const timeoutId = setTimeout(() => {
        scrollRef.current = requestAnimationFrame(scrollStep);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current);
      }
    }

    return () => {
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlay = () => setIsPlaying(true);
  const handleStop = () => setIsPlaying(false);
  const handleRewind = () => {
    setIsPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="player-bar">
      <div className="mixer-info">
        <div className="cassette-label">
          <span className="side">A</span>
          <div className="label-text">
            <strong>Achintya's Master</strong>
            <small>Session '26</small>
          </div>
        </div>
      </div>

      <div className="mixer-controls">
        <div className="v-meter">
          <div className={`v-bar ${isPlaying ? 'animating' : ''}`} style={{ height: '40%' }}></div>
          <div className={`v-bar ${isPlaying ? 'animating' : ''}`} style={{ height: '70%' }}></div>
          <div className={`v-bar ${isPlaying ? 'animating' : ''}`} style={{ height: '50%' }}></div>
        </div>
        <div className="tape-buttons">
          <button className="tape-btn" onClick={handleRewind}>REW</button>
          <button className={`tape-btn play ${isPlaying ? 'active' : ''}`} onClick={handlePlay}>PLAY</button>
          <button className="tape-btn">FFWD</button>
          <button className="tape-btn stop" onClick={handleStop}>STOP</button>
        </div>
        <div className="v-meter">
          <div className={`v-bar ${isPlaying ? 'animating' : ''}`} style={{ height: '60%' }}></div>
          <div className={`v-bar ${isPlaying ? 'animating' : ''}`} style={{ height: '30%' }}></div>
          <div className={`v-bar ${isPlaying ? 'animating' : ''}`} style={{ height: '80%' }}></div>
        </div>
      </div>

      <div className="mixer-master">
        <div className="fader-track">
          <div className="fader-handle" style={{ bottom: isPlaying ? '80%' : '20%' }}></div>
        </div>
        <span className="fader-label">MASTER</span>
      </div>
    </footer>
  );
};

export default PlayerBar;
