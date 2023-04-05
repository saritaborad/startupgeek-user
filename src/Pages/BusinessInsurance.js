import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import BusinessInsuranceImage from "../Images/businsurance-image.svg";
import ApproachIcon1 from "../Images/approach-icon-1.svg";
import ApproachIcon2 from "../Images/approach-icon-2.svg";
import ApproachIcon3 from "../Images/approach-icon-3.svg";
import CoverWallet1 from "../Images/wallet-cover-icon1.svg";
import CoverWallet2 from "../Images/wallet-cover-icon2.svg";
import CoverWallet3 from "../Images/wallet-cover-icon3.svg";
import CoverWallet4 from "../Images/wallet-cover-icon4.svg";
import CoverWallet5 from "../Images/wallet-cover-icon5.svg";
import CoverWallet6 from "../Images/wallet-cover-icon6.svg";
import CoverWallet7 from "../Images/wallet-cover-icon7.svg";
import CoverWallet8 from "../Images/wallet-cover-icon8.svg";
import CoverWallet9 from "../Images/wallet-cover-icon9.svg";
import CoverWallet10 from "../Images/wallet-cover-icon10.svg";
import Trademark from "../Images/trademark-icon-new.svg";
import Permits from "../Images/permits-icon.svg";
import Business from "../Images/business-icon.svg";
import { GoBackArrow } from "./Common/AdminOrderSummary";

export default function BusinessInsurance() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-sm-inline-flex align-items-center">
								<GoBackArrow />
								<h1>Business Insurance</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Manage your Business Insurance</h2>
										<p>A smart digital wallet of all your policies & rates, with peer comparison, certificates, advice, claims help, and more.</p>
									</div>
									<div className="pt-3">
										<Link to="/" className="d-inline-block btn-comn-all text-white">
											Read more
										</Link>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={BusinessInsuranceImage} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="recommendations-info">
								<h2 className="position-relative">Our Approach</h2>
							</div>
							<div className="row space-box-fix">
								<div className="col-md-4 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={ApproachIcon1} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Get advice</bdi>
										<p>Need free help? Understand in 10 seconds what type of insurance your industry needs, and why.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/" className="d-inline-block">
												Insurance Assessment →
											</Link>
										</div>
									</div>
								</div>
								<div className="col-md-4 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={ApproachIcon2} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Get quotes</bdi>
										<p>Get free quotes for General Liability, Property, E&O, Workers’ Comp and more. No commitment to buy.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/" className="d-inline-block">
												Get Free Quotes →
											</Link>
										</div>
									</div>
								</div>
								<div className="col-md-4 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={ApproachIcon3} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Manage your policies</bdi>
										<p>A smart digital wallet of all your policies & rates, with peer comparison, certificates, claims help, and more.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/" className="d-inline-block">
												Learn More →
											</Link>
										</div>
									</div>
								</div>
							</div>
							<p className="mb-0 tel-text pt-3">
								Prefer to speak with a CoverWallet consultant to discuss options? Call
								<Link to="/"> (646) 844-9933</Link> anytime
							</p>
						</div>
						<div className="col-12 mt-4">
							<div className="recommendations-info">
								<h2 className="position-relative">Get free quotes from multiple insurance carriers with CoverWallet</h2>
							</div>
							<div className="row space-box-fix box-fix-row-busnis">
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet1} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">General Liability</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet2} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Workers Compensation</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet3} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Business Owners Policy (BOP)</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet4} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Commercial Property</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet5} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Professional Liability</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet6} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Commercial Auto</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet7} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Umbrella Insurance</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet8} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Errors & Omissions (E&O)</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet9} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Product Liability</bdi>
									</Link>
								</div>
								<div className="space-class-box box-fix-col-busnis col-md-3 col-sm-4 col-6">
									<Link to="/" className="order-box-btm justify-content-center text-center">
										<span className="mx-auto">
											<img src={CoverWallet10} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">More</bdi>
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
