import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="btn btn-dark"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 1000,
        borderRadius: "50%",
        width: "50px",
        height: "50px",
      }}
    >
      ⬆
    </button>
  );
};

export default ScrollTopButton;
