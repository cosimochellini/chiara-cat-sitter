import { useEffect } from 'react'
import { CatFace } from './CatFace'
import type { NyanLayout } from './nyanLayout'

const RAINBOW =
  'linear-gradient(180deg,#FF9AA2 0 16.6%,#FFC98A 16.6% 33.3%,#FDF3A6 33.3% 50%,#B5E8B5 50% 66.6%,#AFD3EA 66.6% 83.3%,#D9BCE3 83.3% 100%)'

type NyanCatProps = NyanLayout & {
  /** Chiamato quando l'animazione finisce, per smontare il componente. */
  onDone: () => void
}

/** Easter egg: nyan cat che attraversa lo schermo una volta. */
export function NyanCat({ top, stars, onDone }: NyanCatProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 3200)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: `${top}vh`,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 300,
          animation: 'om-nyan 3s linear forwards',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 200,
            height: 52,
            borderRadius: 10,
            background: RAINBOW,
          }}
        >
          {stars.map((star) => (
            <span
              key={star.id}
              style={{
                position: 'absolute',
                left: star.left,
                top: star.top,
                color: '#F7C86B',
                fontSize: star.size,
                animation: `om-twinkle .5s ease-in-out ${star.delay}s infinite`,
              }}
            >
              ✦
            </span>
          ))}
        </div>
        <CatFace
          title="Nyan cat"
          size={66}
          fur="#FFF0F4"
          eyes="closed"
          bow={{ color: '#E8506E', knot: '#C22F52' }}
          style={{ marginLeft: -18, flex: 'none' }}
        />
      </div>
    </div>
  )
}
