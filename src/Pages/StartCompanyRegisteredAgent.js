import React, { useEffect, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import "react-phone-input-2/lib/style.css";
import { Collapse } from "react-bootstrap";
import Free_Agent from "../Images/register-agent.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import AgentForm from "../CommonForm/AgentForm";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function StartACompanyRegisteredAgent() {
    const context = useContext(AuthContext);
    const allState = useAllState();
    const country = useAllCountry();
    const navigate = useNavigate();
    const location = useLocation();

    const progressbar = { width: "50%", ariavaluenow: "50", ariavaluemin: "0", ariavaluemax: "100" };
    const [open, setOpenregister] = useState({ freeregister: true, ownregister: false });
    const [agentData, setAgentData] = useState("");
    const [entity, setentity] = useState("");
    const [hireAgent, setHireAgent] = useState(1);
    const [agentType, setAgentType] = useState(1);
    const serviceInfo = useServiceInfo("New Registered Agent Service");
    const [userPlanId, setuserPlanId] = useState("");
    const [company_Id, setcompany_Id] = useState("");
    const [contactId, setcontactId] = useState("");
    const [company, setCompany] = useState("");
    const [previousLocation, setPreviousLocation] = useState(null);

    useEffect(() => {
        setentity(context.entity);
        setCompany(context.company);
    }, [context.entity, context.company]);

    useEffect(() => {
        if (location?.state?.company_Id !== undefined && location?.state?.userPlanId !== undefined) {
            setcompany_Id(location.state.company_Id);
            context.setviewCompanyId(location.state.company_Id);
            setuserPlanId(location.state.userPlanId);
            getAgentByCompany(location.state.company_Id);
        } else {
            navigate("/");
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
        }
    }, [location?.state?.company_Id, location?.state?.userPlanId, location?.state?.contactId]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const submitFormData = (formData) => {
        let data = { role: 0, userPlanId: userPlanId, company_Id: company_Id, hireAgent: hireAgent, addService: hireAgent == 1 ? true : false, serviceTitle: "New Registered Agent Service" };
        let data1 = { ...formData, company_Id: company_Id, userPlanId: userPlanId, role: 0, addService: hireAgent == 1 ? true : false, serviceTitle: "New Registered Agent Service" };
        new Promise((resolve) => resolve(PostApi(API_PATH.addAgent, hireAgent == 1 ? data : data1))).then((res) => {
            if (res.status === 200) {
                setPreviousLocation(location.pathname);
                setAgentData(res.data.data);
                location.state?.agent == "update" ? navigate("/start-company-review-order", { state: { contactId: contactId, userPlanId: userPlanId, company_Id: company_Id } }) : navigate("/start-company-tax-info", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getAgentByCompany = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getAgentByCompany, { company_Id: id }))).then((res) => {
            if (res.status === 200) {
                setAgentData(res.data.data);
                setHireAgent(res.data.data.hireAgent || 1);
                setOpenregister({ ...open, freeregister: res.data.data.hireAgent == 1 ? true : false, ownregister: res.data.data.hireAgent == 2 ? true : false });
            }
        });
    };

    const goPrevious = () => {
        navigate(entity === "LLC" ? "/start-company-member" : "/start-company-shareholder", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, owner: location.state?.owner, previousLocation: previousLocation } });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="start-cmn-top">
                                Please provide Registered Agent Information for <span>{company?.company_name}</span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <div className="white-box-main">
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <div className="recommendations-info">
                                                <h2 className="position-relative">Registered Agent Information</h2>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="dir-detail-comn mb-2">
                                                <span className="d-block">Alabama requires an LLC to appoint a Registered Agent:</span>
                                                <bdi className="d-flex align-items-center">
                                                    <i className="bi bi-check me-2"></i>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                </bdi>
                                            </div>
                                            <div className="dir-detail-comn">
                                                <span className="d-block">Typlcal documents recelved by your Reglstered Agent can Include:</span>
                                                <bdi className="d-flex align-items-center">
                                                    <i className="bi bi-check me-2"></i>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                </bdi>
                                                <bdi className="d-flex align-items-center m-0">
                                                    <i className="bi bi-check me-2"></i>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                </bdi>
                                            </div>
                                        </div>

                                        <div className="d-flex" onChange={(e) => setHireAgent(e.target.value)}>
                                            <div className="col-lg-6 mb-3">
                                                <div className="cust-radio-btn diff-radio-class h-100" onClick={() => setOpenregister({ ...open, freeregister: true, ownregister: false })}>
                                                    <input type="radio" id="free" name="register" checked={hireAgent == 1} className="cust-radio" value={1} />
                                                    <label className="comn-radio-box h-100 d-flex align-items-center" htmlFor="free">
                                                        Assign stratup geeks as my Registered Agent FREE For 1 year.
                                                        <div className="ms-auto">
                                                            <img src={Free_Agent} alt="" className="py-3" />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="cust-radio-btn diff-radio-class h-100" onClick={() => setOpenregister({ ...open, freeregister: false, ownregister: true })}>
                                                    <input type="radio" id="own" name="register" className="cust-radio" checked={hireAgent == 2} value={2} />
                                                    <label className="comn-radio-box h-100 d-flex align-items-center" htmlFor="own">
                                                        I would like to act my own registered agent.
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <Collapse in={open.freeregister}>
                                                <div className="white-box-main-2 mt-3 arrow-top-left">
                                                    <div className="row">
                                                        <div className="col-12 mb-3">
                                                            <div className="recommendations-info">
                                                                <h2 className="position-relative">Why Use Us Your Registered Agent? </h2>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <div className="dir-detail-comn">
                                                                <span className="d-block">Free First Year</span>
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                                <span className="d-block">Guaranteed Rates</span>
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                                <span className="d-block">All-Incluslve</span>
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                                <span className="d-block">reduce Junk Mall</span>
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Collapse>
                                            <Collapse in={open.ownregister}>
                                                <div className="white-box-main-2 mt-3 arrow-top-right">
                                                    <div className="row">
                                                        <div className="col-12 mb-3">
                                                            <div className="recommendations-info">
                                                                <h2 className="position-relative">Agent Information</h2>
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                            </div>
                                                        </div>
                                                        <AgentForm agentType={agentType} hireAgent={hireAgent} submitFormData={submitFormData} setAgentType={setAgentType} agentData={agentData} allState={allState} country={country} />
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex align-items-center">
                                                {!location.state?.agent && (
                                                    <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                        Previous
                                                    </button>
                                                )}
                                                {hireAgent == 1 ? (
                                                    <button className=" ms-auto btn-comn-all btn-after-class" type="button" onClick={submitFormData}>
                                                        {location.state?.agent === "update" ? "Update" : "Next"}
                                                    </button>
                                                ) : (
                                                    <button className=" ms-auto btn-comn-all btn-after-class" type="button" onClick={() => document.getElementById("agentSubmit")?.click()}>
                                                        {location.state?.agent === "update" ? "Update" : "Next"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Ordersummary progressbar={progressbar} service={hireAgent == 1 ? serviceInfo : ""} userPlanId={userPlanId} />
                            <Whitebox />
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
