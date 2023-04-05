import React from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import IrsIcon2 from "../Images/irs-icon-2.svg";
import Premium from "../Images/premium-icon.svg";
import EssentialsApp1 from "../Images/essentials-app1.png";
import EssentialsApp2 from "../Images/essentials-app2.png";
import EssentialsApp3 from "../Images/essentials-app3.png";
import EssentialsApp4 from "../Images/essentials-app4.png";
import EssentialsApp5 from "../Images/essentials-app5.png";
import EssentialsApp6 from "../Images/essentials-app6.png";
import EssentialsApp7 from "../Images/essentials-app7.png";
import EssentialsApp8 from "../Images/essentials-app8.png";
import EssentialsApp9 from "../Images/essentials-app9.png";
import EssentialsApp10 from "../Images/essentials-app10.png";
import EssentialsApp11 from "../Images/essentials-app11.png";
import EssentialsApp12 from "../Images/essentials-app12.png";
import { GoBackArrow } from "./Common/AdminOrderSummary";

export default function BusinessListingStarted() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-sm-inline-flex align-items-center">
								<GoBackArrow />
								<h1>Business Listings</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="recommendations-info text-center">
								<h2 className="position-relative bdr-remove mb-0">Select a package</h2>
								<p>Ensure consumers find accurate information about your business in the most popular online directories</p>
							</div>
						</div>
						<div className="col-12">
							<div className="row">
								<div className="col-lg-6">
									<div className="space-class-box">
										<div className="order-box-btm">
											<span>
												<img src={IrsIcon2} className="img-fluid" alt="" />
											</span>
											<bdi className="d-block">Business Essentials</bdi>
											<div className="price-text-info">
												$240/<mark>year</mark>
											</div>
											<div className="mt-auto order-box-btm-read">
												<Link to="/business-listing-package" className="d-inline-block">
													Select Package →
												</Link>
											</div>
										</div>
									</div>
									<div className="white-box-main mt-3 apps-list-info">
										<p className="mb-0">Publishes to 5 apps</p>
										<ul className="row me-0">
											<li className="col-md-4 col-6 mt-4 pe-0">
												<span>
													<img src={EssentialsApp1} className="me-2 img-fluid" alt="" />
													<bdi> Google</bdi>
												</span>
											</li>
											<li className="col-md-4 col-6 mt-4 pe-0">
												<span>
													<img src={EssentialsApp2} className="me-2 img-fluid" alt="" />
													<bdi>Foursquare</bdi>
												</span>
											</li>
											<li className="col-md-4 col-6 mt-4 pe-0">
												<span>
													<img src={EssentialsApp3} className="me-2 img-fluid" alt="" />
													<bdi>Yahoo!</bdi>
												</span>
											</li>
											<li className="col-md-4 col-6 mt-4 pe-0">
												<span>
													<img src={EssentialsApp4} className="me-2 img-fluid" alt="" />
													<bdi>Apple</bdi>
												</span>
											</li>
											<li className="col-md-4 col-6 mt-4 pe-0">
												<span>
													<img src={EssentialsApp5} className="me-2 img-fluid" alt="" />
													<bdi>Facebook</bdi>
												</span>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="space-class-box">
										<div className="order-box-btm">
											<span>
												<img src={Premium} className="img-fluid" alt="" />
											</span>
											<bdi className="d-block">Business Premium</bdi>
											<div className="price-text-info">
												$360/<mark>year</mark>
											</div>
											<div className="mt-auto order-box-btm-read">
												<Link to="/business-listing-package" className="d-inline-block">
													Select Package →
												</Link>
											</div>
										</div>
										<div className="white-box-main mt-3 apps-list-info">
											<p className="mb-0">Publishes to 40 apps</p>
											<ul className="row me-0">
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp1} className="me-2 img-fluid" alt="" />
														<bdi>Google</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp2} className="me-2 img-fluid" alt="" />
														<bdi>Foursquare</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp3} className="me-2 img-fluid" alt="" />
														<bdi>Yahoo!</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp4} className="me-2 img-fluid" alt="" />
														<bdi>Apple</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp5} className="me-2 img-fluid" alt="" />
														<bdi> Facebook</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp6} className="me-2 img-fluid" alt="" />
														<bdi>Uber</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp7} className="me-2 img-fluid" alt="" />
														<bdi> Bing</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp8} className="me-2 img-fluid" alt="" />
														<bdi>Waze</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp9} className="me-2 img-fluid" alt="" />
														<bdi>Citysearch</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp10} className="me-2 img-fluid" alt="" />
														<bdi>Judy’s book</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp11} className="me-2 img-fluid" alt="" />
														<bdi>CitySquares</bdi>
													</span>
												</li>
												<li className="col-md-4 col-6 mt-4 pe-0">
													<span>
														<img src={EssentialsApp12} className="me-2 img-fluid" alt="" />
														<bdi>EZlocal</bdi>
													</span>
												</li>
											</ul>
										</div>
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
										<Accordion.Header>How does Business Listings work?</Accordion.Header>
										<Accordion.Body>Business Listings is an all-in-one platform that helps you manage business listings across a network of online directories including digital maps, apps, social networks, GPS systems, and search engines. These networks let business owners manage public information and facts about their business.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="1">
										<Accordion.Header>Why is Business Listings important for my business?</Accordion.Header>
										<Accordion.Body>Business listings will make it simple for local customers to find your local business. Managing a business is local listing directories facilitates the process for your customers to find your business more easily. You can provide as many citations as possible.</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="2">
										<Accordion.Header>Will Business Listings put my listings on the first page of search engines?</Accordion.Header>
										<Accordion.Body>Having your business information accurately displayed on the most important publishers certainly has an impact on your overall ranking, however the most important factor is to document as much information as possible and customize your profile.</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
