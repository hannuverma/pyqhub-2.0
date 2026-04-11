import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import apiClient from "../services/apiClient";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";

const UploadLoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const redirectPath = useMemo(() => {
		const fromPath = location.state?.from?.pathname;
		if (!fromPath || fromPath === "/sector/login") {
			return "/upload";
		}
		return fromPath;
	}, [location.state]);

	if (localStorage.getItem(ACCESS_TOKEN)) {
		return <Navigate to='/upload' replace />;
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const response = await apiClient.post("/api/token/", {
				email,
				password,
			});

			localStorage.setItem(ACCESS_TOKEN, response.data.access);
			localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
			navigate(redirectPath, { replace: true });
		} catch {
			setError("Invalid email or password.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className='login-page'>
			<div className='login-card'>
				<h2>Upload Sector Login</h2>
				<p>Sign in to continue to the upload section.</p>

				<form className='login-form' onSubmit={handleSubmit}>
					<label>
						<span>Email</span>
						<input
							type='email'
							name='email'
							autoComplete='email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</label>

					<label>
						<span>Password</span>
						<input
							type='password'
							name='password'
							autoComplete='current-password'
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
					</label>

					{error ? <p className='form-error'>{error}</p> : null}

					<div className='login-actions'>
						<button
							type='submit'
							className='primary-action'
							disabled={isSubmitting}
						>
							{isSubmitting ? "Signing in..." : "Sign in"}
						</button>
						<Link className='secondary-action as-link' to='/'>
							Back to Home
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
};

export default UploadLoginPage;
