import React from "react";
import Layout from "../Components/Layout/Layout";
import SideImg from "../Images/kit-image.png";
import { Accordion } from "react-bootstrap";
import { GoBackArrow } from "./Common/AdminOrderSummary";
import { useNavigate } from "react-router-dom";

export default function BusinessFormationKit() {
	const navigate = useNavigate();

	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="d-sm-inline-flex align-items-center comn-title-info">
								<GoBackArrow />
								<h1>Business Formation Kit</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-6">
									<div className="formation-info">
										<div className="recommendations-info">
											<h2 className="position-relative">Get your Business Formation Kit</h2>
											<p>The Business Formation Kit is a professional binder enclosed in a matching slip case, customized with the name of your company on the spine insert. It comes with a metal die-cast corporate embossing seal with its own carrying pouch, customized with the name of your company and the date and state of formation. It has a set of 6 Mylar Reinforced Index Tabs, 20 custom printed stock or membership certificates with 20 full page stubs.</p>
										</div>
										<div className="mt-5">
											<h3>Get yours for $99 only</h3>
											<button className="btn-comn-all mt-3" onClick={() => navigate("/business-formation-kit-payment")}>
												Get Your Business Formation Kit
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-6 mt-2 mt-md-0">
									<div className="kit-side-img text-center position-relative">
										<img src={SideImg} alt="Business Formation" className="img-fluid" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="pt-4">
								<div className="recommendations-info">
									<h2 className="position-relative bdr-remove pb-0">Frequently asked questions</h2>
								</div>
								<div className="white-box-main mb-3 custom-accordion-info">
									<Accordion defaultActiveKey="0">
										<Accordion.Item eventKey="0">
											<Accordion.Header>How long will it take to receive my Business Formation Kit?</Accordion.Header>
											<Accordion.Body>All kits are mailed next day using FedEx ground shipping and will typically arrive anywhere in the continental United States within 3 to 4 business days.</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="1">
											<Accordion.Header>What is a corporate seal?</Accordion.Header>
											<Accordion.Body>A corporate seal is a customized embossing stamp that contains the name, date and state of formation of your company. It is used to create a raised emblem on paper documents. It is typically used on company documents to mark them as official. The Corporate Seal is included in the Business Formation Kit.</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="2">
											<Accordion.Header>Is a corporate seal a requirement?</Accordion.Header>
											<Accordion.Body>While we believe that every corporation should have this accessory, the corporate seal is not a requirement in every state, either by law or by IncFile. It is, however, a valuable item to have in one's hands when the legitimacy and formality of your company needs to be expressed. In some jurisdictions a corporate Seal can be required to open a company bank account. Check with your particular secretary of state for any possibility that a corporate seal will be required in your locale.</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
