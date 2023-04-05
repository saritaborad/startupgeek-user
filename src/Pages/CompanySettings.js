import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Edit from "../Images/edit-icon.svg";
import Profile from "../Images/profile.png";
import Profile2 from "../Images/mastercard.svg";
import Contact from "../Images/location-icon.svg";
import Users from "../Images/users-icon.svg";
import Add2 from "../Images/add-icon2.svg";
import Add from "../Images/add-icon.svg";
import Payment from "../Images/payment-icon.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import { Collapse, Tabs, Tab } from "react-bootstrap";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import moment from "moment";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { errorContainer, formAttr } from "../const";
import { useAllCountry, useAllState } from "../Hooks/CustomHook";

function CompanySettings() {
    const allState = useAllState();
    const country = useAllCountry();
    const context = useContext(AuthContext);
    const location = useLocation();
    const cardRef = useRef();
    const infoRef = useRef();
    const [open, setOpenPayment] = useState({ editbutton: false, addbutton: false });
    const [editCard, setEditCard] = useState("");
    const [cards, setCards] = useState([]);
    const [img, setImg] = useState("");
    const [enable, setEnable] = useState(true);
    const [edit, setEdit] = useState(false);
    const [active, setActive] = useState("");
    const [viewcompanyid, setviewcompanyid] = useState("");
    const [contact, setcontact] = useState("");
    const [billInfo, setBillInfo] = useState("");
    const [companyUser, setCompanyUser] = useState("");

    let tab = location?.state?.tab ? location?.state?.tab : "company";

    useEffect(() => {
        if (context.viewCompanyId) {
            setviewcompanyid(context.viewCompanyId);
            getCompanyDetail(context.viewCompanyId);
            getCompanyUser(context.viewCompanyId);
            getBillInfo(context.viewCompanyId);
        }
    }, [context.viewCompanyId]);

    useEffect(() => {
        getUsersCard();
        setActive(active ? active : tab);

        if (location?.state?.contact) {
            setcontact(location?.state?.contact);
            context.setContactInfo(location?.state?.contact);
        }
    }, [location?.state?.contact]);

    const getCompanyDetail = (id) => {
        const getDetail = new Promise((resolve) => resolve(PostApi(API_PATH.getCompanyAllDetail, { company_id: id })));
        getDetail.then((res) => {
            if (res.status === 200) {
                setcontact(res.data.data[0]?.contact);
                context.setContactInfo(res.data.data[0]?.contact);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const submitBillingInfo = (formData, resetForm) => {
        formData.month = formData.expiry_date?.split("-")?.[1];
        formData.year = formData.expiry_date?.split("-")?.[0];
        let path = open.editbutton ? API_PATH.getUsersCard : API_PATH.addCardDetail;
        const addCard = new Promise((resolve) => resolve(PostApi(path, formData)));
        addCard.then((res) => {
            if (res.status === 200) {
                let data = { street_address: formData.street_address, country: formData.country, city: formData.city, state: formData.state, zip_code: formData.zip_code };
                const addBill = new Promise((resolve) => resolve(PostApi(API_PATH.addBilling, data)));
                addBill.then((res) => {
                    if (res.status === 200) {
                        resetForm(formData);
                        toast.success(res.data.message);
                        setEnable(true);
                        setOpenPayment({ ...open, editbutton: false, addbutton: false });
                        getUsersCard();
                    }
                });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getUsersCard = () => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getUsersCard, { status: 1 }))).then((res) => {
            if (res.status === 200) {
                setCards(res.data.data);
                context.setDefaultCard(res.data.data?.[0]);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getCompanyUser = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getCompanyUser, { companyid: id }))).then((res) => {
            if (res.status === 200) {
                setCompanyUser(res.data.data.data);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getBillInfo = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getBillInfoByCompany, { company_Id: id }))).then((res) => {
            if (res.status === 200) {
                setBillInfo(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const submitFormData = (formData) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.contactUpdate, formData))).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                setEdit(false);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const handleFileChange = (file) => {
        const data = new FormData();
        data.append("images", file);
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.uploadImg, data, "image"))).then((res) => {
            if (res.status === 200) {
                setImg(res.data.data.img[0]);
                infoRef.current.setFieldValue("profile_img", res.data.data.img[0]);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="comn-title-info">
                                <h1>Settings</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="custom-tabs-border">
                                <Tabs defaultActiveKey={active ? active : tab} id="settings" className="mb-3" onSelect={(e) => setActive(e)}>
                                    <Tab eventKey="company" title="Company Profile">
                                        <div className="mb-4">
                                            <div className="white-box-main">
                                                <div className="box-hdr-top d-flex align-items-center">
                                                    <span className="d-flex align-items-center">
                                                        <img src={Contact} className="pe-2" alt="" />
                                                        Contact Info
                                                    </span>
                                                    <div className="ms-auto">
                                                        <button onClick={() => setEdit(true)} aria-controls="contact-info" aria-expanded={edit} type="button" className="border-0 p-0 bg-transparent btn-hide-show">
                                                            <img src={Edit} alt="" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="stsg-box-list d-flex align-items-center stsg-box-list-text position-relative">
                                                        <span className="d-block">
                                                            <img src={img ? img : contact?.profile_img ? contact?.profile_img : Profile} alt="profile" />
                                                        </span>
                                                        {edit && (
                                                            <div className="camera-bg">
                                                                <label id="img">
                                                                    <input type="file" className="d-none hide-input" accept="image/*" name="profile_img" id="img" onChange={(e) => handleFileChange(e.target.files[0])} />
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 16 16" className="camera-posi bi bi-camera mb-1">
                                                                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                                                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                                    </svg>
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <Formik
                                                    innerRef={infoRef}
                                                    enableReinitialize
                                                    initialValues={{
                                                        _id: contact?._id,
                                                        profile_img: contact?.profile_img ? contact?.profile_img : Profile,
                                                        street_address: contact?.street_address ? contact?.street_address : "",
                                                        city: contact?.city ? contact?.city : "",
                                                        state: contact?.state ? contact?.state : "",
                                                        zip_code: contact?.zip_code ? contact?.zip_code : "",
                                                    }}
                                                    validationSchema={Yup.object({
                                                        street_address: Yup.string().required("Address contact is required."),
                                                        city: Yup.string().required("City is required."),
                                                        state: Yup.string().required("State is required."),
                                                        zip_code: Yup.number().required("zip_code is required.").typeError("Zip code should be number"),
                                                    })}
                                                    onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                                                >
                                                    {(runform) => (
                                                        <form className="row" onSubmit={runform.handleSubmit}>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="lbl-comn-info">Contact Address</label>
                                                                <input type="text" name="street_address" {...formAttr(runform, "street_address")} className="form-control input-style" placeholder="" disabled={!edit} />
                                                                {errorContainer(runform, "street_address")}
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="lbl-comn-info">City</label>
                                                                <input type="text" name="city" {...formAttr(runform, "city")} className="form-control input-style" placeholder="" disabled={!edit} />
                                                                {errorContainer(runform, "city")}
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="lbl-comn-info">State</label>
                                                                <select className="form-select input-style" name="state" {...formAttr(runform, "state")} disabled={!edit}>
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
                                                            <div className="col-md-6 mb-3">
                                                                <label className="lbl-comn-info">Zip Code</label>
                                                                <input type="tel" name="zip_code" {...formAttr(runform, "zip_code")} maxLength={5} className="form-control input-style" placeholder="" disabled={!edit} />
                                                                {errorContainer(runform, "zip_code")}
                                                            </div>
                                                            <Collapse in={edit}>
                                                                <div id="contact-info" className="col-12 text-md-end text-center">
                                                                    <button type="submit" className="btn-comn-all">
                                                                        Save
                                                                    </button>
                                                                    <button onClick={() => setEdit(false)} type="button" className="btn-comn-all3 ms-3">
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </Collapse>
                                                        </form>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="payment" title="Payment Method">
                                        <div>
                                            <div className="white-box-main">
                                                <div className="box-hdr-top d-flex align-items-center">
                                                    <span className="d-flex align-items-center">
                                                        <img src={Payment} className="pe-2" alt="" />
                                                        Payment Info
                                                    </span>
                                                </div>
                                                {cards &&
                                                    cards?.length > 0 &&
                                                    cards?.map((item, i) => {
                                                        return (
                                                            <div className="ms-auto" key={i}>
                                                                <div className="pb-4">
                                                                    <div className="row me-0 align-items-center justify-content-between">
                                                                        <div className="col-lg-4 pe-0 text-start">
                                                                            <div className="stsg-box-list d-flex align-items-center stsg-box-list-text stsg-box-list-profile">
                                                                                <span className="d-block">
                                                                                    <img src={Profile2} alt="profile" />
                                                                                </span>
                                                                                <div className="stsg-box-list-text ps-3">
                                                                                    <bdi className="d-block">XXXX XXXX {item?.Card_Number?.toString()?.slice(12)}</bdi>
                                                                                    <p className="mb-0">{item?.HolderName}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4 pe-0 text-center">
                                                                            <div className="stsg-box-list">
                                                                                <div className="stsg-box-list-text">
                                                                                    <bdi className="d-inline-block">Expiration:</bdi>
                                                                                    <p className="mb-0 d-inline-block">{moment(item?.expiry_date)?.format("MMM YYYY")}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2 text-end">
                                                                            <button
                                                                                type="button"
                                                                                className="border-0 p-0 bg-transparent edit-btn"
                                                                                onClick={() => {
                                                                                    setOpenPayment({ ...open, editbutton: true, addbutton: false });
                                                                                    setEditCard(item);
                                                                                }}
                                                                                aria-controls="Editcard"
                                                                                aria-expanded={open.editbutton}
                                                                            >
                                                                                <img src={Edit} alt="" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                <button onClick={() => setOpenPayment({ ...open, addbutton: true, editbutton: false })} aria-controls="Newcard" aria-expanded={open.addbutton} type="button" className="btn-hide-show btn-comn-all d-inline-flex align-items-center mt-3">
                                                    <img src={Add2} className="pe-2" alt="" />
                                                    Add New Card
                                                </button>
                                            </div>
                                            <Collapse in={open.editbutton ? open.editbutton : open.addbutton}>
                                                <div id="Newcard">
                                                    <div className="comn-title-info">
                                                        <h1>{open.editbutton ? "Edit Card Detail" : "Add New Card"}</h1>
                                                    </div>
                                                    <div className="white-box-main">
                                                        <Formik
                                                            innerRef={cardRef}
                                                            enableReinitialize={enable}
                                                            initialValues={{
                                                                cardId: open.editbutton && editCard._id,
                                                                status: open.editbutton && 2,
                                                                HolderName: open.editbutton && editCard?.HolderName ? editCard?.HolderName : "",
                                                                Card_Number: open.editbutton && editCard.Card_Number ? editCard.Card_Number : "",
                                                                expiry_date: open.editbutton && editCard.expiry_date ? moment(editCard.expiry_date)?.format("YYYY-MM") : "",
                                                                CVV: open.editbutton && editCard.CVV ? editCard.CVV : "",

                                                                street_address: open.editbutton && billInfo?.street_address ? billInfo?.street_address : "",
                                                                country: open.editbutton && billInfo?.country ? billInfo?.country : "US",
                                                                city: open.editbutton && billInfo?.city ? billInfo?.city : "",
                                                                state: open.editbutton && billInfo?.state ? billInfo?.state : "",
                                                                zip_code: open.editbutton && billInfo?.zip_code ? billInfo?.zip_code : "",
                                                                startDate: Date.now(),
                                                            }}
                                                            validationSchema={Yup.object({
                                                                HolderName: Yup.string().required("Card holder name is required."),
                                                                Card_Number: Yup.number().required("Card number is required.").typeError("CVV should be number"),
                                                                expiry_date: Yup.date().required("Expiry date is required.").min(Yup.ref("startDate"), "Invalid expiry month or year"),
                                                                CVV: Yup.number().min(3, "CVV should be minimim 3 digit").required("CVV is required.").typeError("CVV should be number"),
                                                                country: Yup.string().required("Country is required."),
                                                                street_address: Yup.string().required("Street is required."),
                                                                city: Yup.string().required("City is required."),
                                                                state: Yup.string().required("State is required."),
                                                                zip_code: Yup.number().required("Zip code is required.").typeError("Zip code should be number"),
                                                            })}
                                                            onSubmit={(formData, { resetForm }) => submitBillingInfo(formData, resetForm)}
                                                        >
                                                            {(runform) => (
                                                                <form onSubmit={runform.handleSubmit}>
                                                                    <div>
                                                                        <div className="box-hdr-top border-0 m-0">
                                                                            <span>Credit card</span>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-4 mb-3">
                                                                                <label className="lbl-comn-info">Cardholder Name</label>
                                                                                <input type="text" name="HolderName" {...formAttr(runform, "HolderName")} className="form-control input-style" placeholder="" />
                                                                                {errorContainer(runform, "HolderName")}
                                                                            </div>
                                                                            <div className="col-md-4 mb-3">
                                                                                <label className="lbl-comn-info">Card Number</label>
                                                                                <input type="tel" name="Card_Number" {...formAttr(runform, "Card_Number")} maxLength="16" className="form-control input-style" placeholder="" />
                                                                                {errorContainer(runform, "Card_Number")}
                                                                            </div>
                                                                            <div className="col-md-8 mb-3">
                                                                                <div className="row">
                                                                                    <div className="col-md-6 mb-3">
                                                                                        <label className="lbl-comn-info">Expiration Date</label>
                                                                                        <input type="month" className="form-control input-style" name="expiry_date" min={moment(Date.now()).format("YYYY-MM")} {...formAttr(runform, "expiry_date")} />
                                                                                        {errorContainer(runform, "expiry_date")}
                                                                                    </div>
                                                                                    <div className="col-md-3 mb-3">
                                                                                        <label className="lbl-comn-info">CCV</label>
                                                                                        <input type="password" name="CVV" {...formAttr(runform, "CVV")} className="form-control input-style" minLength="3" maxLength="4" placeholder="" />
                                                                                        {errorContainer(runform, "CVV")}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="box-hdr-top border-0 m-0">
                                                                            <span>Billing Address</span>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-4 mb-3">
                                                                                <label className="lbl-comn-info">Country</label>
                                                                                <select className="form-select input-style" name="country" value="US" {...formAttr(runform, "country")}>
                                                                                    <option defaultValue="">--- Country ---</option>
                                                                                    {country?.length > 0 &&
                                                                                        country?.map((item, i) => {
                                                                                            return (
                                                                                                <option key={i} value={item.isoCode} id={item.name} selected disabled>
                                                                                                    {item.name}
                                                                                                </option>
                                                                                            );
                                                                                        })}
                                                                                </select>
                                                                                {errorContainer(runform, "country")}
                                                                            </div>
                                                                            <div className="col-md-4 mb-3">
                                                                                <label className="lbl-comn-info">Street Address</label>
                                                                                <input type="text" name="street_address" {...formAttr(runform, "street_address")} className="form-control input-style" placeholder="" />
                                                                                {errorContainer(runform, "street_address")}
                                                                            </div>
                                                                            <div className="col-md-4 mb-3">
                                                                                <label className="lbl-comn-info">State</label>
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
                                                                            <div className="col-md-4 mb-3">
                                                                                <label className="lbl-comn-info">City</label>
                                                                                <input type="tel" name="city" {...formAttr(runform, "city")} className="form-control input-style" placeholder="" />
                                                                                {errorContainer(runform, "city")}
                                                                            </div>
                                                                            <div className="col-md-4 mb-3">
                                                                                <label className="lbl-comn-info">Zip Code</label>
                                                                                <input type="tel" name="zip_code" {...formAttr(runform, "zip_code")} maxLength={5} className="form-control input-style" placeholder="" />
                                                                                {errorContainer(runform, "zip_code")}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 text-md-end text-center">
                                                                        <button type="submit" className="btn-comn-all">
                                                                            {open.editbutton ? "Save" : "Add"}
                                                                        </button>
                                                                        <button onClick={() => (open.editbutton ? setOpenPayment({ ...open, editbutton: false }) : setOpenPayment({ ...open, addbutton: false }))} type="button" className="btn-comn-all3 ms-3">
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            )}
                                                        </Formik>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </Tab>
                                </Tabs>
                                {active === "company" && viewcompanyid ? (
                                    <div className="">
                                        <div className="white-box-main">
                                            <div className="box-hdr-top d-flex align-items-center">
                                                {/* <span className="d-flex align-items-center">
                                                    <img src={Users} className="pe-2" alt="" />
                                                    Manage Access
                                                </span> */}
                                                <div className="ms-auto">
                                                    <Link to="/add-new-user" state={{ contact: contact, viewCompanyId: viewcompanyid }} className="d-inline-block ms-3">
                                                        <span className="d-flex align-items-center">
                                                            <img src={Add} className="pe-2" alt="" />
                                                            Add New User
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                            {companyUser?.length > 0 &&
                                                companyUser?.map((item, i) => {
                                                    return (
                                                        <div className="list-compny-setings mb-3">
                                                            <div className="row me-0 align-items-center mt-3" key={i}>
                                                                <div className="col-sm-5 pe-0">
                                                                    <div className="stsg-box-list d-flex align-items-center stsg-box-list-text">
                                                                        <span className="d-block">
                                                                            <img src={item?.profile_img ? item?.profile_img : Profile} alt="profile" />
                                                                        </span>
                                                                        <div className="stsg-box-list-text ps-3">
                                                                            <bdi className="d-block">{item?.fname + " " + item?.lname}</bdi>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 pe-0">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="stsg-box-list">
                                                                            <div className="stsg-box-list-text">
                                                                                <bdi className="d-block">phone</bdi>
                                                                                <p className="mb-0">{item?.phone}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-3 pe-0">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="stsg-box-list">
                                                                            <div className="stsg-box-list-text">
                                                                                <bdi className="d-block">Email Address</bdi>
                                                                                <p className="mb-0">{item?.email}</p>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="ms-auto">
                                                                            <div className="stsg-box-list text-end">
                                                                                <Link to="/add-new-user" state={{ edit: true, user: item }}>
                                                                                    <img src={Edit} alt="" />
                                                                                </Link>
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CompanySettings;
