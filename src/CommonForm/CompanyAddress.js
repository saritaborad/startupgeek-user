import { Formik } from "formik";
import React from "react";
import { useEffect, useContext, useState, useRef } from "react";
import * as Yup from "yup";
import { ContactCheckBox } from "../Components/ContactCheckBox";
import { errorContainer, formAttr } from "../const";
import AuthContext from "../Context/AuthContext";

const CompanyAddress = ({ submitFormData, allState }) => {
  const companyAddRef = useRef();
  const context = useContext(AuthContext);

  const [contactInfo, setcontactInfo] = useState("");

  useEffect(() => {
    if (context.contactInfo) {
      setcontactInfo(context.contactInfo);
    }
  }, [context.contactInfo]);

  return (
    <Formik
      innerRef={companyAddRef}
      enableReinitialize
      initialValues={{
        street_address: "",
        state: "",
        city: "",
        zip_code: "",
      }}
      validationSchema={Yup.object({
        street_address: Yup.string().required("Company address is required."),
        state: Yup.string().required("Company state is required."),
        city: Yup.string().required("City name is required."),
        zip_code: Yup.number().required("Company zip code is required.").typeError("Zip code should be number"),
      })}
      onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
    >
      {(runform) => (
        <form onSubmit={runform.handleSubmit} className="row">
          {ContactCheckBox(contactInfo, companyAddRef.current, "address")}
          <div className="col-lg-6 mb-3">
            <label className="lbl-comn-info">Street Address</label>
            <input type="text" className="form-control input-style" name="street_address" {...formAttr(runform, "street_address")} />
            {errorContainer(runform, "street_address")}
          </div>
          <div className="col-lg-6 mb-3">
            <label className="lbl-comn-info">Select State</label>
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
          <div className="col-lg-6 mb-3">
            <label className="lbl-comn-info">Zip Code</label>
            <input type="text" className="form-control input-style" name="zip_code" maxLength={5} {...formAttr(runform, "zip_code")} />
            {errorContainer(runform, "zip_code")}
          </div>
          <button type="submit" id="businessLiceId" className="d-none">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default CompanyAddress;
