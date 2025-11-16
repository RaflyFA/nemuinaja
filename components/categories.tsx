"use client"

import React, { useState, useRef, useEffect } from "react"

type Item = { id: number; title: string; image: string }

export default function Categories() {
  const items: Item[] = [
    { id: 1, title: "Palm Trees", image: "https://picsum.photos/seed/1/420/320" },
    { id: 2, title: "Bridge", image: "https://picsum.photos/seed/2/420/320" },
    { id: 3, title: "Waterfall", image: "https://picsum.photos/seed/4/420/320" }
  ]
  const [active, setActive] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const CARD = 220 
  const CARD_HEIGHT = 200 
  const SIDE_VISIBLE_PCT = 0.32 
  const SIDE_VISIBLE = Math.round(CARD * SIDE_VISIBLE_PCT)
  const GAP = 14
  const VIEWPORT_WIDTH = CARD + SIDE_VISIBLE * 2
  const next = () => setActive((a) => a + 1)
  const prev = () => setActive((a) => a - 1)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let startX = 0
    let dx = 0
    let down = false

    const onDown = (e: PointerEvent) => {
      down = true
      startX = e.clientX
      el.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      dx = e.clientX - startX
    }
    const onUp = (e: PointerEvent) => {
      down = false
      if (Math.abs(dx) > 40) {
        if (dx < 0) next()
        else prev()
      }
      dx = 0
    }

    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])
  function transformForIndex(index: number) {
    const offsetIndex = index - active
    const spacing = CARD + GAP
    const x = offsetIndex * spacing
    const absIdx = Math.abs(offsetIndex)
    const y = offsetIndex === 0 ? 0 : -20 * (1 / Math.max(1, absIdx))
    const baseRotate = 14 
    const rotate = offsetIndex === 0 ? 0 : (offsetIndex > 0 ? -baseRotate : baseRotate) * (1 / Math.max(1, absIdx))
    const scale = offsetIndex === 0 ? 1 : 0.92
    const zIndex = 200 - Math.abs(offsetIndex)
    return { transform: `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`, zIndex }
  }
  const WINDOW = 7
  const MID = Math.floor(WINDOW / 2)
  function windowIndices() {
    const res: number[] = []
    for (let i = active - MID; i <= active + MID; i++) res.push(i)
    return res
  }
  return (
    <section style={{ textAlign: 'center', padding: '32px 0' }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
        Jelajahi UMKM
        <br />
        <span style={{ background: 'linear-gradient(90deg,#5AC4B5 4%,#303030 83%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Populer
        </span>
      </h2>

      <div style={{ height: 20 }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <div style={{ width: VIEWPORT_WIDTH, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              height: CARD_HEIGHT,
              width: '100%',
              display: 'block'
            }}
          >
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', height: '100%', width: '100%' }}>
              {windowIndices().map((idx) => {
                  const len = items.length
                  const wrappedIndex = ((idx % len) + len) % len
                  const it = items[wrappedIndex]
                  const offsetIndex = idx - active
                  const { transform, zIndex } = transformForIndex(idx)
                return (
                  <div
                    key={`${it.id}-${idx}`}
                      role="button"
                      onClick={() => {
                        const wrappedActive = ((active % len) + len) % len
                        let diff = wrappedIndex - wrappedActive
                        if (diff > len / 2) diff -= len
                        if (diff < -len / 2) diff += len
                        setActive((a) => a + diff)
                      }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transformOrigin: 'center center',
                      transform: `translate(-50%,-50%) ${transform}`,
                      transition: 'transform 480ms cubic-bezier(0.22,1,0.36,1), box-shadow 360ms',
                      width: CARD,
                      height: CARD_HEIGHT * 0.8,
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: '#eee',
                      boxShadow: offsetIndex === 0 ? '0 12px 30px rgba(0,0,0,0.22)' : '0 6px 18px rgba(0,0,0,0.10)',
                      zIndex,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <div style={{ flex: '1 1 auto', backgroundImage: `url(${it.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div style={{ padding: '8px 10px', background: '#111', color: '#fff', fontSize: 13, textAlign: 'center' }}>
                      <div style={{ fontWeight: 700 }}>{it.title}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>

      <div style={{ height: 18 }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <button
          aria-label="prev"
          onClick={prev}
          style={{ width: 34, height: 34, borderRadius: 9999, background: '#222', color: '#fff', border: 'none' }}
        >
          ‹
        </button>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '0 6px' }}>
            {items.map((_, idx) => {
              const len = items.length
              const wrappedActive = ((active % len) + len) % len
              const isActiveDot = idx === wrappedActive
              return (
                <div
                  key={idx}
                  onClick={() => {
                    let diff = idx - wrappedActive
                    if (diff > len / 2) diff -= len
                    if (diff < -len / 2) diff += len
                    setActive((a) => a + diff)
                  }}
                  style={{
                    width: isActiveDot ? 28 : 10,
                    height: 8,
                    borderRadius: 8,
                    background: isActiveDot ? '#222' : '#ccc',
                    transition: 'all 240ms',
                    cursor: 'pointer'
                  }}
                />
              )
            })}
          </div>

        <button
          aria-label="next"
          onClick={next}
          style={{ width: 34, height: 34, borderRadius: 9999, background: '#222', color: '#fff', border: 'none' }}
        >
          ›
        </button>
      </div>
    </section>
  )
}