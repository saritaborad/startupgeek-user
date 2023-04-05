import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Info from "../Images/info-icon.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import AdminPayment from "./Common/AdminPayment";
import { AdminOrderSummary, GoBackArrow, payment } from "./Common/AdminOrderSummary";
import { errorContainer, formAttr } from "../const";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { useRef } from "react";
import { validateTIN } from "./Utils";
import { BenefitList } from "../Components/BenefitList";
import { CurrentCompanyInfo } from "../Components/CurrentCompanyInfo";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AnnualReport() {
    const context = useContext(AuthContext);
    const annualRef = useRef();
    const serviceInfo = useServiceInfo("Annual report");
    const allState = useAllState();
    const country = useAllCountry();
    const navigate = useNavigate();

    const [state, setState] = useState("Alaska");
    const [error, setError] = useState("");
    const [company_Id, setcompany_Id] = useState("");
    const [reportData, setReportData] = useState("");

    useEffect(() => {
        if (context.viewCompanyId) {
            setcompany_Id(context.viewCompanyId);
        }
    }, [context.viewCompanyId]);

    const submitFormData = (formData, type) => {
        document.getElementById("annualReport")?.click();
        if (state === "") {
            setError(true);
        } else {
            payment({ ...reportData, ...formData, cardId: formData._id }, type, company_Id, serviceInfo, navigate);
        }
    };

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-sm-inline-flex align-items-center comn-title-info">
                                <GoBackArrow />
                                <h1>Annual Report</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <CurrentCompanyInfo state={state} setState={setState} error={error} setError={setError} serviceState={true} allState={allState} />
                                    <Formik
                                        innerRef={annualRef}
                                        initialValues={{
                                            bussinessType: "",
                                            TaxpayerNum: "",
                                            WebfileNum: "",
                                            TotalRevenue: "",
                                        }}
                                        validationSchema={Yup.object({
                                            bussinessType: Yup.string().required("Business keyword is required."),
                                            TaxpayerNum: Yup.string()
                                                .required("Tax Payer Number is required.")
                                                .test("is-valid", "Please enter a valid SSN, EIN or ITIN", (value) => validateTIN(value)),
                                            WebfileNum: Yup.string()
                                                .required("Webfile Number is required.")
                                                .matches(/^[A-Za-z]{2}\d{6}$/, "webfile number must be 2 letter + 6 digit"),
                                            TotalRevenue: Yup.number().required("Revenue is required."),
                                        })}
                                        onSubmit={(formData, { resetForm }) => {
                                            setReportData(formData);
                                        }}
                                    >
                                        {(runform) => (
                                            <form onSubmit={runform.handleSubmit}>
                                                <div className="white-box-main">
                                                    <div className="mt-2">
                                                        <label className="lbl-comn-info">
                                                            Enter Keywords For Your Business <mark className="p-0 bg-transparent star-mark-text">*</mark>
                                                        </label>
                                                        <input placeholder="Ex: Hair salon" className="form-control input-style" name="bussinessType" {...formAttr(runform, "bussinessType")} />
                                                        {errorContainer(runform, "bussinessType")}
                                                    </div>
                                                    <div className="white-box-main mb-4">
                                                        <div className="box-hdr-top">
                                                            <span className="d-flex align-items-center">Taxpayer Information</span>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-4 mb-3">
                                                                <label className="lbl-comn-info">
                                                                    Taxpayer Number <mark className="p-0 bg-transparent star-mark-text">*</mark>
                                                                </label>
                                                                <input className="form-control input-style" type="text" name="TaxpayerNum" maxLength={11} {...formAttr(runform, "TaxpayerNum")} />
                                                                {errorContainer(runform, "TaxpayerNum")}
                                                            </div>
                                                            <div className="col-lg-4 mb-3">
                                                                <label className="lbl-comn-info">
                                                                    Webfile Number <mark className="p-0 bg-transparent star-mark-text">*</mark>
                                                                </label>
                                                                <input className="form-control input-style " type="text" name="WebfileNum" maxLength="8" {...formAttr(runform, "WebfileNum")} />
                                                                {errorContainer(runform, "WebfileNum")}
                                                            </div>
                                                            <div className="col-lg-4 mb-3">
                                                                <label className="lbl-comn-info">
                                                                    Total Revenue (No Cents) <mark className="p-0 bg-transparent star-mark-text">*</mark>
                                                                </label>
                                                                <input className="form-control input-style" type="number" name="TotalRevenue" {...formAttr(runform, "TotalRevenue")} />
                                                                {errorContainer(runform, "TotalRevenue")}
                                                            </div>
                                                        </div>
                                                        <div className="agnt-dtls-btm">
                                                            <img src={Info} className="me-3 img-fluid" alt="arrow" />
                                                            If the total revenue is equal to or less than $1,180,000.00 our filing fee is $99.00. If the total revenue is more than $1,180,000.00 our filing fee is $300.00. If your company did not accrue revenue for the previous year please enter $0.
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="d-none" id="annualReport">
                                                    Submit
                                                </button>
                                            </form>
                                        )}
                                    </Formik>
                                    <div className="payment-area">
                                        <AdminPayment submitFormData={submitFormData} buttonId={"annualReport"} allState={allState} country={country} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <AdminOrderSummary service={serviceInfo} />
                                    <BenefitList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
