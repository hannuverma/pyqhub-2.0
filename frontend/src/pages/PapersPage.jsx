import { useMemo, useState } from "react";
import FilterSidebar from "../components/papers/FilterSidebar";
import PapersGrid from "../components/papers/PapersGrid";
import { usePapers } from "../hooks/usePapers";

const PAGE_SIZE = 6;

const PapersPage = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const {
    semester, setSemester,
    exam, setExam,
    year, setYear,
    batch, setBatch,
    filteredPapers,
    loading,
    clearAllFilters,
  } = usePapers();

  const visiblePapers = useMemo(
    () => filteredPapers.slice(0, visibleCount),
    [filteredPapers, visibleCount]
  );

  const reset = () => setVisibleCount(PAGE_SIZE);

  const handleClear = () => {
    clearAllFilters();
    reset();
  };

  return (
    <section className="papers-page">
      <FilterSidebar
        semester={semester}
        onSemesterChange={(v) => { setSemester(v); reset(); }}
        exam={exam}
        onExamChange={(v) => { setExam(v); reset(); }}
        year={year}
        onYearChange={(v) => { setYear(v); reset(); }}
        batch={batch}
        onBatchChange={(v) => { setBatch(v); reset(); }}
        onClear={handleClear}
      />

      <div className="papers-content">
        <div className="content-head">
          <h1>Previous Year Papers</h1>
          <span>Showing {filteredPapers.length} results</span>
        </div>

        <PapersGrid papers={visiblePapers} loading={loading} />

        {visibleCount < filteredPapers.length && (
          <button
            type="button"
            className="load-more-btn"
            onClick={() => setVisibleCount((p) => p + PAGE_SIZE)}
          >
            Load More Resources
          </button>
        )}
      </div>
    </section>
  );
};

export default PapersPage;
