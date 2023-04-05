import React, { useContext, useEffect, useRef, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { Collapse } from "react-bootstrap";
import Info from "../Images/info-icon.svg";
import Info2 from "../Images/info-icon-2.svg";
import Business from "../Images/business-permits.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { errorContainer, formAttr } from "../const";
import { useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { ContactCheckBox } from "../Components/ContactCheckBox";
import AuthContext from "../Context/AuthContext";

export default function StartALicensePermits() {
    const allState = useAllState();
    const licenceRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);

    const [permits, setPermits] = useState(2);
    const [businessData, setBusinessData] = useState(1);
    const [open, setOpenbusiness] = useState({ license: true });
    const progressbar = { width: "90%", ariavaluenow: "90", ariavaluemin: "0", ariavaluemax: "100" };
    const [company_Id, setcompany_Id] = useState("");
    const [userPlanId, setuserPlanId] = useState("");
    const [contactId, setcontactId] = useState("");
    const [contactInfo, setcontactInfo] = useState("");
    const serviceInfo = useServiceInfo("Licence & Permits");
    const [company, setCompany] = useState("");
    const [previousLocation, setPreviousLocation] = useState(null);

    useEffect(() => {
        setCompany(context.company);
    }, [context.company]);

    useEffect(() => {
        if (location?.state?.company_Id && location.state?.userPlanId) {
            getBusinessData(location.state.company_Id);
            context.setviewCompanyId(location.state.company_Id);
            setuserPlanId(location.state.userPlanId);
            setcompany_Id(location.state.company_Id);
        } else {
            navigate("/start-company-business");
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
            getContact(location.state.contactId);
        }
    }, [location?.state?.company_Id, location.state?.userPlanId, location?.state?.contactId]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const submitFormData = (formData) => {
        let data = { userPlanId: userPlanId, company_Id: company_Id, registration: permits, addService: permits == 2 ? true : false, serviceTitle: "Licence & Permits" };
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.addBusinessData, permits == 1 ? data : formData))).then((res) => {
            if (res.status === 200) {
                setPreviousLocation(location.pathname);
                navigate("/start-company-review-order", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getBusinessData = (id) => {
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.getBusinessByCompany, { company_Id: id }))).then((res) => {
            if (res.status === 200) {
                setBusinessData(res.data.data);
                setOpenbusiness({ license: res.data.data?.registration == 1 ? false : true });
                setPermits(res.data.data?.registration || 2);
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
        navigate("/start-company-tax-strategy", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, previousLocation: previousLocation } });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="start-cmn-top">
                                Complete your order for <span>{company?.company_name}</span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <Formik
                                    innerRef={licenceRef}
                                    enableReinitialize
                                    initialValues={{
                                        street_address: businessData?.street_address ? businessData?.street_address : "",
                                        address: businessData?.address ? businessData?.address : "",
                                        city: businessData?.city ? businessData?.city : "",
                                        zip_code: businessData?.zip_code ? businessData?.zip_code : "",
                                        state: businessData?.state ? businessData?.state : "",
                                    }}
                                    validationSchema={Yup.object({
                                        city: Yup.string().required("City name is required."),
                                        zip_code: Yup.number().required("Zip Code is required.").typeError("Zip code should be number"),
                                        street_address: Yup.string().required("Street Address is required."),
                                        state: Yup.string().required("State is required."),
                                    })}
                                    onSubmit={(formData, { resetForm }) => {
                                        submitFormData({ userPlanId: userPlanId, company_Id: company_Id, registration: permits, addService: permits == 2 ? true : false, serviceTitle: "Licence & Permits", ...formData }, resetForm);
                                    }}
                                >
                                    {(runform) => (
                                        <form onSubmit={runform.handleSubmit}>
                                            <div className="white-box-main">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="recommendations-info">
                                                            <h2 className="position-relative">Business Licenses and Permits</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <div className="border-class">
                                                            <div className="dir-detail-comn mt-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="me-2">
                                                                        <img src={Business} className="img-fluid" alt="" />
                                                                    </div>
                                                                    <div className="business-dif-dtl">
                                                                        <span>
                                                                            We’ve identified <bdi>4 licenses</bdi> for your Agriculture business in Alabama...
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex" value={permits} onChange={(e) => setPermits(e.target.value)}>
                                                        <div className="col-lg-6 mb-3">
                                                            <div className="cust-radio-btn diff-radio-class" onClick={() => setOpenbusiness({ ...open, license: false })}>
                                                                <input type="radio" id="No" name="Permits" className="cust-radio" value={1} checked={permits == 1} />
                                                                <label className="comn-radio-box d-flex align-items-center" htmlFor="No">
                                                                    No thanks, I'll do the work myself.
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                            <div className="cust-radio-btn diff-radio-class" onClick={() => setOpenbusiness({ ...open, license: true })}>
                                                                <input type="radio" id="Yes" name="Permits" className="cust-radio" value={2} checked={permits == 2} />
                                                                <label className="comn-radio-box d-flex align-items-center" htmlFor="Yes">
                                                                    identify all licenses I need and send me the necessary applications.
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <Collapse in={open.license}>
                                                            <div className="white-box-main-2 mt-3 arrow-top-right">
                                                                <div className="row">
                                                                    <div className="col-12 mb-3">
                                                                        <div className="dir-detail-comn">
                                                                            <span className="d-block">Please provide the address below where you would like us to research required licenses and permits:</span>
                                                                        </div>
                                                                    </div>
                                                                    {ContactCheckBox(contactInfo, licenceRef.current, "address")}
                                                                    <div className="col-lg-6 mb-3">
                                                                        <label className="lbl-comn-info">Street Address</label>
                                                                        <input type="text" className="form-control input-style" {...formAttr(runform, "street_address")} name="street_address" />
                                                                        {errorContainer(runform, "street_address")}
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
                                                                    <div className="col-lg-6 mb-3">
                                                                        <label className="lbl-comn-info">City</label>
                                                                        <input type="text" name="city" {...formAttr(runform, "city")} className="form-control input-style" />
                                                                        {errorContainer(runform, "city")}
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <label className="lbl-comn-info">Zip Code</label>
                                                                        <input type="text" name="zip_code" {...formAttr(runform, "zip_code")} maxLength={5} className="form-control input-style" />
                                                                        {errorContainer(runform, "zip_code")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <div className="agnt-dtls-btm dif-info-bg mb-2">
                                                            <img src={Info2} className="me-3 img-fluid" alt="arrow" />
                                                            <div className="agent-head-info">Join the 18,000+ business owners who have gained peace of mind with this package.</div>
                                                        </div>
                                                        <div className="agnt-dtls-btm">
                                                            <img src={Info} className="me-3 img-fluid" alt="arrow" />
                                                            <div className="agent-head-info">
                                                                <bdi>Are Business Licenses and Permits something I should consider?</bdi>
                                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-flex align-items-center">
                                                            <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                                Previous
                                                            </button>
                                                            {permits == 1 ? (
                                                                <button className=" ms-auto btn-comn-all btn-after-class" type="button" onClick={() => submitFormData()}>
                                                                    Next
                                                                </button>
                                                            ) : (
                                                                <button className=" ms-auto btn-comn-all btn-after-class" type="submit">
                                                                    Next
                                                                </button>
                                                            )}
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
                            <Ordersummary progressbar={progressbar} service={permits == 2 ? serviceInfo : ""} userPlanId={userPlanId} />
                            <Whitebox />
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
