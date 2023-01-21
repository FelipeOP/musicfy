import React, { useState, useEffect } from "react";
import { Artist, Album, Song } from "../../api";
import { bannerHome } from "../../assets";
import { Slider } from "../../components/Shared";
import "./Home.scss";

const artistController = new Artist();
const albumController = new Album();
const songController = new Song();

export function Home() {
  const [artists, setArtists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await artistController.getLastArtists(5);
        setArtists(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.getLastAlbums(5);
        setAlbums(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let data = [];
        const response = await songController.getLastSongs(5);
        for await (const song of response) {
          const resultAlbum = await albumController.getAlbum(song.album);
          song.image = resultAlbum.image;
          data.push(song);
        }
        setSongs(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <div
        className="home-page__banner"
        style={{ backgroundImage: `url(${bannerHome})` }}
      />

      <div className="home-page__slider">
        <h2> Últimos artistas</h2>
        {artists && <Slider data={artists} basePath="artists" />}
      </div>

      <div className="home-page__slider">
        <h2> Últimos álbumes</h2>
        {albums && <Slider data={albums} basePath="albums" />}
      </div>

      <div className="home-page__slider">
        <h2> Últimos canciones</h2>
        {songs && <Slider data={songs} song />}
      </div>
    </div>
  );
}
