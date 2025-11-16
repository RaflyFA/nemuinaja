"use client"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="follow-block">
          <p className="footer-title">Follow <strong>nemuinaja</strong></p>
          <div className="social-icons">
            <a href="https://www.instagram.com/nemuinaja_?igsh=MTZ5NGFuYzI4eWx0eQ=="
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer">
              <img src="/instagram.webp" alt="Instagram" style={{ width: 20, height: 20 }} />
            </a>
            <a href="https://www.facebook.com/share/17jLggsf7M/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer">
              <img src="/facebook.webp" alt="Facebook" style={{ width: 20, height: 20 }} />
            </a>
            <a href="https://x.com/nemuinaja_?t=SwlmdW8tOHfWyaAlWMp7HA&s=09"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer">
              <img src="/x.webp" alt="X" style={{ width: 20, height: 20 }} />
            </a>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="footer-title">© 2025 - nemuinaja. All Rights Reserved.</p>
    </footer>
  )
}
