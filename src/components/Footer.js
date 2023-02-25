import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div>
        <span>mds.ai © 2023 intuition</span>
        <div style={{ gap: "8px" }}>
          <Link to="/help">Help Desk</Link>
          <span>|</span>
          <Link to="/">Contact Us</Link>
        </div>
      </div>
    </>
  );
}

export default Footer;
