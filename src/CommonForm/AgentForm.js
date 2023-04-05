import React, { useRef, useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import { Collapse } from "react-bootstrap";
import * as Yup from "yup";
import { API_PATH, errorContainer, formAttr } from "../const";
import { useLocation } from "react-router-dom";
import { ContactCheckBox } from "../Components/ContactCheckBox";
import { PostApi } from "../ApiService";
import AuthContext from "../Context/AuthContext";

const AgentForm = ({ agentType, hireAgent, submitFormData, setAgentType, agentData, allState, country }) => {
  const location = useLocation();
  const agentRef = useRef();
  const context = useContext(AuthContext);

  const [openform, setOpenRegisterForm] = useState({ individualform: true, companyform: false });
  const [contactInfo, setcontactInfo] = useState("");

  useEffect(() => {
    if (context.contactInfo) {
      setcontactInfo(context.contactInfo);
    }
  }, [context.contactInfo]);

  useEffect(() => {
    if (location?.state?.contactId !== undefined) {
      getContact(location.state.contactId);
    }
  }, [location?.state?.contactId]);

  const getContact = (id) => {
    new Promise((resolve) => resolve(PostApi(API_PATH.getContact, { _id: id }))).then((res) => {
      if (res.status === 200) {
        setcontactInfo(res.data.data);
      }
    });
  };

  return (
    <div>
      <Formik
        innerRef={agentRef}
        enableReinitialize
        initialValues={
          agentType === 1
            ? {
                name: agentData?.name ? agentData?.name : "",
                email: agentData?.email ? agentData?.email : "",
                street_address: agentData?.street_address ? agentData?.street_address : "",
                address: agentData?.address ? agentData?.address : "",
                city: agentData?.city ? agentData?.city : "",
                state: agentData?.state ? agentData?.state : "",
                zip_code: agentData?.zip_code ? agentData?.zip_code : "",
                country: "US",
                hireAgent: hireAgent,
                agentType: 1,
              }
            : {
                company_name: agentData?.company_name ? agentData?.company_name : "",
                company_email: agentData?.company_email ? agentData?.company_email : "",
                company_street_address: agentData?.company_street_address ? agentData?.company_street_address : "",
                company_address: agentData?.company_address ? agentData?.company_address : "",
                company_state: agentData?.company_state ? agentData?.company_state : "",
                company_city: agentData?.company_city ? agentData?.company_city : "",
                company_country: "US",
                company_zip_code: agentData?.company_zip_code ? agentData?.company_zip_code : "",
                hireAgent: hireAgent,
                agentType: 2,
              }
        }
        validationSchema={
          agentType === 1
            ? Yup.object({
                name: Yup.string().required("Name is required."),
                email: Yup.string().required("Email is required.").email("Please enter valid email"),
                street_address: Yup.string().required("Street address is required."),
                city: Yup.string().required("City name is required."),
                state: Yup.string().required("State name is required."),
                // country: Yup.string().required("Country name is required."),
                zip_code: Yup.number().required("Zip code is required.").typeError("Zip code should be number"),
              })
            : Yup.object({
                company_name: Yup.string().required("Company Name is required."),
                company_email: Yup.string().required("Email is required.").email("Please enter valid email"),
                company_street_address: Yup.string().required("Company address is required."),
                // company_country: Yup.string().required("Country name is required."),
                company_state: Yup.string().required("State name is required."),
                company_city: Yup.string().required("City name is required."),
                company_zip_code: Yup.number().required("Company zip code is required.").typeError("Zip code should be number"),
              })
        }
        onSubmit={(formData, { resetForm }) => {
          let data = { company_name: formData.company_name, email: formData.company_email, street_address: formData.company_street_address, address: formData.company_address, state: formData.company_state, city: formData.company_city, zip_code: formData.company_zip_code, hireAgent: hireAgent, agentType: formData.agentType, country: "US" };
          agentType === 1 ? submitFormData(formData, resetForm) : submitFormData(data, resetForm);
        }}
      >
        {(runform) => (
          <form onSubmit={runform.handleSubmit}>
            <div className="row">
              <div className="d-flex" {...formAttr(runform, "agentType")}>
                <div className="col-lg-6 mb-3">
                  <div
                    className="cust-radio-btn diff-radio-class"
                    onClick={() => {
                      let obj = { company_name: "", company_email: "", company_street_address: "", company_city: "", company_country: "US", company_state: "", company_zip_code: "" };
                      runform.setErrors({ ...obj });
                      runform.setTouched({ ...obj });
                      setOpenRegisterForm({ ...openform, individualform: true, companyform: false });
                      setAgentType(1);
                    }}
                  >
                    <input type="radio" id="individual" name="agent-info" checked={runform.values.agentType == 1} className="cust-radio" />
                    <label className="comn-radio-box" htmlFor="individual">
                      Individual
                      <p>work as a Individual Agent</p>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div
                    className="cust-radio-btn diff-radio-class"
                    onClick={() => {
                      let obj = { name: "", email: "", street_address: "", address: "", city: "", state: "", country: "US", zip_code: "" };
                      runform.setErrors({ ...obj });
                      runform.setTouched({ ...obj });
                      setOpenRegisterForm({ ...openform, individualform: false, companyform: true });
                      setAgentType(2);
                    }}
                  >
                    <input type="radio" id="company" name="agent-info" className="cust-radio" checked={runform.values.agentType == 2} />
                    <label className="comn-radio-box" htmlFor="company">
                      Company
                      <p>work as company's agent</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <Collapse in={openform.individualform}>
                  <div className="white-box-main-2 mt-3 arrow-top-left">
                    <div className="row">
                      {ContactCheckBox(contactInfo, agentRef.current, "address")}
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Name</label>
                        <input type="text" className="form-control input-style" name="name" {...formAttr(runform, "name")} />
                        {errorContainer(runform, "name")}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Email</label>
                        <input type="text" className="form-control input-style" name="email" {...formAttr(runform, "email")} />
                        {errorContainer(runform, "email")}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Street Address</label>
                        <input type="text" className="form-control input-style" name="street_address" {...formAttr(runform, "street_address")} />
                        {errorContainer(runform, "street_address")}
                      </div>
                      {/* <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Address (Cont)</label>
                        <input type="text" className="form-control input-style" name="address" {...formAttr(runform, "address")} />
                      </div> */}
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Country</label>
                        <select className="form-select input-style" name="country" value="US" {...formAttr(runform, "country")}>
                          <option defaultValue="">--- country ---</option>
                          {country.length > 0 &&
                            country.map((item, i) => {
                              return (
                                <option key={i} value={item.isoCode} id={item.value} disabled selected>
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                        {errorContainer(runform, "country")}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info"> State</label>
                        <select className="form-select input-style" name="state" {...formAttr(runform, "state")}>
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
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">City</label>
                        <input type="text" className="form-control input-style" name="city" {...formAttr(runform, "city")} />
                        {errorContainer(runform, "city")}
                      </div>
                      <div className="col-lg-6 mb-lg-0">
                        <label className="lbl-comn-info">Zip Code</label>
                        <input type="text" className="form-control input-style" maxLength={5} name="zip_code" {...formAttr(runform, "zip_code")} />
                        {errorContainer(runform, "zip_code")}
                      </div>
                    </div>
                  </div>
                </Collapse>
                <Collapse in={openform.companyform}>
                  <div className="white-box-main-2 mt-3 arrow-top-right">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Company Name</label>
                        <input type="text" className="form-control input-style" name="company_name" {...formAttr(runform, "company_name")} />
                        {errorContainer(runform, "company_name")}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Company Email</label>
                        <input type="text" className="form-control input-style" name="company_email" {...formAttr(runform, "company_email")} />
                        {errorContainer(runform, "company_email")}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Street Address</label>
                        <input type="text" className="form-control input-style" name="company_street_address" {...formAttr(runform, "company_street_address")} />
                        {errorContainer(runform, "company_street_address")}
                      </div>
                      {/* <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Address (Cont)</label>
                        <input type="text" className="form-control input-style" name="company_address" {...formAttr(runform, "company_address")} />
                      </div> */}
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Country</label>
                        <select className="form-select input-style" name="company_country" value="US" {...formAttr(runform, "company_country")}>
                          <option defaultValue="">--- country ---</option>
                          {country.length > 0 &&
                            country.map((item, i) => {
                              return (
                                <option key={i} value={item.isoCode} id={item.value} disabled selected>
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                        {errorContainer(runform, "company_country")}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Select State</label>
                        <select className="form-select input-style" name="company_state" {...formAttr(runform, "company_state")}>
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
                        {errorContainer(runform, "company_state")}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">City</label>
                        <input type="text" className="form-control input-style" name="company_city" {...formAttr(runform, "company_city")} />
                        {errorContainer(runform, "company_city")}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label className="lbl-comn-info">Zip Code</label>
                        <input type="text" className="form-control input-style" name="company_zip_code" maxLength={5} {...formAttr(runform, "company_zip_code")} />
                        {errorContainer(runform, "company_zip_code")}
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
              <button className="d-none" id="agentSubmit" type="submit">
                submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AgentForm;
