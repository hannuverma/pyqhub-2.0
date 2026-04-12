import PropTypes from 'prop-types';

const PaperCard = ({ paper }) => {
  return (
    <article className="paper-card">
      <a
        href={paper.pdf}
        className="paper-thumb-link"
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${paper.title}`}
      >
        {paper.preview ? (
          <img
            src={paper.preview}
            alt={`${paper.title} preview`}
            className="paper-thumb"
          />
        ) : (
          <div className="paper-thumb paper-thumb-placeholder">
            <span>PDF</span>
          </div>
        )}
      </a>

      <div className="paper-info">
        <p className="paper-semester">Semester {paper.semester}</p>
        <h4>{paper.title}</h4>
        <p className="paper-meta">
          <span>{paper.year}</span>
          <span>{paper.examType}</span>
        </p>
        <div className="paper-actions">
          <a
            href={paper.pdf}
            className="view-btn"
            target="_blank"
            rel="noreferrer"
          >
            View Paper
          </a>
          <a
            href={paper.pdf}
            className="download-btn"
            download
            target="_blank"
            rel="noreferrer"
            aria-label="Download paper"
          >
            ↓
          </a>
        </div>
      </div>
    </article>
  );
};

PaperCard.propTypes = {
  paper: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    semester: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    examType: PropTypes.string.isRequired,
    pdf: PropTypes.string.isRequired,
    preview: PropTypes.string,
  }).isRequired,
};

export default PaperCard;
