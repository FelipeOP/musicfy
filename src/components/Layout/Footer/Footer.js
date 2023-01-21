import React from "react";
import { Icon, Image, Input } from "semantic-ui-react";
import { Player } from "../../Shared";
import { usePlayer } from "../../../hooks/";
import "./Footer.scss";

export function Footer() {
  const { song, miniature, volume, setVolume } = usePlayer();

  return (
    <div className="footer">
      <div className="footer__left">
        {miniature && <Image src={miniature} />}
        <br />
        {song && <span> {song.name}</span>}
      </div>

      <div className="footer__center">
        <Player />
      </div>

      <div className="footer__right">
        <Input
          type="range"
          min={0}
          max={1}
          step={0.01}
          label={<Icon name="volume up" />}
          value={volume}
          onChange={(_, data) => setVolume(parseFloat(data.value))}
        />
      </div>
    </div>
  );
}
