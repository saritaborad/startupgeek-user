import React from "react";
import FrontHeader from "./FrontHeader";

export default function FrontLayout(props) {
	return (
		<>
			<FrontHeader />
			{props.children}
		</>
	);
}
