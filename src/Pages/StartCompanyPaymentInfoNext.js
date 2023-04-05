import React, { useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import "react-phone-input-2/lib/style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Purchase from "../Images/purchase.svg";
import CommaStart from "../Images/comma-start.svg";
import CommaEnd from "../Images/comma-end.svg";
import Card1 from "../Images/mastercard.svg";
import { Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Whitebox from "./Common/WhiteBox";
import { errorContainer, formAttr } from "../const";

export default function StartACompanyPaymentInfoNext() {
	const navigate = useNavigate();
	const [openpayment, setOpenPayment] = useState(false);

	const submitFormData = (formData, resetForm) => {
		console.log("form :: ", formData);
	};

	return (
		<FrontLayout>
			<div className="content-after-class">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-3">
							<div className="start-cmn-top">
								Please provide payment information for <span>LOREM IPSUM CORPORATION</span>
							</div>
						</div>
						<div className="col-lg-8 mb-3">
							<div className="mb-3">
								<div className="white-box-main">
									<div className="row">
										<div className="col-12 mb-3">
											<div className="recommendations-info">
												<h2 className="position-relative">Billing Information</h2>
											</div>
										</div>
										<div className="col-12 mb-3">
											<div className="verified-grey-box mb-3">
												<div className="d-sm-flex">
													<div>
														<span>Lorem Ipsum</span>
														<p>Lorem Ipsum.com</p>
													</div>
													<div className="ms-auto">
														<div className="d-flex align-items-center">
															<img src={Purchase} alt="" className="img-fluid" />
															<div className="ms-2">
																<span>Verified Purchase</span>
															</div>
														</div>
													</div>
												</div>
												<div className="d-flex flex-column">
													<div className="text-start">
														<img src={CommaStart} alt="" />
													</div>
													<p className="my-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
													<div className="text-end">
														<img src={CommaEnd} alt="" />
													</div>
												</div>
											</div>
											<div className="verified-grey-box">
												<div className="d-sm-flex">
													<div>
														<span>Lorem Ipsum</span>
														<p>Lorem Ipsum.com</p>
													</div>
													<div className="ms-auto">
														<div className="d-flex align-items-center">
															<img src={Purchase} alt="" className="img-fluid" />
															<div className="ms-2">
																<span>Verified Purchase</span>
															</div>
														</div>
													</div>
												</div>
												<div className="d-flex flex-column">
													<div className="text-start">
														<img src={CommaStart} alt="" />
													</div>
													<p className="my-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
													<div className="text-end">
														<img src={CommaEnd} alt="" />
													</div>
												</div>
											</div>
										</div>
										<div className="payment-area">
											<div className="comn-title-info pt-0">
												<h1>Payment Method</h1>
											</div>
											<div className="">
												<div className="box-hdr-top border-0 p-0">
													<span>Select a company associated with your purchase</span>
												</div>
												<div className="d-sm-flex d-block align-items-center border-bottom">
													<div className="d-flex align-items-center">
														<div className="cust-radio-btn position-relative ms-3">
															<input type="radio" id="payment-1" defaultChecked onChange={() => setOpenPayment(false)} name="payment" />
															<label for="payment-1" className="position-static"></label>
														</div>
														<div className="ms-2 stsg-box-list d-flex align-items-center stsg-box-list-text stsg-box-list-profile">
															<span className="d-block">
																<img src={Card1} alt="profile" />
															</span>
															<div className="stsg-box-list-text ps-3">
																<p className="mb-0">XXXX XXXX 0658</p>
															</div>
														</div>
													</div>
													<div className="ms-auto my-2">
														<button type="button" className="btn-comn-all4 w-100 btn-hide-show" id="pay-btn" aria-expanded={openpayment}>
															pay now
														</button>
													</div>
												</div>
												<div className="my-3">
													<div className="cust-radio-btn ms-3">
														<input type="radio" id="payment-2" name="payment" onChange={() => setOpenPayment(!openpayment)} />
														<label for="payment-2">New Payment Method</label>
													</div>
												</div>
											</div>
											<Collapse in={openpayment}>
												<div className="my-3" id="NewCard">
													<div className="">
														<Formik
															enableReinitialize
															initialValues={{
																fname: "",
																lname: "",
																streetaddress: "",
																zip_code: "",
																cardcode: "",
																cardno: "",
																city: "",
															}}
															validationSchema={Yup.object({
																fname: Yup.string().required("Card holder First name is required."),
																lname: Yup.string().required("Card holder Last name is required."),
																cardcode: Yup.string().required("Card Code is required."),
																streetaddress: Yup.string().required("Street Address is required."),
																city: Yup.string().required("City is required."),
																zip_code: Yup.number().required("zip_code is required.").typeError("Zip code should be number."),
																cardno: Yup.string().required("Card Number is required."),
															})}
															onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
														>
															{(runform) => (
																<form className="row" onSubmit={runform.handleSubmit}>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Country</label>
																		<select className="form-select input-style">
																			<option>Select Country</option>
																			<option>India</option>
																		</select>
																	</div>
																	<div className="col-12 mb-3">
																		<div className="grey-box-check mb-2 p-0 d-flex">
																			<div className="custom-checkbox position-relative m-3">
																				<label className="custom-lbl-part position-static text-secondary">
																					<input type="checkbox" id="user" />
																					<span className="custom-checkbox-class"></span>
																					Lorem Ispum
																				</label>
																			</div>
																			<div className="ms-auto side-icon-pay d-flex align-items-center justify-content-center p-3">
																				<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M15.9444 14.5379C15.5391 13.5546 14.951 12.6614 14.2127 11.9081C13.4768 11.1526 12.6049 10.5503 11.6454 10.1343C11.6368 10.1299 11.6282 10.1277 11.6196 10.1233C12.9581 9.13301 13.8282 7.5199 13.8282 5.69992C13.8282 2.68496 11.4434 0.242188 8.50005 0.242188C5.55669 0.242188 3.17193 2.68496 3.17193 5.69992C3.17193 7.5199 4.04205 9.13301 5.38052 10.1255C5.37193 10.1299 5.36333 10.1321 5.35474 10.1365C4.39224 10.5525 3.52857 11.1489 2.78736 11.9103C2.04982 12.6642 1.46178 13.5572 1.05572 14.5401C0.656801 15.5024 0.441656 16.5341 0.421929 17.5793C0.421355 17.6028 0.425377 17.6261 0.433758 17.648C0.442138 17.6699 0.454707 17.6898 0.470725 17.7066C0.486742 17.7235 0.505884 17.7368 0.527022 17.7459C0.54816 17.7551 0.570867 17.7598 0.593804 17.7598H1.88287C1.9774 17.7598 2.05259 17.6827 2.05474 17.5881C2.09771 15.8892 2.76373 14.2981 3.94107 13.0921C5.15923 11.8443 6.77701 11.1577 8.50005 11.1577C10.2231 11.1577 11.8409 11.8443 13.059 13.0921C14.2364 14.2981 14.9024 15.8892 14.9454 17.5881C14.9475 17.6849 15.0227 17.7598 15.1172 17.7598H16.4063C16.4292 17.7598 16.4519 17.7551 16.4731 17.7459C16.4942 17.7368 16.5134 17.7235 16.5294 17.7066C16.5454 17.6898 16.558 17.6699 16.5663 17.648C16.5747 17.6261 16.5788 17.6028 16.5782 17.5793C16.5567 16.5274 16.344 15.504 15.9444 14.5379V14.5379ZM8.50005 9.48512C7.51392 9.48512 6.5858 9.0912 5.88755 8.37597C5.18931 7.66074 4.80474 6.71004 4.80474 5.69992C4.80474 4.6898 5.18931 3.7391 5.88755 3.02387C6.5858 2.30864 7.51392 1.91472 8.50005 1.91472C9.48619 1.91472 10.4143 2.30864 11.1126 3.02387C11.8108 3.7391 12.1954 4.6898 12.1954 5.69992C12.1954 6.71004 11.8108 7.66074 11.1126 8.37597C10.4143 9.0912 9.48619 9.48512 8.50005 9.48512Z" fill="#18191F" />
																				</svg>
																			</div>
																		</div>
																		<div className="grey-box-check p-0 d-flex">
																			<div className="custom-checkbox position-relative m-3">
																				<label className="custom-lbl-part position-static text-secondary">
																					<input type="checkbox" id="location" />
																					<span className="custom-checkbox-class"></span>
																					48, Royal Square, RK Road, New York, New York 10001
																				</label>
																			</div>
																			<div className="ms-auto side-icon-pay d-flex align-items-center justify-content-center p-3">
																				<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M16.125 8.625C16.125 7.13316 15.5324 5.70242 14.4775 4.64752C13.4226 3.59263 11.9918 3 10.5 3C9.00816 3 7.57742 3.59263 6.52252 4.64752C5.46763 5.70242 4.875 7.13316 4.875 8.625C4.875 10.9325 6.72125 13.94 10.5 17.5425C14.2788 13.94 16.125 10.9325 16.125 8.625ZM10.5 19.25C5.91625 15.0838 3.625 11.5413 3.625 8.625C3.625 6.80164 4.34933 5.05295 5.63864 3.76364C6.92795 2.47433 8.67664 1.75 10.5 1.75C12.3234 1.75 14.072 2.47433 15.3614 3.76364C16.6507 5.05295 17.375 6.80164 17.375 8.625C17.375 11.5413 15.0837 15.0838 10.5 19.25Z" fill="#18191F" />
																					<path d="M10.5 10.5C10.9973 10.5 11.4742 10.3025 11.8258 9.95083C12.1775 9.59919 12.375 9.12228 12.375 8.625C12.375 8.12772 12.1775 7.6508 11.8258 7.29917C11.4742 6.94754 10.9973 6.75 10.5 6.75C10.0027 6.75 9.52581 6.94754 9.17417 7.29917C8.82254 7.6508 8.625 8.12772 8.625 8.625C8.625 9.12228 8.82254 9.59919 9.17417 9.95083C9.52581 10.3025 10.0027 10.5 10.5 10.5ZM10.5 11.75C9.6712 11.75 8.87634 11.4208 8.29029 10.8347C7.70424 10.2487 7.375 9.4538 7.375 8.625C7.375 7.7962 7.70424 7.00134 8.29029 6.41529C8.87634 5.82924 9.6712 5.5 10.5 5.5C11.3288 5.5 12.1237 5.82924 12.7097 6.41529C13.2958 7.00134 13.625 7.7962 13.625 8.625C13.625 9.4538 13.2958 10.2487 12.7097 10.8347C12.1237 11.4208 11.3288 11.75 10.5 11.75Z" fill="#18191F" />
																				</svg>
																			</div>
																		</div>
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Cardholder First Name</label>
																		<input className="form-control input-style" type="text" {...formAttr(runform, "fname")} name="fname" />
																		{errorContainer(runform, "fname")}
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Cardholder Last Name</label>
																		<input className="form-control input-style" type="text" {...formAttr(runform, "lname")} name="lname" />
																		{errorContainer(runform, "lname")}
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Street Address</label>
																		<input className="form-control input-style" type="text" {...formAttr(runform, "streetaddress")} name="streetaddress" />
																		{errorContainer(runform, "streetaddress")}
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Address (Cont)</label>
																		<input className="form-control input-style" type="text" name="address" />
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">City</label>
																		<input className="form-control input-style" type="text" {...formAttr(runform, "city")} name="city" />
																		{errorContainer(runform, "city")}
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">State</label>
																		<select className="form-select input-style">
																			<option>Select State</option>
																			<option>...</option>
																		</select>
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Zip Code</label>
																		<input className="form-control input-style" type="text" maxLength={5} {...formAttr(runform, "zip_code")} name="zip_code" />
																		{errorContainer(runform, "zip_code")}
																	</div>
																	<div className="col-12">
																		<div className="recommendations-info">
																			<h2 className="position-relative">Card Details</h2>
																		</div>
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Card Number</label>
																		<input className="form-control input-style" type="text" {...formAttr(runform, "cardno")} name="cardno" />
																		{errorContainer(runform, "cardno")}
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Expiration Date</label>
																		<div className="row">
																			<div className="col-sm-6 mb-2">
																				<select className="form-select input-style">
																					<option value="">Select Month</option>
																					<option value="01">January</option>
																					<option value="02">February</option>
																					<option value="03">March</option>
																					<option value="04">April</option>
																					<option value="05">May</option>
																					<option value="06">June</option>
																					<option value="07">July</option>
																					<option value="08">August</option>
																					<option value="09">September</option>
																					<option value="10">October</option>
																					<option value="11">November</option>
																					<option value="12">December</option>
																				</select>
																			</div>
																			<div className="col-sm-6 mb-2">
																				<select className="form-select input-style">
																					<option>Select Year</option>
																					<option>2022</option>
																				</select>
																			</div>
																		</div>
																	</div>
																	<div className="col-md-6 mb-3">
																		<label className="lbl-comn-info">Card Code</label>
																		<input className="form-control input-style" type="text" {...formAttr(runform, "cardcode")} name="cardcode" />
																		{errorContainer(runform, "cardcode")}
																	</div>
																</form>
															)}
														</Formik>
													</div>
												</div>
											</Collapse>
										</div>
									</div>
								</div>
							</div>
							<div className="d-flex align-items-center">
								<button className="btn-comn-all3 btn-after-class" type="button" onClick={() => navigate("/startup-admin/start-company-review-order")}>
									Previous
								</button>
								<button className=" ms-auto btn-comn-all btn-after-class" type="submit">
									Complete & Pay
								</button>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="white-box-main p-0 mb-3">
								<div className="progress login-progressbar">
									<div className="progress-bar" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<div className="p-3">
									<div className="recommendations-info">
										<h2 className="position-relative">Order Summary</h2>
										<div className="order-smry-info">
											<div className="d-flex align-items-center mb-3">
												<p className="m-0">$250</p>
												<span className="ms-auto package-class">Silver</span>
											</div>
											<div className="d-flex align-items-center mb-3">
												<span className="fix-width-span">Entity Type</span>
												<span> : LLC</span>
											</div>
											<div className="d-flex align-items-center mb-3">
												<span className="fix-width-span">Package fee</span>
												<span>: $0</span>
											</div>
											<div className="d-flex align-items-center mb-3">
												<span className="fix-width-span">State fee</span>
												<span>: $250</span>
											</div>
											<div className="bdr-top-total">
												<ul className="plan-list">
													<li>
														<p className="d-flex align-items-center">
															<i className="bi bi-check me-2"></i>Full courses library
														</p>
													</li>
													<li>
														<p className="d-flex align-items-center">
															<i className="bi bi-check me-2"></i>A new daily meditation
														</p>
													</li>
													<li>
														<p className="d-flex align-items-center">
															<i className="bi bi-check me-2"></i>Access to the meditation guru
														</p>
													</li>
													<li>
														<p className="d-flex align-items-center">
															<i className="bi bi-check me-2"></i>Sleep podcasts and exercises
														</p>
													</li>
													<li>
														<p className="d-flex align-items-center">
															<i className="bi bi-check me-2"></i>Mindfulness exercises
														</p>
													</li>
													<li>
														<p className="d-flex align-items-center">
															<i className="bi bi-check me-2"></i>Guided meditations
														</p>
													</li>
													<li>
														<p className="d-flex align-items-center">
															<i className="bi bi-check me-2"></i>Cooking recipes
														</p>
													</li>
													<li>
														<p className="d-flex align-items-center">
															<i className="bi bi-check me-2"></i>Stress reliever
														</p>
													</li>
												</ul>
											</div>
											<div className="bdr-top-total">
												<div className="row me-0 align-items-center">
													<span className="col-6 pe-0">Total</span>
													<b className="col-6 pe-0 text-end">$119</b>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<Whitebox />
						</div>
					</div>
				</div>
			</div>
		</FrontLayout>
	);
}
