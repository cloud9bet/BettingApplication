import RofusLogo from "./RofusLogo"
import '../styles/Footer.css' 

function Footer() {

  return (
      <footer className="footer-container">
      <div className="footer-copyright">
        <p>Copyright © 2025 Cloud9Bet </p>
      </div>
      <div className="footer-rofuslogo">
        <RofusLogo/>
      </div>
      </footer>
  )
}

export default Footer