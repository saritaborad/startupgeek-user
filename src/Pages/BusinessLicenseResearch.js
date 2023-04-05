import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Locate from "../Images/trademark-icon-new.svg";
import AdminPayment from "./Common/AdminPayment";
import { AdminOrderSummary, GoBackArrow, payment, Previous } from "./Common/AdminOrderSummary";
import CompanyAddress from "../CommonForm/CompanyAddress";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { BenefitList } from "../Components/BenefitList";
import { CurrentCompanyInfo } from "../Components/CurrentCompanyInfo";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function BusinessLicenseResearch() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const serviceInfo = useServiceInfo("Business license research");
  const allState = useAllState();
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
              <div className="comn-title-info d-sm-inline-flex align-items-center">
                <GoBackArrow />
                <h1>Business License Research Package</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <CurrentCompanyInfo />
                    </div>
                    <div className="col-12 mb-3">
                      <div className="white-box-main">
                        <div className="box-hdr-top">
                          <span className="d-flex align-items-center">
                            <img src={Locate} alt="" className="pe-2" />
                            Company Address
                          </span>
                        </div>
                        <CompanyAddress submitFormData={submitFormData} allState={allState} />
                      </div>
                    </div>
                    <div className="col-12">
                      <AdminPayment submitFormData={submitFormData} buttonId={"businessLiceId"} allState={allState} country={country} />
                      <Previous />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <AdminOrderSummary service={serviceInfo} />
                    </div>
                    <div className="col-12">
                      <BenefitList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
