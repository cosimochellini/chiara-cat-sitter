import type { CSSProperties } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { PawRating } from '../PawRating/PawRating'
import styles from './Recensioni.module.css'

type Review = {
  id: string
  name: string
  breed: string
  rating: number
  quote: string
  photoBg: string
  tapeColor: string
  tapeRot: number
  cardRot: number
}

const REVIEWS: Review[] = [
  {
    id: 'daisy',
    name: 'Daisy',
    breed: 'rossa tigrata, sorella chiacchierona',
    rating: 4,
    quote:
      'l’unica sorella simpatica (Trudy non la sopporto). con lei chiacchieriamo di tante cose e abbiamo i nostri rituali personali. 4 zampette perchè non le perdono di essere andata a vivere da sola',
    photoBg: '#FFE3EA',
    tapeColor: 'rgba(181,232,181,0.8)',
    tapeRot: -4,
    cardRot: -2,
  },
  {
    id: 'trudy',
    name: 'Trudy',
    breed: 'tigrata, la sorellona maestosa',
    rating: 4,
    quote:
      'la mia sorellona, con lei sbavo dalle fusa che faccio ogni volta che la vedo. 4 zampette perchè non le perdono di essere andata a vivere da sola',
    photoBg: '#EFE3FA',
    tapeColor: 'rgba(255,183,197,0.85)',
    tapeRot: 3,
    cardRot: 1.5,
  },
  {
    id: 'briciola',
    name: 'Briciola',
    breed: 'tigrata, veterana ammorbidita',
    rating: 5,
    quote:
      'Soffiavo sempre a tutti ma con la Chiara mi sono abituata ad andare d’accordo anche con gli umani diversi da babbo mamma e Franci. O forse è stata solo la vecchiaia?',
    photoBg: '#D8F3E7',
    tapeColor: 'rgba(201,166,232,0.7)',
    tapeRot: -5,
    cardRot: -1.2,
  },
  {
    id: 'oscar',
    name: 'Oscar',
    breed: 'bianco e tigrato, primo amore',
    rating: 5,
    quote:
      'Chiara è stata la mia prima cotta, ma col tempo siamo diventati amici di pappa e di giochi. Corse per la casa ovunqueeee',
    photoBg: '#FFF1D6',
    tapeColor: 'rgba(175,211,234,0.85)',
    tapeRot: 4,
    cardRot: 2,
  },
  {
    id: 'misa',
    name: 'Misa',
    breed: 'crema soffice, adolescente',
    rating: 5,
    quote:
      'quando ero solo una pallina bianca di pelo e i miei erano a lavoro, c’era la Chiara a tenermi compagnia. Oggi sono cresciuta e come ogni adolescente non sono più disposta a stare ore a farmi grattare il pancino. Certo che però 5 minuti....',
    photoBg: '#FFE3EA',
    tapeColor: 'rgba(247,200,107,0.7)',
    tapeRot: -3,
    cardRot: -1.8,
  },
  {
    id: 'kiki',
    name: 'Kiki',
    breed: 'nera, ospite lampo',
    rating: 5,
    quote:
      'Tecnica di apertura scatolette impeccabile. Grattini dietro le orecchie a livello olimpico. La riassumerei anche subito, peccato siano stati solo pochi giorni',
    photoBg: '#EFE3FA',
    tapeColor: 'rgba(181,232,181,0.8)',
    tapeRot: 5,
    cardRot: 1.2,
  },
  {
    id: 'casimiro',
    name: 'Casimiro',
    breed: 'soriano, atleta professionista',
    rating: 5,
    quote:
      'Lanci di pallina di una precisione commovente. Sessioni laser da standing ovation. Il mio allenatore di fiducia.',
    photoBg: '#D8F3E7',
    tapeColor: 'rgba(255,183,197,0.85)',
    tapeRot: -4,
    cardRot: -2.2,
  },
]

export function Recensioni() {
  return (
    <section id="recensioni" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.headWrap}>
          <SectionHeading
            eyebrow="Recensioni verificate al 100% feline"
            title="Dicono di me… i diretti interessati"
            variant="biancoRosa"
          />
        </Reveal>

        <div className={styles.grid}>
          {REVIEWS.map((review) => (
            <Reveal key={review.id} className={styles.cell}>
              <figure
                className={styles.figure}
                style={{ '--rot': `${review.cardRot}deg` } as CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className={styles.tape}
                  style={
                    {
                      '--tapeRot': `${review.tapeRot}deg`,
                      background: review.tapeColor,
                    } as CSSProperties
                  }
                />
                <span className={styles.name}>{review.name}</span>
                <div className={styles.photo} style={{ background: review.photoBg }}>
                  <img
                    className={styles.photoImg}
                    src={`/reviews/${review.id}.webp`}
                    alt={`Foto di ${review.name}`}
                    width={480}
                    height={480}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.breed}>{review.breed}</span>
                  <PawRating value={review.rating} label={`${review.rating} zampette su 5`} />
                  <blockquote className={styles.quote}>{review.quote}</blockquote>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
