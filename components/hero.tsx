"use client"

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        Temukan<br></br>
        <span 
          style={{
            background: 'linear-gradient(90deg, #5AC4B5 4%, #303030 83%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          UMKM lokal
        </span>
        {' '}terbaik di Tasikmalaya
      </h1>
      <p className="hero-subtitle">
        Jelajahi cerita dan karya di balik setiap usaha lokal yang mungkin belum pernah anda temukan sebelumnya.
      </p>
      <button className="btn btn-primary">
        Eksplor UMKM
        <span className="btn-arrow">→</span>
      </button>
    </section>
  )
}
