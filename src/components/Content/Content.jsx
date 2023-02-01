import { useState } from "react";
import axios from "axios";

const Content = () => {
  const [anime, setAnime] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [clicked, setClicked] = useState(false);

  const handleClick = (animeKey) => {
    axios
      .get(`https://nice-puce-capris.cyclic.app/anime?name=${animeKey}`)
      .then((d) => setAnime(d.data));
    setClicked(true);
  };

  const isObject = (obj) => {
    return (
      typeof obj === "object" &&
      Object.prototype.toString.call(obj) === "[object Object]"
    );
  };

  return (
    <>
      <div className="flex max-w-6xl mx-auto mt-3 md:mt-6 space-x-3 p-3">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="w-[50px] h-[35px] fill-white border-[1px] border-borderCol border-opacity-20 py-1 px-4 rounded-md bg-darkBg"
          >
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
          </svg>
        </a>
        <input
          type="text"
          className="w-full rounded-md border-[1px] border-borderCol border-opacity-20 bg-darkBg outline-none text-white text-opacity-60 py-1 px-3"
          placeholder="cari anime..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={() => handleClick(keyword)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[50px] h-[35px] bg-biru py-1 px-4 border-[1px] border-borderCol border-opacity-20 rounded-md fill-white"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </button>
      </div>
      <div className="mt-5 text-white p-3">
        {clicked == true ? (
          isObject(anime) ? (
            <div className="max-w-6xl mx-auto">
              <div className="md:flex space-x-3">
                <img
                  src={anime.anime.picture}
                  alt={anime.anime.title}
                  className="rounded-md object-cover mx-auto md:mx-0"
                />
                <div>
                  <div className="flex items-center mt-4 md:mt-0 space-x-3">
                    <h1 className="font-bold text-lg md:text-xl">
                      {anime.anime.title}
                    </h1>
                    <h1 className="px-3 py-[2px] text-sm bg-biru rounded-md opacity-80">
                      {anime.anime.type}
                    </h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    {anime.anime.genres.map((genres, i) => (
                      <p
                        key={i}
                        className="opacity-60 px-2 mt-2 text-sm border-[1px] border-borderCol border-opacity-20 rounded-md"
                      >
                        {genres}
                      </p>
                    ))}
                  </div>
                  <p
                    className="overflow-scroll h-[300px] mt-2 opacity-60 items-center pr-3"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {anime.anime.synopsis}
                  </p>
                </div>
              </div>
              <hr className="my-6 opacity-20" />
              <div className="grid grid-cols-1 text-xl">
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="w-5 h-5 fill-yellow-500"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                  <p>Score: {anime.anime.score}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="w-5 h-5 fill-blue-500"
                  >
                    <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H256zM32 320c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H160c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zm416 96v64c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V416c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32z" />
                  </svg>
                  <p>Ranked: {anime.anime.ranked}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="w-5 h-5 fill-green-500"
                  >
                    <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                  </svg>
                  <p>Members: {anime.anime.members}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="w-5 h-5 fill-red-500"
                  >
                    <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z" />
                  </svg>
                  <p>Aired: {anime.anime.aired}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="w-5 h-5 fill-orange-500"
                  >
                    <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  <p>Status: {anime.anime.status}</p>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="w-5 h-5 fill-violet-500"
                    >
                      <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                    </svg>
                    <p>Studio: </p>
                  </div>
                  {anime.anime.producers.map((studio, i) => {
                    return (
                      <p key={i} className="underline text-sm">
                        {studio},
                      </p>
                    );
                  })}
                </div>
              </div>
              <hr className="my-6 opacity-20" />
              <iframe
                src={anime.anime.trailer}
                frameborder="0"
                className="w-full h-[400px] md:h-[720px] rounded-md"
              ></iframe>
              <hr className="my-6 opacity-20" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                {anime.anime.characters.map((chara, i) => (
                  <div
                    className="flex justify-between bg-darkBg p-1 rounded-md"
                    key={i}
                  >
                    <div className="flex">
                      <img
                        src={chara.picture}
                        alt={chara.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <div className="px-1 md:px-3">
                        <a href={chara.link}>{chara.name}</a>
                        <p>{chara.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex">
                        <a
                          href={chara.seiyuu.link}
                          className="text-end px-1 md:px-3"
                        >
                          {chara.seiyuu.name}
                        </a>
                        <img
                          src={chara.seiyuu.picture}
                          alt={chara.seiyuu.name}
                          width={100}
                          height={100}
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {anime.anime.staff.map((staff, i) => (
                  <div className="flex bg-darkBg p-1 rounded-md" key={i}>
                    <div className="flex">
                      <img
                        src={staff.picture}
                        alt={staff.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <div className="px-3">
                        <a href={staff.link}>{staff.name}</a>
                        <p>{staff.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-6">
                Loading bang bentar ...
              </h1>
              <img
                src="https://media.tenor.com/VW6fRXVCok4AAAAM/inugami-korone.gif"
                width={150}
                height={150}
                className="rounded-md mx-auto"
              />
            </div>
          )
        ) : null}
      </div>
      <br />
      <br />
      <footer
        className={
          isObject(anime)
            ? "text-center p-3 bg-darkBg text-white"
            : "absolute bottom-0 left-0 right-0 text-center p-3 bg-darkBg text-white"
        }
      >
        <h1>
          © 2023 <span className="font-bold">Herlangga </span>| data from{" "}
          <a href="myanimelist.net" className="underline text-blue-500">
            Myanimelist.net
          </a>
        </h1>
      </footer>
    </>
  );
};

export default Content;
