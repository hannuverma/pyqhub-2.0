import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import apiClient from '../../services/apiClient';

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const EXAM_TYPES = [
  { value: 'MIDSEM', label: 'Mid Sem' },
  { value: 'ENDSEM', label: 'End Sem' },
];
const BATCHES = ['IT', 'DSA', 'CSE', 'ALL'];
const currentYear = new Date().getFullYear();
const YEARS = Array.from(
  { length: currentYear - 2022 },
  (_, i) => 2023 + i
).reverse();

const EMPTY_FORM = {
  title: '',
  semester: '1',
  year: String(currentYear),
  examType: 'MIDSEM',
  batch: 'IT',
};

const UploadPanel = ({ logoutHandler }) => {
  const [papers, setPapers] = useState([]);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    loadPapers();
  }, []);

  async function loadPapers() {
    setLoadingPapers(true);
    try {
      const res = await apiClient.get('/api/upload/papers');
      setPapers(res.data);
    } catch {
      setError('Failed to load papers.');
    }
    setLoadingPapers(false);
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0] || null;
    const MAX_FILE_SIZE_MB = 10;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setFile(null);
      setError(`File size must not exceed ${MAX_FILE_SIZE_MB}MB.`);
      e.target.value = '';
      return;
    }

    setError('');
    setFile(selectedFile);
  }

  function startEdit(paper) {
    setEditingId(paper.id);
    setForm({
      title: paper.title,
      semester: String(paper.semester),
      year: String(paper.year),
      examType: paper.examType,
      batch: paper.batch,
    });
    setFile(null);
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFile(null);
    setError('');
    setSuccess('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!editingId && !file) {
      setError('Please select a PDF file.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await apiClient.patch(`/api/upload/papers/${editingId}`, form);
        setSuccess('Paper updated successfully.');
        setEditingId(null);
        setForm(EMPTY_FORM);
      } else {
        const data = new FormData();
        Object.entries(form).forEach(([k, v]) => data.append(k, v));
        data.append('pdf', file);
        await apiClient.post('/api/upload', data);
        setSuccess('Paper uploaded successfully.');
        setForm(EMPTY_FORM);
        setFile(null);
        if (fileRef.current) fileRef.current.value = '';
      }
      await loadPapers();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
    setSubmitting(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this paper? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await apiClient.delete(`/api/upload/papers/${id}`);
      setPapers((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError('Failed to delete paper.');
    }
    setDeletingId(null);
  }

  return (
    <section className="upload-page">
      <div className="upload-shell">
        {/* ── Header ── */}
        <div className="upload-head">
          <div>
            <p className="upload-eyebrow">Upload Sector</p>
            <h1>{editingId ? 'Edit Paper' : 'Upload New Paper'}</h1>
          </div>
          <span className="preview-badge">
            <button onClick={logoutHandler}>Logout</button>
          </span>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit}>
          <div className="upload-card" style={{ marginBottom: 16 }}>
            <h3>Paper Details</h3>

            <div className="upload-form-grid">
              <label>
                <span>Title / Description</span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Sem 5 End Sem 2024"
                  required
                />
              </label>

              <label>
                <span>Semester</span>
                <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                >
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                      S{s}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Examination Type</span>
                <select
                  name="examType"
                  value={form.examType}
                  onChange={handleChange}
                >
                  {EXAM_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Year</span>
                <select name="year" value={form.year} onChange={handleChange}>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Batch</span>
                <select name="batch" value={form.batch} onChange={handleChange}>
                  {BATCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* File input — only shown when creating, not editing */}
            {!editingId && (
              <div className="drop-zone" style={{ marginTop: 16 }}>
                <p>Select PDF file</p>
                <span>{file ? file.name : 'No file chosen'}</span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
            )}

            {error && (
              <p className="form-error" style={{ marginTop: 10 }}>
                {error}
              </p>
            )}
            {success && (
              <p
                style={{
                  marginTop: 10,
                  color: '#116e3f',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                {success}
              </p>
            )}

            <div className="upload-actions" style={{ marginTop: 16 }}>
              <button
                type="submit"
                className="primary-action"
                disabled={submitting}
              >
                {submitting
                  ? 'Saving...'
                  : editingId
                    ? 'Save Changes'
                    : 'Upload Paper'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="secondary-action"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* ── Papers list ── */}
        <h3 style={{ margin: '8px 0 12px', fontSize: '1.1rem' }}>
          All Papers {!loadingPapers && `(${papers.length})`}
        </h3>

        {loadingPapers ? (
          <p className="muted-text">Loading...</p>
        ) : papers.length === 0 ? (
          <p className="muted-text">No papers uploaded yet.</p>
        ) : (
          <div className="upload-papers-table">
            {papers.map((paper) => (
              <div key={paper.id} className="upload-paper-row">
                <div className="upload-paper-info">
                  <span className="upload-paper-title">{paper.title}</span>
                  <span className="upload-paper-meta">
                    S{paper.semester} &middot; {paper.batch} &middot;{' '}
                    {paper.examType === 'MIDSEM' ? 'Mid Sem' : 'End Sem'}{' '}
                    &middot; {paper.year}
                  </span>
                </div>
                <div className="upload-paper-actions">
                  <a
                    href={paper.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-action as-link"
                    style={{
                      height: 32,
                      padding: '0 12px',
                      fontSize: '0.82rem',
                    }}
                  >
                    View
                  </a>
                  <button
                    type="button"
                    className="secondary-action"
                    style={{
                      height: 32,
                      padding: '0 12px',
                      fontSize: '0.82rem',
                    }}
                    onClick={() => startEdit(paper)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="secondary-action"
                    style={{
                      height: 32,
                      padding: '0 12px',
                      fontSize: '0.82rem',
                      border: '1px solid #ffccd7',
                      background: '#fff5f7',
                      color: '#9f1b3f',
                    }}
                    disabled={deletingId === paper.id}
                    onClick={() => handleDelete(paper.id)}
                  >
                    {deletingId === paper.id ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

UploadPanel.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
};

export default UploadPanel;
