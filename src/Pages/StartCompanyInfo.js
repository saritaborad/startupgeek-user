import React, { useContext, useEffect, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { useLocation, useNavigate } from "react-router-dom";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { errorContainer, formAttr } from "../const";
import { useAllState } from "../Hooks/CustomHook";
import { useRef } from "react";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import { ContactCheckBox } from "../Components/ContactCheckBox";

export default function StartACompanyInfo() {
    const companyRef = useRef();
    let location = useLocation();
    let navigate = useNavigate();
    const states = useAllState();
    const context = useContext(AuthContext);

    const progressbar = { width: "20%", ariavaluenow: "20", ariavaluemin: "0", ariavaluemax: "100" };
    const [naics, setNaics] = useState("");
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [naicsObj, setNaicsObj] = useState("");
    const [designator, setDesignator] = useState("");
    const [cname, setCname] = useState("");
    const [oneCompany, setOneCompany] = useState("");
    const [company_Id, setcompany_Id] = useState("");
    const [contactId, setcontactId] = useState("");
    const [userPlanId, setuserPlanId] = useState("");
    const [contactInfo, setcontactInfo] = useState("");
    const [entity, setentity] = useState("LLC");
    const [previousLocation, setPreviousLocation] = useState(null);

    useEffect(() => {
        setentity(context.entity);
    }, [context.entity]);

    useEffect(() => {
        if (location.state?.userPlanId !== undefined) {
            setuserPlanId(location.state.userPlanId);
        } else {
            navigate("/start-company-business");
        }
        if (location?.state?.company_Id !== undefined) {
            setcompany_Id(location.state.company_Id);
            getCompanyData(location.state.company_Id);
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
            getContact(location.state.contactId);
        }
    }, [location?.state?.company_Id, location?.state?.userPlanId, location?.state?.contactId]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const getCompanyData = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getCompanyDetail, { company_Id: id }))).then((res) => {
            if (res.status === 200) {
                setOneCompany(res.data.data);
                context.setStartCompany(res.data.data);
                setCname(res.data.data.Cname);
                setDesignator(res.data.data.designator);
                setNaicsObj({ naicsCodes: res.data.data.naicsCodes, naicsCodes_string: res.data.data.naicsCodes_string, naicSubcodes: res.data.data.naicSubcodes, naicSubcodes_string: res.data.data.naicSubcodes_string, fullDescription: res.data.data.naicsfullDescription });
                companyRef.current?.setFieldValue("description", res.data.data.description);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getNaicsCode = (search) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getNaicsCodes, { search }))).then((res) => {
            if (res.status === 200) {
                setNaics(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const submitFormData = (formData) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.addcompany, formData))).then((res) => {
            if (res.status === 200) {
                setPreviousLocation(location.pathname);
                context.setStartCompany(res.data.data);
                context.setCompanyId(res.data.data._id);
                entity !== "LLC" ? navigate(`/start-company-director`, { state: { owner: formData.owners, company_Id: res.data.data._id, shareholders_no: formData.shareholders_no, userPlanId: userPlanId, contactId: contactId } }) : navigate("/start-company-member", { state: { owner: formData.owners, company_Id: res.data.data._id, userPlanId: userPlanId, contactId: contactId } });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const editCompanyData = (formData) => {
        formData._id = company_Id;
        new Promise((resolve) => resolve(PostApi(API_PATH.updateCompanyInfo, formData))).then((res) => {
            if (res.status === 200) {
                setPreviousLocation(location.pathname);
                context.setStartCompany(res.data.data);
                context.setCompanyId(res.data.data._id);
                location.state?.company === "update" ? navigate("/start-company-review-order", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: res.data.data._id } }) : entity !== "LLC" ? navigate(`/start-company-director`, { state: { owner: formData.owners, company_Id: res.data.data._id, shareholders_no: formData.shareholders_no, userPlanId: userPlanId, contactId: contactId } }) : navigate(`/start-company-member`, { state: { owner: formData.owners, company_Id: res.data.data._id, userPlanId: userPlanId, contactId: contactId } });
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

    const handleNaics = ({ naicsCodes, naicsCodes_string, naicSubcodes, naicSubcodes_string, fullDescription }) => {
        companyRef.current?.setFieldValue("description", fullDescription);
        setNaicsObj({ naicsCodes, naicsCodes_string, naicSubcodes, naicSubcodes_string, fullDescription });
        setShow(false);
    };

    const goPrevious = () => {
        navigate("/start-company-contact-info", { state: { contactId: contactId, userPlanId: userPlanId, company_Id: company_Id, entity: entity, previousLocation: previousLocation } });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <Formik
                                    innerRef={companyRef}
                                    enableReinitialize
                                    initialValues={
                                        entity != "LLC"
                                            ? {
                                                  Cname: oneCompany?.Cname ? oneCompany?.Cname : "",
                                                  designator: oneCompany?.designator ? oneCompany?.designator : "",
                                                  industry: oneCompany.industry ? oneCompany.industry : "Incorporated",
                                                  owners: oneCompany.owners ? oneCompany.owners : 1,
                                                  business_purpose: oneCompany.business_purpose ? oneCompany.business_purpose : "",
                                                  description: oneCompany.description ? oneCompany.description : "",
                                                  authorized_no: oneCompany.authorized_no ? oneCompany.authorized_no : "",
                                                  share_value: oneCompany.share_value ? oneCompany.share_value : "",
                                                  shareholders_no: oneCompany.shareholders_no ? oneCompany.shareholders_no : 1,
                                                  street_address: oneCompany.street_address ? oneCompany.street_address : "",
                                                  address: oneCompany.address ? oneCompany.address : "",
                                                  city: oneCompany.city ? oneCompany.city : "",
                                                  state: oneCompany?.state ? oneCompany?.state : "",
                                                  zip_code: oneCompany.zip_code ? oneCompany.zip_code : "",
                                              }
                                            : {
                                                  Cname: oneCompany?.Cname ? oneCompany?.Cname : "",
                                                  designator: oneCompany?.designator ? oneCompany?.designator : "",
                                                  owners: oneCompany.owners ? oneCompany.owners : 1,
                                                  business_purpose: oneCompany.business_purpose ? oneCompany.business_purpose : "",
                                                  description: oneCompany.description ? oneCompany.description : "",
                                              }
                                    }
                                    validationSchema={
                                        entity != "LLC"
                                            ? Yup.object({
                                                  Cname: Yup.string().required("name is required."),
                                                  designator: Yup.string().required("designator is required."),
                                                  industry: Yup.string().required("industry is required."),
                                                  owners: Yup.string().required("owners is required."),
                                                  business_purpose: Yup.string().required("business purpose is required."),
                                                  description: Yup.string().required("description is required."),
                                                  authorized_no: Yup.string().required("authorized no is required."),
                                                  share_value: Yup.string().required("share value is required."),
                                                  shareholders_no: Yup.string().required("shareholders no is required."),
                                                  street_address: Yup.string().required("street address is required."),
                                                  city: Yup.string().required("city is required."),
                                                  state: Yup.string().required("state is required."),
                                                  zip_code: Yup.number().required("zip_code is required.").typeError("Zip code should be number"),
                                              })
                                            : Yup.object({
                                                  Cname: Yup.string().required("Name is required."),
                                                  designator: Yup.string().required("designator is required."),
                                                  owners: Yup.string().required("owners is required."),
                                                  business_purpose: Yup.string().required("business purpose is required."),
                                                  description: Yup.string().required("description is required."),
                                              })
                                    }
                                    onSubmit={(formData, { resetForm }) => {
                                        formData.entity_type = entity;
                                        formData.naicsCode = naicsObj?.naicsCodes;
                                        formData.naicsSubCode = naicsObj?.naicSubcodes;
                                        formData.naicsCodes_string = naicsObj?.naicsCodes_string;
                                        formData.naicSubcodes_string = naicsObj?.naicSubcodes_string;
                                        formData.naicsfullDescription = naicsObj?.fullDescription;
                                        formData.userPlanId = userPlanId;
                                        formData.Cname = cname;
                                        formData.designator = designator;
                                        if (company_Id) {
                                            editCompanyData(formData, resetForm);
                                        } else {
                                            submitFormData(formData, resetForm);
                                        }
                                    }}
                                >
                                    {(runform) => (
                                        <form onSubmit={runform.handleSubmit}>
                                            <div className="white-box-main">
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <div className="recommendations-info">
                                                            <h2 className="position-relative">Company Information</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">{entity} Name</label>
                                                        <input type="text" name="Cname" onChangeCapture={(e) => setCname(e.target.value?.toUpperCase())} {...formAttr(runform, "Cname")} onBlurCapture={() => runform.setFieldValue("Cname", runform.values?.Cname?.toUpperCase())} className="form-control input-style" />
                                                        {errorContainer(runform, "Cname")}
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">Designator</label>
                                                        <select className="form-select input-style" {...formAttr(runform, "designator")} onChangeCapture={(e) => setDesignator(e.target.value)} name="designator">
                                                            <option defaultValue="">Select Designator</option>
                                                            {entity != "LLC" ? (
                                                                <>
                                                                    <option value="company">Company </option>
                                                                    <option value="corporation">Corporation </option>
                                                                    <option value="corp">Corp </option>
                                                                    <option value="inc">Inc </option>
                                                                    <option value="limited">Limited </option>
                                                                    <option value="ltd">Ltd </option>
                                                                    <option value="co.">Co.</option>
                                                                    <option value="incorporated">Incorporated </option>
                                                                    <option value="corp."> Corp. </option>
                                                                    <option value="inc.">Inc. </option>
                                                                    <option value="ltd.">Ltd. </option>
                                                                    <option value="co.">Co. </option>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <option value="LLC">LLC </option>
                                                                    <option value="L.L.C">L.L.C </option>
                                                                    <option value="limited liability co.">Limited Liability Co. </option>
                                                                    <option value="limited liability company">Limited Liability Company </option>
                                                                    <option value="ltd. liability company">LTD.Liability Company </option>
                                                                </>
                                                            )}
                                                        </select>
                                                        {errorContainer(runform, "designator")}
                                                    </div>
                                                    {cname != "" && designator != "" && (
                                                        <div className="col-12 mb-3">
                                                            <div className="col-lg-6">
                                                                <label className="lbl-comn-info">Your Official Company Name Will Display As</label>
                                                                <div className="name-preview">
                                                                    {cname} <span className="m-1">{designator}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {entity != "LLC" && (
                                                        <div className="col-lg-6 mb-3">
                                                            <label className="lbl-comn-info">Business Type / Industry</label>
                                                            <select className="form-select input-style" {...formAttr(runform, "industry")} name="industry">
                                                                <option defaultValue>Select Business Type / Industry</option>
                                                                <option value="Incorporated">Incorporated</option>
                                                                <option value="Corporated">Corporated</option>
                                                                <option value="Inc">Inc</option>
                                                            </select>
                                                        </div>
                                                    )}
                                                    {errorContainer(runform, "industry")}
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="lbl-comn-info">No. Of Directors/Owners</label>
                                                        <select className="form-select input-style" {...formAttr(runform, "owners")} name="owners">
                                                            <option defaultValue>Select Designator No. Of Directors</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                        </select>
                                                        {errorContainer(runform, "owners")}
                                                    </div>
                                                    <div className="col-12 mb-3">
                                                        <label className="lbl-comn-info">Business Purpose {runform.values?.business_purpose === "" ? "(You Have 100 Characters Left!)" : `(${runform.values.business_purpose?.length}/100)`}</label>
                                                        <textarea className="form-control input-style h-auto" maxLength={100} rows="6" type="textarea" name="business_purpose" placeholder="Please provide the brief  decription  of business purpose" {...formAttr(runform, "business_purpose")} />
                                                        {errorContainer(runform, "business_purpose")}
                                                    </div>
                                                    <div className="col-12 mb-3 position-relative">
                                                        <label className="lbl-comn-info">Enter Keywords For Your Business</label>
                                                        <input
                                                            type="text"
                                                            className="form-control input-style"
                                                            {...formAttr(runform, "description")}
                                                            name="description"
                                                            placeholder="Please provide the brief decription of business purpose"
                                                            onChangeCapture={(e) => {
                                                                getNaicsCode(e.target.value);
                                                                setSearch(e.target.value);
                                                                setShow(true);
                                                            }}
                                                        />
                                                        {search && show && (
                                                            <div>
                                                                <ul className="p-search-drop-d">
                                                                    {naics && naics?.length > 0 ? (
                                                                        naics?.map((item, i) => {
                                                                            return (
                                                                                <li onClick={() => handleNaics(item)} key={i} name="description">
                                                                                    {item?.fullDescription}
                                                                                </li>
                                                                            );
                                                                        })
                                                                    ) : (
                                                                        <li
                                                                            onMouseOut={() => {
                                                                                setShow(false);
                                                                                runform.setFieldValue("description", oneCompany.description ? oneCompany.description : "");
                                                                            }}
                                                                            name="description"
                                                                        >
                                                                            No data found
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}
                                                        {errorContainer(runform, "description")}
                                                        {search && naicsObj && (
                                                            <>
                                                                <p className="comn-p-class my-2">
                                                                    NAICS CODE: {naicsObj?.naicsCodes} - {naicsObj?.naicsCodes_string}
                                                                </p>
                                                                <p className="comn-p-class">
                                                                    NAICS SUBCODE: {naicsObj?.naicSubcodes} - {naicsObj?.naicSubcodes_string}
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                    {entity != "LLC" && (
                                                        <>
                                                            <div className="col-12 mb-3">
                                                                <div className="recommendations-info">
                                                                    <h2 className="position-relative">Corporate Stock Information</h2>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="lbl-comn-info">No. of Shares Authorized</label>
                                                                <input type="number" className="form-control input-style" name="authorized_no" {...formAttr(runform, "authorized_no")} />
                                                                {errorContainer(runform, "authorized_no")}
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="lbl-comn-info">Share Par Value</label>
                                                                <input type="number" className="form-control input-style" name="share_value" {...formAttr(runform, "share_value")} />
                                                                {errorContainer(runform, "share_value")}
                                                            </div>
                                                            <div className="col-12 mb-3">
                                                                <label className="lbl-comn-info">No. of Shareholders</label>
                                                                <select className="form-select input-style" {...formAttr(runform, "shareholders_no")} name="shareholders_no">
                                                                    <option defaultValue>Select No. of Shareholders</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                </select>
                                                                {errorContainer(runform, "shareholders_no")}
                                                            </div>
                                                            <div className="col-12 mb-3">
                                                                <div className="recommendations-info">
                                                                    <h2 className="position-relative">Company Address Information</h2>
                                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 mb-3">{() => ContactCheckBox(contactInfo, companyRef.current, "address")}</div>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="lbl-comn-info">Street Address</label>
                                                                <input type="text" className="form-control input-style" {...formAttr(runform, "street_address")} name="street_address" />
                                                                {errorContainer(runform, "street_address")}
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="lbl-comn-info">City</label>
                                                                <input type="text" className="form-control input-style" {...formAttr(runform, "city")} name="city" />
                                                                {errorContainer(runform, "city")}
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
                                                            <div className="col-6 mb-3">
                                                                <label className="lbl-comn-info">Zip Code</label>
                                                                <input type="text" maxLength={5} className="form-control input-style" {...formAttr(runform, "zip_code")} name="zip_code" />
                                                                {errorContainer(runform, "zip_code")}
                                                            </div>
                                                        </>
                                                    )}
                                                    <div className="col-12">
                                                        <div className="d-flex align-items-center">
                                                            {!location.state?.company && (
                                                                <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                                    Previous
                                                                </button>
                                                            )}
                                                            <button className=" ms-auto btn-comn-all btn-after-class" type="submit">
                                                                {location.state?.company === "update" ? "Update" : "Next"}
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
                            <Ordersummary progressbar={progressbar} service={""} userPlanId={userPlanId} />
                            <Whitebox />
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
