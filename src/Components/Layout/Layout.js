import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout(props) {
	const removeLayer = () => {
		document.getElementById("root").classList.remove("dash-main-class-add");
	};

	return (
		<>
			<Header />
			<Sidebar />
			{props.children}
			<Footer />
			<div className="overlay toggle-icon-main" onClick={removeLayer}></div>
		</>
	);
}
