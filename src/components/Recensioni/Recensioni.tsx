import type { CSSProperties } from 'react'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { PawRating } from '../PawRating/PawRating'
import { CatFace } from '../svg/CatFace'
import { useEarWiggle } from '../../behaviors/useEarWiggle'
import styles from './Recensioni.module.css'

type CatProps = Parameters<typeof CatFace>[0]
type CatConfig = Omit<CatProps, 'title' | 'earWiggle' | 'className' | 'size'>

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
  cat: CatConfig
}

const REVIEWS: Review[] = [
  {
    id: 'polpetta',
    name: 'Polpetta',
    breed: 'europeo tigrato, critico gastronomico',
    rating: 5,
    quote:
      '«Tecnica di apertura scatolette impeccabile. Grattini dietro le orecchie a livello olimpico. La riassumerei anche subito.»',
    photoBg: '#FFE3EA',
    tapeColor: 'rgba(181,232,181,0.8)',
    tapeRot: -4,
    cardRot: -2,
    cat: { fur: '#EFBE8A', eyes: 'open', stripes: true, stripeColor: '#C98D4B', whiskers: true, feet: true, accessory: 'heartbib', accessoryColor: '#D93A5F' },
  },
  {
    id: 'nuvola',
    name: 'Principessa Nuvola',
    breed: 'persiana, di sangue reale',
    rating: 5,
    quote:
      '«Finalmente un’umana che capisce che vado spazzolata OGNI giorno. Servizio degno del mio rango. Approvata dalla corona.»',
    photoBg: '#EFE3FA',
    tapeColor: 'rgba(255,183,197,0.85)',
    tapeRot: 3,
    cardRot: 1.5,
    cat: { fur: '#FFFDFB', eyes: 'open', whiskers: true, feet: true, accessory: 'crown', accessoryColor: '#F7C86B' },
  },
  {
    id: 'attila',
    name: 'Attila',
    breed: 'nero, ex randagio di quartiere',
    rating: 5,
    quote:
      '«Io odio tutti. Lei no. Non so spiegarmelo e la cosa mi turba profondamente.»',
    photoBg: '#D8F3E7',
    tapeColor: 'rgba(201,166,232,0.7)',
    tapeRot: -5,
    cardRot: -1.2,
    cat: { fur: '#5A525E', stroke: '#332D36', eyes: 'slit', whiskers: true, whiskerColor: '#A79FB0', feet: true },
  },
  {
    id: 'gino',
    name: 'Gino',
    breed: 'rosso, esperto di pisolini',
    rating: 5,
    quote:
      '«Puntualissima con la pappa. Ho provato a convincerla che mangio sei volte al giorno: non ci è cascata. Rispetto.»',
    photoBg: '#FFF1D6',
    tapeColor: 'rgba(175,211,234,0.85)',
    tapeRot: 4,
    cardRot: 2,
    cat: { fur: '#F2A65A', eyes: 'closed', stripes: true, stripeColor: '#D97F2E', whiskers: true, feet: true, accessory: 'bandana', accessoryColor: '#7ACB96' },
  },
  {
    id: 'sushi',
    name: 'Sushi',
    breed: 'siamese, opinionista',
    rating: 4,
    quote:
      '«Tutto perfetto, ma una zampetta in meno perché a fine servizio è tornata a casa SUA. Inaccettabile.»',
    photoBg: '#FFE3EA',
    tapeColor: 'rgba(247,200,107,0.7)',
    tapeRot: -3,
    cardRot: -1.8,
    cat: { fur: '#8A6A4F', earInner: '#C9A176', faceFill: '#F7EBD7', muzzle: '#E3CBA4', eyes: 'glasses', whiskers: true, feet: true },
  },
  {
    id: 'briciola',
    name: 'Briciola',
    breed: 'gattina timida, esperta di sotto-divani',
    rating: 5,
    quote:
      '«Sono uscita dal mio nascondiglio dopo dieci minuti. Record mondiale. Ha il laser buono.»',
    photoBg: '#EFE3FA',
    tapeColor: 'rgba(181,232,181,0.8)',
    tapeRot: 5,
    cardRot: 1.2,
    cat: { fur: '#CFC5DF', eyes: 'open', whiskers: true, feet: true, accessory: 'sparkles' },
  },
  {
    id: 'maradona',
    name: 'Maradona',
    breed: 'soriano, atleta professionista',
    rating: 5,
    quote:
      '«Lanci di pallina di una precisione commovente. Sessioni laser da standing ovation. Il mio allenatore di fiducia.»',
    photoBg: '#D8F3E7',
    tapeColor: 'rgba(255,183,197,0.85)',
    tapeRot: -4,
    cardRot: -2.2,
    cat: { fur: '#CE9463', eyes: 'open', whiskers: true, feet: true, accessory: 'sportband', accessoryColor: '#7ACB96' },
  },
]

export function Recensioni() {
  const onEarWiggle = useEarWiggle()

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
                onMouseEnter={onEarWiggle}
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
                  <CatFace
                    {...review.cat}
                    title={review.name}
                    earWiggle
                    className={styles.catImg}
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
