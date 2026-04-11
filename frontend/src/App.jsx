import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AppRouter from "./app/AppRouter"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const App = () => {
	return <AppRouter />
}

export default App
