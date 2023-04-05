import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Lock from "../Images/lock.svg";
import AdminPayment from "./Common/AdminPayment";
import { AdminOrderSummary, GoBackArrow, payment } from "./Common/AdminOrderSummary";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function FiledArticles() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const serviceInfo = useServiceInfo("Filed Articles");
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
              <div className="comn-title-info">
                <div className="d-sm-inline-flex align-items-center">
                  <GoBackArrow />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8">
                  <AdminPayment submitFormData={submitFormData} allState={allState} country={country} />
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <AdminOrderSummary service={serviceInfo} />
                    </div>
                    <div className="col-12 mb-3">
                      <div className="white-box-main">
                        <p className="comn-p-class">After clicking the "Pay Now" button, please wait as processing may take several minutes. You will receive an order confirmation email once payment has successfully been processed.</p>
                        <div className="d-flex align-items-center">
                          <img src={Lock} alt="" />
                          <div className="ms-2">
                            <span>Your Information is safe & secure</span>
                          </div>
                        </div>
                      </div>
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
