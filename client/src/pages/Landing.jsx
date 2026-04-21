import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Leadership from '../components/Leadership';
import Contact from '../components/Contact';

export default function Landing() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Skills />
      <Leadership />
      <Contact />
    </main>
  );
}
