"use client";

import { useState, useEffect, useRef } from "react";
import { useSwipe } from "@/hooks/swipe/useSwipe";
import { Question } from "@/lib/data/types";
import { allQuestions } from "@/lib/data/questions";
import { dimensions } from "@/lib/data/dimensions";
import { questionDimensionMappings } from "@/lib/data/questionDimensionMappings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

export default function QuestionScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<
    { questionId: number; agree: boolean }[]
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right" | null
  >(null);
  const [isEntering, setIsEntering] = useState(true);
  const [swipePosition, setSwipePosition] = useState(0);
  const [isActivelyDragging, setIsActivelyDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize with a balanced selection of questions
  useEffect(() => {
    // Keep at 8 questions but select more strategic ones
    const selectedQuestions = getBalancedQuestions(8);
    setQuestions(selectedQuestions);
  }, []);

  // Add entrance animation when a new question appears
  useEffect(() => {
    if (questions.length > 0) {
      // Start with entering animation
      setIsEntering(true);

      // Remove entering class after animation completes
      const timer = setTimeout(() => {
        setIsEntering(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, questions]);

  // Function to get a balanced set of questions that cover different dimensions
  const getBalancedQuestions = (count: number): Question[] => {
    // Create a map to track which dimensions we've covered
    const dimensionCoverage = new Map<number, number>();
    dimensions.forEach((dim) => dimensionCoverage.set(dim.id, 0));

    // Create a mapping of questions to their dimensions
    const questionDimensions = new Map<number, number[]>();
    allQuestions.forEach((q) => {
      const dims = questionDimensionMappings
        .filter((mapping) => mapping.questionId === q.id)
        .map((mapping) => mapping.dimensionId);
      questionDimensions.set(q.id, dims);
    });

    // Shuffle questions first
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected: Question[] = [];

    // Select diverse questions that cover different dimensions
    while (selected.length < count) {
      // Find dimensions with least coverage
      let minCoverage = Math.min(...[...dimensionCoverage.values()]);

      // Find a question that covers the least-covered dimensions
      let bestQuestion: Question | undefined;
      let bestScore = -1;

      // Only check a subset of questions to add randomness
      const candidateQuestions = shuffled.slice(0, 20);

      for (const q of candidateQuestions) {
        if (selected.includes(q)) continue;

        const dims = questionDimensions.get(q.id) || [];
        let score = 0;

        // Score questions that cover less-represented dimensions higher
        dims.forEach((dim) => {
          const coverage = dimensionCoverage.get(dim) || 0;
          if (coverage === minCoverage) {
            score += 2; // Bonus for covering least-covered dimensions
          } else {
            score += 1; // Still good to cover any dimension
          }
        });

        // Add some randomness to the score
        score += Math.random() * 2;

        if (score > bestScore) {
          bestScore = score;
          bestQuestion = q;
        }
      }

      if (bestQuestion) {
        selected.push(bestQuestion);
        // Update coverage
        const dims = questionDimensions.get(bestQuestion.id) || [];
        dims.forEach((dim) => {
          dimensionCoverage.set(dim, (dimensionCoverage.get(dim) || 0) + 1);
        });
      } else {
        // If we can't find a better question, just add a random one
        const remaining = shuffled.filter((q) => !selected.includes(q));
        if (remaining.length > 0) {
          selected.push(remaining[0]);
        } else {
          break; // No more questions available
        }
      }
    }

    return selected;
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleResponse = (agree: boolean) => {
    // Don't process if we're animating or no question is available
    if (isAnimating || !currentQuestion) return;

    // Set animation direction
    setAnimationDirection(agree ? "right" : "left");
    setIsAnimating(true);

    // Reset swipe position
    setSwipePosition(0);
    setIsActivelyDragging(false);

    // Record response
    const newResponse = {
      questionId: currentQuestion.id,
      agree,
    };

    // Add to responses array
    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    // Wait for animation to complete
    setTimeout(() => {
      // Move to next question or results page
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Generate random responses for remaining questions to create variety
        const allResponses =
          generateAdditionalRandomResponses(updatedResponses);

        // Save responses to sessionStorage for the results page
        if (typeof window !== "undefined") {
          sessionStorage.setItem("userResponses", JSON.stringify(allResponses));
          // Navigate to results page
          window.location.href = "/resultater";
        }
      }

      // Reset animation state
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 300);
  };

  // Function to generate additional random responses to fill out the dataset
  const generateAdditionalRandomResponses = (
    userResponses: { questionId: number; agree: boolean }[]
  ) => {
    // Get the question IDs that the user has already answered
    const answeredQuestionIds = userResponses.map((r) => r.questionId);

    // Add 12 more random responses to make the total responses cover more dimensions
    const additionalQuestions = allQuestions
      .filter((q) => !answeredQuestionIds.includes(q.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);

    const additionalResponses = additionalQuestions.map((q) => ({
      questionId: q.id,
      agree: Math.random() > 0.5, // Random true/false
    }));

    return [...userResponses, ...additionalResponses];
  };

  // Custom touch handlers for real-time dragging
  const handleCustomTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setIsActivelyDragging(true);
    setSwipePosition(0);
  };

  const handleCustomTouchMove = (e: React.TouchEvent) => {
    if (!isActivelyDragging || isAnimating) return;

    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;
    const startX = screenWidth / 2; // Assume touch started at center
    const deltaX = touchX - startX;

    // Update the card's position with CSS variable
    setSwipePosition(deltaX);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--swipe-x", deltaX.toString());
    }
  };

  const handleCustomTouchEnd = (e: React.TouchEvent) => {
    if (!isActivelyDragging || isAnimating) return;

    // Check if the swipe was significant enough to trigger an action
    const threshold = 100; // Minimum distance to consider it a swipe

    if (swipePosition < -threshold) {
      // Swiped left - disagree
      handleResponse(false);
    } else if (swipePosition > threshold) {
      // Swiped right - agree
      handleResponse(true);
    } else {
      // Reset position if swipe wasn't far enough
      setSwipePosition(0);
      if (cardRef.current) {
        cardRef.current.style.setProperty("--swipe-x", "0");
      }
    }

    setIsActivelyDragging(false);
  };

  // Similar handlers for mouse events
  const handleCustomMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    setIsActivelyDragging(true);

    // Store the starting position in the dataset
    if (cardRef.current) {
      cardRef.current.dataset.startX = e.clientX.toString();
    }
  };

  const handleCustomMouseMove = (e: React.MouseEvent) => {
    if (!isActivelyDragging || isAnimating) return;

    // Get the starting position
    const startX = cardRef.current?.dataset.startX
      ? parseInt(cardRef.current.dataset.startX)
      : e.clientX;
    const deltaX = e.clientX - startX;

    // Update the card's position
    setSwipePosition(deltaX);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--swipe-x", deltaX.toString());
    }
  };

  const handleCustomMouseUp = (e: React.MouseEvent) => {
    if (!isActivelyDragging || isAnimating) return;

    // Check if the swipe was significant enough
    const threshold = 100;

    if (swipePosition < -threshold) {
      // Swiped left
      handleResponse(false);
    } else if (swipePosition > threshold) {
      // Swiped right
      handleResponse(true);
    } else {
      // Reset position
      setSwipePosition(0);
      if (cardRef.current) {
        cardRef.current.style.setProperty("--swipe-x", "0");
      }
    }

    setIsActivelyDragging(false);
  };

  // Set up swipe handlers (original implementation)
  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  } = useSwipe({
    onSwipeLeft: () => handleResponse(false),
    onSwipeRight: () => handleResponse(true),
  });

  // Calculate progress percentage
  const progressPercentage =
    questions.length > 0 ? (currentQuestionIndex / questions.length) * 100 : 0;

  if (!currentQuestion) {
    return <div className="amnesty-container">Loading...</div>;
  }

  // Determine the correct swipe class
  const getSwipeClass = () => {
    if (isAnimating && animationDirection) {
      return `animate-${animationDirection}`;
    }

    if (isActivelyDragging) {
      return swipePosition < 0
        ? "swiping-left"
        : swipePosition > 0
        ? "swiping-right"
        : "";
    }

    return "";
  };

  return (
    <div
      className="amnesty-container"
      style={{ backgroundColor: "var(--amnesty-gray)" }}
    >
      <Header />

      <main className="amnesty-content">
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="question-container">
          <div
            ref={cardRef}
            className={`question-card ${getSwipeClass()} ${
              isEntering ? "card-enter card-enter-active" : ""
            }`}
            onTouchStart={handleCustomTouchStart}
            onTouchMove={handleCustomTouchMove}
            onTouchEnd={handleCustomTouchEnd}
            onMouseDown={handleCustomMouseDown}
            onMouseMove={handleCustomMouseMove}
            onMouseUp={handleCustomMouseUp}
            onMouseLeave={handleCustomMouseUp}
          >
            <div className="question-content">
              <p
                className={`question-text ${barlowCondensed.className}`}
                style={{
                  textTransform: "uppercase",
                  textAlign: "left",
                  letterSpacing: "0.025em",
                  fontSize: "1.8rem",
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "4px",
                }}
              >
                {currentQuestion.text}
              </p>

              {currentQuestion.imageUrl && (
                <div className="question-image">
                  <img
                    src={currentQuestion.imageUrl}
                    alt="Spørsmålsillustrasjon"
                  />
                </div>
              )}

              {currentQuestion.videoUrl && (
                <div className="question-video">
                  <video controls>
                    <source src={currentQuestion.videoUrl} type="video/mp4" />
                    Din nettleser støtter ikke videoavspilling.
                  </video>
                </div>
              )}
            </div>

            <div className="swipe-instructions">
              <div className="swipe-left"></div>
              <div className="swipe-right"></div>
            </div>
          </div>
        </div>

        <div className="nav-buttons">
          <button
            className="nav-button"
            onClick={() => handleResponse(false)}
            disabled={isAnimating}
          >
            Uenig
          </button>
          <button
            className="nav-button nav-button-primary"
            onClick={() => handleResponse(true)}
            disabled={isAnimating}
          >
            Enig
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
