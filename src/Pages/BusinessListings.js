import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Listings from "../Images/listings-image.png";
import All from "../Images/socail-images-all.png";
import Phone from "../Images/phone-image.png";
import Listings1 from "../Images/listings-icon1.svg";
import Listings2 from "../Images/listings-icon2.svg";
import Listings3 from "../Images/listings-icon3.svg";
import Listings4 from "../Images/listings-icon4.svg";

export default function BusinessListings() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-inline-flex align-items-center">
								<h1>Business Listings</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Are you ready to attract more customers?</h2>
										<p>Today, consumers consult a variety of platforms, apps, directories and customer reviews before deciding where to make an offline purchase. To build a strong online presence, you need a solution that will expand your online visibility across these platforms.</p>
									</div>
									<div className="pt-4">
										<Link to="/business-listing-started" className="btn-comn-all text-white">
											Get Started
										</Link>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={Listings} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 mt-4">
							<div className="white-box-main">
								<div className="row align-items-center">
									<div className="col-lg-8">
										<div className="recommendations-info">
											<h2 className="position-relative bdr-remove mb-0 pb-2">Incfile Listings puts you in control of the facts about your business across 40+ digital services.</h2>
										</div>
										<div className="py-3">
											<Link to="/business-listing-visibility" className="btn-comn-all text-white">
												check your visiblity now
											</Link>
										</div>
										<div className="pt-3 text-lg-start text-center">
											<img src={All} className="img-fluid" alt="" />
										</div>
									</div>
									<div className="col-lg-4">
										<div className="text-lg-end text-center pt-5 pt-lg-0">
											<img src={Phone} className="img-fluid" alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 pt-4">
							<div className="recommendations-info">
								<h2 className="position-relative">See All Features of Incfile’s Business Listings</h2>
								<p>Today, consumers consult a variety of platforms, apps, directories and customer reviews before deciding where to make an offline purchase. To build a strong online presence, you need a solution that will expand your online visibility across these platforms.</p>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Listings1} alt="" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Manage Listings From One Place</span>
										<p>Keeping your business information up-to-date isn’t something you can do once and forget about. It requires constant maintenance. Update your brand locations from a single source of truth.</p>
									</div>
								</div>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Listings2} alt="" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Secure your business information</span>
										<p>Many of these directory apps scrap your info from the web, which we know isn't always accurate. To ensure that your information is not altered by another data source, we immediately lock your listing. That way, you are in control of your information that is displayed to potential customers.</p>
									</div>
								</div>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Listings3} alt="" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">Stand Out on Facebook</span>
										<p>Take advantage of the potential of the largest social media platform and manage your location pages on Facebook. Lorem ipsum dolor sit amet, in suspendisse ullamcorper et integer.</p>
									</div>
								</div>
							</div>
							<div className="white-box-main mb-4">
								<div className="d-flex irs-btm-box">
									<bdi className="d-flex align-items-center justify-content-center">
										<img src={Listings4} alt="" />
									</bdi>
									<div className="ps-3">
										<span className="d-block">The Direct Line to Google in Real Time</span>
										<p>Manage your data on Google My Business, including Google Maps. Thanks to our close partnership with Google and world-class integration, you can process all of your GMB details in real time.</p>
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
