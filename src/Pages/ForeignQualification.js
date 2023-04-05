import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminCommonPaymentInfo } from "../Components/AdminCommonPaymentInfo";
import AuthContext from "../Context/AuthContext";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { payment } from "./Common/AdminOrderSummary";

export default function ForeignQualification() {
    const serviceInfo = useServiceInfo("Foreign Qualification");
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const country = useAllCountry();
    const allState = useAllState();

    const [state, setState] = useState("Alaska");
    const [error, setError] = useState(false);
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
    return <AdminCommonPaymentInfo name={"Foreign Qualification"} submitFormData={submitFormData} serviceInfo={serviceInfo} state={state} setState={setState} error={error} setError={setError} serviceState={true} allState={allState} country={country} />;
}
