import apiClient from './apiClient';

const normalizePaper = (paper) => ({
  id: paper.id,
  title: paper.title || 'Untitled',
  semester: Number(paper.semester || 1),
  year: Number(paper.year || new Date().getFullYear()),
  examType: paper.exam_type || paper.examType || 'MIDSEM',
  batch: paper.batch || 'IT',
  pdf: paper.pdf || '#',
  preview: paper.preview || null,
});

export const getPapers = async ({ semester, exam, year, batch }) => {
  try {
    const response = await apiClient.post('/api/papers', {
      semester,
      ...(exam && { exam }),
      ...(year && { year }),
      ...(batch && { batch }),
    });
    const payload = Array.isArray(response.data?.papers)
      ? response.data.papers
      : [];
    return payload.map(normalizePaper);
  } catch {
    return [];
  }
};
