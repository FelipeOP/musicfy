import React, { useState } from "react";
import { Progress, Icon } from "semantic-ui-react";
import ReactPlayer from "react-player";
import { usePlayer } from "../../../hooks";
import "./Player.scss";

export function Player() {
  const { song, playing, pause, resume, volume } = usePlayer();
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const onProgress = (state) => {
    setTotalSeconds(state.loadedSeconds);
    setCurrentSeconds(state.playedSeconds);
  };

  return (
    <div className="player">
      <Icon
        onClick={playing ? pause : resume}
        name={playing ? "pause circle outline" : "play circle"}
      />

      <Progress
        progress="value"
        value={currentSeconds}
        total={totalSeconds}
        size="tiny"
        label={currentSeconds}
        
      />

      <ReactPlayer
        url={song?.file}
        playing={playing}
        volume={volume}
        height={0}
        width={0}
        onProgress={onProgress}
      />
    </div>
  );
}
