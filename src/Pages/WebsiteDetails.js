import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Wix from "../Images/wix-icon.svg";
import Done from "../Images/circle-done.svg";
import { GoBackArrow } from "./Common/AdminOrderSummary";

export default function WebsiteDetails() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-sm-inline-flex align-items-center">
								<GoBackArrow />
								<h1>Website</h1>
							</div>
						</div>
						<div className="col-xxl-5 col-lg-8 col-md-9 mx-auto">
							<div className="recommendations-info text-center">
								<h2 className="position-relative bdr-remove">Do-It-Yourself Website</h2>
								<p>These are our two highest rated website builders, so you can’t go wrong with either one. Both have an easy to use interface and sport a long list of features that make it capable of creating a professional website. Thankfully, you can try both for free to see which is better for you.</p>
							</div>
							<div className="text-center wix-logo-inform">
								<img src={Wix} className="img-fluid" alt="wix" />
								<span className="d-block">Best All-Around Website Builder</span>
							</div>
							<div className="pb-4 web-list-info">
								<ul>
									<li>
										<span className="d-flex align-items-center">
											Ease of Use
											<div className="ms-auto web-list-imgs">
												<img src={Done} className="fix-size-done" alt="check" />
											</div>
										</span>
									</li>
									<li>
										<span className="d-flex align-items-center">
											No Code Needed
											<div className="ms-auto web-list-imgs">
												<img src={Done} className="fix-size-done" alt="check" />
											</div>
										</span>
									</li>
									<li>
										<span className="d-flex align-items-center">
											Design Flexibility
											<div className="ms-auto web-list-imgs">
												<img src={Done} className="fix-size-done" alt="check" />
											</div>
										</span>
									</li>
									<li>
										<span className="d-flex align-items-center">
											Free Trial
											<div className="ms-auto web-list-imgs">
												<img src={Done} className="fix-size-done" alt="check" />
											</div>
										</span>
									</li>
								</ul>
							</div>
							<div className="text-center py-3">
								<Link to="https://wixstats.com/?a=22153&c=2644&s1=" target="_blank" className="btn-comn-all text-white">
									try wix for free
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
