import React from "react";
import Layout from "../Components/Layout/Layout";
import ContractTemplate from "../Images/contract-icon.svg";
import Articles from "../Images/articles-icon.svg";
import Organizer from "../Images/organizer-icon.svg";
import { useNavigate } from "react-router-dom";
import { GoBackArrow } from "./Common/AdminOrderSummary";

export default function BusinessContractTemplate() {
	const navigate = useNavigate();
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<div className="d-sm-inline-flex align-items-center">
									<GoBackArrow />
									<h1>Business Contract Template</h1>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-md-8">
									<div className="recommendations-info">
										<h2 className="position-relative">Standard or Customized Operating Agreement?</h2>
										<p>The operating agreement for a limited liability company is a private agreement between the members/owners of the LLC, and it details the ownership, rights, and responsibilities of the LLC members.</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-md-end text-center">
										<img src={ContractTemplate} className="img-fluid" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row">
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={Articles} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Filed Articles</bdi>
										<p>A set of formal documents filed with the Secretary of State to legally document the creation of a new business entity.</p>
										<div className="mt-auto order-box-btm-read cust-radio-btn-translet">
											<div className="cust-radio-btn text-center">
												<input type="radio" id="one" defaultChecked name="radio-group" />
												<label for="one"></label>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-6 space-class-box">
									<div className="order-box-btm">
										<span>
											<img src={Organizer} className="img-fluid" alt="" />
										</span>
										<bdi className="d-block">Statement Of The Organizer</bdi>
										<p>A document signed by the Organizer which identifies the initial members of the Limited Liability Company.</p>
										<div className="mt-auto order-box-btm-read cust-radio-btn-translet">
											<div className="cust-radio-btn text-center">
												<input type="radio" id="two" name="radio-group" />
												<label for="two"></label>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="pt-4 text-end">
								<button type="button" className="btn-comn-all" onClick={() => navigate("/payment-method")}>
									Next
								</button>
								<button type="button" className="btn-comn-cancel ms-3">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
