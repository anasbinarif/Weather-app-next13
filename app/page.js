"use client";

import Image from "next/image";
import Search from "./components/Search";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  return (
    <div className="flex items-center ml-10 w-screen justify-evenly h-3/4">
      <div className="bg-gray-200 h-full flex justify-center items-center rounded-lg w-1/3">
        <Image src="/images/umbrella_black.png" width={400} height={400} />
      </div>
      <div className="h-1/3 flex flex-col justify-evenly items-center">
        <Image src="/images/umbrella.png" width={50} height={50} />
        <div className="flex flex-col items-center">
          <div className="text-6xl font-extrabold">Breeze</div>
          <p className="text-gray-400">Weather App</p>
        </div>
        <Link
          className="mt-10 bg-blue-400 rounded-full text-white px-5 py-3 text-xs"
          href="/weather"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
