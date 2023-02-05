import React, { useState, useEffect } from "react";
import axios from "axios";
import Hls from "hls.js";

const Stream = () => {
  const [anime, setAnime] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedAnime, setSelectedAnime] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [sources, setSources] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState({});
  const [selectedSource, setSelectedSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.consumet.org/anime/animefox/${query}?page=1`
      );
      setAnime(result.data.results);
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      const result = await axios.get(
        `https://api.consumet.org/anime/animefox/info?id=${selectedAnime.id}`
      );
      setEpisodes(result.data.episodes);
    };
    if (selectedAnime.id) {
      fetchEpisodeData();
    }
  }, [selectedAnime]);

  useEffect(() => {
    const fetchSourceData = async () => {
      const result = await axios.get(
        `https://api.consumet.org/anime/animefox/watch?episodeId=${selectedEpisode.id}`
      );
      setSources(result.data.sources);
    };
    if (selectedEpisode.id) {
      fetchSourceData();
    }
  }, [selectedEpisode]);

  useEffect(() => {
    const showVideo = () => {
      const video = document.getElementById("video");
      if (Hls.isSupported() && selectedSource) {
        const hls = new Hls();
        hls.loadSource(selectedSource.url);
        hls.attachMedia(video);
      }
    };
    if (selectedSource.url) {
      showVideo();
    }
  }, [selectedSource]);

  return (
    <div className="max-w-6xl mx-auto pb-10 p-3 md:p-0">
      <video id="video" controls className="w-full md:h-[400px] rounded-md" />
      {Array.isArray(episodes) &&
        (episodes.length > 0 ? (
          <select
            onChange={(e) => setSelectedEpisode({ id: e.target.value })}
            className="mt-2 p-2 rounded-md bg-darkBg text-white"
          >
            {episodes.map((episode, index) => (
              <option key={index} value={episode.id}>
                {episode.title}
              </option>
            ))}
          </select>
        ) : null)}
      {Array.isArray(sources) &&
        (sources.length > 0 ? (
          <select
            onChange={(e) =>
              setSelectedSource(
                sources.find((source) => source.url === e.target.value)
              )
            }
            className="mt-2 ml-1 md:mt-0 p-2 rounded-md bg-darkBg text-white"
          >
            {sources.map((source, index) => (
              <option key={index} value={source.url}>
                {source.quality}
              </option>
            ))}
          </select>
        ) : null)}
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mt-3 rounded-md border-[1px] border-borderCol border-opacity-10 bg-darkBg outline-none text-white text-opacity-60 py-1 px-3"
        placeholder="search anime..."
      />
      <hr className="my-6 opacity-20" />
      {Array.isArray(anime) && (
        <ul className="space-y-2 mt-2">
          {anime.map((anime, index) => (
            <li
              className="text-white cursor-pointer bg-darkBg p-1 rounded-md border-[1px] border-borderCol border-opacity-20 transition-all duration-500 hover:border-opacity-60"
              key={index}
              onClick={() => setSelectedAnime(anime)}
            >
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stream;
