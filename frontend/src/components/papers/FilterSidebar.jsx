import PropTypes from "prop-types";

const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];
const batches = ["All", "IT", "DSA", "CSE"];
const currentYear = new Date().getFullYear();
const years = ["All", ...Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i)];

const FilterSidebar = ({
  semester,
  onSemesterChange,
  exam,
  onExamChange,
  year,
  onYearChange,
  batch,
  onBatchChange,
  onClear,
}) => {
  return (
    <aside className="filter-sidebar" aria-label="Filter papers">
      <h3>Filter Papers</h3>

      <div className="filter-group">
        <p className="filter-label">Semester</p>
        <div className="semester-grid">
          {semesters.map((label, index) => {
            const value = index + 1;
            return (
              <button
                key={label}
                type="button"
                className={`semester-btn ${semester === value ? "active" : ""}`}
                onClick={() => onSemesterChange(value)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label">Examination Type</p>
        <div className="exam-switch">
          {[["All", null], ["Mid Sem", "MIDSEM"], ["End Sem", "ENDSEM"]].map(
            ([label, value]) => (
              <button
                key={label}
                type="button"
                className={`exam-btn ${exam === value ? "active" : ""}`}
                onClick={() => onExamChange(value)}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label">Year</p>
        <div className="exam-switch">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={`exam-btn ${(y === "All" ? year === null : year === y) ? "active" : ""}`}
              onClick={() => onYearChange(y === "All" ? null : y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label">Batch</p>
        <div className="exam-switch">
          {batches.map((b) => (
            <button
              key={b}
              type="button"
              className={`exam-btn ${(b === "All" ? batch === null : batch === b) ? "active" : ""}`}
              onClick={() => onBatchChange(b === "All" ? null : b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="clear-btn" onClick={onClear}>
        Clear All Filters
      </button>
    </aside>
  );
};

FilterSidebar.propTypes = {
  semester: PropTypes.number.isRequired,
  onSemesterChange: PropTypes.func.isRequired,
  exam: PropTypes.string,
  onExamChange: PropTypes.func.isRequired,
  year: PropTypes.number,
  onYearChange: PropTypes.func.isRequired,
  batch: PropTypes.string,
  onBatchChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default FilterSidebar;
