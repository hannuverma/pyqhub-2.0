import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
	useGSAP(() => {
		gsap.from(".home-img-div h1", {
			y: 100,
			x: -100,
			duration: 1,
			ease: "power2.out",
		});
		gsap.from(".home-img-div h2", {
			y: -100,
			x: 100,
			duration: 1,
			ease: "power2.out",
		});
	}, []);

	return (
		<div
			id='Home'
			className='w-full h-screen text-white grid place-items-center rounded-lg'
		>
			<div className='w-[95vw] h-[95vh] home-img-div'>
				<h1 className='text-[10vw] bg-[#C68C46] px-10 py-4 rounded-tr-3xl font-bold inline-block absolute bottom-0  '>
					PYQ's
				</h1>
				<h2 className='text-[3vw] bg-[#C68C46] px-10 py-4 rounded-bl-3xl font-bold inline-block absolute top-0 right-0 '>
					Your shortcut to exam success: PYQs
				</h2>
			</div>
		</div>
	);
};

export default Home;
