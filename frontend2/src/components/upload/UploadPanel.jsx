const UploadPanel = ({logoutHandler}) => {
	return (
		<section className='upload-page'>
			<div className='upload-shell'>
				<div className='upload-head'>
					<div>
						<p className='upload-eyebrow'>Upload Sector</p>
						<h1>Submit and manage your paper uploads.</h1>
						<p>
							This section is ready from frontend side. Backend
							integration can be attached without changing this page
							structure.
						</p>
					</div>
					<span className='preview-badge'>
						<button onClick={logoutHandler}>logout</button>
					</span>
				</div>

				<div className='upload-grid'>
					<div className='upload-card'>
						<h3>Paper Metadata</h3>
						<div className='upload-form-grid'>
							<label>
								<span>Subject Name</span>
								<input
									type='text'
									placeholder='e.g. Computer Networks'
								/>
							</label>
							<label>
								<span>Semester</span>
								<select defaultValue='S5'>
									<option>S1</option>
									<option>S2</option>
									<option>S3</option>
									<option>S4</option>
									<option>S5</option>
									<option>S6</option>
									<option>S7</option>
									<option>S8</option>
								</select>
							</label>
							<label>
								<span>Examination Type</span>
								<select defaultValue='End Sem'>
									<option>Mid Sem</option>
									<option>End Sem</option>
									<option>Regular</option>
									<option>Supplementary</option>
								</select>
							</label>
							<label>
								<span>Year</span>
								<input
									type='number'
									min='2000'
									max='2100'
									placeholder='2026'
								/>
							</label>
						</div>
					</div>

					<div className='upload-card'>
						<h3>File Upload</h3>
						<div className='drop-zone'>
							<p>Drag and drop PDF here</p>
							<span>or click to select file</span>
							<input type='file' accept='application/pdf' />
						</div>
						<div className='upload-actions'>
							<button type='button' className='primary-action'>
								Submit Upload
							</button>
							<button type='button' className='secondary-action'>
								Save Draft
							</button>
						</div>
						<p className='muted-text'>
							Buttons are UI placeholders until backend endpoint is
							connected.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UploadPanel;
