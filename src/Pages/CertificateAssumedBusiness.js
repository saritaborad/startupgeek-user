import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Info from "../Images/info-icon.svg";
import AdminPayment from "./Common/AdminPayment";
import { AdminOrderSummary, GoBackArrow, payment, Previous } from "./Common/AdminOrderSummary";
import { Collapse } from "react-bootstrap";
import { errorContainer, formAttr } from "../const";
import { useAllCountry, useAllState, useServiceInfo } from "../Hooks/CustomHook";
import { BenefitList } from "../Components/BenefitList";
import AuthContext from "../Context/AuthContext";

export default function CertificateAssumedBusiness() {
  const serviceInfo = useServiceInfo("Certificate Of Assumed Business Name");
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const allState = useAllState();
  const country = useAllCountry();

  const [designator, setDesignator] = useState("");
  const [cname, setCname] = useState("");
  const [opencompany, setOpenCompany] = useState(true);
  const [company_Id, setcompany_Id] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    setCompany(context.viewCompanyInfo);
  }, [context.viewCompanyInfo]);

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
                <h1>Certificate Of Assumed Business Name Information</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <div className="white-box-main">
                    <div className="box-hdr-top border-0 p-0">
                      <span>Select a company associated with your purchase</span>
                    </div>
                    <div className="d-flex align-items-center border-bottom">
                      <Link to="/certificate-assumed-business-company">
                        <div className="cust-radio-btn position-relative ms-3">
                          <input type="radio" id="company-1" name="company" onChange={() => setOpenCompany(false)} />
                          <label for="company-1" className="position-static"></label>
                        </div>
                      </Link>
                      <div className="m-2">
                        <div className="stsg-box-list-text">
                          <p className="mb-0">LOREM IPSUM LLC</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="cust-radio-btn position-relative ms-3">
                        <input type="radio" id="company-2" name="company" defaultChecked onChange={() => setOpenCompany(!opencompany)} />
                        <label for="company-2" className="position-static"></label>
                      </div>
                      <div className="m-2">
                        <div className="stsg-box-list-text">
                          <bdi className="d-block">NEW COMPANY</bdi>
                          <p className="mb-0">A company previously incorporated outside of incfile</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Collapse in={opencompany}>
                    <div className="mb-3 mt-5 top-side-arrow" id="Newcompany">
                      <div className="white-box-main-2">
                        <div className="recommendations-info">
                          <h2 className="position-relative">Company Information</h2>
                        </div>
                        <div className="agnt-dtls-btm mb-2">
                          <img src={Info} className="me-3 img-fluid" alt="arrow" />
                          The state of formation is where the company was formed, while the state of service is where you are seeking to obtain authority to transact business.
                        </div>
                        <Formik
                          enableReinitialize
                          initialValues={{
                            entity_type: "",
                            formationState: "",
                            serviceState: "",
                            Cname: "",
                            designator: "",
                            street_address: "",
                            city: "",
                            state: "",
                            zip_code: "",
                            filedName: "",
                          }}
                          validationSchema={Yup.object({
                            entity_type: Yup.string().required("Entity type is required."),
                            formationState: Yup.string().required("Formation state is required."),
                            serviceState: Yup.string().required("Service state is required."),
                            Cname: Yup.string().required("Company Name is required."),
                            designator: Yup.string().required("Designator is required."),
                            street_address: Yup.string().required("Company address is required."),
                            city: Yup.string().required("City name is required."),
                            state: Yup.string().required("State is required."),
                            zip_code: Yup.number().required("Zip code is required.").typeError("Zip code is required."),
                            filedName: Yup.string().required("Name is required."),
                          })}
                          onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                        >
                          {(runform) => (
                            <form className="row" onSubmit={runform.handleSubmit}>
                              <div className="col-lg-4 mb-3">
                                <label className="lbl-comn-info">Entity Type</label>
                                <select className="form-select input-style" {...formAttr(runform, "entity_type")} name="entity_type">
                                  <option value="">Select Entity Type</option>
                                  <option value="LLC">LLC</option>
                                  <option value="S-Corporation">S-Corporation</option>
                                  <option value="C-Corporation">C-Corporation</option>
                                  <option value="Nonprofit">Nonprofit</option>
                                </select>
                                {errorContainer(runform, "entity_type")}
                              </div>
                              <div className="col-lg-4 mb-3">
                                <label className="lbl-comn-info">State Of Formation </label>
                                <select className="form-select input-style" {...formAttr(runform, "formationState")} name="formationState">
                                  <option defaultValue="">--- state ---</option>
                                  {allState.length > 0 &&
                                    allState.map((item, i) => {
                                      return (
                                        <option key={i} value={item.label} id={item.value}>
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                </select>
                                {errorContainer(runform, "formationState")}
                              </div>
                              <div className="col-lg-4 mb-3">
                                <label className="lbl-comn-info">State Of Service </label>
                                <select className="form-select input-style" {...formAttr(runform, "serviceState")} name="serviceState">
                                  <option defaultValue="">--- state ---</option>
                                  {allState.length > 0 &&
                                    allState.map((item, i) => {
                                      return (
                                        <option key={i} value={item.label} id={item.value}>
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                </select>
                                {errorContainer(runform, "serviceState")}
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="lbl-comn-info">Company Name</label>
                                <input type="text" name="Cname" {...formAttr(runform, "Cname")} onChangeCapture={(e) => setCname(e.target.value)} className="form-control input-style" />
                                {errorContainer(runform, "Cname")}
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="lbl-comn-info">Designator </label>
                                <select className="form-select input-style" {...formAttr(runform, "designator")} onChangeCapture={(e) => setDesignator(e.target.value)} name="designator">
                                  <option defaultValue="">Select Designator</option>
                                  {company?.entity_type != "LLC" ? (
                                    <>
                                      <option value="company">Company </option>
                                      <option value="corporation">Corporation </option>
                                      <option value="corp">Corp </option>
                                      <option value="inc">Inc </option>
                                      <option value="limited">Limited </option>
                                      <option value="ltd">Ltd </option>
                                      <option value="co.">Co.</option>
                                      <option value="incorporated">Incorporated </option>
                                      <option value="corp."> Corp. </option>
                                      <option value="inc.">Inc. </option>
                                      <option value="ltd.">Ltd. </option>
                                      <option value="co.">Co. </option>
                                    </>
                                  ) : (
                                    <>
                                      <option value="LLC">LLC </option>
                                      <option value="L.L.C">L.L.C </option>
                                      <option value="limited liability co.">Limited Liability Co. </option>
                                      <option value="limited liability company">Limited Liability Company </option>
                                      <option value="ltd. liability company">LTD.Liability Company </option>
                                    </>
                                  )}
                                </select>
                                {errorContainer(runform, "designator")}
                              </div>
                              {cname != "" && designator != "" && (
                                <div className="col-md-6 mb-3">
                                  <label className="lbl-comn-info">Please confirm that this is exactly how you company name is filed with the state.</label>
                                  <div className="name-preview">
                                    {cname} <span className="m-1">{designator}</span>
                                  </div>
                                </div>
                              )}
                              <div className="col-12">
                                <div className="recommendations-info">
                                  <h2 className="position-relative">Company Address</h2>
                                </div>
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="lbl-comn-info">Street Address</label>
                                <input type="text" className="form-control input-style" {...formAttr(runform, "street_address")} name="street_address" />
                                {errorContainer(runform, "street_address")}
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="lbl-comn-info">City</label>
                                <input className="form-control input-style" type="text" {...formAttr(runform, "city")} name="city" />
                                {errorContainer(runform, "city")}
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="lbl-comn-info">State</label>
                                <select className="form-select input-style" {...formAttr(runform, "state")} name="state">
                                  <option defaultValue="">--- state ---</option>
                                  {allState.length > 0 &&
                                    allState.map((item, i) => {
                                      return (
                                        <option key={i} value={item.label} id={item.value}>
                                          {item.label}
                                        </option>
                                      );
                                    })}
                                </select>
                                {errorContainer(runform, "state")}
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="lbl-comn-info">Zip Code</label>
                                <input type="text" maxLength={5} className="form-control input-style" {...formAttr(runform, "zip_code")} name="zip_code" />
                                {errorContainer(runform, "zip_code")}
                              </div>
                              <div className="col-12">
                                <div className="border-class pt-2">
                                  <label className="lbl-comn-info">Please enter the name exactly as you would like it filed </label>
                                  <input type="text" className="form-control input-style" name="filedName" {...formAttr(runform, "filedName")} />
                                  {errorContainer(runform, "filedName")}
                                </div>
                              </div>
                              <button type="submit" id="certificateNew" className="d-none">
                                Submit
                              </button>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </Collapse>
                  <div className="payment-area">
                    <AdminPayment submitFormData={submitFormData} buttonId={"certificateNew"} allState={allState} country={country} />
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
