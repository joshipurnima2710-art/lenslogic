import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="lm-footer">
      <div className="footer-links">
        <a href="mailto:contact@lensmarket.com">Contact Us</a>
        <button onClick={() => navigate("/about")} className={location.pathname === "/about" ? "footer-btn active" : "footer-btn"}>About Us</button>
        <button onClick={() => navigate("/feedback")} className={location.pathname === "/feedback" ? "footer-btn active" : "footer-btn"}>Feedback</button>
      </div>

      <div className="footer-bottom">
        © 2026 LensMarket • Compare Smarter • Buy Better • All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;