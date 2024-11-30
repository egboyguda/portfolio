'use client'

import { useRef } from 'react'


import Header from '@/components/common/header'
import About from '@/components/common/about'
import Skills from '@/components/common/skill'
import Projects from '@/components/common/project'
import Career from '@/components/common/career'

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const careerRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <Header
        onAboutClick={() => scrollToSection(aboutRef)}
        onSkillsClick={() => scrollToSection(skillsRef)}
        onProjectsClick={() => scrollToSection(projectsRef)}
        onCareerClick={() => scrollToSection(careerRef)}
      />
      <About ref={aboutRef} />
      <Skills ref={skillsRef} />
      <Projects ref={projectsRef} />
      <Career ref={careerRef} />
    </main>
  )
}
