import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import WebsiteImage from "../Images/web-image.svg";
import WebIconNew1 from "../Images/web-new-icon-1.svg";
import WebIconNew2 from "../Images/web-new-icon-2.svg";
import StateIrs from "../Images/state-irs-icon.svg";
import Financial from "../Images/financial-icon.svg";
import Legal from "../Images/legal-icon.svg";
import Consultation from "../Images/consultation-icon.svg";

export default function Website() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<h1>Website</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Creating a website for your business can be easier than you think....</h2>
										<p>Creating a website for your business doesn't have to be a headache and it certainly doesn't require hiring an expensive agency to create it for you. Depending on your level of web savvy there are several quick and affordable solutions.</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={WebsiteImage} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row">
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={WebIconNew1} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Do-It-Yourself</bdi>
										<p>Use a website builder solution to upload information, drag and drop images, and customize the text all on your own.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/website-details" className="d-inline-block">
												Read More →
											</Link>
										</div>
									</div>
								</div>
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={WebIconNew2} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">E-commerce</bdi>
										<p>Give me an all-in-one solution to manage inventory, payments, and provide a shopping cart to sell my products with ease.</p>
										<div className="mt-auto order-box-btm-read">
											<Link to="/https://wixstats.com/?a=22153&c=2789&s1=" target="_blank" className="d-inline-block">
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
