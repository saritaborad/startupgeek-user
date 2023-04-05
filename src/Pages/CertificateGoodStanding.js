import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminCommonPaymentInfo } from "../Components/AdminCommonPaymentInfo";
import AuthContext from "../Context/AuthContext";
import { useServiceInfo } from "../Hooks/CustomHook";
import { payment } from "./Common/AdminOrderSummary";

export default function CertificateGoodStanding() {
  const serviceInfo = useServiceInfo("Certificate of good standing");
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [state, setState] = useState("");
  const [error, setError] = useState(false);
  const [company_Id, setcompany_Id] = useState("");

  useEffect(() => {
    if (context.viewCompanyId) {
      setcompany_Id(context.viewCompanyId);
    }
  }, [context.viewCompanyId]);

  const submitFormData = async (formData, type) => {
    payment(formData, type, company_Id, serviceInfo, navigate);
  };

  return <AdminCommonPaymentInfo name={"Certificate of Good Standing"} submitFormData={submitFormData} serviceInfo={serviceInfo} state={state} setState={setState} error={error} setError={setError} serviceState />;
}
