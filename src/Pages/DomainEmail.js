import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Doman from "../Images/dmoin-email-image.svg";
import Done from "../Images/circle-done.svg";
import DomainImage from "../Images/domain-name-image.svg";
import BusinessImage from "../Images/business-card-image.svg";
import EmailImage from "../Images/email-signature-image.svg";
import StarImage from "../Images/star-image.svg";
import Logo from "../Images/logo.png";
import { Accordion } from "react-bootstrap";

export default function DomainEmail() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<h1>Domain & Email</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="recommendations-info text-center">
								<h2 className="position-relative bdr-remove">Increase Your Credibility With A Business Email Address</h2>
								<p>Your brand is about to get a HUGE update! First step is to search for a domain for your business.</p>
								<img src={Doman} className="img-fluid" alt="domain" />
								<div className="text-center py-3">
									<Link to="/domain-email-search" className="btn-comn-all text-white">
										FIND A DOMAIN NAME
									</Link>
								</div>
								<div className="d-flex align-items-center justify-content-center">
									<img src={StarImage} className="me-2" alt="star" />
									<p className="m-0">Your order is eligible for discounted price of $27 for 1 full year of domain and email service.</p>
								</div>
							</div>
						</div>
						<div className="col-12 my-3 pt-4">
							<div className="recommendations-info text-center">
								<h2 className="position-relative bdr-remove pb-0">Why a Domain Name and Professional Email Address?</h2>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="white-box-main mb-4 irs-btm-count-main">
										<div className="d-flex irs-btm-box">
											<div className="irs-btm-count">65%</div>
											<div className="ps-3">
												<p>of consumers believe a company-branded email is more credible than a business using a free email account.</p>
												<div>
													<Link className="btn-link-main" to="/">
														Source →
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<div className="white-box-main mb-4 irs-btm-count-main">
										<div className="d-flex irs-btm-box">
											<div className="irs-btm-count">86%</div>
											<div className="ps-3">
												<p>of business professionals prefer to use email when communicating for business purposes.</p>
												<div>
													<Link className="btn-link-main" to="/">
														Source →
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="pt-3">
								<div className="white-box-main mb-4">
									<div className="irs-btm-box">
										<span className="d-block">Domain Name</span>
										<div className="d-md-flex pt-3 align-items-center text-center">
											<div className="">
												<img src={DomainImage} alt="domain" />
											</div>
											<div className="px-md-3">
												<p>Build credibility by developing a web presence to describe your products and services.</p>
											</div>
											<div className="ms-auto">
												<img src={Done} className="fix-size-done" alt="check" />
											</div>
										</div>
									</div>
								</div>
								<div className="white-box-main mb-4">
									<div className="irs-btm-box">
										<span className="d-block">Business Card</span>
										<div className="d-md-flex pt-3 align-items-center text-center">
											<div className="">
												<img src={BusinessImage} alt="business" />
											</div>
											<div className="px-md-3">
												<p>Build brand consistency with every new person you meet by having a professional email.</p>
											</div>
											<div className="ms-auto">
												<img src={Done} className="fix-size-done" alt="check" />
											</div>
										</div>
									</div>
								</div>
								<div className="white-box-main mb-4">
									<div className="irs-btm-box">
										<span className="d-block">Email Signature</span>
										<div className="d-md-flex pt-3 align-items-center text-center">
											<div className="">
												<img src={EmailImage} alt="email" />
											</div>
											<div className="px-md-3">
												<p>Create a cohesive brand experience with every message you send.</p>
											</div>
											<div className="ms-auto">
												<img src={Done} className="fix-size-done" alt="check" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="pt-3">
								<div className="recommendations-info text-center">
									<h2 className="position-relative bdr-remove pb-0">More details about your domain and email</h2>
								</div>
								<div className="white-box-main mb-3 custom-accordion-info">
									<Accordion defaultActiveKey="0">
										<Accordion.Item eventKey="0">
											<Accordion.Header>Why we don't offer phone support?</Accordion.Header>
											<Accordion.Body>We truly believe that a knowledge base is the best form of support for a digital product with several moving parts. Our knowledge base is filled with image guides and answers to common customer questions about domain and email services. It's a self-service portal which can be easily accessed directly from your incfile dashboard.</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="1">
											<Accordion.Header>How is this Business Email address better than my current email?</Accordion.Header>
											<Accordion.Body>Business credibility is the number one reason to have a professional email address. Customers are more likely to trust that you're a "real" business if your email address reflects your business name. Your professional email address will help build your brand, make it more memorable, and enhance your credibility.</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="2">
											<Accordion.Header>Is a domain name included in the price of the Business Email package?</Accordion.Header>
											<Accordion.Body>Yes, you get a domain name to match your business name, with your new business address. Later, when you're ready to build a website, you can use this domain name that you get here as part of your email address.</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="3">
											<Accordion.Header>What is Domain Privacy?</Accordion.Header>
											<Accordion.Body>Domain privacy is a feature that masks your contact information from the public domain name registry known as WHOIS. Many companies mine data from the public WHOIS system and attempt to contact you at your home, email, or phone number. Domain privacy is included in the cost of your Business Email package to help reduce the amount of Spam you may receive.</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="4">
											<Accordion.Header>Will I be able to read and respond to email using my mobile phone or tablet?</Accordion.Header>
											<Accordion.Body>Yes! You can easily access your email from your mobile phone or tablet. Setting this feature up is simple. Just follow the instructions found here for iPhone or Android devices.</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="5">
											<Accordion.Header>Can I import my current contacts into Business Email?</Accordion.Header>
											<Accordion.Body>Yes. You can import your current contacts from other existing email accounts.</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="6">
											<Accordion.Header>Each email box comes with 5GB of email storage and an additional 2GB of file storage. As your needs grow, you can easily add more storage.</Accordion.Header>
											<Accordion.Body></Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="7">
											<Accordion.Header>What else is included in my Business Email Package?</Accordion.Header>
											<Accordion.Body>Your Email Package comes with many tools to manage your business in the "cloud." Store important business files, contacts, and calendar events all in one convenient place. No longer risk missing an important business email or meeting getting buried in your personal email account!</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>
								<div className="recommendations-info text-center">
									<div className="text-center py-3">
										<Link to="/domain-email-search" className="btn-comn-all text-white">
											FIND A DOMAIN NAME
										</Link>
									</div>
									<div className="d-flex align-items-center justify-content-center">
										<img src={StarImage} className="me-2" alt="star" />
										<p className="m-0">Your order is eligible for discounted price of $27 for 1 full year of domain and email service.</p>
									</div>
									<div className="pt-4">
										<img src={Logo} className="me-2" alt="logo" />
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
