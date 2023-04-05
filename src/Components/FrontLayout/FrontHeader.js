import React from "react";
import { Link } from "react-router-dom";
import HeaderLogo from "../../Images/logo.png";

export default function FrontHeader() {
	const addactiveclass = () => {
		document.getElementById("menu-box").classList.toggle("active");
		document.getElementById("menu-icon").classList.toggle("active");
	};

	return (
		<>
			<header className="main-header-section">
				<div className="main-header-row">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="header-class">
									<div className="my-2">
										<Link to="/">
											<img src={HeaderLogo} className="img-fluid logo" alt="startup geeks" />
										</Link>
									</div>
									<div className="header-options ms-auto" id="menu-box">
										<ul>
											<li>
												<Link to="#">How it works</Link>
											</li>
											<li>
												<button type="submit" className="btn-comn-all">
													Get in touch
												</button>
											</li>
										</ul>
									</div>
									<div className="responsive-menu" onClick={() => addactiveclass()}>
										<div className="header-menu-icon" id="menu-icon">
											<span className="line"></span>
											<span className="line"></span>
											<span className="line"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
