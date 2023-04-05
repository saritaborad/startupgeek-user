import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Logo from "../../Images/logo.png";
import BgPoster from "../../Images/bg-poster.png";
import { useNavigate } from "react-router-dom";
import { PostApi } from "../../ApiService";
import { API_PATH, errorContainer, formAttr } from "../../const";
import { GoBackArrow } from "./AdminOrderSummary";
import { toast } from "react-toastify";

export default function ForgotPassword() {
	const navigate = useNavigate();

	const submitFormData = (formData, resetForm) => {
		const LoginPromise = new Promise((resolve, reject) => resolve(PostApi(API_PATH.forgotPassword, formData)));
		LoginPromise.then((response) => {
			if (response.status === 200) {
				toast.success(response.data.message);
				resetForm(formData);
				navigate(`/resetpassword`, { state: { token: response.data.data.resetToken } });
			} else {
				toast.error(response.data.message);
			}
		});
	};

	return (
		<>
			<div className="container-fluid login-flow-screen h-100">
				<div className="row align-items-center h-100 position-relative">
					<div className="col-12 p-0 login-main-div">
						<div className="login-part">
							<div className="login-main-section">
								<div className="login-box mx-auto w-100">
									<div className="row align-items-center">
										<div className="col-12">
											<div>
												<GoBackArrow />
											</div>
										</div>
										<div className="col-md-6 padd-spce-top-btm mx-auto">
											<div className="main-logo-box mt-3  text-center">
												<img src={Logo} className="img-fluid" alt="startup geeks" />
											</div>
											<div className="my-4 text-center">
												<div className="box-head-part-1">Forgot Password?</div>
												<p className="p-tags-text">Enter your email address and we`ll send you a link to reset your password</p>
											</div>
											<Formik
												enableReinitialize
												initialValues={{
													email: "",
												}}
												validationSchema={Yup.object({
													email: Yup.string().email("Enter valid Email address.").required("Email is required."),
												})}
												onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
											>
												{(runform) => (
													<form className="row" onSubmit={runform.handleSubmit}>
														<div className="col-12 mb-3">
															<input type="email" className="form-control input-style" {...formAttr(runform, "email")} name="email" placeholder="Reset password via email" />
															{errorContainer(runform, "email")}
														</div>
														<div className="col-12 mb-3 text-center">
															<button type="submit" className="btn-comn-all w-100">
																<span className="position-relative">Send</span>
															</button>
														</div>
													</form>
												)}
											</Formik>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-img-login h-100">
						<img src={BgPoster} className="image-fluid h-100" alt="startup-geeks" />
					</div>
				</div>
			</div>
		</>
	);
}
