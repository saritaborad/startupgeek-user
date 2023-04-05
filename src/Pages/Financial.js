import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import FinancialImage from "../Images/financial-image.svg";
import IrsIcon2 from "../Images/irs-icon-2.svg";
import Legal from "../Images/legal-icon.svg";
import StateIrs from "../Images/state-irs-icon.svg";
import Consultation from "../Images/consultation-icon.svg";
import Card from "../Images/credit-card-icon.svg";

export default function Financial() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<h1>Financial</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Save yourself the time and headache on daily financial tasks with the right financial solutions.</h2>
										<p>We want to help your business thrive - not just today, but well into tomorrow. We worked with small business owners like you to develop solutions that will cater to your growing business needs.</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={FinancialImage} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row">
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={IrsIcon2} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Business Banking</bdi>
										<p>Opening a business bank account for your new endeavor doesn't just serve to legitimize your business it helps to protect your personal assets.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/business-banking" className="d-inline-block">
												Read More →
											</Link>
										</div>
									</div>
								</div>
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={Card} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Credit Card</bdi>
										<p>The availability of credit can be critical for small businesses to fund operations, invest in new opportunities, or provide needed cash flow.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/" target="_blank" className="d-inline-block">
												Read More →
											</Link>
										</div>
									</div>
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
										<img src={StateIrs} alt="state irs" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">State & IRS</span>
										<p>As your business grows we'll help make sure that you have the resources at hand to service your companies ongoing needs.</p>
										<div className="pt-2">
											<Link to="/state-irs" className="btn-comn-all text-white">
												Read more
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Legal} alt="legal" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Legal</span>
										<p>As a business owner, you are responsible for making sure your company has the proper protection against outside threats while maintaining compliance to operate legally on a federal, state, city, and county levels.</p>
										<div className="pt-2">
											<Link to="/legal" className="btn-comn-all text-white">
												Read more
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Consultation} alt="consultation" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Business Tax Consultation</span>
										<p>The consultation can help you identify important tax deductions and provide insight into the IRS tax classification of your new business.</p>
										<div className="pt-2">
											<Link to="/texes" className="btn-comn-all text-white">
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
