import { Formik } from "formik";
import moment from "moment";
import React from "react";
import * as Yup from "yup";
import { errorContainer, formAttr } from "../const";

const CardForm = ({ submitFormData, setOpenPayment, buttonId, intialize, allState, country }) => {
  return (
    <div className="white-box-main">
      <Formik
        enableReinitialize={intialize}
        initialValues={{
          HolderName: "",
          Card_Number: "",
          expiry_date: "",
          CVV: "",
          street_address: "",
          country: "US",
          city: "",
          state: "",
          zip_code: "",
          startDate: Date.now(),
        }}
        validationSchema={Yup.object({
          HolderName: Yup.string().required("Card holder name is required."),
          Card_Number: Yup.number().required("Card number is required.").typeError("CVV should be number"),
          expiry_date: Yup.date().required("Expiry date is required.").min(Yup.ref("startDate"), "Invalid expiry month or year"),
          CVV: Yup.number().min(3, "CVV should be minimim 3 digit").required("CVV is required.").typeError("CVV should be number"),
          country: Yup.string().required("Country is required."),
          street_address: Yup.string().required("Address is required."),
          city: Yup.string().required("City is required."),
          state: Yup.string().required("State is required."),
          zip_code: Yup.number().required("Zip code is required.").typeError("Zip code is required."),
        })}
        onSubmit={(formData, { resetForm }) => {
          if (buttonId) {
            document.getElementById(buttonId)?.click();
          }
          formData.month = formData.expiry_date?.split("-")?.[1];
          formData.year = formData.expiry_date?.split("-")?.[0];
          submitFormData(formData, resetForm);
        }}
      >
        {(runform) => (
          <form onSubmit={runform.handleSubmit}>
            <div>
              <div className="box-hdr-top border-0 m-0">
                <span>Credit card</span>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="lbl-comn-info">Cardholder Name</label>
                  <input type="text" name="HolderName" {...formAttr(runform, "HolderName")} className="form-control input-style" placeholder="" />
                  {errorContainer(runform, "HolderName")}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="lbl-comn-info">Card Number</label>
                  <input type="tel" name="Card_Number" {...formAttr(runform, "Card_Number")} maxLength="16" className="form-control input-style" placeholder="" />
                  {errorContainer(runform, "Card_Number")}
                </div>
                <div className="col-md-12 mb-3">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="lbl-comn-info">Expiration Date</label>
                      <input type="month" className="form-control input-style" name="expiry_date" min={moment(Date.now()).format("YYYY-MM")} {...formAttr(runform, "expiry_date")} />
                      {errorContainer(runform, "expiry_date")}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="lbl-comn-info">CCV</label>
                      <input type="password" name="CVV" {...formAttr(runform, "CVV")} className="form-control input-style" minLength="3" maxLength="4" placeholder="" />
                      {errorContainer(runform, "CVV")}
                    </div>
                    {/* <div className="col-12">
                      <div className="cust-checkbox-new">
                        <label className="cust-chk-bx">
                          <input type="checkbox" id="" name="" />
                          <span className="cust-chkmark"></span>Available for all the companies
                        </label>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="box-hdr-top border-0 m-0">
                <span>Billing Address</span>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="lbl-comn-info">Street Address</label>
                  <input type="text" name="street_address" {...formAttr(runform, "street_address")} className="form-control input-style" placeholder="" />
                  {errorContainer(runform, "street_address")}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="lbl-comn-info">Country</label>
                  <select className="form-select input-style" name="country" value="US" {...formAttr(runform, "country")}>
                    <option defaultValue="">--- Country ---</option>
                    {country?.length > 0 &&
                      country?.map((item, i) => {
                        return (
                          <option key={i} value={item.isoCode} id={i} disabled selected>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                  {errorContainer(runform, "country")}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="lbl-comn-info">State</label>
                  <select className="form-select input-style" name="state" {...formAttr(runform, "state")}>
                    <option defaultValue="">--- state ---</option>
                    {allState?.length > 0 &&
                      allState?.map((item, i) => {
                        return (
                          <option key={i} value={item.label} id={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                  </select>
                  {errorContainer(runform, "state")}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="lbl-comn-info">City</label>
                  <input type="tel" name="city" {...formAttr(runform, "city")} className="form-control input-style" placeholder="" />
                  {errorContainer(runform, "city")}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="lbl-comn-info">Zip Code</label>
                  <input type="tel" name="zip_code" {...formAttr(runform, "zip_code")} className="form-control input-style" maxLength={5} placeholder="" />
                  {errorContainer(runform, "zip_code")}
                </div>
              </div>
            </div>
            <div className="col-12 text-md-end text-center">
              <button type="submit" className="btn-comn-all ms-3">
                Pay Now
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CardForm;
