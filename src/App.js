import RouterContainer from "./routes";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./Context/AuthContext";

export default function App() {
	return (
		<AuthContextProvider>
			<ToastContainer autoClose={1000} theme="dark" position="top-right" />
			<RouterContainer />
		</AuthContextProvider>
	);
}
