import { useCallback, useEffect, useRef, useState } from "react";

function Quote() {
  const [showText, setShowText] = useState<boolean | null>(null);
  const [content, setContent] = useState<string>(
    "In addition to his technical skills, Yafim is a great team player. Working with team members . . ."
  );

  const additionalContent =
    "of different skill sets, he was always patient and considerate, explaining complex concepts clearly. His straightforward approach helped us set realistic goals and achieve targets on time. What sets Yafim apart is his proactive approach and unwavering commitment to continuous improvement. He actively sought feedback, embraced new challenges, and consistently sought opportunities to enhance his skills and knowledge. I am confident that Yafim will continue to excel in any future endeavors. He would be a tremendous asset to any organization, and I wholeheartedly recommend him for any position that requires a highly skilled and dedicated professional.";

  const [, setMoreText] = useState<string>(additionalContent);

  const quoteRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const addText = useCallback(() => {
    intervalRef.current = window.setInterval(() => {
      setMoreText((prevMoreText) => {
        if (prevMoreText.length === 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return prevMoreText;
        }

        setContent((prevContent) => `${prevContent}${prevMoreText[0]}`);
        return prevMoreText.slice(1);
      });
    }, 50);
  }, []);

  useEffect(() => {
    if (
      showText !== null &&
      quoteRef.current &&
      content[content.length - 1] === "."
    ) {
      const height = quoteRef.current.getBoundingClientRect().height;
      window.scrollTo({
        top: 0 + height / 2,
        behavior: "smooth",
      });
    }
  }, [content, showText]);

  useEffect(() => {
    if (showText) {
      setContent((prev) => prev.replace(". . .", ""));
      addText();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setContent(
        "In addition to his technical skills, Yafim is a great team player. Working with team members . . ."
      );
      setMoreText(additionalContent);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [showText, addText]);

  return (
    <div ref={quoteRef} className="quote-wrapper">
      <div className="relative max-w-screen-md select-none justify-between text-left">
        <span className="quote">{content}</span>
        <br />
        <br />
        <span className="quote-person">
          - Sridharan Gandhi
          <br /> Sr. Director of Design Technology, View Inc.
        </span>
        {!showText ? (
          <span
            className="activate-quote"
            onClick={() => setShowText(!showText)}
            onKeyDown={() => {
              return;
            }}
          >
            I have "plenty" of time to read more . . .
          </span>
        ) : (
          <span
            className="activate-quote"
            onClick={() => setShowText(!showText)}
            onKeyDown={() => {
              return;
            }}
          >
            Ok ok I got it, thanks.
          </span>
        )}
      </div>
    </div>
  );
}

export default Quote;
