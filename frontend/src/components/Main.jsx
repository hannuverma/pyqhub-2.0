import api from "../utils/api.js";
import React, { useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Main = () => {
	const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
	const [semester, setSemester] = useState(1);
	const [examination, setExamination] = useState("MIDSEM");
	const [subjectOptions, setSubjectOptions] = useState([]);
	const [selectedSubjects, setSelectedSubjects] = useState([]);
	const [questionPapers, setQuestionPapers] = useState([]);
	const mainRef = React.useRef(null);
	const qpScrollRef = React.useRef(null);

	useEffect(() => {
		const scroll = new LocomotiveScroll();

		return () => {
			scroll.destroy();
		};
	}, []);

	useEffect(() => {
		const panel = qpScrollRef.current;
		if (!panel) return;

		let touchStartY = 0;

		const canScrollPanel = () => panel.scrollHeight > panel.clientHeight;

		const onWheelCapture = (event) => {
			if (!panel.contains(event.target) || !canScrollPanel()) return;

			event.preventDefault();
			event.stopPropagation();
			panel.scrollTop += event.deltaY;
		};

		const onTouchStartCapture = (event) => {
			if (!panel.contains(event.target)) return;
			touchStartY = event.touches[0]?.clientY ?? 0;
		};

		const onTouchMoveCapture = (event) => {
			if (!panel.contains(event.target) || !canScrollPanel()) return;

			const currentY = event.touches[0]?.clientY ?? touchStartY;
			const delta = touchStartY - currentY;
			touchStartY = currentY;

			event.preventDefault();
			event.stopPropagation();
			panel.scrollTop += delta;
		};

		window.addEventListener("wheel", onWheelCapture, {
			passive: false,
			capture: true,
		});
		window.addEventListener("touchstart", onTouchStartCapture, {
			passive: true,
			capture: true,
		});
		window.addEventListener("touchmove", onTouchMoveCapture, {
			passive: false,
			capture: true,
		});

		return () => {
			window.removeEventListener("wheel", onWheelCapture, true);
			window.removeEventListener("touchstart", onTouchStartCapture, true);
			window.removeEventListener("touchmove", onTouchMoveCapture, true);
		};
	}, []);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: mainRef.current,
					start: "top 40%",
					end: "bottom 20%",
				},
			});

			tl.from(".heading-text", {
				y: 150,
				opacity: 0,
				duration: 1,
				ease: "power2.out",
			}).from(
				".side_div",
				{
					y: 130,
					opacity: 0,
					duration: 1,
					ease: "power2.out",
				},
				["-=0.1"],
			);
		},
		{ scope: mainRef },
	);

	useGSAP(
		() => {
			const cards = gsap.utils.toArray(".QP-card", mainRef.current);
			if (!cards.length) return;

			const rafId = requestAnimationFrame(() => {
				gsap.killTweensOf(cards);
				gsap.set(cards, { x: 30, autoAlpha: 0 });
				gsap.to(cards, {
					x: 0,
					autoAlpha: 1,
					duration: 0.9,
					stagger: 0.2,
					ease: "power2.out",
					overwrite: "auto",
					delay: 0.5,
					scrollTrigger: {
						trigger: mainRef.current,
						start: "top 40%",
						end: "bottom 20%",
					},
				});
			});

			return () => cancelAnimationFrame(rafId);
		},
		{ scope: mainRef, dependencies: [questionPapers] },
	);

	const handleSubjectToggle = (subjectId) => {
		setSelectedSubjects((prev) =>
			prev.includes(subjectId)
				? prev.filter((id) => id !== subjectId)
				: [...prev, subjectId],
		);
	};

	useEffect(() => {
		const fetchQuestionPapers = async () => {
			try {
				const response = await api.post("/", {
					semester,
					exam: examination,
					subject: selectedSubjects,
				});
				const sendData = {
					semester,
					exam: examination,
					subject: selectedSubjects,
				};
				setQuestionPapers(response.data.papers ?? []);
				console.log(questionPapers);
			} catch (error) {
				console.error("Failed to fetch question papers", error);
			}
		};

		fetchQuestionPapers();
	}, [semester, examination, selectedSubjects]);

	useEffect(() => {
		const fetchSubjects = async () => {
			try {
				const response = await api.post("/getsubjects/", { semester });
				setSubjectOptions(response.data ?? []);
				setSelectedSubjects([]);
			} catch (error) {
				console.error("Failed to fetch subjects", error);
				setSubjectOptions([]);
			}
		};

		fetchSubjects();
	}, [semester]);

	return (
		<div className='min-h-screen w-full pt-20' id='Main' ref={mainRef}>
			<div className='mx-auto w-full border-[3px]border-[#1f1f1f] text-[#fffdf8]'>
				<div
					className='px-4 pb-10 text-center text-[clamp(20px,3vw,39px)] font-semibold leading-tight '
					data-scroll
					data-scroll-speed='0.1'
				>
					Download and practice previous year question papers for better
					exam preparation.
				</div>

				<div
					className='bg-[#efefef] px-4 py-2 text-center text-[clamp(18px,2.1vw,36px)] font-semibold text-[#1d1d1d] '
					data-scroll
					data-scroll-speed='0.03'
				>
					year 2025- 26 papers are updated!
				</div>

				<div className='grid min-h-160 grid-cols-1 lg:grid-cols-[280px_1fr] relative '>
					<div className='border-r-[3px] border-[#e9ddc9] px-4 pt-4 pb-6 static top-0 left-0 side_div'>
						<div className='mb-8'>
							<h3 className='mb-3 text-[clamp(20px,1.5vw,28px)] font-semibold '>
								Select Your semester :
							</h3>
							<div className='grid grid-cols-4 gap-x-4 gap-y-3 text-[clamp(22px,1.25vw,27px)] font-medium'>
								{semesters.map((sem, index) => (
									<button
										key={sem}
										type='button'
										className={[
											"text-left leading-none",
											semester === index + 1
												? "w-fit rounded-sm bg-[#efefef] px-2 py-1 text-[#cb8f46]"
												: "bg-transparent px-2 py-1 text-[#f8f3ea]",
										].join(" ")}
										onClick={() => setSemester(index + 1)}
									>
										{sem}
									</button>
								))}
							</div>
						</div>

						<div className='mb-10'>
							<h3 className='mb-3 text-[clamp(20px,1.5vw,28px)] font-semibold'>
								Select Examination:
							</h3>
							<div className='flex items-center gap-6 text-[clamp(22px,1.25vw,29px)] font-medium'>
								<button
									type='button'
									// className='w-fit rounded-sm bg-[#efefef] px-2 py-1 leading-none text-[#cb8f46]'
									onClick={() => setExamination("MIDSEM")}
									className={`leading-none  ${
										examination === "MIDSEM"
											? "w-fit rounded-sm bg-[#efefef] px-2 py-1 text-[#cb8f46]"
											: "bg-transparent px-2 py-1 text-[#f8f3ea]"
									}`}
								>
									Midsem
								</button>
								<button
									type='button'
									className={`leading-none ${
										examination === "ENDSEM"
											? "w-fit rounded-sm bg-[#efefef] px-2 py-1 text-[#cb8f46]"
											: "bg-transparent px-2 py-1 text-[#f8f3ea]"
									}`}
									onClick={() => setExamination("ENDSEM")}
								>
									Endsem
								</button>
							</div>
						</div>

						<div>
							<h3 className='mb-3 text-[clamp(20px,1.5vw,28px)] font-semibold'>
								Select Subject:
							</h3>
							<div className='space-y-2'>
								{subjectOptions?.map((subject) => (
									<label
										key={subject.id}
										className='flex items-center gap-3 text-[clamp(16px,1vw,22px)]'
									>
										<input
											type='checkbox'
											className='h-4 w-4 accent-[#f3ead7] outline-none'
											checked={selectedSubjects.includes(subject.id)}
											onChange={() =>
												handleSubjectToggle(subject.id)
											}
											aria-label={subject.name}
										/>
										<span className='leading-tight'>
											{subject.name}
										</span>
									</label>
								))}
							</div>
						</div>
					</div>

					<section className='px-4 pt-2 pb-8 sm:px-6'>
						<h2 className='mb-4 text-[clamp(36px,2.4vw,49px)] font-semibold tracking-wide heading-text'>
							HERE ARE YOUR PAPERS :
						</h2>

						<div
							ref={qpScrollRef}
							className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16 h-[79vh] overflow-y-auto overflow-x-hidden overscroll-y-contain pr-2 QP-div'
						>
							{questionPapers?.map((card) => (
								<a
									href={card.pdf}
									key={card.id}
									target='_blank'
									rel='noopener noreferrer'
								>
									<div
										className='mx-auto w-70 h-90 rounded-[20px] border
										 border-black shadow-[0_2px_0_rgba(255,255,255,0.35)] QP-card relative flex items-center justify-center overflow-hidden'
									>
										<div className='w-0 h-full bg-black/80 rounded-[20px] grid place-content-center text-sm underline QP-card-hover absolute top-0 left-0 text-[#f8f3ea] z-20'>
											{" "}
											view full page
										</div>
										<img
											src={card.preview}
											alt={card.name}
											className='w-full h-full z-10 rounded-[20px] '
										/>
									</div>
								</a>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Main;
