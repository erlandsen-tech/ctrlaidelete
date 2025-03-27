"use client";

import { useState } from "react";
import Link from "next/link";
import { Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const barlowCondensed = Barlow_Condensed({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

export default function WelcomeScreen() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    // Add a small delay before navigation to allow animation to play
    setTimeout(() => {
      window.location.href = "/sporsmal";
    }, 300);
  };

  return (
    <div
      className="amnesty-container"
      style={{
        backgroundImage:
          "url('https://amnesty.no/sites/default/files/styles/hero_xlarge/public/2023-06/Fighting%20bad%20guys%20_5.jpg?h=8f02ae08&itok=gCDdYarX')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />

      <main className="amnesty-content home-page-content">
        <div className="welcome-screen" style={{ paddingTop: 0 }}>
          <h1
            className={`welcome-title ${barlowCondensed.className}`}
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.025em",
              fontSize: "4.8rem",
              lineHeight: "1.1",
              textAlign: "left",
              marginTop: 0,
              paddingTop: 0,
              color: "white",

              width: "75%",
            }}
          >
            HVORFOR SKAL JEG BRY MEG?
          </h1>

          <p
            className="welcome-description"
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            Menneskerettigheter angår oss alle, men vi engasjerer oss av
            forskjellige grunner. Denne interaktive opplevelsen vil hjelpe deg
            med å oppdage hvilke menneskerettighetsspørsmål som samsvarer med
            dine personlige verdier.
          </p>

          <p
            className="welcome-description"
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            Sveip til høyre hvis du er enig, eller til venstre hvis du er uenig
            med påstandene. Basert på dine svar vil vi vise deg hvilke
            Amnesty-saker som passer best med dine verdier og hvordan du kan
            bidra.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "2rem",
            }}
          >
            <button
              className={`start-button ${isAnimating ? "animate-pulse" : ""}`}
              onClick={handleStart}
            >
              Start opplevelsen
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
