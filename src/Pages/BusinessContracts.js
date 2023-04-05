import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import ContractsImage from "../Images/contract-image.svg";
import Insurance from "../Images/insurance-icon.svg";
import Trademark from "../Images/trademark-icon-new.svg";
import Permits from "../Images/permits-icon.svg";
import { GoBackArrow } from "./Common/AdminOrderSummary";

export default function BusinessContracts() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-sm-inline-flex align-items-center">
								<GoBackArrow />
								<h1>Business Contracts</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Get 25+ Lawyer-Approved Legal Documents</h2>
										<p>You’re an entrepreneur and business owner (but probably not a lawyer), so it can be both surprising and intimidating when you start digging in to research all the legally binding documentation you’ll need to make sure your company is covered.</p>
										<p>Sooner or later, you’ll probably need to enact a variety of contracts that detail employment terms, protect your ideas when you hire outside freelancers or outline partnership agreements (if you start your company with a partner).</p>
									</div>
									<div className="pt-3">
										<Link to="/business-contract" className="btn-comn-all text-white">
											Preview all contracts
										</Link>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={ContractsImage} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 mt-4">
							<div className="white-box-main">
								<div className="recommendations-info">
									<h2 className="position-relative bdr-remove mb-0 pb-0">After much research and professional input, we have compiled a list of the most commonly requested and useful contracts that business owners will need access to</h2>
								</div>
								<ul className="learn-inform-list row">
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Operating Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Non-Compete Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Employment Offer Letter
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											83(B) Election Form
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Sales Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Letter Of Intent For A Business Venture
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Consulting Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Cease & Desist Letter (Trademark Infringement)
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Website Linking Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Corporate Bylaws
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Statement Of The Organizer
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Independent Contractor Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Intellectual Property Assignment Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Terms Of Service
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											General Corporate Resolution
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Joint Venture Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Organization Meeting Minutes
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Founder Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Non-Disclosure Agreement (NDA)
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Bill Of Sale
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Banking Resolutions
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Employment Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Release Of Liability
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Privacy Policy
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Demand Letter
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Memorandum Of Understanding (Mou)
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Partnership Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Service Agreement
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Employee Termination Letter
										</div>
									</li>
									<li className="mt-3 col-md-6">
										<div className="learn-inform-list-inr">
											<span className="d-flex align-items-center justify-content-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</span>
											Collaboration Agreement
										</div>
									</li>
								</ul>
								<div className="pt-3">
									<Link to="/business-contract" className="btn-comn-all text-white">
										Preview all contracts
									</Link>
								</div>
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
										<img src={Permits} alt="business" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Licenses & Permits</span>
										<p>Determine all business licenses and permits required at the federal, state, county, and municipal level..</p>
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
										<img src={Trademark} alt="trademark" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Trademark</span>
										<p>Take steps to protect your brand and valuable company assets such as your name, logo, and tagline.</p>
										<div className="pt-2">
											<Link to="/legal-trandemark" className="btn-comn-all text-white">
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
