import React from "react";
import Maintain from "../../Images/maintain-icon.svg";
import Saving from "../../Images/dollar-icon.svg";
import Secure from "../../Images/secure.svg";

export default function Whitebox() {
  return (
    <div className="white-box-main mb-4">
      <div className="order-total-info-btm mb-2">
        <div className="d-flex align-items-center order-total-title">
          <span className="d-flex align-items-center justify-content-center me-3">
            <img src={Maintain} alt="" />
          </span>
          Maintain business compliance.
        </div>
        <p className="mb-0 mt-3">
          Trusted by over 500,000 business owners to maintain their state's
          business compliance obligations.
        </p>
      </div>
      <div className="order-total-info-btm mb-2">
        <div className="d-flex align-items-center order-total-title">
          <span className="d-flex align-items-center justify-content-center me-3">
            <img src={Saving} alt="" />
          </span>
          Tax savings benefit
        </div>
        <p className="mb-0 mt-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="order-total-info-btm">
        <div className="d-flex align-items-center order-total-title">
          <span className="d-flex align-items-center justify-content-center me-3">
            <img src={Secure} alt="" />
          </span>
          Safe & Secure
        </div>
        <p className="mb-0 mt-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
    </div>
  );
}
