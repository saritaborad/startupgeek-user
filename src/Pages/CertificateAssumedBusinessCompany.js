import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import AdminPayment from "./Common/AdminPayment";
import { AdminOrderSummary, GoBackArrow, payment, Previous } from "./Common/AdminOrderSummary";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { BenefitList } from "../Components/BenefitList";
import { CurrentCompanyInfo } from "../Components/CurrentCompanyInfo";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function CertificateAssumedBusinessCompany() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const serviceInfo = useServiceInfo("Certificate Of Assumed Business Name");
  const allState = useAllState();
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
    payment(formData, type, company_Id, serviceInfo, navigate);
  };

  return (
    <Layout>
      <div className="content-main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="d-sm-inline-flex align-items-center comn-title-info">
                <GoBackArrow />
                <h1>Certificate Of Assumed Business Name Information</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <CurrentCompanyInfo state={state} setState={setState} error={error} setError={setError} serviceState={true} allState={allState} />
                  <div className="pt-2">
                    <label className="lbl-comn-info">Please enter the name exactly as you would like it filed </label>
                    <input type="text" className="form-control input-style" name="filedName" />
                  </div>
                  <div className="payment-area">
                    <AdminPayment submitFormData={submitFormData} buttonId={"certificateOld"} allState={allState} country={country} />
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
