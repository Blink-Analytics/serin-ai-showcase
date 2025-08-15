import React, { useState, useEffect } from 'react';
import ScrollFloat from './ScrollFloat';

const InterviewsSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const cyclicTexts = ["On Demand.", "Analyzed.", "Scalable"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % cyclicTexts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [cyclicTexts.length]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-black/10 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main layout: Interviews left, rotating text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side: "Interviews" */}
          <div className="flex flex-col">
            <ScrollFloat
              animationDuration={1}
              ease='back.inOut(2)'
              scrollStart='center bottom+=50%'
              scrollEnd='bottom bottom-=40%'
              stagger={0.03}
              containerClassName="text-left"
              textClassName="text-white text-6xl md:text-8xl lg:text-9xl font-bold leading-tight"
            >
              Interviews
            </ScrollFloat>
          </div>
          
          {/* Right side: Cycling text with letter-by-letter animation */}
          <div className="relative h-32 md:h-40 lg:h-48 flex items-center justify-center lg:justify-start">
            {cyclicTexts.map((text, index) => (
              <div
                key={text}
                className={`absolute transition-all duration-1000 ${
                  index === currentTextIndex
                    ? 'opacity-100 transform scale-100'
                    : 'opacity-0 transform scale-95'
                }`}
              >
                <ScrollFloat
                  animationDuration={1}
                  ease='back.inOut(2)'
                  scrollStart='center bottom+=30%'
                  scrollEnd='bottom bottom-=60%'
                  stagger={0.03}
                  containerClassName=""
                  textClassName="text-blue-400 text-4xl md:text-6xl lg:text-7xl font-light"
                >
                  {text}
                </ScrollFloat>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsSection;
