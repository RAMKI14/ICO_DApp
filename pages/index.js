import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Header, HeroSection } from "../components/HomePage/index";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME;

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saveMode = localStorage.getItem("darkMode");

      let systemPrefersDark = false;

      try {
        systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      } catch (error) {
        systemPrefersDark = false;
      }

      const shouldUseDarkMode = saveMode === "false" ? false : true;
      setIsDarkMode(shouldUseDarkMode);

      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error initializinf theme:", error);
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  });

  //Toggle function & apply theme

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);

    try {
      localStorage.setItem("darkMode", newMode.toString());
    } catch (error) {
      console.error("Error saving theme preference", error);
    }
  };

  const applyTheme = (dark) => {
    if (typeof document === "undefined") return;

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray=800"
      } transition-colors duration-300`}
    >
      <Head>
        <title>
          {TOKEN_NAME} Applying power of Blockchain to the real world issues!
        </title>
        <meta name="description" content="Token ico dapp" />

        <link rel="icon" href="/logo.png" />
      </Head>

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        <HeroSection isDarkMode={isDarkMode} />
        <HeroSection toggleDarkMode={toggleDarkMode} />
      </main>
    </div>
  );
}
