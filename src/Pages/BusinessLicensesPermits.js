import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import License from "../Images/licenses-top-img.svg";
import Insurance from "../Images/insurance-icon.svg";
import Trademark from "../Images/trademark-icon-new.svg";
import Business from "../Images/business-icon.svg";
import { Accordion } from "react-bootstrap";
import Research from "../Images/licenses-research.png";
import { GoBackArrow } from "./Common/AdminOrderSummary";

export default function BusinessLicensesPermits() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-sm-inline-flex align-items-center">
								<GoBackArrow />
								<h1>Business Licenses And Permits</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Get your licenses and permits with ease!</h2>
										<p>As a business owner, you are responsible for making sure your business has the proper federal, state and local licenses and permits to operate legally.</p>
										<p>To make it easier, our trusted partner will provide you with a comprehensive package of all the licenses, permits and tax registrations required for your business as well as the application forms to file with the appropriate licensing authorities.</p>
										<p>Remember that operating your business without the required licenses can expose you to risks and fines from state and local governments. Don't let your new business stumble because you failed to get the proper licenses.</p>
									</div>
									<div className="pt-3">
										<Link to="/business-license-research" className="btn-comn-all text-white">
											get started
										</Link>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={License} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 mt-4">
							<div className="white-box-main">
								<div className="row">
									<div className="col-md-4">
										<div className="license-research text-center mb-3">
											<img src={Research} className="img-fluid" alt="" />
										</div>
									</div>
									<div className="col-md-8">
										<div className="recommendations-info">
											<h2 className="position-relative bdr-remove mb-0 pb-0">As part of the Business License Research Package, a Licensing Specialist will:</h2>
										</div>
										<ul className="learn-inform-list">
											<li className="mt-3">
												<div className="learn-inform-list-inr">
													<span className="d-flex align-items-center justify-content-center">
														<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
															<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
														</svg>
													</span>
													Determine all business licenses and permits required at the federal, state, county and municipal level.
												</div>
											</li>
											<li className="mt-3">
												<div className="learn-inform-list-inr">
													<span className="d-flex align-items-center justify-content-center">
														<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
															<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
														</svg>
													</span>
													Provide you the proper license/permit application forms.
												</div>
											</li>
											<li className="mt-3">
												<div className="learn-inform-list-inr">
													<span className="d-flex align-items-center justify-content-center">
														<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
															<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
														</svg>
													</span>
													List filing instructions, supporting document requirements and fees.
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 pt-4">
							<div className="recommendations-info">
								<h2 className="position-relative">Frequently asked questions</h2>
							</div>
							<div className="white-box-main mb-3 custom-accordion-info">
								<Accordion defaultActiveKey="0">
									<Accordion.Item eventKey="0">
										<Accordion.Header>What's in the Business License Research Package?</Accordion.Header>
										<Accordion.Body>Your Business License Research Package includes all business licenses, permits, and tax registrations that may be required, based on your business activities at the location you indicated.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="1">
										<Accordion.Header>Are all of the licenses and permits listed in my Business License Research Package required for my business?</Accordion.Header>
										<Accordion.Body>The Business License Research Package includes all of the licenses, permits, and tax registrations that may be relevant for your business. Please be sure to review all of the notes to confirm whether each license is applicable for your particular business.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="2">
										<Accordion.Header>Does my business license research package, mean that I have all my required licenses and permits?</Accordion.Header>
										<Accordion.Body>No, Your Business License Research Package includes a list of all required business licenses, tax registrations, and permits, along the most up-to-date application forms and filing instructions for each license, permit and registration. You still must apply and be approved in order to be fully compliant. Your Business License Research Package is a do-it-yourself kit to become fully licensed.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="3">
										<Accordion.Header>When will I get my Business License Research Package?</Accordion.Header>
										<Accordion.Body>In almost all cases, you will receive your Business License Research Package within 7 business days at the email address you provide upon checkout.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="4">
										<Accordion.Header>What if I have questions about my Business License Research Package or need help filing the required license applications?</Accordion.Header>
										<Accordion.Body>If you have questions regarding your Business License Research Package or you would like to order additional licensing services including filing assistance, contact LicenseLogix at 800.292.0909.</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</div>
							<div className="pt-1 pb-3">
								<Link to="/business-license-research" className="btn-comn-all text-white">
									get started
								</Link>
							</div>
						</div>
						<div className="col-12 pt-4">
							<div className="recommendations-info">
								<h2 className="position-relative">As your business grows we'll be there every step of the way to make sure that you have the resources at hand to service your company's ongoing needs.</h2>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Insurance} alt="insurance" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Business Insurance</span>
										<p>Identify the insurance you need based on your specific business, get you a policy that fits your budget, and do it all in less time than you think.</p>
										<div className="pt-2">
											<Link to="/" className="btn-comn-all text-white">
												Read more
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Trademark} alt="trademark" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Trademark</span>
										<p>Take steps to protect your brand and valuable company assets such as your name, logo, and tagline.</p>
										<div className="pt-2">
											<Link to="/" className="btn-comn-all text-white">
												Read more
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Business} alt="business" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Business Contracts</span>
										<p>Get access to 25+ high quality legal documents drafted by a business attorney to assist with running your business.</p>
										<div className="pt-2">
											<Link to="/" className="btn-comn-all text-white">
												Read more
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
