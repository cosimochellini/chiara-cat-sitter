import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '../components/Nav/Nav'
import { Hero } from '../components/Hero/Hero'
import { ChiSono } from '../components/ChiSono/ChiSono'
import { Servizi } from '../components/Servizi/Servizi'
import { Zone } from '../components/Zone/Zone'
import { Recensioni } from '../components/Recensioni/Recensioni'
import { Contatti } from '../components/Contatti/Contatti'
import { Footer } from '../components/Footer/Footer'
import { WalkingCat } from '../components/WalkingCat/WalkingCat'
import { PawClickLayer } from '../behaviors/PawClickLayer'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <ChiSono />
        <Servizi />
        <Zone />
        <Recensioni />
        <Contatti />
      </main>
      <Footer />
      <WalkingCat />
      <PawClickLayer />
    </>
  )
}
