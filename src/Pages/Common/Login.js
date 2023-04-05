import React, { useContext, useState, useEffect } from "react";
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
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
const sign = require("jwt-encode");
const secret = "^HkNZ*AqT$1Nyi_1zVf)pzp0i7y6kz#Uf4%sxs!s4Ae&G5u";

export default function Login() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const [showpassword, setshowpassword] = useState("password");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [is_remember, setIs_remember] = useState(false);

    useEffect(() => {
        let tokendata = localStorage.getItem("startgeekuser");
        let companytoken = localStorage.getItem("startgeekcompany");
        if (companytoken !== null) {
            navigate("/dashboard");
        }
        if (tokendata !== null) {
            navigate("/");
        }
        let remember_me_token = localStorage.getItem("rememberme_user");
        if (remember_me_token !== null) {
            let temp = jwt_decode(remember_me_token);
            setIs_remember(true);
            setEmail(temp.email);
            setPassword(temp.password);
        }
    }, []);

    const getUserInfo = () => {
        const userInfo = new Promise((resolve, reject) => resolve(PostApi(API_PATH.getUserInfo)));
        userInfo.then((res) => {
            if (res.status === 200) {
                context.setUser(res.data.data);
            }
        });
    };

    const submitFormData = (formData, resetForm) => {
        const loginpromise = new Promise((resolve, reject) => resolve(PostApi(API_PATH.login, formData)));
        loginpromise.then((response) => {
            if (response.status === 200) {
                localStorage.setItem("startgeekuser", response.data.data.token);
                toast.success(response.data.message);
                context.setUser(response.data.data.user);
                remember_token(formData);
                resetForm(formData);
                getUserInfo();
                navigate("/dashboard");
            } else {
                toast.error(response.data.message);
            }
        });
    };

    const handelCheckbox = (e) => {
        if (e.target.checked) {
            setIs_remember(true);
        } else {
            setIs_remember(false);
            localStorage.removeItem("rememberme_user");
        }
    };

    const remember_token = (values) => {
        var date = new Date();
        var time = date.getTime();
        const data = { exp: time + 3600, email: values.email, password: values.password, iat: time };
        const jwt = sign(data, secret);
        if (is_remember) {
            localStorage.setItem("rememberme_user", jwt);
        }
    };

    const handleGoogleLogin = async () => {
        context.googleLogin().then(({ _tokenResponse, user }) => {
            try {
                const socialLogin = new Promise((resolve, reject) => resolve(PostApi(API_PATH.socialLogin, { idToken: _tokenResponse?.idToken, socialType: "google" })));
                socialLogin.then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("startgeekuser", res.data.data.token);
                        toast.success("Login successfully!");
                        navigate("/dashboard");
                        context.setUser(res.data.data);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        });
    };

    const handleFacebookLogin = async () => {
        context.facebookLogin().then(({ _tokenResponse, user }) => {
            try {
                const socialLogin = new Promise((resolve, reject) => resolve(PostApi(API_PATH.socialLogin, { idToken: _tokenResponse?.idToken, socialType: "facebook" })));
                socialLogin.then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("startgeekuser", res.data.data.token);
                        toast.success("Login successfully!");
                        context.setUser(res.data.data);
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
                                                <div className="box-head-part-1">Welcome Back To</div>
                                                <div className="box-head-part-2">Startup Geeks</div>
                                            </div>
                                            <Formik
                                                enableReinitialize
                                                initialValues={{
                                                    email: email,
                                                    password: password,
                                                }}
                                                validationSchema={Yup.object({
                                                    email: Yup.string().email("Enter Valid Email Address.").required("Email is required."),
                                                    password: Yup.string().required("Password is required."),
                                                })}
                                                onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                                            >
                                                {(runform) => (
                                                    <form className="row" onSubmit={runform.handleSubmit}>
                                                        <div className="col-12 mb-3">
                                                            <input type="email" className="form-control input-style" {...formAttr(runform, "email")} name="email" placeholder="Your email address" />
                                                            {errorContainer(runform, "email")}
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <div className="position-relative">
                                                                <input type={showpassword} className={showpassword === "password" ? "form-control input-style" : "form-control input-style  click-password-show"} {...formAttr(runform, "password")} name="password" placeholder="Password" />
                                                                <div className="showpwd-class bg-transparent" onClick={(e) => setshowpassword(showpassword === "password" ? "text" : "password")}>
                                                                    <i className="bi bi-eye-slash"></i>
                                                                </div>
                                                            </div>
                                                            {errorContainer(runform, "password")}
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="custom-checkbox">
                                                                <label className="custom-lbl-part">
                                                                    <input type="checkbox" id="rememberme" checked={is_remember} onChange={handelCheckbox} />
                                                                    <span className="custom-checkbox-class"></span>
                                                                    Remember Me
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 mb-3 text-end">
                                                            <div className="d-inline-block">
                                                                <Link to="/forgotpassword" className="frt-link-pass">
                                                                    Forgot Password ?
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mb-3 text-center">
                                                            <button type="submit" className="btn-comn-all w-100">
                                                                <span className="position-relative">Login</span>
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
                                                                    <button type="button" onClick={handleGoogleLogin} style={{ border: "none", background: "transparent" }}>
                                                                        <img src={Google} className="img-fluid" alt="google" />
                                                                    </button>
                                                                </span>
                                                                <span className="ms-2">
                                                                    <button type="button" onClick={handleFacebookLogin} style={{ border: "none", background: "transparent" }}>
                                                                        <img src={Facebook} className="img-fluid" alt="facebook" />
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mt-3">
                                                            <div className="text-center frm-btm-link">
                                                                <span className="d-inline-block">
                                                                    Don’t have an account?
                                                                    <Link to="/signup" className="d-inline-block">
                                                                        Sign Up
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
