import React, { useContext, useEffect, useRef, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import Info from "../Images/info-icon.svg";
import "react-phone-input-2/lib/style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Purchase from "../Images/purchase.svg";
import CommaStart from "../Images/comma-start.svg";
import CommaEnd from "../Images/comma-end.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { errorContainer, formAttr } from "../const";
import { useAllCountry, useAllState } from "../Hooks/CustomHook";
import { ContactCheckBox } from "../Components/ContactCheckBox";
import AuthContext from "../Context/AuthContext";

export default function StartACompanyPaymentInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const allCountry = useAllCountry();
    const allState = useAllState();
    const billingRef = useRef();
    const context = useContext(AuthContext);

    const progressbar = { width: "100%", ariavaluenow: "100", ariavaluemin: "0", ariavaluemax: "100" };
    const [billInfo, setBillInfo] = useState([]);
    const [cardInfo, setCardInfo] = useState([]);
    const [userPlanId, setuserPlanId] = useState("");
    const [company_Id, setcompany_Id] = useState("");
    const [contactId, setcontactId] = useState("");
    const [contactInfo, setcontactInfo] = useState("");
    const [company, setCompany] = useState("");
    const [previousLocation, setPreviousLocation] = useState(null);

    useEffect(() => {
        setCompany(context.company);
    }, [context.company]);

    useEffect(() => {
        if (location?.state?.company_Id !== undefined && location?.state?.userPlanId !== undefined) {
            setcompany_Id(location?.state?.company_Id);
            context.setviewCompanyId(location.state.company_Id);
            setuserPlanId(location?.state?.userPlanId);
            getPaymentInfo(location.state.company_Id);
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
            getContact(location.state.contactId);
        }
    }, [location?.state?.company_Id, location?.state?.userPlanId, location?.state?.contactId]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const submitFormData = (formData) => {
        formData.userPlanId = userPlanId;
        formData.company_Id = company_Id;

        new Promise((resolve) => resolve(PostApi(API_PATH.addBilling, formData))).then((res) => {
            if (res.status === 200) {
                addPayment(userPlanId, company_Id, formData);
                toast.success(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const addPayment = (userPlanId, company_Id, info) => {
        let data = { Card_Number: info.Card_Number, CVV: info.CVV, company_Id: company_Id, userPlanId: userPlanId, exp_month: info.expiry_date?.split("-")?.[1], exp_year: info.expiry_date?.split("-")?.[0], expiry_date: info.expiry_date };
        new Promise((resolve) => resolve(PostApi(API_PATH.planPayment, data))).then((res) => {
            if (res.status === 200) {
                setPreviousLocation(location.pathname);
                navigate("/orders-details", { state: { orderType: "company", orderId: res.data.data?.orderID, userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getPaymentInfo = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getBillInfoByCompany, { company_Id: id }))).then((res) => {
            if (res.status === 200) {
                setBillInfo(res.data.data?.billInfo);
                setCardInfo(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getContact = (contactId) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getContact, { _id: contactId }))).then((res) => {
            if (res.status === 200) {
                setcontactInfo(res.data.data);
            }
        });
    };

    const goPrevious = () => {
        navigate("/start-company-review-order", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, previousLocation: previousLocation } });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="start-cmn-top">
                                Please provide payment information for <span>{company?.company_name}</span>
                            </div>
                        </div>
                        <div className="col-lg-8 mb-3">
                            <div className="mb-3">
                                <Formik
                                    innerRef={billingRef}
                                    enableReinitialize
                                    initialValues={{
                                        fname: billInfo?.fname ? billInfo?.fname : "",
                                        lname: billInfo?.lname ? billInfo?.lname : "",
                                        street_address: billInfo?.street_address ? billInfo?.street_address : "",
                                        Card_Number: cardInfo?.Card_Number ? cardInfo?.Card_Number : "",
                                        country: "US",
                                        state: billInfo?.state ? billInfo?.state : "",
                                        city: billInfo?.city ? billInfo?.city : "",
                                        zip_code: billInfo?.zip_code ? billInfo?.zip_code : "",
                                        CVV: cardInfo?.CVV ? cardInfo?.CVV : "",
                                        acceptTerms: true,
                                        startDate: Date.now(),
                                        expiry_date: cardInfo?.expiry_date ? moment(cardInfo?.expiry_date).format("YYYY-MM") : "",
                                    }}
                                    validationSchema={Yup.object({
                                        fname: Yup.string().required("First name is required."),
                                        lname: Yup.string().required("Last name is required."),
                                        city: Yup.string().required("City name is required."),
                                        country: Yup.string().required("Country is required."),
                                        state: Yup.string().required("State is required."),
                                        zip_code: Yup.number().required("Zip Code is required.").typeError("Zip code should be number."),
                                        street_address: Yup.string().required("Street address is required."),
                                        Card_Number: Yup.string().required("Card number is required."),
                                        CVV: Yup.number().min(3, "CVV should be minimim 3 digit").required("CVV is required.").typeError("CVV should be number"),
                                        expiry_date: Yup.date().required("Expiry date is required.").min(Yup.ref("startDate"), "Invalid expiry month or year"),
                                        acceptTerms: Yup.bool().oneOf([true], "Agree legal statement and cancellation policy"),
                                    })}
                                    onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                                >
                                    {(runform) => (
                                        <form onSubmit={runform.handleSubmit}>
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
                                                    {ContactCheckBox(contactInfo, billingRef.current)}
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">First Name</label>
                                                        <input type="text" name="fname" {...formAttr(runform, "fname")} className="form-control input-style" />
                                                        {errorContainer(runform, "fname")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Last Name</label>
                                                        <input type="text" name="lname" {...formAttr(runform, "lname")} className="form-control input-style" />
                                                        {errorContainer(runform, "lname")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Street Address</label>
                                                        <input type="text" className="form-control input-style" {...formAttr(runform, "street_address")} name="street_address" />
                                                        {errorContainer(runform, "street_address")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Select Country</label>
                                                        <select className="form-select input-style" name="country" value="US" {...formAttr(runform, "country")}>
                                                            <option defaultValue="">--- Country ---</option>
                                                            {allCountry?.length > 0 &&
                                                                allCountry?.map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item.isoCode} id={item.name} selected disabled>
                                                                            {item.name}
                                                                        </option>
                                                                    );
                                                                })}
                                                        </select>
                                                        {errorContainer(runform, "country")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Select state</label>
                                                        <select className="form-select input-style" name="state" {...formAttr(runform, "state")}>
                                                            <option defaultValue="">--- state ---</option>
                                                            {allState?.length > 0 &&
                                                                allState?.map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item.label} id={item.value}>
                                                                            {item.label}
                                                                        </option>
                                                                    );
                                                                })}
                                                        </select>
                                                        {errorContainer(runform, "state")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">City</label>
                                                        <input type="text" className="form-control input-style" {...formAttr(runform, "city")} name="city" />
                                                        {errorContainer(runform, "city")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Zip Code</label>
                                                        <input type="text" className="form-control input-style" maxLength={5} {...formAttr(runform, "zip_code")} name="zip_code" />
                                                        {errorContainer(runform, "zip_code")}
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <div className="agnt-dtls-btm">
                                                            <img src={Info} className="me-3 img-fluid" alt="arrow" />
                                                            <div className="agent-head-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 mb-3">
                                                        <label className="lbl-comn-info">Card Number</label>
                                                        <input type="tel" className="form-control input-style" name="Card_Number" maxLength="16" {...formAttr(runform, "Card_Number")} />
                                                        {errorContainer(runform, "Card_Number")}
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="lbl-comn-info">Expiration Date</label>
                                                                <input type="month" className="form-control input-style" min={moment(Date.now()).format("YYYY-MM")} name="expiry_date" {...formAttr(runform, "expiry_date")} />
                                                                {errorContainer(runform, "expiry_date")}
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="lbl-comn-info">CVV</label>
                                                                <input type="password" maxLength="4" minLength="3" className="form-control input-style" name="CVV" {...formAttr(runform, "CVV")} />
                                                                {errorContainer(runform, "CVV")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-5">
                                                        <div className="grey-box-check">
                                                            <div className="custom-checkbox">
                                                                <label className="custom-lbl-part text-secondary">
                                                                    <input type="checkbox" id="agreement" name="acceptTerms" {...formAttr(runform, "acceptTerms")} defaultChecked />
                                                                    <span className="custom-checkbox-class"></span>I Agree To The Legal statement And Cancellation Policy.
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {errorContainer(runform, "acceptTerms")}
                                                    </div>
                                                    <div className="d-flex align-items-center ">
                                                        <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                            Previous
                                                        </button>
                                                        <button className=" ms-auto btn-comn-all btn-after-class " type="submit">
                                                            Complete & Pay
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Ordersummary progressbar={progressbar} userPlanId={userPlanId} />
                            <Whitebox />
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
