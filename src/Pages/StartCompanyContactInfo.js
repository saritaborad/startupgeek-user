import React, { useEffect, useState, useRef } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import Info from "../Images/info-icon.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { errorContainer, formAttr } from "../const";
import { useAllState } from "../Hooks/CustomHook";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function StartACompanyContactInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);
    const runforms = useRef("");

    const states = useAllState();
    const progressbar = { width: "10%", ariavaluenow: "10", ariavaluemin: "0", ariavaluemax: "100" };
    const [oneContact, setOneContact] = useState("");
    const [phone, setPhone] = useState("");
    const [contactId, setcontactId] = useState("");
    const [userPlanId, setuserPlanId] = useState("");
    const [company_Id, setcompany_Id] = useState("");
    const [previousLocation, setPreviousLocation] = useState(null);

    useEffect(() => {
        if (location.state?.userPlanId !== undefined) {
            setuserPlanId(location.state.userPlanId);
        } else {
            navigate("/start-company-business");
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
            getContact(location.state.contactId);
        }
        if (location?.state?.company_Id !== undefined) {
            setcompany_Id(location.state.company_Id);
        }
    }, [location?.state?.contactId, location?.state?.userPlanId, location?.state?.company_Id]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const getContact = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getContact, { _id: id }))).then((res) => {
            if (res.status === 200) {
                setPhone(res.data.data.phone);
                setOneContact(res.data.data);
            }
        });
    };

    const handelphonechange = (phonenumber) => {
        runforms.current.setFieldValue("phone", phonenumber);
    };
    console.log(location.pathname);
    const submitFormData = (formData, resetForm) => {
        formData.userPlanId = userPlanId;
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.addContact, formData))).then((response) => {
            if (response.status === 200) {
                setPreviousLocation(location.pathname);
                context.setUserPlanId(userPlanId);
                navigate("/start-company-info", { state: { contactId: response.data.data._id, userPlanId: userPlanId } });
            } else {
                toast.error(response.data.message);
            }
        });
    };

    const editContactData = (formData, resetForm) => {
        formData._id = contactId;
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.contactUpdate, formData))).then((response) => {
            if (response.status === 200) {
                setPreviousLocation(location.pathname);
                context.setUserPlanId(userPlanId);
                location.state?.contact === "update" ? navigate("/start-company-review-order", { state: { contactId: response.data.data._id, userPlanId: userPlanId, company_Id: company_Id } }) : navigate("/start-company-info", { state: { contactId: response.data.data._id, userPlanId: userPlanId, company_Id: company_Id } });
            } else {
                toast.error(response.data.message);
            }
        });
    };

    const goPrevious = () => {
        navigate("/start-company-business", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, previousLocation: previousLocation } });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <Formik
                                    innerRef={runforms}
                                    enableReinitialize
                                    initialValues={{
                                        email: oneContact.email ? oneContact.email : "",
                                        fname: oneContact.fname ? oneContact.fname : "",
                                        lname: oneContact.lname ? oneContact.lname : "",
                                        city: oneContact.city ? oneContact.city : "",
                                        zip_code: oneContact.zip_code ? oneContact.zip_code : "",
                                        street_address: oneContact.street_address ? oneContact.street_address : "",
                                        state: oneContact.state ? oneContact.state : "",
                                        phone: oneContact.phone ? oneContact.phone : "",
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string().email("Enter Valid Email Address.").required("Email is required."),
                                        fname: Yup.string().required("First Name is required."),
                                        lname: Yup.string().required("Last Name is required."),
                                        city: Yup.string().required("City name is required."),
                                        zip_code: Yup.number().required("Zip code is required.").typeError("Zip code is required."),
                                        street_address: Yup.string().required("Street Address is required."),
                                        state: Yup.string().required("Street Address is required."),
                                        phone: Yup.string().required("Phone Number is required.").min(10),
                                    })}
                                    onSubmit={(formData, { resetForm }) => {
                                        if (!contactId) {
                                            submitFormData(formData, resetForm);
                                        } else {
                                            editContactData(formData, resetForm);
                                        }
                                    }}
                                >
                                    {(runform) => (
                                        <form onSubmit={runform.handleSubmit}>
                                            <div className="white-box-main">
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <div className="recommendations-info">
                                                            <h2 className="position-relative">Contact Person</h2>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                        </div>
                                                    </div>
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
                                                        <label className="lbl-comn-info">Email</label>
                                                        <input type="email" name="email" {...formAttr(runform, "email")} className="form-control input-style" />
                                                        {errorContainer(runform, "email")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Phone</label>
                                                        <div className="phone-cust-input">
                                                            <PhoneInput className="form-control-PhoneInput" value={phone} disableAreaCodes country={"us"} placeholder="Enter your phone number" {...formAttr(runform, "phone")} onChange={(e) => handelphonechange(e)} />
                                                            <span id="phonenumber" style={{ display: "none", color: "red" }}>
                                                                Phone Number is required.
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <div className="recommendations-info">
                                                            <h2 className="position-relative">Mailing Address</h2>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Street Address</label>
                                                        <input type="text" className="form-control input-style" {...formAttr(runform, "street_address")} name="street_address" />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Select state</label>
                                                        <select className="form-select input-style" {...formAttr(runform, "state")} name="state">
                                                            <option defaultValue="">--- state ---</option>
                                                            {states.length > 0 &&
                                                                states.map((item, i) => {
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
                                                    <div className="col-12 mb-3">
                                                        <div className="agnt-dtls-btm">
                                                            <img src={Info} className="me-3 img-fluid" alt="arrow" />
                                                            <div className="agent-head-info">
                                                                <bdi>How will this address be used?</bdi>
                                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-flex align-items-center">
                                                            {!location.state?.contact && (
                                                                <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                                    Previous
                                                                </button>
                                                            )}
                                                            <button className=" ms-auto btn-comn-all btn-after-class" type="submit">
                                                                {location.state?.contact ? "Update" : "Next"}
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
                            <Ordersummary progressbar={progressbar} service="" userPlanId={userPlanId} />
                            <Whitebox />
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
