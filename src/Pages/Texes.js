import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import Strategy from "../Images/strategy-image.svg";
import { Link } from "react-router-dom";
import BenefitsImage1 from "../Images/benefits-icon-1.svg";
import BenefitsImage2 from "../Images/benefits-icon-2.svg";
import BenefitsImage3 from "../Images/benefits-icon-3.svg";
import BenefitsImage4 from "../Images/benefits-icon-4.svg";
import Congratulation from "../Images/congratulation-icon.svg";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorContainer, formAttr } from "../const";
import PhoneInput from "react-phone-input-2";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function Texes() {
    const context = useContext(AuthContext);

    const [user, setuser] = useState("");
    const [company, setcompany] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (context.user) {
            setuser(context.user);
        }
        if (context.company) {
            setcompany(context.company);
        }
    }, [context.user, context.company]);

    const submitFormData = (formData, resetForm) => {};

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="comn-title-info">
                                <h1>Taxes</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="white-box-main">
                                <div className="row align-items-center">
                                    <div className="col-lg-7">
                                        <div className="recommendations-info">
                                            <h2 className="position-relative bdr-remove mb-0">Determine a Tax Strategy</h2>
                                            <p>The Consultation can help you identify important tax deductions and provide insignt into the IRS tax classification of your new business, just fill out the fom below to schedule your 30 minutes consultation</p>
                                        </div>
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={{
                                                fname: user?.fname ? user?.fname : "",
                                                lname: user?.lname ? user?.lname : "",
                                                email: user?.email ? user?.email : "",
                                                company_name: company?.Cname ? company?.Cname : "",
                                                phone: user?.phone ? user?.phone : "",
                                            }}
                                            validationSchema={Yup.object({
                                                fname: Yup.string().required("First name is required."),
                                                lname: Yup.string().required("Last name is required."),
                                                email: Yup.string().required("Email is required.").email("Please enter valid email."),
                                                company_name: Yup.string().required("Company name is required."),
                                                phone: Yup.string().required("phone number is required."),
                                            })}
                                            onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                                        >
                                            {(runform) => (
                                                <form className="row" onSubmit={runform.handleSubmit}>
                                                    <div className="col-md-6 mb-3">
                                                        <label>First Name</label>
                                                        <input type="text" name="fname" className="form-control input-style" placeholder="Ricardo" {...formAttr(runform, "fname")} disabled />
                                                        {errorContainer(runform, "fname")}
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label>Last Name</label>
                                                        <input type="text" name="lname" className="form-control input-style" placeholder="Qrozco" {...formAttr(runform, "lname")} disabled />
                                                        {errorContainer(runform, "lname")}
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label>Email</label>
                                                        <input type="email" name="email" className="form-control input-style" placeholder="richyorozco@gmail.com" {...formAttr(runform, "email")} disabled />
                                                        {errorContainer(runform, "email")}
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label>Company Name</label>
                                                        <input type="text" name="company_name" className="form-control input-style" placeholder="HOUSTON IT DEVELOPERS LLC" {...formAttr(runform, "company_name")} disabled />
                                                        {errorContainer(runform, "company_name")}
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <div className="phone-cust-input" disabled>
                                                            <PhoneInput placeholder="(201) 555-01234" name="phone" {...formAttr(runform, "phone")} country="us" specialLabel="Business Phone" onChange={(e) => runform?.setFieldValue("phone", e)} />
                                                            {errorContainer(runform, "phone")}
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="py-2 pb-3">
                                                            <button type="submit" className="btn-comn-all">
                                                                SCHEDULE CONSULTATION
                                                            </button>
                                                        </div>
                                                        <p className="text-or-links mb-0">
                                                            By providing your information you agree to our
                                                            <Link to="/privacy-policy">privacy policy.</Link>
                                                        </p>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                    <div className="col-xl-4 col-lg-5 ms-auto">
                                        <div className="text-lg-end text-center pt-5 pt-lg-0">
                                            <img src={Strategy} className="img-fluid" alt="determine tax strategy" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="white-box-main">
                                <div className="recommendations-info">
                                    <h2 className="position-relative bdr-remove mb-0 pb-0">You,ll learn...</h2>
                                </div>
                                <ul className="learn-inform-list row">
                                    <li className="col-md-6 mt-3">
                                        <div className="learn-inform-list-inr">
                                            <span className="d-flex align-items-center justify-content-center">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            How your LLC or Corporation is taxed
                                        </div>
                                    </li>
                                    <li className="col-md-6 mt-3">
                                        <div className="learn-inform-list-inr">
                                            <span className="d-flex align-items-center justify-content-center">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            Business bookkeeping requlrements
                                        </div>
                                    </li>
                                    <li className="col-md-6 mt-3">
                                        <div className="learn-inform-list-inr">
                                            <span className="d-flex align-items-center justify-content-center">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            How to choose the proper IRS tax election
                                        </div>
                                    </li>
                                    <li className="col-md-6 mt-3">
                                        <div className="learn-inform-list-inr">
                                            <span className="d-flex align-items-center justify-content-center">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            How toreduce the chance of an IRS audit
                                        </div>
                                    </li>
                                    <li className="col-md-6 mt-3">
                                        <div className="learn-inform-list-inr">
                                            <span className="d-flex align-items-center justify-content-center">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            commonly missed tax deductions
                                        </div>
                                    </li>
                                    <li className="col-md-6 mt-3">
                                        <div className="learn-inform-list-inr">
                                            <span className="d-flex align-items-center justify-content-center">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                            and much more...
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="white-box-main">
                                <div className="recommendations-info">
                                    <h2 className="position-relative bdr-remove mb-0 pb-0">What are the benefits?</h2>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-4">
                                        <div className="benefits-box-main benefits-color-1">
                                            <div className="d-flex mb-3 align-items-center">
                                                <img src={BenefitsImage1} alt="benefits" />
                                                <span>Ease the burden</span>
                                            </div>
                                            <p className="mb-0">Some tax retums can be complicated. a small -business owner who itemizes hisdeductions has to complete to complete and file IRS 1040, schedule C and Schedule SE, among other forms.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <div className="benefits-box-main benefits-color-2">
                                            <div className="d-flex mb-3 align-items-center">
                                                <img src={BenefitsImage2} alt="benefits" />
                                                <span>Reduce Errors</span>
                                            </div>
                                            <p className="mb-0">Some tax retums can be complicated. a small -business owner who itemizes hisdeductions has to complete to complete and file IRS 1040, schedule C and Schedule SE, among other forms.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <div className="benefits-box-main benefits-color-3">
                                            <div className="d-flex mb-3 align-items-center">
                                                <img src={BenefitsImage3} alt="benefits" />
                                                <span>Professional Tax Advice</span>
                                            </div>
                                            <p className="mb-0">The tax rules are complicated. Before you can use a deduction or credit, you must qualify for it. A tax professional can help find deductions and credits for which you qualify for, and can give advice on certain tax issues.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <div className="benefits-box-main benefits-color-4">
                                            <div className="d-flex mb-3 align-items-center">
                                                <img src={BenefitsImage4} alt="benefits" />
                                                <span>Avoid Adverse Consequences</span>
                                            </div>
                                            <p className="mb-0">When you sign the end of your tax return, you declare that the information is true and accurate to the best of your knowledge. If the IRS audits your return and finds errors, you could face potentially serious legal consequences. Having a professional prepare your tax return adds a little safeguard to potential liability.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {show && (
                <Modal dialogClassName="modal-dialog modal-dialog-centered modal-cust-main-cmn modal-md" show={show} onHide={() => setShow(false)}>
                    <Modal.Body>
                        <div className="text-center congratulation-mdl-info mx-auto">
                            <img src={Congratulation} alt="close" />
                            <span className="d-block">Congratulation</span>
                            <p>Your request has been sent.</p>
                            <div>
                                <button type="button" className="btn-comn-all w-100 d-block" onClick={() => setShow(false)}>
                                    ok
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </Layout>
    );
}
