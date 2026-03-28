import PropTypes from "prop-types";

const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

const FilterSidebar = ({
	semester,
	onSemesterChange,
	exam,
	onExamChange,
	subjects,
	selectedSubjectIds,
	onToggleSubject,
	onClear,
}) => {
	return (
		<aside className='filter-sidebar' aria-label='Filter papers'>
			<h3>Filter Papers</h3>

			<div className='filter-group'>
				<p className='filter-label'>Semester</p>
				<div className='semester-grid'>
					{semesters.map((label, index) => {
						const value = index + 1;
						return (
							<button
								key={label}
								type='button'
								className={`semester-btn ${semester === value ? "active" : ""}`}
								onClick={() => onSemesterChange(value)}
							>
								{label}
							</button>
						);
					})}
				</div>
			</div>

			<div className='filter-group'>
				<p className='filter-label'>Examination Type</p>
				<div className='exam-switch'>
					<button
						type='button'
						className={`exam-btn ${exam === "MIDSEM" ? "active" : ""}`}
						onClick={() => onExamChange("MIDSEM")}
					>
						Mid Sem
					</button>
					<button
						type='button'
						className={`exam-btn ${exam === "ENDSEM" ? "active" : ""}`}
						onClick={() => onExamChange("ENDSEM")}
					>
						End Sem
					</button>
				</div>
			</div>

			<div className='filter-group'>
				<p className='filter-label'>Subjects</p>
				<div className='subjects-list'>
					{subjects.length === 0 && (
						<p className='muted-text'>No subjects found</p>
					)}
					{subjects.map((subject) => (
						<label key={subject.id} className='check-row'>
							<input
								type='checkbox'
								checked={selectedSubjectIds.includes(subject.id)}
								onChange={() => onToggleSubject(subject.id)}
							/>
							<span>{subject.name}</span>
						</label>
					))}
				</div>
			</div>

			<button type='button' className='clear-btn' onClick={onClear}>
				Clear All Filters
			</button>
		</aside>
	);
};

FilterSidebar.propTypes = {
	semester: PropTypes.number.isRequired,
	onSemesterChange: PropTypes.func.isRequired,
	exam: PropTypes.string.isRequired,
	onExamChange: PropTypes.func.isRequired,
	subjects: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}),
	).isRequired,
	selectedSubjectIds: PropTypes.arrayOf(PropTypes.number).isRequired,
	onToggleSubject: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired,
};

export default FilterSidebar;
