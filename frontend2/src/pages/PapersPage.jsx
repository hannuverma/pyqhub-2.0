import { useMemo, useState } from "react";
import FilterSidebar from "../components/papers/FilterSidebar";
import PapersGrid from "../components/papers/PapersGrid";
import { usePapers } from "../hooks/usePapers";

const PAGE_SIZE = 6;

const PapersPage = () => {
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
	const {
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
	} = usePapers();

	const visiblePapers = useMemo(
		() => filteredPapers.slice(0, visibleCount),
		[filteredPapers, visibleCount],
	);

	const canLoadMore = visibleCount < filteredPapers.length;

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + PAGE_SIZE);
	};

	const handleClear = () => {
		clearAllFilters();
		setVisibleCount(PAGE_SIZE);
	};

	return (
		<section className='papers-page'>
			<FilterSidebar
				semester={semester}
				onSemesterChange={(value) => {
					setSemester(value);
					setVisibleCount(PAGE_SIZE);
				}}
				exam={exam}
				onExamChange={(value) => {
					setExam(value);
					setVisibleCount(PAGE_SIZE);
				}}
				subjects={subjects}
				selectedSubjectIds={selectedSubjectIds}
				onToggleSubject={(subjectId) => {
					toggleSubject(subjectId);
					setVisibleCount(PAGE_SIZE);
				}}
				onClear={handleClear}
			/>

			<div className='papers-content'>
				<div className='content-head'>
					<h1>Previous Year Papers</h1>
					<span>Showing {filteredPapers.length} results</span>
				</div>

				<PapersGrid papers={visiblePapers} loading={loading} />

				{canLoadMore && (
					<button
						type='button'
						className='load-more-btn'
						onClick={handleLoadMore}
					>
						Load More Resources
					</button>
				)}
			</div>
		</section>
	);
};

export default PapersPage;
