import React from 'react'
import Home from './components/Home'
import Main from './components/Main'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const App = () => {
  return (
    <>
     <Home/>
     <Main/>
    </>
  )
}

export default App
