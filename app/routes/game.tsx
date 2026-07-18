import BettingButton from "~/components/BettingButton";
import type { Route } from "./+types/game";
import { Link, useLocation } from "react-router";
import { useEffect, useState, useRef } from "react";
import TileCard from "~/components/TileCard";
import type { Gender } from "~/types/game";
import GenderImg from "~/components/gender";
import { motion } from "framer-motion";
import { useGameStore } from "~/store/gameStore";
import Pile from "~/components/Pile";
import { saveScore } from "~/services/leaderboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hand Betting Game" },
    { name: "description", content: "Welcome to Hand Betting Game!" },
  ];
}

export default function Game() {
  const [modalisOpen, setModalisOpen] = useState(false);
  const location = useLocation();
  const { name, gender } =
    (location.state as { name?: string; gender?: string } | null) || {};

  const playerGender: Gender =
    gender === "male" || gender === "female" ? gender : "male";

  const resetGame = useGameStore((state) => state.resetGame);

  const startGame = useGameStore((state) => state.startGame);
  const gameState = useGameStore((state) => state.gameState);

  const saved = useRef(false);

  useEffect(() => {
    startGame(name ?? "dummy player", (gender as Gender) ?? "male");
  }, [name, gender, startGame]);

  useEffect(() => {
    if (!gameState?.gameOver) return;

    setModalisOpen(true);

    if (!saved.current) {
      saved.current = true;

      saveScore(gameState.playerName, gameState.gender, gameState.score ?? 0);
    }
  }, [gameState?.gameOver]);

  // useEffect(() => {
  //   saved.current = false;

  //   // startGame(name ?? "dummy player", gender as Gender);
  // }, []);

  const betHigher = useGameStore((state) => state.betHigher);
  const betLower = useGameStore((state) => state.betLower);

  const currentHand = gameState?.currentHand ?? [];
  const history = gameState?.history ?? [];

  console.log(gameState?.history);

  return (
    <>
      <div className="flex flex-col items-start justify-start bg-[#2A2531] w-full h-full p-6 gap-6">
        {modalisOpen && (
          <div className="fixed inset-0 z-50 justify-center items-center flex">
            <div className="bg-[#17141A] opacity-70 fixed inset-0"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="shadow-black/70 shadow-lg bg-[#2A2531] w-[60vw] h-[60vh] rounded-lg z-[60] items-center flex-col p-5 p-10 flex gap-10 "
            >
              <div className="flex items-center justify-center text-roboto text-white text-2xl font-bold">
                <p> Game Over!</p>
              </div>
              <div className="text-[#F6F6F3]/80 items-center justify-center flex flex-col gap-10 text-roboto mt-5">
                <img
                  width="60"
                  height="60"
                  src="https://img.icons8.com/emoji/60/partying-face.png"
                  alt="partying-face"
                />
                <p> Your final score is {gameState?.score ?? 0}</p>
                <BettingButton
                  title="Home"
                  onClick={() => {
                    setModalisOpen(false);
                    resetGame();
                    window.location.href = "/";
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
        <div
          id="navbar"
          className="flex flex-row pl-4 pr-4 justify-between items-center w-full"
        >
          <div className="flex flex-row gap-2 justify-start items-center">
            <img src="/tile.svg" alt="tile" className="w-7 h-7" />
            <Link
              to="/"
              className="cursor-pointer hover:text-[#CB96AB] text-roboto text-[#F6F6F3]/70 text-sm"
            >
              Home
            </Link>
            <p className="text-roboto text-[#F6F6F3]/70 text-sm">/</p>
            <p className="text-roboto text-[#F6F6F3] text-sm hover:text-[#CB96AB] cursor-pointer">
              Game
            </p>
          </div>
          <div>
            <Link
              to="/"
              className="text-roboto text-[#F6F6F3] text-sm hover:text-[#CB96AB] cursor-pointer"
            >
              Exit
            </Link>
          </div>
        </div>

        <div id="game-content" className="flex flex-col gap-5 w-full mt-10">
          <div className="flex justify-between items-center text-[#F6F6F3] p-5 bg-[#3A3341] rounded-lg w-full gap-5">
            <div className="flex items-center justify-between gap-3 pl-7">
              <GenderImg gender={playerGender} />
              <div className="flex flex-col">
                <p className="text-roboto text-[#F6F6F3]/70 text-xs">Player</p>
                <p>{gameState?.playerName}</p>
              </div>
            </div>

            <div className="flex flex-col justify-end items-center gap-1 pr-7">
              <p className="text-roboto text-[#F6F6F3]/70 text-xs">Score</p>
              <p>{gameState?.score ?? 0}</p>
            </div>
          </div>
          <div
            id="card-piles"
            className="flex flex-row gap-5 justify-between items-center w-full"
          >
            <div className="flex flex-col gap-4 text-[#F6F6F3]/80 items-start justify-center p-5">
              <small>Draw Pile</small>
              <button className="hover:opacity-80 flex flex-col gap-3 cursor-not-allowed">
                <Pile />
                <small>{gameState?.drawPileCount}</small>
              </button>
            </div>
            <div className="flex flex-col gap-4 text-[#F6F6F3]/80 items-center justify-center p-5">
              <small>Discard Pile</small>
              <button className="opacity-40 cursor-not-allowed">
                <Pile />
                <small>{gameState?.discardPileCount}</small>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <BettingButton title="Bet Higher" onClick={() => betHigher()} />
          <BettingButton title="Bet Lower" onClick={() => betLower()} />
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-5">
          <div
            id="current-cards"
            className="flex flex-col justify-center gap-5 items-center bg-[#3A3341] rounded-lg p-5 flex-wrap w-full text-[#F6F6F3]/80 text-sm font-roboto"
          >
            <div className="flex flex-row justify-between items-center gap-5 w-full">
              <strong>Current hand</strong>
              <p>value: {gameState?.currentValue ?? 0}</p>
            </div>

            <div className="flex flex-row gap-5 justify-start items-center rounded-lg flex-wrap flex-1 w-full">
              {currentHand?.length ? (
                currentHand.map((tile) => (
                  <motion.div
                    key={tile.id}
                    initial={{ opacity: 0, scaleY: 0.5, scaleX: -0.5 }}
                    whileInView={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-1"
                  >
                    <TileCard tile={tile} className="w-40 h-40" />
                  </motion.div>
                ))
              ) : (
                <p>No cards in hand</p>
              )}
            </div>
          </div>
          <div
            id="prev-cards"
            className="flex flex-col justify-start gap-5 bg-[#3A3341] rounded-lg p-5 flex-wrap w-full text-[#F6F6F3]/80 text-sm font-roboto"
          >
            <strong>History</strong>

            <div className="flex flex-col gap-8 justify-start w-full">
              {history.length
                ? [...history].reverse().map((round, index) => (
                    <div key={index}>
                      <div className="flex flex-row justify-around items-center gap-5 p-3 pb-5">
                        <>
                          <p> Round {history.length - index}</p>
                          <p> Value: {round.value}</p>
                        </>

                        <div className="flex items-center gap-5">
                          {round.hand.map((tile) => (
                            <TileCard
                              key={tile.id}
                              tile={tile}
                              className="w-10 h-10"
                            />
                          ))}
                        </div>

                        <div className="flex gap-2 items-center">
                          <p
                            className={
                              round.won
                                ? "text-[#EECCDA] font-semibold"
                                : "text-[#EECCDA] font-semibold"
                            }
                          >
                            {round.won ? "Win" : "Loss"}
                          </p>

                          {round.won ? (
                            <img
                              width="30"
                              height="30"
                              src="https://img.icons8.com/emoji/30/partying-face.png"
                              alt="partying-face"
                            />
                          ) : (
                            <img
                              width="30"
                              height="30"
                              src="https://img.icons8.com/emoji/30/crying-face.png"
                              alt="crying-face"
                            />
                          )}
                        </div>
                      </div>
                      <div className="border-t border-[#F6F6F3]/50"></div>
                    </div>
                  ))
                : "Play a round to see your previous hands!"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
