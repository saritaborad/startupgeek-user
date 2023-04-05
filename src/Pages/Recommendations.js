import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import AuthContext from "../Context/AuthContext";
import Company1 from "../Images/banking-business.svg";
import Company2 from "../Images/online-free.svg";
import RecommendationsImage from "../Images/recommendation-image.svg";

export default function Recommendations() {
	const context = useContext(AuthContext);
	const [viewcompanyid, setviewcompanyid] = useState("");

	useEffect(() => {
		setviewcompanyid(context.viewCompanyId);
	}, [context.viewCompanyId]);

	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<h1>Recommendations</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Congratulations! We've identified 2 services that can provide value for your business.</h2>
										<p>We are driven by providing ongoing value to our clients by bringing on great partners with services and resources that make it easier to run your business.</p>
										<p>We don't believe that one size fits all, therefore our recommendations are a curated list based on your business type, industry, and other qualified information that help us provide only services relevant to your business.</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={RecommendationsImage} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row">
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={Company1} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Speak to a Dedicated Business Banking Specialist</bdi>
										<p>Our partnership with Bank of America gives you access to a dedicated specialist to setup your business bank account by phone.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/" state={{ viewCompanyId: viewcompanyid }} className="d-inline-block">
												Read More →
											</Link>
										</div>
									</div>
								</div>
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={Company2} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Searching Online for Free Legal Templates is a Headache.</bdi>
										<p>Get access to 25+ high quality legal documents written by a business attorney to help aid in keeping your business contractually protected.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/" state={{ viewCompanyId: viewcompanyid }} className="d-inline-block">
												Read More →
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
