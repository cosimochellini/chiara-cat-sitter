import type { FC } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import styles from './Servizi.module.css'

const IconCoccole: FC = () => (
  <svg viewBox="0 0 80 80" width="58" height="58" aria-hidden="true">
    <g>
      <ellipse cx="40" cy="22" rx="9" ry="5" fill="#AFD3EA" stroke="#5C4A44" strokeWidth="2" />
      <path d="M49 22 l8 -4.5 v9 Z" fill="#AFD3EA" stroke="#5C4A44" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="36" cy="21" r="1.2" fill="#5C4A44" />
    </g>
    <ellipse cx="40" cy="42" rx="26" ry="6" fill="#FFD9E3" stroke="#5C4A44" strokeWidth="2.5" />
    <path d="M14 42 h52 a26 21 0 0 1 -52 0 Z" fill="#FFB7C5" stroke="#5C4A44" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="32" cy="41" r="2.6" fill="#B37B3E" />
    <circle cx="41" cy="42.5" r="2.6" fill="#8A6A4F" />
    <circle cx="49" cy="41" r="2.6" fill="#B37B3E" />
  </svg>
)

const IconLettiera: FC = () => (
  <svg viewBox="0 0 80 80" width="58" height="58" aria-hidden="true">
    <path d="M40 8 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6 Z" fill="#F7C86B" />
    <path d="M62 20 l1.6 3.9 3.9 1.6 -3.9 1.6 -1.6 3.9 -1.6 -3.9 -3.9 -1.6 3.9 -1.6 Z" fill="#F7C86B" />
    <path d="M17 24 l1.3 3.2 3.2 1.3 -3.2 1.3 -1.3 3.2 -1.3 -3.2 -3.2 -1.3 3.2 -1.3 Z" fill="#F7C86B" />
    <path d="M16 40 h48 l-5 24 q-19 6 -38 0 Z" fill="#C9A6E8" stroke="#5C4A44" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M22 48 q18 6 36 0" stroke="#9B79BC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
)

