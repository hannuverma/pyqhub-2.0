import { useEffect, useState } from "react";
import { getPapers, getSubjectsBySemester } from "../services/papersService";

export const usePapers = () => {
	const [semester, setSemester] = useState(2);
	const [exam, setExam] = useState("MIDSEM");
	const [subjects, setSubjects] = useState([]);
	const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
	const [papers, setPapers] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let ignore = false;

		const loadSubjects = async () => {
			const data = await getSubjectsBySemester(semester);
			if (ignore) {
				return;
			}
			setSubjects(data);
			setSelectedSubjectIds([]);
		};

		loadSubjects();

		return () => {
			ignore = true;
		};
	}, [semester]);

	useEffect(() => {
		let ignore = false;

		const loadPapers = async () => {
			setLoading(true);
			const data = await getPapers({
				semester,
				exam,
				subjectIds: selectedSubjectIds,
			});
            console.log("Fetched papers:", data);
			if (!ignore) {
				setPapers(data);
				setLoading(false);
			}
		};

		loadPapers();

		return () => {
			ignore = true;
		};
	}, [semester, exam, selectedSubjectIds]);

	const filteredPapers = papers;

	const toggleSubject = (subjectId) => {
		setSelectedSubjectIds((prev) =>
			prev.includes(subjectId)
				? prev.filter((id) => id !== subjectId)
				: [...prev, subjectId],
		);
	};

	const clearAllFilters = () => {
		setSemester(1);
		setExam("MIDSEM");
		setSelectedSubjectIds([]);
	};

	return {
		semester,
		setSemester,
		exam,
		setExam,
		subjects,
		selectedSubjectIds,
		toggleSubject,
		filteredPapers,
		loading,
		clearAllFilters,
	};
};
