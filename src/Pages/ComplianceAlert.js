import React from "react";
import Layout from "../Components/Layout/Layout";
import ComplianceIcon from "../Images/alert-icon.svg";

export default function ComplianceAlert() {
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info">
								<h1>Compliance Alerts</h1>
							</div>
						</div>
						<div className="col-12 space-class-box">
							<div className="order-box-btm alert-file-class">
								<span>
									<img src={ComplianceIcon} className="img-fluid" alt="" />
								</span>
								<bdi className="d-block">Reminder: Public Information Report & Texas Franchise Tax for HOUSTON IT DEVELOPERS LLC Due 15/05/2022</bdi>
								<p>This is a courtesy reminder that the Public Information/Franchise Tax Report required for HOUSTON IT DEVELOPERS LLC by the State of Texas is due 15/05/2022. The State of Texas requires that all legally incorporated entities file a Public Information/Franchise Tax Report to be filed on or before May 15th of each year. Failure to file the reports in a timely fashion will result in late penalties and will ultimately lead to the corporation or LLC being suspended, revoked, and/or dissolved. If you require assistance with the annual report filing please follow the link below:</p>
								<div className="mt-5">
									<div className="d-flex align-items-center">
										<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9 16.5265H11V14.4432H9V16.5265ZM9 12.3599H11V6.10986H9V12.3599ZM10 21.7349C4.48 21.7349 0 17.0682 0 11.3182C0 5.5682 4.48 0.901527 10 0.901527C15.52 0.901527 20 5.5682 20 11.3182C20 17.0682 15.52 21.7349 10 21.7349ZM10 2.98486C5.59 2.98486 2 6.72445 2 11.3182C2 15.9119 5.59 19.6515 10 19.6515C14.41 19.6515 18 15.9119 18 11.3182C18 6.72445 14.41 2.98486 10 2.98486Z" fill="#FE2E89" />
										</svg>
										<div className="alert-info-filed ms-2">State Requirements </div>
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
