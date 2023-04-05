import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import Event from "../Images/date-icon.svg";
import EventImage from "../Images/event-image-large.png";
import CheckSingle from "../Images/check-single-icon.svg";
import { Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Compliance() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<h1>Compliance</h1>
							</div>
						</div>
						<div className="col-12 mb-4">
							<div className="white-box-main">
								<div className="box-hdr-top">
									<span className="d-flex align-items-center">
										<img src={Event} className="pe-2" alt="" />
										Upcoming Events
									</span>
									<p className="box-hdr-top-p">We provide courtesy alerts to make sure that you never miss a state compliance important due date.</p>
								</div>
								<div className="row">
									<div className="col-lg-4 mb-4">
										<div className="evnts-box-main">
											<div className="evnts-box-top">
												<img src={EventImage} className="w-100 h-100" alt="" />
											</div>
											<div className="evnts-box-top-ctr my-3">
												<span>State Requirement</span>
											</div>
											<div className="evnts-box-ctr">Franchise Tax & Public Information Report (TX)</div>
											<div className="evnts-box-btm">
												<div className="row me-0">
													<div className="col-6">
														<span>Due Date</span>
													</div>
													<div className="col-6">
														<bdi>MAY. 15 2023</bdi>
													</div>
												</div>
												<div className="row me-0">
													<div className="col-6">
														<span>Total Fee</span>
													</div>
													<div className="col-6">
														<b>$99</b>
													</div>
												</div>
											</div>
											<div className="pt-3 mt-auto">
												<button type="button" className="btn-comn-all w-100 d-block" onClick={() => navigate("/annual-report")}>
													file annual report
												</button>
											</div>
										</div>
									</div>
									<div className="col-lg-4 mb-4">
										<div className="evnts-box-main">
											<div className="evnts-box-top">
												<img src={EventImage} className="w-100 h-100" alt="" />
											</div>
											<div className="evnts-box-top-ctr my-3">
												<span>State Requirement</span>
											</div>
											<div className="evnts-box-ctr">Franchise Tax & Public Information Report (TX)</div>
											<div className="evnts-box-btm">
												<div className="row me-0">
													<div className="col-6">
														<span>Due Date</span>
													</div>
													<div className="col-6">
														<bdi>MAY. 15 2024</bdi>
													</div>
												</div>
												<div className="row me-0">
													<div className="col-6">
														<span>Total Fee</span>
													</div>
													<div className="col-6">
														<b>$99</b>
													</div>
												</div>
											</div>
											<div className="pt-3 mt-auto">
												<button disabled type="submit" className="btn-comn-all w-100 d-block disabled">
													file annual report
												</button>
											</div>
										</div>
									</div>
									<div className="col-lg-4 mb-4">
										<div className="evnts-box-main">
											<div className="evnts-box-top">
												<img src={EventImage} className="w-100 h-100" alt="" />
											</div>
											<div className="evnts-box-top-ctr my-3">
												<span>State Requirement</span>
											</div>
											<div className="evnts-box-ctr">Franchise Tax & Public Information Report (TX)</div>
											<div className="evnts-box-btm">
												<div className="row me-0">
													<div className="col-6">
														<span>Due Date</span>
													</div>
													<div className="col-6">
														<bdi>MAY. 15 2025</bdi>
													</div>
												</div>
												<div className="row me-0">
													<div className="col-6">
														<span>Total Fee</span>
													</div>
													<div className="col-6">
														<b>$99</b>
													</div>
												</div>
											</div>
											<div className="pt-3 mt-auto">
												<button disabled type="submit" className="btn-comn-all w-100 d-block disabled">
													file annual report
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="white-box-main">
								<div className="box-hdr-top">
									<span className="d-flex align-items-center">
										<img src={CheckSingle} className="pe-2" alt="" />
										State Requirements
									</span>
								</div>
								<div className="d-flex align-items-center cmpny-info-text">
									<span>Frequency</span>
									<p className="mb-0">: Annually</p>
									<div className="ms-auto">
										<button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} type="button" className="arrow-down-up-info">
											<i className="bi bi-chevron-down"></i>
										</button>
									</div>
								</div>
								<div>
									<Collapse in={open}>
										<div id="example-collapse-text">
											<div className="d-flex align-items-center cmpny-info-text">
												<span>Frequency</span>
												<p className="mb-0">: Annually</p>
											</div>
										</div>
									</Collapse>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
