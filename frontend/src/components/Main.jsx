import api from "../utils/api.js";
import React, { useEffect, useState } from "react";

const subjectOptions = [
	{ id: 1, name: "health sports and safety" },
	{ id: 2, name: "applied Science" },
	{ id: 3, name: "FEE" },
	{ id: 4, name: "analog electronics" },
	{ id: 5, name: "environment studies" },
	{ id: 6, name: "engineering mathematics - I" },
];

const Main = () => {
	const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
	const [semester, setSemester] = useState(1);
	const [examination, setExamination] = useState("midsem");
	const [subjects, setSubjects] = useState([]);

	const handleSubjectToggle = (subjectId) => {
		setSubjects((prev) =>
			prev.includes(subjectId)
				? prev.filter((id) => id !== subjectId)
				: [...prev, subjectId],
		);
	};

	useEffect(() => {
		// const questionPapers = api.post(
		// 	"/question-papers",
		// 	{
		// 		semester,
		// 		examination,
		// 		subjects,
		// 	},
		// 	(response) => {
		// 		console.log(response.data);
		// 		return response.data;
		// 	},
		// );
	}, [examination, subjects]);

	useEffect(() => {
		// setSubjects(() => {
		// 	api.get(`/semester=${semester}`).then((response) => {
		// 		console.log(response.data);
		// 		return response.data;
		// 	});
		// })
	}, [semester]);

	return (
		<div className='min-h-screen w-full pt-20'>
			<div className='mx-auto w-full border-[3px]border-[#1f1f1f] text-[#fffdf8]'>
				<div className='px-4 pb-10 text-center text-[clamp(20px,3vw,39px)] font-semibold leading-tight'>
					Download and practice previous year question papers for better
					exam preparation.
				</div>

				<div className='bg-[#efefef] px-4 py-2 text-center text-[clamp(18px,2.1vw,36px)] font-semibold text-[#1d1d1d]'>
					year 2025- 26 papers are updated!
				</div>

				<div className='grid min-h-160 grid-cols-1 lg:grid-cols-[280px_1fr] relative '>
					<div className='border-r-[3px] border-[#e9ddc9] px-4 pt-4 pb-6 static top-0 left-0'>
						<div className='mb-8'>
							<h3 className='mb-3 text-[clamp(20px,1.5vw,28px)] font-semibold'>
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
									onClick={() => setExamination("midsem")}
									className={`leading-none  ${
										examination === "midsem"
											? "w-fit rounded-sm bg-[#efefef] px-2 py-1 text-[#cb8f46]"
											: "bg-transparent px-2 py-1 text-[#f8f3ea]"
									}`}
								>
									Midsem
								</button>
								<button
									type='button'
									className={`leading-none ${
										examination === "endsem"
											? "w-fit rounded-sm bg-[#efefef] px-2 py-1 text-[#cb8f46]"
											: "bg-transparent px-2 py-1 text-[#f8f3ea]"
									}`}
									onClick={() => setExamination("endsem")}
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
								{subjectOptions.map((subject) => (
									<label
										key={subject.id}
										className='flex items-center gap-3 text-[clamp(16px,1vw,22px)]'
									>
										<input
											type='checkbox'
											className='h-4 w-4 accent-[#f3ead7] outline-none'
											checked={subjects.includes(subject.id)}
											onChange={() => {
												handleSubjectToggle(subject.id);
												console.log(subjects);
											}}
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
						<h2 className='mb-4 text-[clamp(36px,2.4vw,49px)] font-semibold tracking-wide'>
							HERE ARE YOUR PAPERS :
						</h2>

						<div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16 max-h-[79vh] overflow-y-auto pr-2 QP-div'>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((card) => (
								<a href='#' key={card}>
									<div
										className='mx-auto w-64 h-80 rounded-[20px] border-1
										 border-[#f2ece2] bg-[#fcfbf9] shadow-[0_2px_0_rgba(255,255,255,0.35)] QP-card relative'
									>
										<div className='w-0 h-full bg-black/80 rounded-[20px] grid place-content-center text-sm underline QP-card-hover absolute top-0 left-0 text-[#f8f3ea]'>
											{" "}
											view full page
										</div>
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
