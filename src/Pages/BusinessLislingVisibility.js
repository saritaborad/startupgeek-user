import React from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
import Listings from "../Images/listings-image.png";
import Visibility from "../Images/visibility-list.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorContainer, formAttr } from "../const";

export default function BusinessListingVisibility() {
	const submitFormData = (formData, resetForm) => {};

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
										<h2 className="position-relative">See how your business appears online</h2>
										<p>Run a free scan to check your listings on:</p>
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
							<Formik
								enableReinitialize
								initialValues={{
									business_name: "",
									business_address: "",
									business_city: "",
									business_zip: "",
								}}
								validationSchema={Yup.object({
									business_name: Yup.string().required("Business name is required."),
									business_address: Yup.string().required("Address is required."),
									business_city: Yup.string().required("City is required."),
									business_zip: Yup.string().required("Zip code is required."),
								})}
								onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
							>
								{(runform) => (
									<form onSubmit={runform.handleSubmit}>
										<div className="white-box-main">
											<div className="box-hdr-top">
												<span>Scan to see how your business is doing across the internet.</span>
											</div>
											<div className="row">
												<div className="col-md-6 mb-3">
													<label className="lbl-comn-info">Business Name</label>
													<input type="text" className="form-control input-style" name="business_name" {...formAttr(runform, "business_name")} />
													{errorContainer(runform, "business_name")}
												</div>
												<div className="col-md-6 mb-3">
													<label className="lbl-comn-info">Business Address</label>
													<input type="text" className="form-control input-style" name="business_address" {...formAttr(runform, "business_address")} />
													{errorContainer(runform, "business_address")}
												</div>
												<div className="col-md-6 mb-3">
													<label className="lbl-comn-info">Business City</label>
													<input type="text" className="form-control input-style" name="business_city" {...formAttr(runform, "business_city")} />
													{errorContainer(runform, "business_city")}
												</div>
												<div className="col-md-6 mb-3">
													<label className="lbl-comn-info">Business Zip</label>
													<input type="tel" className="form-control input-style" name="business_zip" {...formAttr(runform, "business_zip")} />
													{errorContainer(runform, "business_zip")}
												</div>
												<div className="col-12 text-end">
													<button type="submit" className="d-inline-block btn-comn-all text-white">
														Scan My Listings
													</button>
												</div>
											</div>
										</div>
									</form>
								)}
							</Formik>
						</div>
						<div className="col-12 mt-4">
							<div className="recommendations-info">
								<h2 className="position-relative">Scan your listings on 50+ online services</h2>
								<p>See what’s missing from your listings on these leading sites:</p>
							</div>
							<div className="white-box-main">
								<div className="text-center">
									<img src={Visibility} alt="" className="img-fluid" />
								</div>
							</div>
						</div>
						<div className="col-12 mt-4">
							<div className="white-box-main">
								<div className="recommendations-info">
									<h3>Use Incfile to take control of your business listings — everywhere it matters.</h3>
									<div className="my-4">
										<Link className="btn-comn-all" to="/business-listing-scan">
											Find My Listings
										</Link>
									</div>
									<p>By clicking "SCAN MY LISTINGS" you provide your signatureconseting to Incfile or its partners contacting you for marketing purpose via phone call to the number you provided, including by use of automated dialing equipment.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
