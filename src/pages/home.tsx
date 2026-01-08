import { useEffect, useRef } from "react"
import Hero from "./../components/Hero"
import About from "./../components/About"
import Skills from "./../components/Skills"
import Experience from "./../components/Experience"
import Projects from "./../components/Projects"
import Contact from "./../components/Contact"

import FloatingNav from "./../components/FloatingNav"

const Home = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible")
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }
  return (
    <>
      <div className="relative min-h-screen bg-transparent text-white">
        <FloatingNav />

        <div className="relative z-10">
          <div ref={addToRefs} className="fade-in-section" id="hero">
            <Hero />
          </div>

          <div ref={addToRefs} className="fade-in-section">
            <About />
          </div>

          <div ref={addToRefs} className="fade-in-section">
            <Skills />
          </div>

          <div ref={addToRefs} className="fade-in-section">
            <Experience />
          </div>

          <div ref={addToRefs} className="fade-in-section">
            <Projects />
          </div>

          <div ref={addToRefs} className="fade-in-section">
            <Contact />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
