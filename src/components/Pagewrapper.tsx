import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

export default function PageWrapper({ children }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
      typeof window !== 'undefined' && window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

  return (
    <div>
      <>{children}</>
      <div>
        {showTopBtn && <Button
          onClick={goToTop}
          id="btn-back-to-top"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            border: "none",
          }}
          className="btn-floating"
          color="secondary"
          size="lg"
        >
          <FontAwesomeIcon icon={faArrowUp} bounce />
        </Button>}
      </div>
    </div>
  );
}
