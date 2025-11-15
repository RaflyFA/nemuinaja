"use client"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="follow-block">
          <p className="footer-title">Follow <strong>nemuinaja</strong></p>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <img src="/instagram.webp" alt="Instagram" style={{ width: 20, height: 20 }} />
            </a>
            <a href="#" aria-label="Facebook">
              <img src="/facebook.webp" alt="Facebook" style={{ width: 20, height: 20 }} />
            </a>
            <a href="#" aria-label="Twitter">
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
