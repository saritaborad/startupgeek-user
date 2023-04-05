import React, { useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import Info from "../Images/info-icon.svg";
import "react-phone-input-2/lib/style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import Confirm from "../Images/confirm-img.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { errorContainer, formAttr } from "../const";
import { useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { ContactCheckBox } from "../Components/ContactCheckBox";
import InputMask from "react-input-mask";

export default function StartACompanyTaxInfo() {
    const allState = useAllState();
    const taxRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);

    const progressbar = { width: "60%", ariavaluenow: "60", ariavaluemin: "0", ariavaluemax: "100" };
    const [taxInfo, setTaxInfo] = useState("");
    const [agreementShow, setAgreementShow] = useState(false);
    const [EINModalShow, setEINModalShow] = useState(false);
    const [einConfirm, setEinConfirm] = useState(2);
    const [company_Id, setcompany_Id] = useState("");
    const [userPlanId, setuserPlanId] = useState("");
    const [contactId, setcontactId] = useState("");
    const [contactInfo, setcontactInfo] = useState("");
    const serviceInfo = useServiceInfo("EIN / Tax ID Number");
    const [company, setCompany] = useState("");
    const [previousLocation, setPreviousLocation] = useState(null);

    useEffect(() => {
        setCompany(context.company);
    }, [context.company]);

    useEffect(() => {
        if (location?.state?.company_Id && location?.state?.userPlanId) {
            setcompany_Id(location.state.company_Id);
            context.setviewCompanyId(location.state.company_Id);
            setuserPlanId(location.state.userPlanId);
            taxInfoByCompany(location.state.company_Id);
        } else {
            navigate("/start-company-business");
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
            getContact(location.state.contactId);
        }
    }, [location?.state?.company_Id, location?.state?.userPlanId, location?.state?.contactId]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const submitFormData = (formData, resetForm) => {
        let data = { userPlanId: userPlanId, company_Id: company_Id, serviceTitle: "EIN / Tax ID Number", addService: einConfirm == 2 ? true : false, ...formData };
        new Promise((resolve) => resolve(PostApi(API_PATH.addTaxId, data))).then((res) => {
            if (res.status === 200) {
                setPreviousLocation(location.pathname);
                setTaxInfo(res.data.data);
                location.state?.tax === "update" ? navigate("/start-company-review-order", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } }) : navigate("/start-company-banking-info", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const taxInfoByCompany = (id) => {
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.getTaxInfoByCompany, { company_Id: id }))).then((res) => {
            if (res.status === 200) {
                setTaxInfo(res.data.data);
            } else {
                console.log(res.data.message);
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

    const change_Ein = (value) => {
        parseInt(value) === 1 && setAgreementShow(true);
        setEinConfirm(value);
    };

    const closeAgreementModal = () => {
        setAgreementShow(false);
        setEinConfirm(2);
    };

    const closeEINModalShowModal = () => {
        setEINModalShow(false);
        taxRef.current.setFieldValue("EIN_Type", 2);
        taxRef.current.setFieldValue("ein2Text", "");
    };

    const goPrevious = () => {
        navigate("/start-company-registered-agent", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, previousLocation: previousLocation } });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="start-cmn-top">
                                Please provide EIN / Tax ID Number Information for <span>{company?.company_name}</span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <Formik
                                    innerRef={taxRef}
                                    enableReinitialize
                                    initialValues={{
                                        fname: taxInfo?.fname ? taxInfo?.fname : "",
                                        lname: taxInfo?.lname ? taxInfo?.lname : "",
                                        city: taxInfo?.city ? taxInfo?.city : "",
                                        zip_code: taxInfo?.zip_code ? taxInfo?.zip_code : "",
                                        street_address: taxInfo?.street_address ? taxInfo?.street_address : "",
                                        state: taxInfo?.state ? taxInfo?.state : "",
                                        ein2Text: taxInfo?.ein2Text ? taxInfo?.ein2Text : "",
                                        EIN_Type: taxInfo?.EIN_Type ? taxInfo?.EIN_Type : 2,
                                    }}
                                    validationSchema={Yup.object({
                                        fname: Yup.string().required("First name is required."),
                                        lname: Yup.string().required("Last name is required."),
                                        city: Yup.string().required("City name is required."),
                                        zip_code: Yup.number().required("Zip code is required.").typeError("Zip code is required."),
                                        street_address: Yup.string().required("Street address is required."),
                                        state: Yup.string().required("State is required."),
                                        ein2Text: einConfirm == 2 && (taxRef?.current?.values.EIN_Type == 2 ? Yup.string().required("SSN number is required.").matches("^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$", "Invalid SSN number") : Yup.string().required("ITIN number is required.").matches("^(9d{2})([ -]?)([7]d|8[0-8])([ -]?)(d{4})$", "ITIN number is invalid")),
                                    })}
                                    onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                                >
                                    {(runform) => (
                                        <form onSubmit={runform.handleSubmit}>
                                            <div className="white-box-main">
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <div className="recommendations-info">
                                                            <h2 className="position-relative">EIN / Tax Identification Number Information</h2>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <label className="lbl-comn-info-2">I am a foreign individual and do not have a social security number </label>
                                                        <div className="d-flex align-items-center" value={einConfirm} onChange={(e) => change_Ein(e.target.value)}>
                                                            <div className="cust-radio-btn">
                                                                <input type="radio" id="yes" name="einConfirm" value={1} checked={einConfirm == 1} />
                                                                <label htmlFor="yes">Yes</label>
                                                            </div>
                                                            <div className="cust-radio-btn ms-3">
                                                                <input type="radio" id="no" name="einConfirm" value={2} checked={einConfirm == 2} />
                                                                <label htmlFor="no">No</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {ContactCheckBox(contactInfo, taxRef.current, "name")}
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
                                                    {einConfirm == 2 && (
                                                        <div className="col-12 mb-3">
                                                            <label className="lbl-comn-info-2">Identification number by which I will obtain the EIN* </label>
                                                            <div className="d-sm-flex align-items-center">
                                                                <div className="d-flex align-items-center" {...formAttr(runform, "EIN_Type")} onChangeCapture={(e) => setEINModalShow(true)}>
                                                                    <div className="cust-radio-btn">
                                                                        <input type="radio" id="ITIN" name="EIN_Type" value={1} checked={runform?.values?.EIN_Type == 1} />
                                                                        <label htmlFor="ITIN">ITIN</label>
                                                                    </div>
                                                                    <div className="cust-radio-btn ms-3">
                                                                        <input type="radio" id="SSN" name="EIN_Type" value={2} checked={runform?.values?.EIN_Type == 2} />
                                                                        <label htmlFor="SSN">SSN</label>
                                                                    </div>
                                                                </div>
                                                                <div className="ms-sm-3 mt-sm-0 mt-2">
                                                                    <InputMask placeholder={runform?.values?.EIN_Type == 2 ? "856-48-8989" : "986-743-1234"} mask={runform?.values?.EIN_Type == 2 ? "999-99-9999" : "999-999-9999"} name="ein2Text" className="form-control input-style" onChange={(e) => runform.setFieldValue("ein2Text", e.target.value)} {...formAttr(runform, "ein2Text")} />
                                                                    {errorContainer(runform, "ein2Text")}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="col-12 mb-3">
                                                        <div className="agnt-dtls-btm">
                                                            <img src={Info} className="me-3 img-fluid" alt="arrow" />
                                                            <div className="agent-head-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <div className="recommendations-info">
                                                            <h2 className="position-relative">Physical Street Address</h2>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                        </div>
                                                    </div>
                                                    {ContactCheckBox(contactInfo, taxRef.current, "address")}
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Street Address</label>
                                                        <input type="text" className="form-control input-style" name="street_address" {...formAttr(runform, "street_address")} />
                                                        {errorContainer(runform, "street_address")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Select state</label>
                                                        <select className="form-select input-style" {...formAttr(runform, "state")} name="state">
                                                            <option defaultValue value="">
                                                                --- state ---
                                                            </option>
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
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">City</label>
                                                        <input type="text" className="form-control input-style" {...formAttr(runform, "city")} name="city" />
                                                        {errorContainer(runform, "city")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Zip Code</label>
                                                        <input type="text" maxLength={5} className="form-control input-style" {...formAttr(runform, "zip_code")} name="zip_code" />
                                                        {errorContainer(runform, "zip_code")}
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-flex align-items-center">
                                                            {!location.state?.tax && (
                                                                <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                                    Previous
                                                                </button>
                                                            )}
                                                            <button className=" ms-auto btn-comn-all btn-after-class" type="submit">
                                                                {location.state?.tax === "update" ? "Update" : "Next"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Ordersummary progressbar={progressbar} service={einConfirm == 2 ? serviceInfo : ""} userPlanId={userPlanId} />
                            <Whitebox />
                        </div>
                    </div>
                    {agreementShow && (
                        <Modal show={agreementShow} onHide={() => closeAgreementModal()} size="lg" dialogClassName="agree-modal-main" aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Body>
                                <div className="agree-modal-part">
                                    <div className="text-center">
                                        <img src={Confirm} className="img-fluid confirm-img" alt="" />
                                        <div className="box-head-part-2 mt-2">Confirm</div>
                                    </div>
                                    <div className="dir-detail-comn">
                                        <span className="d-block">Please review and agree to the statements listed below in order for us prepare the SS4 application for a non-US citizen.</span>
                                        <bdi className="d-flex align-items-center">
                                            <i className="bi bi-check me-2"></i>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </bdi>
                                        <bdi className="d-flex align-items-center">
                                            <i className="bi bi-check me-2"></i>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </bdi>
                                        <bdi className="d-flex align-items-center">
                                            <i className="bi bi-check me-2"></i>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                        </bdi>
                                        <bdi className="d-flex align-items-center">
                                            <i className="bi bi-check me-2"></i>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                        </bdi>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <button type="button" className="btn-comn-all w-100" onClick={() => setAgreementShow(false)}>
                                                I Agree
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button type="button" className="btn-comn-all3 w-100" onClick={() => closeAgreementModal()}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}

                    {EINModalShow && (
                        <Modal show={EINModalShow} size="md" dialogClassName="agree-modal-main" aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Body>
                                <div className="agree-modal-part">
                                    <div className="text-center">
                                        <img src={Confirm} className="img-fluid confirm-img" alt="" />
                                        <div className="box-head-part-2 mt-2">Confirm</div>
                                        <div className="recommendations-info">
                                            <p>The obtainment for an EIN using an ITIN number cannot be procured through the IRS automated system and will take up to 12 weeks to obtain.</p>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <button type="button" className="btn-comn-all w-100" onClick={() => setEINModalShow(false)}>
                                                I Agree
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button type="button" className="btn-comn-all3 w-100" onClick={() => closeEINModalShowModal()}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                </div>
            </div>
        </FrontLayout>
    );
}
