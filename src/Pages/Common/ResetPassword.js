import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "../../Images/logo.png";
import BgPoster from "../../Images/bg-poster.png";
import { PostApi } from "../../ApiService";
import { API_PATH, errorContainer, formAttr } from "../../const";
import { toast } from "react-toastify";
import { GoBackArrow } from "./AdminOrderSummary";

export default function Resetpassword(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [ResetToken, setResetToken] = useState("");
    const [showpassword, setshowpassword] = useState("password");
    const [confirmpshowassword, setconfirmpshowassword] = useState("password");

    useEffect(() => {
        if (params?.token) {
            setResetToken(params.token);
        } else {
            navigate("/login");
        }
    }, [params?.token]);

    const submitFormData = (formData, resetForm) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.resetPassword + "/" + ResetToken, formData))).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                resetForm(formData);
                navigate("/login");
            } else {
                toast.error(res.data.message);
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
                                                <div className="box-head-part-1">Reset Password</div>
                                                <p className="p-tags-text">Enter and confirm your new password below</p>
                                            </div>
                                            <Formik
                                                enableReinitialize
                                                initialValues={{
                                                    password: "",
                                                    confirmpassword: "",
                                                }}
                                                validationSchema={Yup.object({
                                                    password: Yup.string().required("Password is required."),
                                                    confirmpassword: Yup.string()
                                                        .when("password", {
                                                            is: (val) => (val && val.length > 0 ? true : false),
                                                            then: Yup.string().oneOf([Yup.ref("password")], "Password must match."),
                                                        })
                                                        .required("Confirmation of Password is required."),
                                                })}
                                                onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                                            >
                                                {(runform) => (
                                                    <form className="row" onSubmit={runform.handleSubmit}>
                                                        <div className="col-12 mb-3">
                                                            <div className="position-relative">
                                                                <input type={showpassword} className={showpassword === "password" ? "form-control input-style" : "form-control input-style click-password-show"} {...formAttr(runform, "password")} name="password" placeholder="Password" />
                                                                <div className="showpwd-class bg-transparent" onClick={(e) => setshowpassword(showpassword === "password" ? "text" : "password")}>
                                                                    <i className="bi bi-eye-slash"></i>
                                                                </div>
                                                            </div>
                                                            {errorContainer(runform, "password")}
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <div className="position-relative">
                                                                <input type={confirmpshowassword} className={confirmpshowassword === "password" ? "form-control input-style" : "form-control input-style click-password-show"} {...formAttr(runform, "confirmpassword")} name="confirmpassword" placeholder="Confirm password" />
                                                                <div className="showpwd-class bg-transparent" onClick={(e) => setconfirmpshowassword(confirmpshowassword === "password" ? "text" : "password")}>
                                                                    <i className="bi bi-eye-slash"></i>
                                                                </div>
                                                            </div>
                                                            {errorContainer(runform, "confirmpassword")}
                                                        </div>
                                                        <div className="col-12 mb-3 text-center mt-4">
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
