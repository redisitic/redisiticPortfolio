import React, { useRef, useEffect, useState } from "react";

/* -----------------------------------------
   Stacking Item (sticky card)
----------------------------------------- */
export const CustomScrollStackItem = ({
  children,
  index = 0,
  stackOffset = 70,
  className = "",
  scale = 1,
  opacity = 1,
  cardSpacing = 600,
}) => {
  const offset = index * stackOffset;

  return (
    <div
      style={{
        position: "sticky",
        top: `${offset}px`,
        zIndex: 100 + (index * 100), // Earlier cards have HIGHER z-index so they appear on top
        transform: `translateZ(0) scale(${scale})`,
        opacity,
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        transformOrigin: "center top",
        marginBottom: `${cardSpacing}px`,
        backdropFilter: "blur(48px)",
        WebkitBackdropFilter: "blur(48px)",
      }}
      className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
        rounded-2xl border border-white/20 shadow-2xl p-12 ${className}`}
    >
      {children}
    </div>
  );
};

/* -----------------------------------------
   Scroll Container (with stacking support)
----------------------------------------- */
const CustomScrollStack = ({
  children,
  className = "",
  height = "80vh",
  onComplete,
  onScrollChange,
  stackOffset = 70,
  centerCurrent = true,
  cardSpacing = 600, // Space between cards before they stack
}) => {
  const scrollContainerRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const itemCount = childrenArray.length;

  // Add enough padding so all cards can stack, then extra space to keep viewing the stack
  const bottomPadding = `calc(0vh - ${stackOffset * itemCount}px + ${cardSpacing}px)`;

  /* Track scroll progress and active card */
  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const complete = scrollTop >= maxScroll - 10;

      setIsComplete(complete);

      // Calculate which card is currently "active" (closest to center)
      if (centerCurrent && itemCount > 0) {
        const containerHeight = container.clientHeight;
        const centerY = scrollTop + containerHeight / 2;
        
        // Calculate based on actual card spacing
        let newActiveIndex = 0;
        for (let i = 0; i < itemCount; i++) {
          const cardTop = i * cardSpacing;
          if (centerY > cardTop + cardSpacing / 2) {
            newActiveIndex = i;
          }
        }
        
        setActiveIndex(Math.min(newActiveIndex, itemCount - 1));
      }

      if (onScrollChange) {
        onScrollChange({
          scrollTop,
          maxScroll,
          isComplete: complete,
          scrollPercentage: maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0,
          activeIndex,
        });
      }

      if (complete && onComplete && !isComplete) {
        onComplete();
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container?.removeEventListener("scroll", handleScroll);
  }, [onComplete, onScrollChange, isComplete, centerCurrent, itemCount, activeIndex, cardSpacing]);

  /* Prevent page scroll unless at boundaries */
  const handleWheel = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const atBottom =
      container.scrollTop >=
      container.scrollHeight - container.clientHeight - 10;

    const atTop = container.scrollTop <= 0;

    if ((atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
  };

  // Calculate scale and opacity for each card based on active index
  const getCardProps = (index) => {
    if (!centerCurrent) {
      return { scale: 1, opacity: 1 };
    }

    if (index === activeIndex) {
      return { scale: 1, opacity: 1 };
    } else if (index < activeIndex) {
      // Cards behind the active card - compress them
      const distance = activeIndex - index;
      const scale = Math.max(0.1, 1 - distance * 0.05);
      const opacity = 100;
      return { scale, opacity };
    } else {
      // Cards ahead - slightly dimmed
      return { scale: 0.98, opacity: 0.8 };
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`relative overflow-y-auto overflow-x-hidden scrollbar-hide ${className}`}
      style={{
        height,
        overscrollBehavior: isComplete ? "auto" : "contain",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      onWheel={handleWheel}
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        className="px-20 py-10"
        style={{
          paddingBottom: bottomPadding,
        }}
      >
        {childrenArray.map((child, index) => {
          const { scale, opacity } = getCardProps(index);
          return React.cloneElement(child, {
            key: index,
            index,
            stackOffset,
            scale,
            opacity,
            cardSpacing,
          });
        })}
      </div>
    </div>
  );
};

export default CustomScrollStack;