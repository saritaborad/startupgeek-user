import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import TrademarkIcon from "../Images/trademark-icon-new.svg";
import Name from "../Images/TM-name.svg";
import Logo from "../Images/TM-logo.svg";
import Slogan from "../Images/TM-slogan.svg";
import { AdminOrderSummary, GoBackArrow, payment } from "./Common/AdminOrderSummary";
import AdminPayment from "./Common/AdminPayment";
import { Collapse } from "react-bootstrap";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { BenefitList } from "../Components/BenefitList";
import { CurrentCompanyInfo } from "../Components/CurrentCompanyInfo";
import AuthContext from "../Context/AuthContext";

export default function LegalTrademarkNameSearch() {
  const serviceInfo = useServiceInfo("Trademark Name Search");
  const allState = useAllState();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const country = useAllCountry();

  const [error, setError] = useState({ name: "", slogan: "", service: "" });
  const [data, setData] = useState({ name: "", slogan: "", service: "" });
  const [open, setOpenInfo] = useState({ name_info: true, logo_info: false, slogan_info: false });
  const [company_Id, setcompany_Id] = useState("");

  useEffect(() => {
    if (context.viewCompanyId) {
      setcompany_Id(context.viewCompanyId);
    }
  }, [context.viewCompanyId]);

  const submitFormData = (formData, type) => {
    if (validateInput()) {
      payment(formData, type, company_Id, serviceInfo, navigate);
    }
  };

  const validateInput = () => {
    let isValid = true;
    if (open.name_info && !data.name) {
      setError((prev) => ({ ...prev, name: "Business name is required." }));
      isValid = false;
    }
    if (open.slogan_info && !data.slogan) {
      setError((prev) => ({ ...prev, slogan: "Slogan is required." }));
      isValid = false;
    }
    if (!data.service) {
      setError((prev) => ({ ...prev, service: "Enter the products or services offered using the mark." }));
      isValid = false;
    }
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Layout>
      <div className="content-main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="comn-title-info d-sm-inline-flex align-items-center">
                <GoBackArrow />
                <h1>Trandemark Name Search</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <CurrentCompanyInfo />
                    </div>
                    <div className="col-12">
                      <div className="white-box-main">
                        <div className="box-hdr-top">
                          <span className="d-flex align-items-center">
                            <img src={TrademarkIcon} alt="TM" className="pe-2" />
                            Trademark Information
                          </span>
                        </div>
                        <form className="row">
                          <div className="col-12 mb-3">
                            <label className="lbl-comn-info-2">Please select the appropriate type of trademark</label>
                            <div className="row">
                              <div className="col-xxl-4 mb-2">
                                <div
                                  className="cust-radio-btn diff-radio-class"
                                  onClick={() => {
                                    setOpenInfo({ ...open, name_info: true, slogan_info: false, logo_info: false });
                                    setError({ name: "", service: "", slogan: "" });
                                  }}
                                >
                                  <input type="radio" id="name" name="trademark" className="cust-radio" defaultChecked />
                                  <label className="d-flex align-items-center comn-radio-box" for="name">
                                    <span>Name</span>
                                    <div className="ms-auto">
                                      <img src={Name} alt="NAME" className="img-fluid" />
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <div className="col-xxl-4 mb-2">
                                <div
                                  className="cust-radio-btn diff-radio-class"
                                  onClick={() => {
                                    setOpenInfo({ ...open, name_info: false, slogan_info: false, logo_info: true });
                                    setError({ name: "", service: "", slogan: "" });
                                  }}
                                >
                                  <input type="radio" id="logo" name="trademark" className="cust-radio" />
                                  <label className="d-flex align-items-center comn-radio-box" for="logo">
                                    Design/Logo
                                    <div className="ms-auto">
                                      <img src={Logo} alt="LOGO" className="img-fluid" />
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <div className="col-xxl-4 mb-2">
                                <div
                                  className="cust-radio-btn diff-radio-class"
                                  onClick={() => {
                                    setOpenInfo({ ...open, name_info: false, slogan_info: true, logo_info: true });
                                    setError({ name: "", service: "", slogan: "" });
                                  }}
                                >
                                  <input type="radio" id="slogan" name="trademark" className="cust-radio" />
                                  <label className="d-flex align-items-center comn-radio-box" for="slogan">
                                    Slogan
                                    <div className="ms-auto">
                                      <img src={Slogan} alt="Slogan" className="img-fluid" />
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <Collapse in={open.name_info}>
                              <div className="white-box-main-2 my-3 arrow-top-left">
                                <div className="row">
                                  <div className="col-12">
                                    <label className="lbl-comn-info">Please write out the NAME EXACTLY as you want it to appear on the application.</label>
                                    <span className="lbl-comn-info-2">BUSINESS NAME</span>
                                    <input className="form-control input-style" type="text" name="name" placeholder="Example: 'McDonald's', 'Nike', or 'Apple'" value={data.name} onChange={(e) => handleChange(e)} />
                                  </div>
                                  {error?.name && <span className="text-danger">{error?.name}</span>}
                                </div>
                              </div>
                            </Collapse>
                            <Collapse in={open.logo_info}>
                              <div className="white-box-main-2 my-3 top-side-arrow">
                                <div className="row">
                                  <div className="col-12">
                                    <label className="lbl-comn-info mb-0">You've designed a logo to represent your business. Before sending that logo out into the world, you should consider how to protect the design, and the business behind it, through correct use of trademark law.</label>
                                  </div>
                                </div>
                              </div>
                            </Collapse>
                            <Collapse in={open.slogan_info}>
                              <div className="white-box-main-2 my-3 arrow-top-right">
                                <div className="row">
                                  <div className="col-12">
                                    <label className="lbl-comn-info">Please write out the SLOGAN EXACTLY as you want it to appear on the application.</label>
                                    <span className="lbl-comn-info-2">SLOGAN</span>
                                    <input className="form-control input-style" type="text" name="slogan" placeholder="Example: 'McDonald's', 'Nike', or 'Apple'" value={data.slogan} onChange={(e) => handleChange(e)} />
                                  </div>
                                  {error?.slogan && <span className="text-danger">{error?.slogan}</span>}
                                </div>
                              </div>
                            </Collapse>
                          </div>
                          <div className="col-12 mb-3">
                            <label className="lbl-comn-info-2">Please List The Products Or Services Offered Using The Mark</label>
                            <input type="text" className="form-control input-style" name="service" value={data.service} onChange={(e) => handleChange(e)} />
                            {error.service && <span className="text-danger">{error.service}</span>}
                          </div>
                          <div className="col-12 mb-3">
                            <label className="lbl-comn-info-2">Are You Currently Using The Mark?</label>
                            <div className="d-flex align-items-center">
                              <div className="cust-radio-btn">
                                <input type="radio" id="yes" defaultChecked name="Mark" />
                                <label for="yes">Yes</label>
                              </div>
                              <div className="cust-radio-btn ms-3">
                                <input type="radio" id="no" name="Mark" />
                                <label for="no">No</label>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="grey-box-check">
                              <div className="custom-checkbox">
                                <label className="custom-lbl-part text-secondary">
                                  <input type="checkbox" id="acknowledgement" />
                                  <span className="custom-checkbox-class"></span>
                                  By Clicking This Checkbox, I Have Read
                                  <Link to="#" className="text-black">
                                    The Acknowledgement
                                  </Link>
                                  .
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
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
            <div className="col-md-8">
              <AdminPayment submitFormData={submitFormData} allState={allState} country={country} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
