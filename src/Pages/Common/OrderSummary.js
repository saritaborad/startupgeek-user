import React from "react";

import { useUserPlan } from "../../Hooks/CustomHook";
import { parseDays } from "../Utils";

export const Ordersummary = ({ progressbar, service = "", userPlanId }) => {
  const onePlan = useUserPlan(userPlanId);
  let serviceBuy = onePlan?.servicePurchased;
  let total = Number(onePlan?.total);

  let newservice = serviceBuy?.filter((item) => item?.service_id != service?._id) || [];
  let serviceInfo = service ? [...newservice, service] : [...newservice];
  serviceInfo?.map((item) => (total += Number(item?.service_price)));

  return (
    <div className="white-box-main p-0 mb-3">
      <div className="progress login-progressbar">
        <div className="progress-bar" role="progressbar" style={{ width: progressbar?.width }} aria-valuenow={progressbar?.ariavaluenow} aria-valuemin={progressbar?.ariavaluemin} aria-valuemax={progressbar?.ariavaluemax}></div>
      </div>
      <div className="p-3">
        <div className="recommendations-info">
          <h2 className="position-relative">Order Summary</h2>
          <div className="order-smry-info">
            <div className="d-flex align-items-center mb-3">
              <p className="m-0">${onePlan?.total}</p>
              <span className="ms-auto package-class">{onePlan?.plan?.[0].name}</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <span className="fix-width-span">Entity Type</span>
              <span> : {onePlan?.entity_type}</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <span className="fix-width-span">Package fee</span>
              <span>: ${onePlan?.plan?.[0].package_fee}</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <span className="fix-width-span">State fee</span>
              <span>: ${onePlan?.plan?.[0].state_fee}</span>
            </div>
            <div className="bdr-top-total">
              <ul className="plan-list">
                {onePlan?.plan?.[0].features.length > 0 &&
                  onePlan?.plan?.[0].features.map((item, i) => {
                    return (
                      <li key={i}>
                        <p className="d-flex align-items-center">
                          <i className="bi bi-check me-2"></i>
                          {item}
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </div>

            {serviceInfo?.length > 0 &&
              serviceInfo?.map((item, i) => {
                return (
                  <div className="service-info" key={i}>
                    <div className="row me-0 align-items-center">
                      <span className="col-9 pe-0">
                        {item?.service_title} {parseDays(Number(item?.service_duration))}
                      </span>
                      <p className="col-3 pe-0 text-end">$ {item?.service_price}</p>
                    </div>
                  </div>
                );
              })}
            <div className="bdr-top-total">
              <div className="row me-0 align-items-center">
                <span className="col-6 pe-0">Total</span>
                <b className="col-6 pe-0 text-end">${total || ""} </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
