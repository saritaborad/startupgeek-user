import React, { useEffect, useRef, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Formik } from "formik";
import * as Yup from "yup";
import { Collapse } from "react-bootstrap";
import { PostApi } from "../ApiService";
import { API_PATH, handleContactChecked } from "../const";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Whitebox from "./Common/WhiteBox";
import { errorContainer, formAttr } from "../const";
import { useAllState, useStartCompanyInfo } from "../Hooks/CustomHook";
import { ContactCheckBox } from "../Components/ContactCheckBox";
import { Ordersummary } from "./Common/OrderSummary";
import InputMask from "react-input-mask";

export default function StartACompanyShareholder() {
    const navigate = useNavigate();
    const form2Ref = useRef();
    const holderRef = useRef([]);
    const existHoderRef = useRef([]);
    const location = useLocation();

    const states = useAllState();
    const [existHolder, setExistHolder] = useState([]);
    const [open1, setOpenEdit1] = useState({ detailopen: true, editdetail: false, index: "" });
    const [shareholder, setShareHolder] = useState([]);
    const [otherData, setOtherData] = useState([]);
    const companyInfo = useStartCompanyInfo(location.state?.company_Id);
    const [userPlanId, setuserPlanId] = useState("");
    const [company_Id, setcompany_Id] = useState("");
    const [contactId, setcontactId] = useState("");
    const [contactInfo, setcontactInfo] = useState("");
    const [shareholders_no, setShareHolderNo] = useState(1);
    const [previousLocation, setPreviousLocation] = useState(null);
    const progressbar = { width: "40%", ariavaluenow: "40", ariavaluemin: "0", ariavaluemax: "100" };

    useEffect(() => {
        if (location?.state?.company_Id !== undefined && location?.state?.userPlanId !== undefined) {
            setcompany_Id(location.state.company_Id);
            setuserPlanId(location.state.userPlanId);
            getShareHolder(location.state.company_Id, location?.state?.shareholders_no);
        } else {
            navigate("/start-company-business");
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
            getContact(location.state.contactId);
        }
        if (location?.state?.shareholders_no) {
            setShareHolderNo(location.state.shareholders_no);
        }
    }, [location?.state?.company_Id, location?.state?.userPlanId, location?.state?.contactId, location?.state?.shareholders_no]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const getShareHolder = (id, shareholdersNo) => {
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.getShareHolderByCompany, { company_Id: id }))).then((res) => {
            if (res.status === 200) {
                setExistHolder(res.data.data?.shareholders ? res.data.data?.shareholders : []);
                setShareHolderNo(shareholdersNo ? shareholdersNo : res.data.data?.shareholders?.length);
                setOtherData(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const submitFormData = (formData) => {
        let data = {
            userPlanId: userPlanId,
            company_Id: company_Id,
            representative_name: formData.fname + " " + formData?.lname,
            phone: formData.phone,
            shareholders: existHolder?.length > 0 ? existHolder.map(({ id, ...rest }) => rest) : shareholder.map(({ id, ...rest }) => rest),
        };
        new Promise((resolve) => resolve(PostApi(API_PATH.addShareHolderData, data))).then((res) => {
            if (res.status === 200) {
                setPreviousLocation(location.pathname);
                setShareHolder([]);
                location.state?.shareholder === "update" ? navigate("/start-company-review-order", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } }) : navigate("/start-company-registered-agent", { state: { type: "director", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } });
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

    const handleSelectShareHolderName = (e, form, i) => {
        let val = location.state?.directorList?.filter((item) => item._id === e.target.value);
        if (val?.length > 0) {
            form.setValues({ ...val[0], ssn: "", no_of_shares: 0 });
        }
    };

    const goPrevious = () => {
        navigate("/start-company-director", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, previousLocation: previousLocation } });
    };
    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="start-cmn-top">
                                Please provide Shareholder Information for
                                <span>
                                    {companyInfo?.Cname} <span className="m-1">{companyInfo?.entity_type}</span>
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="mb-3">
                                {existHolder &&
                                    existHolder?.length < parseInt(shareholders_no) &&
                                    [...Array(parseInt(shareholders_no) - existHolder?.length)].map((e, i) => {
                                        return (
                                            <div className="white-box-main mb-3">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="recommendations-info d-flex">
                                                            <h2 className="position-relative">Shareholder {i + 1}</h2>
                                                            <div className="ms-auto">
                                                                <button className="icon-btn-class btn-hide-show" type="button" onClick={() => setOpenEdit1({ ...open1, editdetail: true, detailopen: false, index: i })} aria-expanded={open1.editdetail && open1.index === i} aria-controls="EditDetail">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <Collapse in={open1.detailopen}>
                                                            <div className="dir-detail-comn">
                                                                {/* <span className="d-block">John Deo</span>
                                <bdi className="d-block">
                                  SSN: <bdi>078-06-1120</bdi>
                                </bdi>
                                <bdi className="d-block">
                                  No. Of Shares: <span>604</span>
                                </bdi>
                                <bdi className="d-block">50, Avenue, Rk Road, New York, New York 10001</bdi> */}
                                                            </div>
                                                        </Collapse>
                                                        <Collapse in={open1.editdetail && open1.index === i}>
                                                            <div id="EditDetail">
                                                                <Formik
                                                                    innerRef={(el) => (holderRef.current[i] = el)}
                                                                    enableReinitialize
                                                                    initialValues={{
                                                                        id: `holder${i}`,
                                                                        fname: "",
                                                                        lname: "",
                                                                        street_address: "",
                                                                        address: "",
                                                                        city: "",
                                                                        state: "",
                                                                        zip_code: "",
                                                                        ssn: "",
                                                                        no_of_shares: "",
                                                                    }}
                                                                    validationSchema={Yup.object({
                                                                        fname: Yup.string().required("First name is required."),
                                                                        lname: Yup.string().required("Last name is required."),
                                                                        street_address: Yup.string().required("Street Address is required."),
                                                                        city: Yup.string().required("City Name is required."),
                                                                        state: Yup.string().required("State is required."),
                                                                        zip_code: Yup.number().required("zip_code is required.").typeError("Zip code sholud be number."),
                                                                        ssn: Yup.string().required("SSN is required.").matches("^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$", "Invalid SSN Number"),
                                                                        no_of_shares: Yup.string().required("please Enter No. of Shares."),
                                                                    })}
                                                                    onSubmit={(formData, { resetForm }) => {
                                                                        let index = shareholder?.length > 0 ? shareholder.findIndex((item) => item?.id === formData.id) : -1;
                                                                        if (shareholder?.length > 0 && index !== -1) {
                                                                            setShareHolder((shareholder[index] = formData));
                                                                        }
                                                                        setShareHolder(index === -1 ? [...shareholder, formData] : [...shareholder]);
                                                                        setOpenEdit1({ ...open1, editdetail: false, detailopen: true, index: i });
                                                                    }}
                                                                >
                                                                    {(runform) => (
                                                                        <form className="row" onSubmit={runform.handleSubmit}>
                                                                            <div className="col-12 mb-3">
                                                                                <label className="lbl-comn-info">Shareholder</label>
                                                                                <select className="form-select input-style" onChange={(e) => handleSelectShareHolderName(e, runform, i)}>
                                                                                    <option>Select Shareholder</option>
                                                                                    {location.state?.directorList?.length > 0 &&
                                                                                        location.state?.directorList.map((item, i) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <option key={i} value={item._id} id={item._id} selected>
                                                                                                        {item.fname} {item.lname}
                                                                                                    </option>
                                                                                                </>
                                                                                            );
                                                                                        })}
                                                                                </select>
                                                                            </div>
                                                                            {ContactCheckBox(contactInfo, holderRef.current[i], "address")}
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">First Name</label>
                                                                                <input type="text" className="form-control input-style" name="fname" {...formAttr(runform, "fname")} />
                                                                                {errorContainer(runform, "fname")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">Last Name</label>
                                                                                <input type="text" className="form-control input-style" name="lname" {...formAttr(runform, "lname")} />
                                                                                {errorContainer(runform, "lname")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">Street Address</label>
                                                                                <input type="text" className="form-control input-style" name="street_address" {...formAttr(runform, "street_address")} />
                                                                                {errorContainer(runform, "street_address")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">Address (Cont)</label>
                                                                                <input type="text" className="form-control input-style" name="address" {...formAttr(runform, "address")} />
                                                                                {errorContainer(runform, "address")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">City</label>
                                                                                <input type="text" className="form-control input-style" name="city" {...formAttr(runform, "city")} />
                                                                                {errorContainer(runform, "city")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">Select state</label>
                                                                                <select className="form-select input-style" name="state" {...formAttr(runform, "state")}>
                                                                                    <option defaultValue="">--- state ---</option>
                                                                                    {states?.length > 0 &&
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
                                                                                <label className="lbl-comn-info">Zip Code</label>
                                                                                <input type="number" className="form-control input-style" name="zip_code" {...formAttr(runform, "zip_code")} />
                                                                                {errorContainer(runform, "zip_code")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">SSN</label>
                                                                                <InputMask placeholder="856-48-8989" mask="999-99-9999" name="ssn" className="form-control input-style" onChange={(e) => runform.setFieldValue("ssn", e.target.value)} {...formAttr(runform, "ssn")} />
                                                                                {errorContainer(runform, "ssn")}
                                                                            </div>
                                                                            <div className="col-12 mb-3">
                                                                                <label className="lbl-comn-info">No. Of Shares</label>
                                                                                <input type="number" className="form-control input-style" name="no_of_shares" {...formAttr(runform, "no_of_shares")} />
                                                                                {errorContainer(runform, "no_of_shares")}
                                                                            </div>
                                                                            <div className="col-12">
                                                                                <div className="text-end">
                                                                                    <button className="btn-comn-all btn-after-class" type="submit">
                                                                                        Save
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    )}
                                                                </Formik>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                {existHolder &&
                                    existHolder?.length > 0 &&
                                    existHolder.map((item, i) => {
                                        return (
                                            <div className="white-box-main mb-3" key={parseInt(shareholders_no) - existHolder?.length + i + 1}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="recommendations-info d-flex">
                                                            <h2 className="position-relative">Shareholder {parseInt(shareholders_no) - existHolder?.length + i + 1}</h2>
                                                            <div className="ms-auto">
                                                                <button className="icon-btn-class btn-hide-show" type="button" onClick={() => setOpenEdit1({ ...open1, editdetail: true, detailopen: false, index: parseInt(shareholders_no) - existHolder?.length + i + 1 })} aria-expanded={open1.editdetail && open1.index === parseInt(shareholders_no) - existHolder?.length + i + 1} aria-controls="EditDetail">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <Collapse in={open1.detailopen}>
                                                            <div className="dir-detail-comn">
                                                                <span className="d-block">{item?.fname + " " + item?.lname}</span>
                                                                <bdi className="d-block">
                                                                    SSN: <bdi>{item?.ssn}</bdi>
                                                                </bdi>
                                                                <bdi className="d-block">
                                                                    No. Of Shares: <span>{item?.no_of_shares}</span>
                                                                </bdi>
                                                                <bdi className="d-block">{item?.street_address + "," + item?.zip_code}</bdi>
                                                            </div>
                                                        </Collapse>
                                                        <Collapse in={open1.editdetail && open1.index === parseInt(shareholders_no) - existHolder?.length + i + 1}>
                                                            <div id="EditDetail">
                                                                <Formik
                                                                    innerRef={(el) => (existHoderRef.current[i] = el)}
                                                                    enableReinitialize
                                                                    initialValues={{
                                                                        _id: item?._id,
                                                                        id: `holder${parseInt(shareholders_no) - existHolder?.length + i + 1}`,
                                                                        fname: item?.fname,
                                                                        lname: item?.lname,
                                                                        street_address: item?.street_address,
                                                                        address: item?.address ? item?.address : "",
                                                                        city: item?.city,
                                                                        state: item?.state,
                                                                        zip_code: item?.zip_code,
                                                                        ssn: item?.ssn,
                                                                        no_of_shares: item?.no_of_shares,
                                                                    }}
                                                                    validationSchema={Yup.object({
                                                                        fname: Yup.string().required("First name is required."),
                                                                        lname: Yup.string().required("Last name is required."),
                                                                        street_address: Yup.string().required("Street Address is required."),
                                                                        city: Yup.string().required("City Name is required."),
                                                                        zip_code: Yup.number().required("zip_code is required.").typeError("Zip code should be number."),
                                                                        no_of_shares: Yup.string().required("Please Enter No. of Shares."),
                                                                        ssn: Yup.string().required("SSN is required.").matches("^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$", "Invalid SSN Number"),
                                                                    })}
                                                                    onSubmit={(formData, { resetForm }) => {
                                                                        let index = existHolder?.length > 0 ? existHolder.findIndex((item) => item?.id === formData.id || item?._id === formData?._id) : -1;
                                                                        if (existHolder?.length > 0 && index !== -1) {
                                                                            setExistHolder((existHolder[index] = formData));
                                                                        }
                                                                        setExistHolder(index === -1 ? [...existHolder, formData] : [...existHolder]);
                                                                        setOpenEdit1({ ...open1, editdetail: false, detailopen: true, index: parseInt(shareholders_no) - existHolder?.length + i + 1 });
                                                                    }}
                                                                >
                                                                    {(runform) => (
                                                                        <form className="row" onSubmit={runform.handleSubmit}>
                                                                            <div className="col-12 mb-3">
                                                                                <label className="lbl-comn-info">Shareholder</label>
                                                                                <select className="form-select input-style" onChange={(e) => handleSelectShareHolderName(e, runform, i)}>
                                                                                    <option>Select Shareholder</option>
                                                                                    {location.state?.directorList?.length > 0 &&
                                                                                        location.state?.directorList?.map((item, i) => {
                                                                                            return (
                                                                                                <option key={i} value={item._id} id={item._id}>
                                                                                                    {item.fname} {item.lname}
                                                                                                </option>
                                                                                            );
                                                                                        })}
                                                                                </select>
                                                                            </div>
                                                                            {ContactCheckBox(contactInfo, existHoderRef.current[parseInt(shareholders_no) - existHolder?.length + i + 1], "address")}
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">First Name</label>
                                                                                <input type="text" className="form-control input-style" name="fname" {...formAttr(runform, "fname")} />
                                                                                {errorContainer(runform, "fname")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">Last Name</label>
                                                                                <input type="text" className="form-control input-style" name="lname" {...formAttr(runform, "lname")} />
                                                                                {errorContainer(runform, "lname")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">Street Address</label>
                                                                                <input type="text" className="form-control input-style" name="street_address" {...formAttr(runform, "street_address")} />
                                                                                {errorContainer(runform, "street_address")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">Address (Cont)</label>
                                                                                <input type="text" className="form-control input-style" name="address" {...formAttr(runform, "address")} />
                                                                                {errorContainer(runform, "address")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">City</label>
                                                                                <input type="text" className="form-control input-style" name="city" {...formAttr(runform, "city")} />
                                                                                {errorContainer(runform, "city")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">Select state</label>
                                                                                <select className="form-select input-style" name="state" {...formAttr(runform, "state")}>
                                                                                    <option defaultValue="">--- state ---</option>
                                                                                    {states?.length > 0 &&
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
                                                                                <label className="lbl-comn-info">Zip Code</label>
                                                                                <input type="tel" className="form-control input-style" maxLength={5} name="zip_code" {...formAttr(runform, "zip_code")} />
                                                                                {errorContainer(runform, "zip_code")}
                                                                            </div>
                                                                            <div className="col-lg-6 mb-3">
                                                                                <label className="lbl-comn-info">SSN</label>
                                                                                <InputMask placeholder="856-48-8989" mask="999-99-9999" name="ssn" className="form-control input-style" onChange={(e) => runform.setFieldValue("ssn", e.target.value)} {...formAttr(runform, "ssn")} />
                                                                                {errorContainer(runform, "ssn")}
                                                                            </div>
                                                                            <div className="col-12 mb-3">
                                                                                <label className="lbl-comn-info">No. Of Shares</label>
                                                                                <input type="number" className="form-control input-style" name="no_of_shares" {...formAttr(runform, "no_of_shares")} />
                                                                                {errorContainer(runform, "no_of_shares")}
                                                                            </div>
                                                                            <div className="col-12">
                                                                                <div className="text-end">
                                                                                    <button className="btn-comn-all btn-after-class" id={`existshare${parseInt(shareholders_no) - existHolder?.length + i + 1}`} type="submit">
                                                                                        Save
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    )}
                                                                </Formik>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div className="white-box-main">
                                    <Formik
                                        innerRef={form2Ref}
                                        enableReinitialize
                                        initialValues={{
                                            fname: otherData?.representative_name?.split(" ")[0],
                                            lname: otherData?.representative_name?.split(" ")[1],
                                            phone: otherData?.phone,
                                        }}
                                        validationSchema={Yup.object({
                                            fname: Yup.string().required("First Name is required."),
                                            lname: Yup.string().required("Last Name is required."),
                                            phone: Yup.string().required("Phone Number is required."),
                                        })}
                                        onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                                    >
                                        {(runform) => (
                                            <form className="row" onSubmit={runform.handleSubmit}>
                                                <div className="col-12 mb-3">
                                                    <div className="recommendations-info">
                                                        <h2 className="position-relative">Representative Information</h2>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <div className="grey-box-check p-0 d-flex">
                                                        <div className="custom-checkbox position-relative m-3">
                                                            <label className="custom-lbl-part position-static text-secondary">
                                                                <input type="checkbox" id="number" onChange={(e) => handleContactChecked(e, form2Ref.current, contactInfo, ["fname", "lname", "phone"])} />
                                                                <span className="custom-checkbox-class"></span>
                                                                <span className="text-black fw-bold">{contactInfo?.fname + " " + contactInfo?.lname + " "}</span>
                                                                {contactInfo?.phone}
                                                            </label>
                                                        </div>
                                                        <div className="ms-auto side-icon-pay d-flex align-items-center justify-content-center p-3">
                                                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.0629 18.3399H15.9513C3.05602 17.5815 1.22508 6.4536 0.969141 3.05751C0.948519 2.79346 0.979043 2.52784 1.05897 2.27588C1.13889 2.02392 1.26664 1.79056 1.43489 1.58917C1.60315 1.38779 1.80861 1.22234 2.03949 1.1023C2.27038 0.982263 2.52215 0.909999 2.78039 0.889649H6.39633C6.6592 0.889389 6.91608 0.96986 7.13371 1.12064C7.35134 1.27142 7.51969 1.48556 7.61695 1.73532L8.61445 4.24547C8.7105 4.48947 8.73433 4.75695 8.683 5.01469C8.63166 5.27242 8.50742 5.50906 8.3257 5.69519L6.92789 7.13819C7.14624 8.4072 7.74045 9.57698 8.63014 10.4893C9.51982 11.4016 10.662 12.0124 11.9023 12.239L13.3263 10.796C13.5111 10.6122 13.7446 10.4881 13.9979 10.4392C14.2511 10.3903 14.5128 10.4187 14.7504 10.5209L17.2245 11.5343C17.465 11.6369 17.6702 11.8105 17.8139 12.0328C17.9577 12.2551 18.0335 12.5162 18.0316 12.7827V16.3264C18.0316 16.8604 17.8242 17.3726 17.455 17.7502C17.0858 18.1278 16.585 18.3399 16.0629 18.3399ZM2.93789 2.23198C2.76384 2.23198 2.59692 2.30269 2.47385 2.42856C2.35078 2.55443 2.28164 2.72514 2.28164 2.90314V2.95684C2.58352 6.93013 4.51945 16.3264 16.0235 16.9976C16.1097 17.0031 16.1961 16.991 16.2778 16.9623C16.3595 16.9335 16.4348 16.8885 16.4994 16.8299C16.564 16.7713 16.6167 16.7002 16.6544 16.6207C16.6921 16.5412 16.7141 16.4549 16.7191 16.3667V12.7827L14.2451 11.7692L12.3616 13.682L12.0466 13.6418C6.33727 12.9102 5.56289 7.07108 5.56289 7.01067L5.52352 6.68851L7.38727 4.76227L6.40289 2.23198H2.93789Z" fill="#19181F" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <label className="lbl-comn-info">First Name</label>
                                                    <input type="text" className="form-control input-style" name="fname" {...formAttr(runform, "fname")} />
                                                    {errorContainer(runform, "fname")}
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <label className="lbl-comn-info">Last Name</label>
                                                    <input type="text" className="form-control input-style" name="lname" {...formAttr(runform, "lname")} />
                                                    {errorContainer(runform, "lname")}
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <label className="lbl-comn-info">Phone</label>
                                                    <div className="phone-cust-input">
                                                        <PhoneInput placeholder="(201) 555-01234" name="phone" {...formAttr(runform, "phone")} country="us" onChange={(e) => form2Ref?.current?.setFieldValue("phone", e)} />
                                                        {errorContainer(runform, "phone")}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="d-flex align-items-center">
                                                        {!location?.state?.shareholder && (
                                                            <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                                Previous
                                                            </button>
                                                        )}
                                                        <button className=" ms-auto btn-comn-all btn-after-class" type="submit">
                                                            {location.state?.shareholder === "update" ? "Update" : "Next"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
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
