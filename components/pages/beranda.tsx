"use client"

import PageLayout from "./page-layout"
import Hero from "../hero"
import Carousel from "../carousel"
import Categories from "../categories"
import CtaDark from "../cta-dark"
import Faq from "../faq"
import Footer from "../footer"

export default function BerandaPage() {
  return (
    <PageLayout mainClassName="home-content">
      <Hero />
      <Carousel />
      <Categories />
      <CtaDark />
      <Faq />
      <Footer />
    </PageLayout>
  )
}
