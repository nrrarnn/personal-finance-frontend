import CustomerReviews from "../components/home/CustomerReviews.tsx"
import Faq from "../components/home/Faq.tsx"
import Features from "../components/home/Features.tsx"
import Footer from "../components/home/Footer.tsx"
import Header from "../components/home/Header"
import HeroSection from "../components/home/HeroSection"
import HowItWorksSection from "../components/home/HowItWorksSection.tsx"
import ScrollToTopButton from "../components/home/ScrollComponent.tsx"
import WhyChooseUs from "../components/home/WhyChooseUs"

const HomePage = () => {
  return (
    <>
      <Header/>
      <section id="home">
        <HeroSection/>
        <WhyChooseUs/>
        <HowItWorksSection/>
      </section>
      <section id="features">
        <Features/>
      </section>
      <section id="customers">
        <CustomerReviews/>
      </section>
      <section id="faq">
        <Faq/>
      </section> 
      <Footer/>
      <ScrollToTopButton/>
    </>
  )
}

export default HomePage