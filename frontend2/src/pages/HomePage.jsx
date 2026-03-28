import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<section className='home-page'>
			<div className='home-card'>
				<p className='eyebrow'>Academic Curator</p>
				<h1>Find curated previous year papers in seconds.</h1>
				<p>
					Browse semester-wise and subject-wise collections with a clean
					workflow that is easy to scale.
				</p>
				<Link to='/papers' className='cta-btn'>
					See Papers
				</Link>
			</div>
		</section>
	);
};

export default HomePage;
