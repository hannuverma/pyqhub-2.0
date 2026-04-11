import UploadPanel from "../components/upload/UploadPanel";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";

const UploadSectorPage = () => {
	const logoutHandler = () => {
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFRESH_TOKEN);
		localStorage.removeItem("userProfile");
		window.location.href = "/sector/login";
	};

	return <UploadPanel logoutHandler = {logoutHandler} />;
};

export default UploadSectorPage;
