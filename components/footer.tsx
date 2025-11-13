"use client"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-title">Follow nemuinaja</p>
        <div className="social-icons">
          <a href="#" aria-label="Instagram">
            <img src="/instagram.webp" alt="Instagram" style={{ width: 28, height: 28 }} />
          </a>
          <a href="#" aria-label="Facebook">
            <img src="/facebook.webp" alt="Facebook" style={{ width: 28, height: 28 }} />
          </a>
          <a href="#" aria-label="Twitter">
            𝕏
          </a>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="footer-copyright">© 2025 - nemuinaja. All Rights Reserved.</p>
    </footer>
  )
}
