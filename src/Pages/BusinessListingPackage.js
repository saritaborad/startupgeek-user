import React from "react";
import Layout from "../Components/Layout/Layout";
import { Formik } from "formik";
import * as Yup from "yup";
import GoogleMapReact from "google-map-react";
import { errorContainer, formAttr } from "../const";
import { GoBackArrow } from "./Common/AdminOrderSummary";
import { useAllState } from "../Hooks/CustomHook";

export default function BusinessListingPackage() {
	const allState = useAllState();
	const defaultProps = { center: { lat: 59.95, lng: 30.33 }, zoom: 11 };

	const submitFormData = (formData, resetForm) => {};

	const AnyReactComponent = ({ text }) => <div>{text}</div>;

	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-sm-inline-flex align-items-center">
								<GoBackArrow />
								<h1>Business Listings</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="recommendations-info">
								<h2 className="position-relative">Update Your Listing</h2>
								<p>Type in you business information as you’d like it to appear on the internet. (You can always change it later.)</p>
							</div>
						</div>
						<div className="col-lg-8">
							<Formik
								enableReinitialize
								initialValues={{
									business_name: "",
									address: "",
									city: "",
									state: "",
									zip: "",
									phone: "",
									category: "",
									first_name: "",
									last_name: "",
									email: "",
								}}
								validationSchema={Yup.object({
									business_name: Yup.string().required("Business name is required."),
									address: Yup.string().required("Address is required."),
									city: Yup.string().required("City is required."),
									state: Yup.string().required("State is required."),
									zip: Yup.string().required("Zip code is required."),
									phone: Yup.string().required("Phone contact is required."),
									category: Yup.string().required("Category is required."),
									first_name: Yup.string().required("First name is required."),
									last_name: Yup.string().required("Last name is required."),
									email: Yup.string().required("Email is required.").email("Please enter valid email"),
								})}
								onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
							>
								{(runform) => (
									<form onSubmit={runform.handleSubmit}>
										<div className="white-box-main">
											<div className="pb-3">
												<div className="box-hdr-top">
													<span>Business Information</span>
												</div>
												<div className="row">
													<div className="col-md-6 mb-3">
														<label className="lbl-comn-info">Contact Address</label>
														<input type="text" name="business_name" {...formAttr(runform, "business_name")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "business_name")}
													</div>
													<div className="col-md-6 mb-3">
														<label className="lbl-comn-info">Address</label>
														<input type="text" name="address" {...formAttr(runform, "address")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "address")}
													</div>
													<div className="col-md-6 mb-3">
														<label className="lbl-comn-info">City</label>
														<input type="text" name="city" {...formAttr(runform, "city")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "city")}
													</div>
													<div className="col-lg-6 mb-3">
														<label className="lbl-comn-info">Select State</label>
														<select className="form-select input-style" name="state" {...formAttr(runform, "state")}>
															<option defaultValue="">--- state ---</option>
															{allState.length > 0 &&
																allState.map((item, i) => {
																	return (
																		<option key={i} value={item.label} id={item.value}>
																			{item.label}
																		</option>
																	);
																})}
														</select>
														{errorContainer(runform, "state")}
													</div>
													<div className="col-md-6 mb-3">
														<label className="lbl-comn-info">Zip Code</label>
														<input type="tel" name="zip" {...formAttr(runform, "zip")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "zip")}
													</div>
													<div className="col-md-6 mb-3">
														<label className="lbl-comn-info">Business Phone</label>
														<input type="text" name="phone" {...formAttr(runform, "phone")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "phone")}
													</div>
													<div className="col-12 mb-3">
														<label className="lbl-comn-info">Business Category help</label>
														<input type="text" name="category" {...formAttr(runform, "category")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "category")}
													</div>
												</div>
											</div>
											<div className="pb-3">
												<div className="box-hdr-top">
													<span>Business Information</span>
												</div>
												<div className="row">
													<div className="col-md-6 mb-3">
														<label className="lbl-comn-info">First Name</label>
														<input type="text" name="first_name" {...formAttr(runform, "first_name")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "first_name")}
													</div>
													<div className="col-md-6 mb-3">
														<label className="lbl-comn-info">Last Name</label>
														<input type="text" name="last_name" {...formAttr(runform, "last_name")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "last_name")}
													</div>
													<div className="col-md-6 mb-3">
														<label className="lbl-comn-info">Contact Email</label>
														<input type="email" name="email" {...formAttr(runform, "email")} className="form-control input-style" placeholder="" />
														{errorContainer(runform, "email")}
													</div>
												</div>
											</div>
											<div className="pb-3">
												<div className="box-hdr-top border-bottom-0 border-top pt-3 mt-3 pb-0 mb-0">
													<span>Contact Information</span>
													<p className="map-text">59 Acorn Cluster Ct , The Woodlands, Texas 77381 281-406-4636</p>
												</div>
												<div className="cust-map-info">
													<GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyASLm3eSo0TMCBNFbPnXOiraORhu4buMiU" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
														<AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
													</GoogleMapReact>
												</div>
											</div>
											<div className="pb-5 text-end">
												<button type="submit" className="d-inline-block btn-comn-all text-white">
													Continue
												</button>
											</div>
										</div>
									</form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
