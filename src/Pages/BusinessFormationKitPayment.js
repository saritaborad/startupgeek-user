import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminCommonPaymentInfo } from "../Components/AdminCommonPaymentInfo";
import AuthContext from "../Context/AuthContext";
import { useServiceInfo } from "../Hooks/CustomHook";
import { payment } from "./Common/AdminOrderSummary";

export default function BusinessFormationKitPayment() {
  const serviceInfo = useServiceInfo("Business Formation Kit");
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [company_Id, setcompany_Id] = useState("");

  useEffect(() => {
    if (context.viewCompanyId) {
      setcompany_Id(context.viewCompanyId);
    }
  }, [context.viewCompanyId]);

  const submitFormData = async (formData, type) => {
    payment(formData, type, company_Id, serviceInfo, navigate);
  };

  return <AdminCommonPaymentInfo name={"Business Formation Kit"} submitFormData={submitFormData} serviceInfo={serviceInfo} />;
}
