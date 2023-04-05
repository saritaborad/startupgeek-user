import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import LegalImage from "../Images/legal-image.svg";
import Trad from "../Images/trademark-icon.svg";
import Licenses from "../Images/licenses-icon.svg";
import StateIrs from "../Images/state-irs-icon.svg";
import Financial from "../Images/financial-icon.svg";
import Consultation from "../Images/consultation-icon.svg";
import IrsIcon4 from "../Images/irs-icon-4.svg";
import IrsIcon3 from "../Images/irs-icon-3.svg";

export default function Legal() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<h1>Legal</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Having the right protection gives you the peace of mind to focus on what matters - running your business.</h2>
										<p>As a business owner, you are responsible for making sure your company has the proper protection against outside threats while maintaining compliance to operate legally on a federal, state, city, and county levels.</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={LegalImage} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row">
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={Trad} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Trademark</bdi>
										<p>Take steps to protect your brand and valuable company assets such as your name, logo, and tagline.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/legal-trandemark" className="d-inline-block">
												Read More →
											</Link>
										</div>
									</div>
								</div>
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={IrsIcon3} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Business Insurance</bdi>
										<p>Identify the insurance you need based on your specific business, get you a policy that fits your budget, and do it all in less time than you think.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/business-insurance" className="d-inline-block">
												Read More →
											</Link>
										</div>
									</div>
								</div>
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={Licenses} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Licenses & Permits</bdi>
										<p>Determine all business licenses and permits required at the federal, state, county, and municipal level.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/business-licenses-permits" className="d-inline-block">
												Read More →
											</Link>
										</div>
									</div>
								</div>
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={IrsIcon4} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Business Contracts</bdi>
										<p>Get access to 25+ high quality legal documents drafted by a business attorney to assist with running your business.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/business-contracts" className="d-inline-block">
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
										<img src={Financial} alt="financial" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Financial</span>
										<p>Having the right financial strategy gives you the peace of mind to focus on what matters - running your business.</p>
										<div className="pt-2">
											<Link to="/financial" className="btn-comn-all text-white">
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
