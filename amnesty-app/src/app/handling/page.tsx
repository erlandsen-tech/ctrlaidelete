"use client";

import { useState, useEffect } from "react";
import { AmnestyCause } from "@/lib/data/types";
import { amnestyCauses } from "@/lib/data/amnestyCauses";
import SocialSharing from "@/components/ui/SocialSharing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

export default function ActionScreen() {
  const [causes, setCauses] = useState<(AmnestyCause | undefined)[]>([]);
  const [personalityType, setPersonalityType] = useState<string>("");

  useEffect(() => {
    // Only run client-side code in the browser environment
    if (typeof window !== "undefined") {
      // Get recommended causes from sessionStorage
      const userResultJson = sessionStorage.getItem("userResponses");

      if (userResultJson) {
        try {
          // In a real implementation, we would use the stored result
          // For now, we'll get the causes from the URL or use default ones
          const urlParams = new URLSearchParams(window.location.search);
          const causeIds = urlParams.get("causes")?.split(",").map(Number) || [
            1, 2, 3,
          ];

          // Get the causes
          const recommendedCauses = causeIds.map((causeId) =>
            amnestyCauses.find((c) => c.id === causeId)
          );

          setCauses(recommendedCauses);

          // Get personality type name from sessionStorage if available
          const personalityName =
            sessionStorage.getItem("personalityName") ||
            "din personlighetstype";
          setPersonalityType(personalityName);
        } catch (error) {
          console.error("Error processing action data:", error);
          // Use default causes if there's an error
          setCauses(amnestyCauses.slice(0, 3));
        }
      } else {
        // Use default causes if no user result is available
        setCauses(amnestyCauses.slice(0, 3));
      }
    } else {
      // Server-side rendering - use default causes
      setCauses(amnestyCauses.slice(0, 3));
    }
  }, []);

  // Social sharing functions
  const shareOnFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(
        `Jeg er ${personalityType} i Amnesty Internationals "Hvorfor skal JEG bry meg?" test. Finn ut hvilken menneskerettighetsforkjemper du er!`
      );
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
        "_blank"
      );
    }
  };

  const shareOnTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(
        `Jeg er ${personalityType} i Amnesty Internationals "Hvorfor skal JEG bry meg?" test. Finn ut hvilken menneskerettighetsforkjemper du er! #AmnestyNorge`
      );
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank"
      );
    }
  };

  const shareOnLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(
        `Min menneskerettighetsprofil: ${personalityType}`
      );
      const summary = encodeURIComponent(
        `Jeg tok Amnesty Internationals "Hvorfor skal JEG bry meg?" test og oppdaget at jeg er ${personalityType}. Finn ut hvilken menneskerettighetsforkjemper du er!`
      );
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
        "_blank"
      );
    }
  };

  return (
    <div className="amnesty-container">
      <Header />

      <main className="amnesty-content">
        <div className="action-screen">
          <h1
            className={`action-title ${barlowCondensed.className}`}
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.025em",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              textAlign: "left",
              marginTop: 0,
              paddingTop: 0,
              color: "var(--amnesty-black)",
              width: "75%",
            }}
          >
            Hva kan JEG gjøre?
          </h1>

          <p className="action-description">
            Basert på dine verdier og interesser har vi funnet disse
            Amnesty-sakene som passer best for deg. Her er konkrete måter du kan
            bidra på:
          </p>

          <div className="causes-container">
            {causes.map(
              (cause, index) =>
                cause && (
                  <div key={index} className="cause-card">
                    {cause.imageUrl && (
                      <div className="cause-image">
                        <img src={cause.imageUrl} alt={cause.name} />
                      </div>
                    )}

                    <div className="cause-content">
                      <h3
                        className={`cause-name ${barlowCondensed.className}`}
                        style={{
                          textTransform: "uppercase",
                          letterSpacing: "0.02em",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          display: "inline-block",
                        }}
                      >
                        {cause.name}
                      </h3>
                      <p
                        className="cause-description"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          marginTop: "8px",
                          marginBottom: "12px",
                        }}
                      >
                        {cause.description}
                      </p>

                      <div
                        className="cause-status"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          marginBottom: "8px",
                        }}
                      >
                        <strong>Status:</strong> {cause.status}
                      </div>

                      <div
                        className="cause-actions"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          marginBottom: "12px",
                        }}
                      >
                        <strong>Hva du kan gjøre:</strong> {cause.actions}
                      </div>

                      <a
                        href={cause.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cause-link"
                      >
                        Les mer og engasjer deg
                      </a>
                    </div>
                  </div>
                )
            )}
          </div>

          <SocialSharing
            personalityType={personalityType}
            personalityDescription="En menneskerettighetsforkjemper som bryr seg om viktige saker."
          />

          <div className="nav-buttons">
            <button
              className="nav-button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/resultater";
                }
              }}
            >
              Tilbake til resultater
            </button>

            <button
              className="nav-button nav-button-primary"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/";
                }
              }}
            >
              Start på nytt
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
