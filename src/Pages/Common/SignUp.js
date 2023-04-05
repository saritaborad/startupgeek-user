import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Logo from "../../Images/logo.png";
import Google from "../../Images/google.svg";
import Facebook from "../../Images/facebook.svg";
import MainPoster from "../../Images/main-poster.png";
import BgPoster from "../../Images/bg-poster.png";
import { PostApi } from "../../ApiService";
import { API_PATH, errorContainer, formAttr } from "../../const";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";

export default function SignUp() {
	let navigate = useNavigate();
	const context = useContext(AuthContext);

	const submitFormData = (formData, resetForm) => {
		const contectAgantPromise = new Promise((resolve, reject) => resolve(PostApi(API_PATH.signup, formData)));
		contectAgantPromise.then((res) => {
			if (res.status === 200) {
				toast.success(res.data.message);
				resetForm(formData);
				navigate("/login");
			} else {
				toast.error(res.data.message);
			}
		});
	};

	const handleGoogleLogin = async () => {
		context.googleLogin().then(({ _tokenResponse }) => {
			try {
				const socialLogin = new Promise((resolve, reject) => resolve(PostApi(API_PATH.socialLogin, { idToken: _tokenResponse?.idToken, socialType: "google" })));
				socialLogin.then((res) => {
					if (res.status === 200) {
						toast.success("Signup successfully!");
						localStorage.setItem("startgeekuser", res.data.data.token);
						context.setUser(res.data.data);
						navigate("/dashboard");
					}
				});
			} catch (error) {
				console.log(error);
			}
		});
	};

	const handleFacebookLogin = async () => {
		context.facebookLogin().then(({ _tokenResponse }) => {
			try {
				const socialLogin = new Promise((resolve, reject) => resolve(PostApi(API_PATH.socialLogin, { idToken: _tokenResponse?.idToken, socialType: "facebook" })));
				socialLogin.then((res) => {
					if (res.status === 200) {
						toast.success("Signup successfully!");
						context.setUser(res.data.data);
						localStorage.setItem("startgeekuser", res.data.data.token);
						navigate("/dashboard");
					}
				});
			} catch (error) {
				console.log(error);
			}
		});
	};

	return (
		<>
			<div className="container-fluid login-flow-screen">
				<div className="row align-items-center h-100 position-relative">
					<div className="col-12 p-0 login-main-div">
						<div className="login-part">
							<div className="login-main-section">
								<div className="login-box mx-auto w-100">
									<div className="row align-items-center">
										<div className="col-12"></div>
										<div className="col-lg-5 col-md-6">
											<div className="main-logo-box mt-3">
												<img src={Logo} className="img-fluid" alt="startup geeks" />
											</div>
											<div className="my-md-4 my-2">
												<div className="box-head-part-1">
													Create a <span className="box-head-part-2">New Account</span>
												</div>
											</div>
											<Formik
												initialValues={{
													fname: "",
													lname: "",
													email: "",
													password: "",
													phone: "",
												}}
												validationSchema={Yup.object({
													fname: Yup.string().required("First Name is required."),
													lname: Yup.string().required("Last Name is required."),
													email: Yup.string().email("Enter Valid Email Address.").required("Email is required."),
													password: Yup.string().required("Password is required."),
													phone: Yup.string().required("Phone Number is required."),
												})}
												onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
											>
												{(runform) => (
													<form className="row" onSubmit={runform.handleSubmit}>
														<div className="col-12 mb-3">
															<input type="text" className="form-control input-style" {...formAttr(runform, "fname")} name="fname" placeholder="Your first name" />
															{errorContainer(runform, "fname")}
														</div>
														<div className="col-12 mb-3">
															<input type="text" className="form-control input-style" {...formAttr(runform, "lname")} name="lname" placeholder="Your last name" />
															{errorContainer(runform, "lname")}
														</div>
														<div className="col-12 mb-3">
															<input type="email" className="form-control input-style" {...formAttr(runform, "email")} name="email" placeholder="Your email address" />
															{errorContainer(runform, "email")}
														</div>
														<div className="col-12 mb-3">
															<div className="phone-cust-input">
																<PhoneInput className="form-control-PhoneInput" disableAreaCodes country={"us"} placeholder="Your phone number" {...formAttr(runform, "phone")} onChange={(e) => runform.setFieldValue("phone", e)} />
																{errorContainer(runform, "phone")}
															</div>
														</div>
														<div className="col-12 mb-3">
															<input type="password" className="form-control input-style" {...formAttr(runform, "password")} name="password" placeholder="Your password" />
															{errorContainer(runform, "password")}
														</div>
														<div className="col-12 mb-3 text-center">
															<button type="submit" className="btn-comn-all w-100">
																<span className="position-relative">Sign Up</span>
															</button>
														</div>
														<div className="col-12 my-md-4 mb-3 mt-2">
															<div className="or-section position-relative text-center">
																<span className="d-inline-block px-4 bg-white position-relative">Or continue with</span>
															</div>
														</div>
														<div className="col-12">
															<div className="g-fb-section d-flex justify-content-center">
																<span className="me-2">
																	<button onClick={handleGoogleLogin} type="button" style={{ border: "none", background: "transparent" }}>
																		<img src={Google} className="img-fluid" alt="google" />
																	</button>
																</span>
																<span className="ms-2">
																	<button onClick={handleFacebookLogin} type="button" style={{ border: "none", background: "transparent" }} redirectUri="https://dashboard.mystartupgeeks.com/" isMobile={false} autoLoad={false} appId="2247237232122846">
																		<img src={Facebook} className="img-fluid" alt="facebook" />
																	</button>
																</span>
															</div>
														</div>
														<div className="col-12 mt-3">
															<div className="text-center frm-btm-link">
																<span className="d-inline-block">
																	Already have an account?
																	<Link to="/login" className="d-inline-block">
																		Login
																	</Link>
																</span>
															</div>
														</div>
													</form>
												)}
											</Formik>
										</div>
										<div className="col-md-6 d-md-block d-none ms-auto text-center">
											<div className="main-poster">
												<img src={MainPoster} className="img-fluid" alt="startup geeks" />
											</div>
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
