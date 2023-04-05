import React from "react";
import Layout from "../Components/Layout/Layout";
import WebIcon1 from "../Images/web-icon-1.svg";
import WebIcon2 from "../Images/web-icon-2.svg";
import WebIcon3 from "../Images/web-icon-3.svg";

export default function DomainEmailSearch() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<h1>Domain Name & Email</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="recommendations-info text-center">
								<h2 className="position-relative bdr-remove">Domain names start your business journey</h2>
								<div className="sarch-box-top mx-auto">
									<div className="input-group">
										<input type="search" className="form-control" placeholder="Search For a Domain " />
										<span className="input-group-text p-0 border-0 mx-auto text-center">
											<button type="button" className="border-0 bg-transparent text-white w-100 d-block">
												Search
											</button>
										</span>
									</div>
									<p>Your domain name search is just the beginning</p>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row">
								<div className="col-md-4 space-class-box">
									<div className="white-box-main mb-4 irs-btm-box text-center web-info-box">
										<bdi className="mx-auto">
											<img src={WebIcon1} alt="financial" />
										</bdi>
										<span className="d-block">Be a business they can trust</span>
										<p className="mt-auto">You'd be surprised how much a professional email and online security help establish you as a reputable brand.</p>
									</div>
								</div>
								<div className="col-md-4 space-class-box">
									<div className="white-box-main mb-4 irs-btm-box text-center web-info-box">
										<bdi className="mx-auto">
											<img src={WebIcon2} alt="financial" />
										</bdi>
										<span className="d-block">Create a lasting impression</span>
										<p className="mt-auto">Whether it's a beautifully designed website, or how well you communicate using it, your customers will notice.</p>
									</div>
								</div>
								<div className="col-md-4 space-class-box">
									<div className="white-box-main mb-4 irs-btm-box text-center web-info-box">
										<bdi className="mx-auto">
											<img src={WebIcon3} alt="financial" />
										</bdi>
										<span className="d-block">Enjoy the journey</span>
										<p className="mt-auto">Building a business requires patience. With the right tools and guidance, growth is just around the corner.</p>
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