const IconLaser: FC = () => (
  <svg viewBox="0 0 80 80" width="58" height="58" aria-hidden="true">
    <g transform="rotate(38 25 22)">
      <rect x="12" y="16" width="24" height="12" rx="6" fill="#CBC0DB" stroke="#5C4A44" strokeWidth="2.5" />
      <circle cx="38" cy="22" r="3.2" fill="#D93A5F" />
    </g>
    <path d="M36 34 q10 12 20 22" stroke="#E8506E" strokeWidth="2.5" fill="none" strokeDasharray="4 5" strokeLinecap="round" />
    <circle cx="58" cy="60" r="6" fill="#E8506E" />
    <path d="M58 48 v-6 M68 53 l4.5 -4.5 M70 62 h6 M48 53 l-4.5 -4.5" stroke="#E8506E" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

const IconMedicine: FC = () => (
  <svg viewBox="0 0 80 80" width="58" height="58" aria-hidden="true">
    <g transform="rotate(-24 40 44)">
      <rect x="20" y="35" width="40" height="17" rx="8.5" fill="#FFFFFF" stroke="#5C4A44" strokeWidth="2.5" />
      <path d="M28.5 35 h11.5 v17 h-11.5 a8.5 8.5 0 0 1 0 -17 Z" fill="#FFB7C5" stroke="#5C4A44" strokeWidth="2.5" strokeLinejoin="round" />
    </g>
    <path d="M56 18 c-2.2 -3 -6.8 -1 -5.8 2.5 c0.8 2.5 3.5 4.2 5.8 6 c2.3 -1.8 5 -3.5 5.8 -6 c1 -3.5 -3.6 -5.5 -5.8 -2.5 Z" fill="#E8506E" />
    <path d="M20 16 l1.6 3.9 3.9 1.6 -3.9 1.6 -1.6 3.9 -1.6 -3.9 -3.9 -1.6 3.9 -1.6 Z" fill="#F7C86B" />
  </svg>
)

const IconGiornalino: FC = () => (
  <svg viewBox="0 0 80 80" width="58" height="58" aria-hidden="true">
    <g transform="rotate(-6 40 42)">
      <rect x="18" y="16" width="44" height="52" rx="5" fill="#FFFFFF" stroke="#5C4A44" strokeWidth="2.5" />
      <rect x="23" y="21" width="34" height="32" rx="4" fill="#FFD9E3" />
      <path d="M32 32 l3 -5 3 4 M42 31 l3 -4 3 5" stroke="#5C4A44" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <circle cx="34" cy="38" r="1.8" fill="#5C4A44" />
      <circle cx="46" cy="38" r="1.8" fill="#5C4A44" />
      <path d="M40 41 q-2 3 -4.5 0.8 M40 41 q2 3 4.5 0.8" stroke="#5C4A44" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M28 61 h24" stroke="#CBC0DB" strokeWidth="3.5" strokeLinecap="round" />
    </g>
    <rect x="30" y="10" width="20" height="8" rx="2" fill="#B5E8B5" opacity="0.85" transform="rotate(-6 40 14)" />
  </svg>
)

const IconPremium: FC = () => (
  <svg viewBox="0 0 80 80" width="58" height="58" aria-hidden="true">
    <g transform="rotate(-28 40 40)">
      <rect x="30" y="10" width="20" height="32" rx="9" fill="#FFB7C5" stroke="#5C4A44" strokeWidth="2.5" />
      <circle cx="36" cy="18" r="1.6" fill="#FFFFFF" />
      <circle cx="44" cy="18" r="1.6" fill="#FFFFFF" />
      <circle cx="36" cy="26" r="1.6" fill="#FFFFFF" />
      <circle cx="44" cy="26" r="1.6" fill="#FFFFFF" />
      <circle cx="36" cy="34" r="1.6" fill="#FFFFFF" />
      <circle cx="44" cy="34" r="1.6" fill="#FFFFFF" />
      <rect x="35.5" y="42" width="9" height="26" rx="4.5" fill="#CBC0DB" stroke="#5C4A44" strokeWidth="2.5" />
    </g>
    <path d="M60 30 c-2.2 -3 -6.8 -1 -5.8 2.5 c0.8 2.5 3.5 4.2 5.8 6 c2.3 -1.8 5 -3.5 5.8 -6 c1 -3.5 -3.6 -5.5 -5.8 -2.5 Z" fill="#E8506E" />
    <path d="M18 52 l1.6 3.9 3.9 1.6 -3.9 1.6 -1.6 3.9 -1.6 -3.9 -3.9 -1.6 3.9 -1.6 Z" fill="#F7C86B" />
  </svg>
)

type Servizio = {
  id: string
  title: string
  desc: string
  border: string
  circle: string
  Icon: FC
}

const SERVIZI: Servizio[] = [
  { id: 'coccole', title: 'Missione Coccole', desc: 'Visite a domicilio: pappa, acqua fresca, compagnia e coccole a casa del gatto, nel suo regno.', border: styles.bRosa, circle: styles.cRosa, Icon: IconCoccole },
  { id: 'lettiera', title: 'Operazione Lettiera Scintillante', desc: 'Pulizia completa della lettiera a ogni visita. Sabbia fresca, zero odori, zampe felici.', border: styles.bViola, circle: styles.cViola, Icon: IconLettiera },
  { id: 'laser', title: 'Sessioni Gioco & Laser', desc: 'Gioco attivo su misura: pallina, piumino e laser per tenere il micio in forma e di buon umore.', border: styles.bVerde, circle: styles.cVerde, Icon: IconLaser },
  { id: 'medicine', title: 'Medicine con Dolcezza', desc: 'Somministrazione di farmaci e attenzioni speciali per gatti anziani, timidi o con esigenze particolari.', border: styles.bRosa, circle: styles.cRosa, Icon: IconMedicine },
  { id: 'giornalino', title: 'Miao-Giornalino Quotidiano', desc: 'Dopo ogni visita ricevi un report con foto e video: sai sempre come sta (e quanto è bello).', border: styles.bViola, circle: styles.cOro, Icon: IconGiornalino },
  { id: 'premium', title: 'Coccole Premium', desc: 'Grattini certificati, spazzolate rilassanti e siesta condivisa. Il pacchetto VIP: Very Important Pet.', border: styles.bVerde, circle: styles.cRosa, Icon: IconPremium },
]

export function Servizi() {
  return (
    <section id="servizi" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.headWrap}>
          <SectionHeading
            eyebrow="Cosa faccio per il tuo micio"
            title="Servizi"
            variant="viola"
            subtitle="Nomi giocosi, servizio serissimo. Ogni visita è su misura del gatto."
          />
        </Reveal>

        <div className={styles.grid}>
          {SERVIZI.map(({ id, title, desc, border, circle, Icon }) => (
            <Reveal key={id} className={styles.revealCell}>
              <div className={`${styles.card} ${border}`}>
                <div className={`${styles.circle} ${circle}`}>
                  <Icon />
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.desc}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
