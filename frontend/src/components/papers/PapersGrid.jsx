import PropTypes from 'prop-types';
import PaperCard from './PaperCard';

const PapersGrid = ({ papers, loading }) => {
  if (loading) {
    return <p className="muted-text">Loading papers...</p>;
  }

  if (papers.length === 0) {
    return <p className="muted-text">No papers found for selected filters.</p>;
  }

  return (
    <div className="papers-grid">
      {papers.map((paper) => (
        <PaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
};

PapersGrid.propTypes = {
  papers: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PapersGrid;
