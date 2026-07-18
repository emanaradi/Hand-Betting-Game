import type { Route } from "./+types/home";
import Typewriter from "typewriter-effect";
import Aurora from "~/components/Aurora";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "~/store/gameStore";
import type { Gender } from "~/types/game";
import { getTopScores } from "~/services/leaderboard";
import Leaderboard from "~/components/Leaderboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hand Betting Game" },
    { name: "description", content: "Welcome to Hand Betting Game!" },
  ];
}

export default function Home() {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const scores = await getTopScores();
      setLeaderboardData(scores);
    }

    fetchLeaderboard();
  }, []);

  const navigate = useNavigate();
  const startGame = useGameStore((state) => state.startGame);

  const [modalOpen, setModalOpen] = useState(false);
  const [gender, setGender] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-[#2A2531]">
        {modalOpen && (
          <div className="fixed inset-0 z-50 justify-center items-center flex">
            <div className="bg-[#17141A] opacity-70 fixed inset-0"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="shadow-black/70 shadow-lg bg-[#2A2531] w-[60vw] h-[60vh] rounded-lg z-[60] flex-col p-5 p-10 flex gap-10 "
            >
              <div
                className="flex items-center justify-between text-roboto text-white cursor-pointer"
                onClick={() => setModalOpen(false)}
              >
                <div className="flex flex-row gap-4 items-center">
                  <p className="text-roboto text-[#F6F6F3]/90 text-lg font-bold">
                    First, let's get to know you better
                  </p>
                  <img src="/smiley.svg" alt="smilely" className="w-6 h-6" />
                </div>
                <p className="font-bold">X</p>
              </div>
              <div className="mt-10">
                <input
                  className="font-roboto bg-[#17141A] border border-[#BE709A]/30 rounded-full p-3 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#CB96AB] focus:border-transparent"
                  placeholder="Enter your name"
                  value={name}
                  required
                  maxLength={15}
                  minLength={4}
                  onChange={(e) => setName(e.target.value)}
                />
                <small className="text-[#CB96AB]/70 pl-4">
                  {" "}
                  You may write a nickname or your full name
                </small>
              </div>
              <div className="flex gap-10 mt-10">
                <label className="text-[#CB96AB] ml-4 font-roboto">
                  <input
                    required
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2 accent-[#BE709A]"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  Male
                </label>
                <label className="text-[#CB96AB] ml-4 font-roboto">
                  <input
                    required
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2 accent-[#BE709A]"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  Female
                </label>
              </div>
              <div className="flex flex-row items-center justify-end text-[#F6F6F3] gap-5">
                <p> Ready?</p>
                <button
                  className="flex bg-[#CB96AB] p-3 pr-7 pl-7 rounded-full font-roboto shadow-md shadow-black/50 hover:bg-[#BE709A] transition duration-300 ease-in-out cursor-pointer hover:text-white hover:scale-110  items-center justify-center text-[#2A2531]   disabled:hover:bg-[#CB96AB] disabled:hover:text-[#2A2531] disabled:hover:scale-100 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!name || !gender}
                  onClick={() => {
                    navigate("/game", { state: { name, gender } });
                    startGame(name, gender as Gender);
                  }}
                >
                  Start Game
                </button>
              </div>
            </motion.div>
          </div>
        )}
        <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#2A2531]">
          <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen">
            <Aurora
              colorStops={["#96627e", "#2d2125", "#7b585e"]}
              amplitude={0.5}
              blend={0.5}
            />
          </div>
          <div className="relative z-10 flex items-center flex-wrap gap-35">
            <div className="flex flex-col gap-14">
              <div className="flex flex-col gap-5">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="font-bold font-roboto text-6xl bg-[linear-gradient(to_right,#F6F6F3,#CB96AB,#BE709A)] bg-clip-text text-transparent tracking-wide pb-5"
                >
                  Hand Betting Game
                </motion.h1>
              </div>

              <div className="w-full text-left font-mono text-md text-[#CB96AB] text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="p-3 bg-[#17141A]/50 border rounded-full border-[#BE709A]/30 shadow-md"
                >
                  <Typewriter
                    options={{
                      strings: [
                        "Pick your hand, place your bet, and let luck settle the score!",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                    }}
                  />
                </motion.div>
              </div>
              <div className="flex flex-row gap-5 justify-start items-center">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="flex bg-[#CB96AB] p-3 pr-7 pl-7 rounded-full flex-2 font-roboto shadow-md shadow-black/50 hover:bg-[#BE709A] transition duration-300 ease-in-out cursor-pointer hover:text-white hover:scale-110  items-center justify-center"
                  onClick={() => setModalOpen(true)}
                >
                  Try Now
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  onClick={() => {
                    document
                      .getElementById("leaderboard")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="flex bg-[#F6F6F3]/90 p-3 pr-7 pl-7 rounded-full flex-2 font-roboto shadow-md shadow-black/50 hover:bg-[#BE709A] transition duration-300 ease-in-out cursor-pointer hover:text-white hover:scale-110 items-center justify-center"
                >
                  View Leaderboard
                </motion.button>
                <div className="flex-2"></div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img src="/tile.svg" alt="Tile" className="w-70 h-auto" />
            </motion.div>
          </div>
        </div>
        <div
          id="leaderboard"
          className="isolate flex flex-col items-center justify-center pb-20"
        >
          <h3 className="text-roboto text-[#F6F6F3] font-bold text-[1.6rem]">
            Leaderboard
          </h3>

          <div className="flex flex-col gap-4 justify-center items-center mt-10">
            {leaderboardData.reverse().map((item, index) => (
              <Leaderboard
                key={item.id}
                rank={(index + 1) as 1 | 2 | 3 | 4 | 5}
                score={item.score}
                name={item.playerName}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
