import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Client from "../Images/client-icon.svg";
import NewClient from "../Images/new-agent.svg";
import AdminPayment from "./Common/AdminPayment";
import { AdminOrderSummary, GoBackArrow, payment, Previous } from "./Common/AdminOrderSummary";
import AgentForm from "../CommonForm/AgentForm";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { API_PATH } from "../const";
import { PostApi } from "../ApiService";
import { toast } from "react-toastify";
import { BenefitList } from "../Components/BenefitList";
import { CurrentCompanyInfo } from "../Components/CurrentCompanyInfo";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ChangeRegisteredAgent() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const [agentType, setAgentType] = useState(1);
    const [agentData, setAgentData] = useState("");
    const [state, setState] = useState("Alaska");
    const [error, setError] = useState("");
    const [viewcompanyid, setviewcompanyid] = useState("");
    const serviceInfo = useServiceInfo("Change Registered Agent");
    const allState = useAllState();
    const country = useAllCountry();

    useEffect(() => {
        setviewcompanyid(context.viewCompanyId);
        if (context.viewCompanyId) {
            getAgentByCompany(context.viewCompanyId);
        }
    }, [context.viewCompanyId]);

    const getAgentByCompany = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getCompanysAgent, { company_id: id }))).then((res) => {
            if (res.status === 200) {
                setAgentData(res.data.data[0]);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const submitFormData = (formData, type) => {
        let data = { company_Id: viewcompanyid, serviceState: state, agentType: agentType, ...formData, role: 0 };
        if (state === "") {
            setError(true);
        } else {
            new Promise((resolve) => resolve(PostApi(API_PATH.addAgent, data))).then((res) => {
                if (res.status === 200) {
                    setAgentData(res.data.data);
                    payment(formData, type, viewcompanyid, serviceInfo, navigate);
                } else {
                    toast.error(res.data.message);
                }
            });
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
                                <h1>Change of Registered Agent</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <CurrentCompanyInfo state={state} setState={setState} error={error} setError={setError} serviceState={true} allState={allState} />
                                    {agentData && agentData?.hireAgent !== 1 && (
                                        <>
                                            <div className="white-box-main mb-4">
                                                <div className="box-hdr-top">
                                                    <span className="d-flex align-items-center">
                                                        <img src={Client} className="pe-2" alt="" />
                                                        Current Agent
                                                    </span>
                                                </div>
                                                <div className="order-smry-info">
                                                    <span className="d-block">{agentData?.name}</span>
                                                    <span className="d-block">{agentData?.street_address + "," + agentData?.city + "," + agentData?.zip_code}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="white-box-main mb-4">
                                        <div className="box-hdr-top">
                                            <span className="d-flex align-items-center">
                                                <img src={NewClient} className="pe-2" alt="" />
                                                Provide name & address of Agent
                                            </span>
                                        </div>
                                        <AgentForm agentType={agentType} hireAgent={2} submitFormData={submitFormData} setAgentType={setAgentType} agentData={agentData} allState={allState} country={country} />
                                    </div>
                                    <div className="payment-area">
                                        <AdminPayment submitFormData={submitFormData} buttonId={"agentSubmit"} allState={allState} country={country} />
                                        <Previous />
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
