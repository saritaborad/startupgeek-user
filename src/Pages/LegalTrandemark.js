import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Trandemark from "../Images/trandemark-image.svg";
import Insurance from "../Images/insurance-icon.svg";
import Permits from "../Images/permits-icon.svg";
import Business from "../Images/business-icon.svg";
import { Accordion } from "react-bootstrap";
import Chat from "../Images/chat-icon.svg";
import Search from "../Images/search-icon.svg";
import Trademark from "../Images/trademark-icon.svg";
import ArrowLeft from "../Images/arrow-left-shap.svg";
import { GoBackArrow } from "./Common/AdminOrderSummary";

export default function LegalTrandemark() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-sm-inline-flex align-items-center">
								<GoBackArrow />
								<h1>Trandemark</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Protect your business name with a trademark.</h2>
										<p>Protecting your trademark can really pay dividends. Not only is it a valuable property asset, but it’s also your brand, your reputation. The reputation you have established is associated with these different brand elements - your name, logo, and tagline - and the reason why people buy from you. It’s important to take steps to protect these company assets.</p>
										<p>Our partnered attorneys will do the research to make sure the mark isn't already taken, ensure the filing gets accepted by the government office, and provide sound legal advice throughout the entire process.</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={Trandemark} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 mt-4">
							<div className="white-box-main">
								<div className="recommendations-info">
									<h2 className="position-relative bdr-remove mb-0 pb-0">What's included with the package?</h2>
								</div>
								<ul className="learn-inform-list row">
									<li className="col-md-6 mt-3">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Legal counsel from an experienced trademark attorney
										</div>
									</li>
									<li className="col-md-6 mt-3">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											A registered trademark with the USPTO
										</div>
									</li>
									<li className="col-md-6 mt-3">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											A thorough search of existing trademarks
										</div>
									</li>
									<li className="col-md-6 mt-3">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Handling all correspondence with the USPTO until the name is approved.
										</div>
									</li>
								</ul>
								<div className="pt-4">
									<Link to="/legal-trandemark-name-search" className="btn-comn-all text-white">
										get started
									</Link>
								</div>
							</div>
						</div>
						<div className="col-12 pt-4">
							<div className="recommendations-info">
								<h2 className="position-relative">How it works</h2>
							</div>
							<div className="row space-box-fix">
								<div className="col-md-4 space-class-box position-relative">
									<div className="white-box-main mb-4 irs-btm-box text-center web-info-box">
										<bdi className="mx-auto">
											<img src={Chat} alt="" />
										</bdi>
										<span className="d-block">Tell us what you need</span>
										<p className="mt-auto">A trademark attorney will follow up with you to get a better understanding of your needs and provide guidance on how the process works.</p>
									</div>
									<img src={ArrowLeft} className="fix-shap-one position-absolute d-none d-md-block" alt="" />
								</div>
								<div className="col-md-4 space-class-box position-relative">
									<div className="white-box-main mb-4 irs-btm-box text-center web-info-box">
										<bdi className="mx-auto">
											<img src={Search} alt="" />
										</bdi>
										<span className="d-block">Trademark search</span>
										<p className="mt-auto">The trademark attorney will conduct a trademark search to ensure the availability, then provide the search results along with a plan of action.</p>
									</div>
									<img src={ArrowLeft} className="fix-shap-one position-absolute d-none d-md-block" alt="" />
								</div>
								<div className="col-md-4 space-class-box">
									<div className="white-box-main mb-4 irs-btm-box text-center web-info-box">
										<bdi className="mx-auto">
											<img src={Trademark} alt="" />
										</bdi>
										<span className="d-block">Trademark filed</span>
										<p className="mt-auto">The attorney will file the trademark with the US Patent and Trademark office and deliver the approved trademark documentation.</p>
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
										<Accordion.Header>How broad is my trademark protection?</Accordion.Header>
										<Accordion.Body>This includes filing the trademark in one series and one class. Additional legal fees and filing fees will apply if you decide to file a trademark in more than one class.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="1">
										<Accordion.Header>How long will it take for my trademark to be filed?</Accordion.Header>
										<Accordion.Body>Trademark approval times can vary based on demand but generally fall in the window of 3-4 months. Despite the delayed approval time, you will be able to monitor the status of the trademark online as it's going through the approval process.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="2">
										<Accordion.Header>Can I cancel my order?</Accordion.Header>
										<Accordion.Body>The trademark will be filed within 3 business days upon receiving the desired trademark and performing a search. If it's determined after the search that the name has a low likelihood for approval, you can request a refund before the application is filed.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="3">
										<Accordion.Header>What level of support can I expect through this process?</Accordion.Header>
										<Accordion.Body>Once you have submitted your business name or logo, an attorney will conduct the initial search and discuss the results via email or phone. The attorney will then prepare the filing application and submit to the United States Patent and Trademark Office. You will be able to track the approval status and contact us with any questions you may have while awaiting for the approval.</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</div>
							<div className="pt-1 pb-3">
								<Link to="/legal-trandemark-name-search" className="btn-comn-all text-white">
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
											<Link to="/business-insurance" className="btn-comn-all text-white">
												Read more
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Permits} alt="permits" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Licenses & Permits</span>
										<p>Determine all business licenses and permits required at the federal, state, county, and municipal level.</p>
										<div className="pt-2">
											<Link to="/business-licenses-permits" className="btn-comn-all text-white">
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
											<Link to="/business-contracts" className="btn-comn-all text-white">
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
