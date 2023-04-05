import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Profile from "../../Images/profile.png";
import HeaderLogo from "../../Images/logo-hdr.png";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	const context = useContext(AuthContext);

	const [user, setuser] = useState();
	const [company, setCompany] = useState("");

	useEffect(() => {
		setuser(context.user);
		setCompany(context.viewCompanyInfo);
	}, [context.user, context.company, context.viewCompanyInfo]);

	const addmainclass = () => {
		document.getElementById("root").classList.toggle("dash-main-class-add");
	};

	const openUserinfo = () => {
		document.getElementById("user-detail").classList.toggle("active-user-info");
	};

	const Logout = () => {
		localStorage.removeItem("startgeekuser");
	};

	return (
		<header className="header-fix-top-section">
			<div onClick={addmainclass} className="d-xl-none">
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#060640" className="bi bi-arrow-left-circle me-3" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
				</svg>
			</div>

			{context.isComLogin && (
				<div className="hdr-top-info d-flex align-items-center">
					<span className="me-2">
						<img src={HeaderLogo} className="w-100 h-100" alt="logo" />
					</span>
					{company?.company_name}
				</div>
			)}
			<div className="ms-auto mobile-responsive-info" id="user-detail">
				<div className="d-flex align-items-center mobile-responsive-info-inr">
					<button type="button" className="btn-comn-all" onClick={() => navigate("/start-company-business")}>
						Start A new company
					</button>
					<div className="dropdown-header p-0 ms-3">
						<Dropdown>
							<Dropdown.Toggle id="dropdown">
								<img src={user?.profile_img ? user?.profile_img : Profile} alt="profile" />
								<div className="ps-3 text-start">
									<span className="d-block">{user?.fname ? user?.fname : " " + user?.lname ? user?.lname : " "}</span>
									<bdi className="d-block">{user?.email}</bdi>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item href="/" onClick={() => Logout()}>
									Logout
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
			</div>
			<div className="d-md-none" onClick={() => openUserinfo()}>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
					<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
				</svg>
			</div>
		</header>
	);
}
