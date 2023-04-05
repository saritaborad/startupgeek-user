import { useContext, useEffect } from "react";
import { useState } from "react";
import { getAllCountry, getAllState, getOnePlan, getServiceInfo, getStartCompnayInfo, getUsersCard } from "../CommonApi/CommonApi";
import AuthContext from "../Context/AuthContext";

export function useServiceInfo(service_title) {
  const [serviceInfo, setServiceInfo] = useState("");
  useEffect(() => {
    getServiceInfo(service_title, setServiceInfo);
  }, [service_title]);
  return serviceInfo;
}

export function useAllState(needState = true) {
  const [allState, setAllState] = useState("");
  useEffect(() => {
    if (needState) {
      getAllState(setAllState);
    }
  }, []);
  return allState;
}

export function useAllCountry(needCountry = true) {
  const [country, setAllCountry] = useState("");
  useEffect(() => {
    if (needCountry) {
      getAllCountry(setAllCountry);
    }
  }, []);
  return country;
}

export function useUserPlan(userPlanId) {
  const [onePlan, setOnePlan] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    if (userPlanId) getOnePlan(setOnePlan, userPlanId);
  }, [userPlanId]);
  context.setEntity(onePlan?.entity_type);

  return onePlan;
}

export function useStartCompanyInfo(company_Id) {
  const { startCompany, setStartCompany } = useContext(AuthContext);

  useEffect(() => {
    getStartCompnayInfo(setStartCompany, company_Id);
  }, []);

  return startCompany;
}

export function useDefaultCard() {
  const { defaultCard, setDefaultCard } = useContext(AuthContext);

  useEffect(() => {
    getUsersCard(setDefaultCard);
  }, []);

  return defaultCard;
}
