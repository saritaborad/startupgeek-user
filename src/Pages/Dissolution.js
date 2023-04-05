import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { AdminOrderSummary, GoBackArrow, payment, Previous } from "./Common/AdminOrderSummary";
import AdminPayment from "./Common/AdminPayment";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { BenefitList } from "../Components/BenefitList";
import { CurrentCompanyInfo } from "../Components/CurrentCompanyInfo";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function Dissolution() {
  const serviceInfo = useServiceInfo("Dissolution");
  const allState = useAllState();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const country = useAllCountry();

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
                <h1>Dissolution</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <CurrentCompanyInfo />
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
