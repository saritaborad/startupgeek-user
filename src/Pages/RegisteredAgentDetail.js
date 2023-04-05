import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Info from "../Images/info-icon.svg";
import Client from "../Images/client-icon.svg";
import { AdminOrderSummary, GoBackArrow, payment, Previous } from "./Common/AdminOrderSummary";
import AdminPayment from "./Common/AdminPayment";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { BenefitList } from "../Components/BenefitList";
import { CurrentCompanyInfo } from "../Components/CurrentCompanyInfo";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisteredAgentDetail() {
  const serviceInfo = useServiceInfo("New Registered Agent Service");
  const allState = useAllState();
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const country = useAllCountry();

  const [state, setState] = useState("Alaska");
  const [error, setError] = useState("");
  const [company_Id, setcompany_Id] = useState("");

  useEffect(() => {
    if (context.viewCompanyId) {
      setcompany_Id(context.viewCompanyId);
    }
  }, [context.viewCompanyId]);

  const submitFormData = async (formData, type) => {
    if (!state) {
      setError(true);
    } else {
      payment(formData, type, company_Id, serviceInfo, navigate);
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
                <h1>Registered Agent</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <CurrentCompanyInfo state={state} setState={setState} error={error} setError={setError} serviceState={true} allState={allState} />
                  <div className="white-box-main mb-4">
                    <div className="box-hdr-top">
                      <span className="d-flex align-items-center">
                        <img src={Client} className="pe-2" alt="" />
                        Change Agent
                      </span>
                    </div>
                    <div className="dtl-rdio-cust">
                      <span className="d-block">Would you like us to facilitate the transfer of Registered Agent service from your current provider to us?</span>
                      <div className="py-3">
                        <div className="cust-radio-btn d-inline-block me-3">
                          <input type="radio" id="yes" defaultChecked name="radio-group" />
                          <label for="yes">Yes</label>
                        </div>
                        <div className="cust-radio-btn d-inline-block">
                          <input type="radio" id="no" name="radio-group" />
                          <label for="no">no</label>
                        </div>
                        <p className="mb-0 mt-1 slt-text-rdt">Select No, if entity has not been filled.</p>
                      </div>
                      <bdi className="d-block">Please select agent service, if you would like us to facilitate the transfer of registered agent service for you.</bdi>
                    </div>
                    <div className="agnt-dtls-btm">
                      <img src={Info} className="me-3 img-fluid" alt="arrow" />
                      If the entity has a current registered agent on record it is mandatory that the designated forms to transfer the service to the new registered agent are filed. Otherwise, the state will not recognize that a new registered agent has been assigned. As a courtesy, we offer our clients the option to have us file the required documents on their behalf.
                    </div>
                  </div>
                  <div className="payment-area">
                    <AdminPayment submitFormData={submitFormData} allState={allState} country={country} />
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
