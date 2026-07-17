import React from "react";
import type { Route } from "./+types/game";
import { Link, useLocation } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hand Betting Game" },
    { name: "description", content: "Welcome to Hand Betting Game!" },
  ];
}

export default function Game() {
  const location = useLocation();
  const { name, gender } =
    (location.state as { name?: string; gender?: string } | null) || {};

  return (
    <>
      <div className="flex flex-col items-start justify-start bg-[#2A2531] w-screen h-screen p-6 gap-5">
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
      </div>
    </>
  );
}
