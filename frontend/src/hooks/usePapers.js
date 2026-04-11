import { useEffect, useState } from "react";
import { getPapers } from "../services/papersService";

export const usePapers = () => {
  const [semester, setSemester] = useState(1);
  const [exam, setExam] = useState(null);
  const [year, setYear] = useState(null);
  const [batch, setBatch] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadPapers = async () => {
      setLoading(true);
      const data = await getPapers({ semester, exam, year, batch });
      if (!ignore) {
        setPapers(data);
        setLoading(false);
      }
    };

    loadPapers();
    return () => { ignore = true; };
  }, [semester, exam, year, batch]);

  const clearAllFilters = () => {
    setSemester(1);
    setExam(null);
    setYear(null);
    setBatch(null);
  };

  return {
    semester, setSemester,
    exam, setExam,
    year, setYear,
    batch, setBatch,
    filteredPapers: papers,
    loading,
    clearAllFilters,
  };
};
