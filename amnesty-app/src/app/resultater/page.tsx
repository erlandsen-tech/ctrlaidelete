"use client";

import { useState, useEffect } from "react";
import { EnhancedUserResult } from "@/lib/data/types";
import { generateEnhancedUserResult } from "@/lib/data/personalityMatching";
import SocialSharing from "@/components/ui/SocialSharing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

export default function ResultsScreen() {
  const [result, setResult] = useState<EnhancedUserResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get responses from sessionStorage
      const responsesJson = sessionStorage.getItem("userResponses");

      if (responsesJson) {
        try {
          const responses = JSON.parse(responsesJson);

          // Generate enhanced result using our algorithm
          const sessionId = `session-${Date.now()}`;
          const enhancedResult = generateEnhancedUserResult(
            responses,
            sessionId
          );

          // Store personality name for sharing
          if (enhancedResult.personalityType?.name) {
            sessionStorage.setItem(
              "personalityName",
              enhancedResult.personalityType.name
            );
          }

          setResult(enhancedResult);
        } catch (error) {
          console.error("Error processing results:", error);
        }
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="amnesty-container">
        <Header />
        <main className="amnesty-content">Laster resultater...</main>
        <Footer />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="amnesty-container">
        <Header />
        <main className="amnesty-content">
          <div className="error-message">
            <h2>Kunne ikke laste resultatene</h2>
            <p>
              Det oppstod et problem med å beregne resultatene dine. Gå tilbake
              og prøv igjen.
            </p>
            <button
              className="nav-button nav-button-primary"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/sporsmal";
                }
              }}
            >
              Tilbake til spørsmål
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="amnesty-container">
      <Header />

      <main className="amnesty-content">
        <div className="results-screen">
          <h1
            className={`results-title ${barlowCondensed.className}`}
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
            Dine resultater
          </h1>

          <div className="personality-card">
            <h2
              className={`personality-name ${barlowCondensed.className}`}
              style={{ textTransform: "uppercase", letterSpacing: "0.02em" }}
            >
              {result.personalityType?.name}
            </h2>
            <p className="personality-description">
              {result.personalityType?.description}
            </p>
            <p className="personality-values">
              <strong>Hovedverdier:</strong>{" "}
              {result.personalityType?.mainValues}
            </p>
          </div>

          <h2
            className={`results-title ${barlowCondensed.className}`}
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.025em",
              fontSize: "2rem",
              lineHeight: "1.1",
              textAlign: "left",
              marginTop: "2rem",
              color: "var(--amnesty-black)",
            }}
          >
            Din verdiprofil
          </h2>

          <div className="dimensions-container">
            {result.dimensionDetails.map((detail, index) => (
              <div key={index} className="dimension-item">
                <div className="dimension-header">
                  <span
                    className="dimension-name"
                    style={{
                      color: "black",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {detail.dimension?.name}
                  </span>
                  <span
                    className="dimension-score"
                    style={{
                      color: "black",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {detail.score.toFixed(1)}
                  </span>
                </div>

                <div className="dimension-bar-container">
                  {detail.score > 0 ? (
                    <div
                      className="dimension-bar dimension-bar-positive"
                      style={{ width: `${Math.abs(detail.score) * 5}%` }}
                    ></div>
                  ) : (
                    <div
                      className="dimension-bar dimension-bar-negative"
                      style={{ width: `${Math.abs(detail.score) * 5}%` }}
                    ></div>
                  )}
                </div>

                <div className="dimension-description">
                  {detail.description}
                </div>
              </div>
            ))}
          </div>

          <div className="causes-section">
            <h2
              className={`results-title ${barlowCondensed.className}`}
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.025em",
                fontSize: "2rem",
                lineHeight: "1.1",
                textAlign: "left",
                marginTop: "2rem",
                color: "var(--amnesty-black)",
              }}
            >
              Anbefalte saker for deg
            </h2>
            <div className="causes-container">
              {result.causes.map(
                (cause, index) =>
                  cause && (
                    <div key={index} className="cause-card">
                      <h3
                        className={`cause-name ${barlowCondensed.className}`}
                        style={{
                          textTransform: "uppercase",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {cause.name}
                      </h3>
                      <p className="cause-description">{cause.description}</p>
                      {cause.linkUrl && (
                        <a
                          href={cause.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cause-link"
                        >
                          Les mer
                        </a>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>

          <SocialSharing
            personalityType={result.personalityType?.name || ""}
            personalityDescription={result.personalityType?.description}
          />

          <div className="nav-buttons">
            <button
              className="nav-button nav-button-primary"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/handling";
                }
              }}
            >
              Hva kan JEG gjøre?
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
