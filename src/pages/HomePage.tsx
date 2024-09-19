import CustomerReviews from "../components/home/CustomerReviews.tsx"
import Faq from "../components/home/FAQ.tsx"
import Features from "../components/home/Features.tsx"
import Footer from "../components/home/Footer.tsx"
import Header from "../components/home/Header"
import HeroSection from "../components/home/HeroSection"
import HowItWorksSection from "../components/home/HowItWorksSection.tsx"
import WhyChooseUs from "../components/home/WhyChooseUs"

const HomePage = () => {
  return (
    <>
      <Header/>
      <HeroSection/>
      <WhyChooseUs/>
      <HowItWorksSection/>
      <Features/>
      <CustomerReviews/>
      <Faq/>
      <Footer/>
    </>
  )
}

export default HomePage