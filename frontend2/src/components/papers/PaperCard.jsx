import PropTypes from "prop-types";

const iconSeed = ["db", "chip", "math", "shield", "globe", "algo"];

const PaperCard = ({ paper }) => {
	const iconClass = iconSeed[paper.id % iconSeed.length];

	return (
		<article className='paper-card'>
			<div className='paper-icon-wrap'>
				<div className={`paper-icon ${iconClass}`} aria-hidden='true' />
			</div>
			<p className='paper-semester'>Semester {paper.semester}</p>
			<h4>{paper.title}</h4>
			<p className='paper-meta'>
				<span>{paper.year}</span>
				<span>{paper.examType}</span>
			</p>
			<div className='paper-actions'>
				<a
					href={paper.pdf}
					className='view-btn'
					target='_blank'
					rel='noreferrer'
				>
					View Paper
				</a>
				<button
					type='button'
					className='download-btn'
					aria-label='Download paper'
				>
					v
				</button>
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
	}).isRequired,
};

export default PaperCard;
