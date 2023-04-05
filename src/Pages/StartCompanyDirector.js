import React, { useEffect, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import Info from "../Images/info-icon.svg";
import "react-phone-input-2/lib/style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Collapse } from "react-bootstrap";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { useLocation, useNavigate } from "react-router-dom";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { useAllState, useStartCompanyInfo } from "../Hooks/CustomHook";
import { errorContainer, formAttr } from "../const";
import { useRef } from "react";
import { ContactCheckBox } from "../Components/ContactCheckBox";

export default function StartACompanyDirector() {
  const directorRef = useRef([]);
  const existDirectorRef = useRef([]);
  const states = useAllState();
  let location = useLocation();
  let navigate = useNavigate();

  const progressbar = {
    width: "30%",
    ariavaluenow: "30",
    ariavaluemin: "0",
    ariavaluemax: "100",
  };

  const [director, setDirector] = useState([]);
  const [president, setPresident] = useState("");
  const [secretary, setSecretary] = useState("");
  const [treasurer, setTreasurer] = useState("");
  const [vice_president, setVice_president] = useState("");
  const [presidentName, setPresidentName] = useState("");
  const [secretaryName, setSecretaryName] = useState("");
  const [treasurerName, setTreasurerName] = useState("");
  const [vice_presidentName, setVice_presidentName] = useState("");
  const [errShow, setErrShow] = useState(false);
  const [existDirector, setExistDirector] = useState([]);
  const [company_Id, setcompany_Id] = useState("");
  const [userPlanId, setuserPlanId] = useState("");
  const [contactId, setcontactId] = useState("");
  const [contactInfo, setcontactInfo] = useState("");
  const [owner, setowner] = useState("");
  const companyInfo = useStartCompanyInfo(location.state?.company_Id);
  const [previousLocation, setPreviousLocation] = useState(null);

  const [open1, setOpenEdit1] = useState({
    detailopen: true,
    editdetail: false,
    index: "",
  });

  useEffect(() => {
    if (
      location?.state?.company_Id !== undefined &&
      location?.state?.userPlanId !== undefined
    ) {
      setcompany_Id(location.state.company_Id);
      setuserPlanId(location.state.userPlanId);
      getDirectorData(location.state.company_Id, location?.state?.owner);
    } else {
      navigate("/start-company-business");
    }
    if (location?.state?.contactId !== undefined) {
      setcontactId(location.state.contactId);
      getContact(location.state.contactId);
    }
    if (location?.state?.owner) {
      setowner(location.state.owner);
    }
  }, [
    location?.state?.company_Id,
    location?.state?.userPlanId,
    location?.state?.contactId,
    location?.state?.owner,
  ]);

  useEffect(() => {
    location?.state?.previousLocation
      ? setPreviousLocation(location.state?.previousLocation)
      : setPreviousLocation(location.pathname);
  }, [location.state?.previousLocation]);

  const getDirectorData = (id, ownerNo) => {
    new Promise((resolve) =>
      resolve(PostApi(API_PATH.getDirectorByCompany, { company_Id: id }))
    ).then((res) => {
      if (res.status === 200) {
        setExistDirector(
          res.data.data?.director ? res.data.data?.director : []
        );
        setowner(ownerNo ? ownerNo : res.data.data?.director?.length);
      }
    });
  };

  const submitFormData = () => {
    let data = {
      userPlanId: userPlanId,
      company_Id: company_Id,
      director:
        existDirector?.length > 0
          ? existDirector.map(({ id, ...rest }) => rest)
          : director.map(({ id, ...rest }) => rest),
      president: president != "other" ? president : presidentName,
      secretary: secretary != "other" ? secretary : secretaryName,
      treasurer: treasurer != "other" ? treasurer : treasurerName,
      vice_president:
        vice_president != "other" ? vice_president : vice_presidentName,
    };
    new Promise((resolve) =>
      resolve(PostApi(API_PATH.createDirector, data))
    ).then((res) => {
      if (res.status === 200) {
        setDirector([]);
        location.state?.director === "update"
          ? navigate("/start-company-review-order", {
              state: {
                contactId: contactId,
                userPlanId: userPlanId,
                company_Id: company_Id,
              },
            })
          : navigate("/start-company-shareholder", {
              state: {
                directorList: res.data.data.director,
                userPlanId: userPlanId,
                contactId: contactId,
                company_Id: company_Id,
                shareholders_no: location.state.shareholders_no,
              },
            });
      }
    });
  };

  const getContact = (contactId) => {
    new Promise((resolve) =>
      resolve(PostApi(API_PATH.getContact, { _id: contactId }))
    ).then((res) => {
      if (res.status === 200) {
        setcontactInfo(res.data.data);
      }
    });
  };

  const goPrevious = () => {
    navigate("/start-company-info", {
      state: {
        contactId: contactId,
        userPlanId: userPlanId,
        company_Id: company_Id,
        previousLocation: previousLocation,
      },
    });
  };

  const goNext = () => {
    setPreviousLocation(location.pathname);
    director.length !== +location.state.owner &&
      existDirector?.length == 0 &&
      setErrShow(true);
    (director.length == +location.state.owner || existDirector?.length > 0) &&
      submitFormData();
  };

  return (
    <FrontLayout>
      <div className="content-after-class">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="start-cmn-top">
                Please provide Directors Information for
                <span>
                  {companyInfo?.Cname}{" "}
                  <span className="m-1">{companyInfo?.entity_type}</span>
                </span>
                {errShow && (
                  <div
                    className="text-danger text-start mt-3"
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    Add details of all member to continue
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="mb-3">
                {/* -------------- director details ------------- */}
                {existDirector &&
                  existDirector.length < parseInt(owner) &&
                  [...Array(parseInt(owner) - existDirector?.length)].map(
                    (e, i) => {
                      return (
                        <div className="white-box-main mb-3" key={i}>
                          <div className="row">
                            <div className="col-12">
                              <div className="recommendations-info d-flex">
                                <h2 className="position-relative">
                                  Director {i + 1}
                                </h2>
                                <div className="ms-auto">
                                  <button
                                    className="icon-btn-class btn-hide-show"
                                    type="button"
                                    onClick={() =>
                                      setOpenEdit1({
                                        ...open1,
                                        editdetail: true,
                                        detailopen: false,
                                        index: i,
                                      })
                                    }
                                    aria-expanded={
                                      open1.editdetail && open1.index === i
                                    }
                                    aria-controls="EditDetail"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="white"
                                      className="bi bi-pencil"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <Collapse in={open1.detailopen}>
                                <div className="dir-detail-comn">
                                  {/* <span className="d-block">{director.length > 0 && director[i]?.fname + " " + director[i]?.lname}</span>
                                {director.length > 0 && director[i]?.street_address + "," + director[i]?.city + "," + director[i]?.state + "," + director[i]?.zip_code}
                                <bdi className="d-block"></bdi> */}
                                </div>
                              </Collapse>
                              <Collapse
                                in={open1.editdetail && open1.index === i}
                              >
                                <div id="EditDetail">
                                  <Formik
                                    innerRef={(el) =>
                                      (directorRef.current[i] = el)
                                    }
                                    enableReinitialize
                                    initialValues={{
                                      id: `director${i}`,
                                      fname: "",
                                      lname: "",
                                      street_address: "",
                                      address: "",
                                      city: "",
                                      state: "",
                                      zip_code: "",
                                    }}
                                    validationSchema={Yup.object({
                                      fname: Yup.string().required(
                                        "First name is required."
                                      ),
                                      lname: Yup.string().required(
                                        "Last name is required."
                                      ),
                                      street_address: Yup.string().required(
                                        "Street Address is required."
                                      ),
                                      state:
                                        Yup.string().required(
                                          "state is required."
                                        ),
                                      city: Yup.string().required(
                                        "City Name is required."
                                      ),
                                      zip_code: Yup.number()
                                        .required("zip_code is required.")
                                        .typeError("Zip code should be number"),
                                    })}
                                    onSubmit={(formData, { resetForm }) => {
                                      let index =
                                        director?.length > 0
                                          ? director.findIndex(
                                              (item) => item?.id === formData.id
                                            )
                                          : -1;
                                      if (
                                        director?.length > 0 &&
                                        index !== -1
                                      ) {
                                        setDirector(
                                          (director[index] = formData)
                                        );
                                      }
                                      setDirector(
                                        index === -1
                                          ? [...director, formData]
                                          : [...director]
                                      );
                                      setOpenEdit1({
                                        ...open1,
                                        editdetail: false,
                                        detailopen: true,
                                        index: i,
                                      });
                                    }}
                                  >
                                    {(runform) => (
                                      <form
                                        className="row"
                                        onSubmit={runform.handleSubmit}
                                      >
                                        {ContactCheckBox(
                                          contactInfo,
                                          directorRef.current[i]
                                        )}
                                        <div className="col-lg-6 mb-3">
                                          <label className="lbl-comn-info">
                                            First Name
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control input-style"
                                            name="fname"
                                            {...formAttr(runform, "fname")}
                                          />
                                          {errorContainer(runform, "fname")}
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                          <label className="lbl-comn-info">
                                            Last Name
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control input-style"
                                            name="lname"
                                            {...formAttr(runform, "lname")}
                                          />
                                          {errorContainer(runform, "lname")}
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                          <label className="lbl-comn-info">
                                            Street Address
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control input-style"
                                            name="street_address"
                                            {...formAttr(
                                              runform,
                                              "street_address"
                                            )}
                                          />
                                          {errorContainer(
                                            runform,
                                            "street_address"
                                          )}
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                          <label className="lbl-comn-info">
                                            City
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control input-style"
                                            name="city"
                                            {...formAttr(runform, "city")}
                                          />
                                          {errorContainer(runform, "city")}
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                          <label className="lbl-comn-info">
                                            Select state
                                          </label>
                                          <select
                                            className="form-select input-style"
                                            {...formAttr(runform, "state")}
                                            name="state"
                                          >
                                            <option defaultValue="">
                                              --- state ---
                                            </option>
                                            {states.length > 0 &&
                                              states.map((item, i) => {
                                                return (
                                                  <option
                                                    key={i}
                                                    value={item.label}
                                                    id={item.value}
                                                  >
                                                    {item.label}
                                                  </option>
                                                );
                                              })}
                                          </select>
                                          {errorContainer(runform, "state")}
                                        </div>
                                        <div className="col-6 mb-3">
                                          <label className="lbl-comn-info">
                                            Zip Code
                                          </label>
                                          <input
                                            type="tel"
                                            className="form-control input-style"
                                            name="zip_code"
                                            maxLength={5}
                                            {...formAttr(runform, "zip_code")}
                                          />
                                          {errorContainer(runform, "zip_code")}
                                        </div>
                                        <div className="col-12 mb-3">
                                          <div className="text-end">
                                            <button
                                              className="btn-comn-all btn-after-class"
                                              type="submit"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </div>
                                        <div className="col-12">
                                          <div className="agnt-dtls-btm">
                                            <img
                                              src={Info}
                                              className="me-3 img-fluid"
                                              alt="arrow"
                                            />
                                            <div className="agent-head-info">
                                              Lorem ipsum dolor sit amet,
                                              consectetur adipiscing elit.
                                              Mattis et sed nam sem tellus erat.
                                            </div>
                                          </div>
                                        </div>
                                      </form>
                                    )}
                                  </Formik>
                                </div>
                              </Collapse>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                {existDirector &&
                  existDirector?.length > 0 &&
                  existDirector.map((item, i) => {
                    return (
                      <div
                        className="white-box-main mb-3"
                        key={parseInt(owner) - existDirector?.length + i + 1}
                      >
                        <div className="row">
                          <div className="col-12">
                            <div className="recommendations-info d-flex">
                              <h2 className="position-relative">
                                Director{" "}
                                {parseInt(owner) -
                                  existDirector?.length +
                                  i +
                                  1}
                              </h2>
                              <div className="ms-auto">
                                <button
                                  className="icon-btn-class btn-hide-show"
                                  type="button"
                                  onClick={() =>
                                    setOpenEdit1({
                                      ...open1,
                                      editdetail: true,
                                      detailopen: false,
                                      index:
                                        parseInt(owner) -
                                        existDirector?.length +
                                        i +
                                        1,
                                    })
                                  }
                                  aria-expanded={
                                    open1.editdetail &&
                                    open1.index ===
                                      parseInt(owner) -
                                        existDirector?.length +
                                        i +
                                        1
                                  }
                                  aria-controls="EditDetail"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="white"
                                    className="bi bi-pencil"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <Collapse in={open1.detailopen}>
                              <div className="dir-detail-comn">
                                <span className="d-block">
                                  {item?.fname + " " + item?.lname}
                                </span>
                                <bdi className="d-block">
                                  {item?.street_address}
                                </bdi>
                              </div>
                            </Collapse>
                            <Collapse
                              in={
                                open1.editdetail &&
                                open1.index ===
                                  parseInt(owner) -
                                    existDirector?.length +
                                    i +
                                    1
                              }
                            >
                              <div id="EditDetail">
                                <Formik
                                  enableReinitialize
                                  innerRef={(el) =>
                                    (existDirectorRef.current[i] = el)
                                  }
                                  initialValues={{
                                    _id: item?._id,
                                    id: `director${
                                      parseInt(owner) -
                                      existDirector?.length +
                                      i +
                                      1
                                    }`,
                                    fname: item?.fname,
                                    lname: item?.lname,
                                    street_address: item?.street_address,
                                    address: item?.address,
                                    city: item?.city,
                                    state: item?.state,
                                    zip_code: item?.zip_code,
                                  }}
                                  validationSchema={Yup.object({
                                    fname: Yup.string().required(
                                      "First name is required."
                                    ),
                                    lname: Yup.string().required(
                                      "Last name is required."
                                    ),
                                    street_address: Yup.string().required(
                                      "Street Address is required."
                                    ),
                                    address: Yup.string().required(
                                      "Address is required."
                                    ),
                                    state:
                                      Yup.string().required(
                                        "state is required."
                                      ),
                                    city: Yup.string().required(
                                      "City Name is required."
                                    ),
                                    zip_code: Yup.number()
                                      .required("zip_code is required.")
                                      .typeError("Zip code should be number"),
                                  })}
                                  onSubmit={(formData, { resetForm }) => {
                                    let index =
                                      existDirector?.length > 0
                                        ? existDirector.findIndex(
                                            (item) =>
                                              item?.id === formData.id ||
                                              item?._id === formData?._id
                                          )
                                        : -1;
                                    if (
                                      existDirector?.length > 0 &&
                                      index !== -1
                                    ) {
                                      setExistDirector(
                                        (existDirector[index] = formData)
                                      );
                                    }
                                    setExistDirector(
                                      index === -1
                                        ? [...existDirector, formData]
                                        : [...existDirector]
                                    );
                                    setOpenEdit1({
                                      ...open1,
                                      editdetail: false,
                                      detailopen: true,
                                      index:
                                        parseInt(owner) -
                                        existDirector?.length +
                                        i +
                                        1,
                                    });
                                  }}
                                >
                                  {(runform) => (
                                    <form
                                      className="row"
                                      onSubmit={runform.handleSubmit}
                                    >
                                      {ContactCheckBox(
                                        contactInfo,
                                        existDirectorRef.current[
                                          parseInt(owner) -
                                            existDirector?.length +
                                            i +
                                            1
                                        ]
                                      )}
                                      <div className="col-lg-6 mb-3">
                                        <label className="lbl-comn-info">
                                          First Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-style"
                                          name="fname"
                                          {...formAttr(runform, "fname")}
                                        />
                                        {errorContainer(runform, "fname")}
                                      </div>
                                      <div className="col-lg-6 mb-3">
                                        <label className="lbl-comn-info">
                                          Last Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-style"
                                          name="lname"
                                          {...formAttr(runform, "lname")}
                                        />
                                        {errorContainer(runform, "lname")}
                                      </div>
                                      <div className="col-lg-6 mb-3">
                                        <label className="lbl-comn-info">
                                          Street Address
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-style"
                                          name="street_address"
                                          {...formAttr(
                                            runform,
                                            "street_address"
                                          )}
                                        />
                                        {errorContainer(
                                          runform,
                                          "street_address"
                                        )}
                                      </div>
                                      <div className="col-lg-6 mb-3">
                                        <label className="lbl-comn-info">
                                          City
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-style"
                                          name="city"
                                          {...formAttr(runform, "city")}
                                        />
                                        {errorContainer(runform, "city")}
                                      </div>
                                      <div className="col-lg-6 mb-3">
                                        <label className="lbl-comn-info">
                                          Select state
                                        </label>
                                        <select
                                          className="form-select input-style"
                                          {...formAttr(runform, "state")}
                                          name="state"
                                        >
                                          <option defaultValue="">
                                            --- state ---
                                          </option>
                                          {states.length > 0 &&
                                            states.map((item, i) => {
                                              return (
                                                <option
                                                  key={i}
                                                  value={item.label}
                                                  id={item.value}
                                                >
                                                  {item.label}
                                                </option>
                                              );
                                            })}
                                        </select>
                                        {errorContainer(runform, "state")}
                                      </div>
                                      <div className="col-6 mb-3">
                                        <label className="lbl-comn-info">
                                          Zip Code
                                        </label>
                                        <input
                                          type="tel"
                                          className="form-control input-style"
                                          name="zip_code"
                                          maxLength={5}
                                          {...formAttr(runform, "zip_code")}
                                        />
                                        {errorContainer(runform, "zip_code")}
                                      </div>
                                      <div className="col-12 mb-3">
                                        <div className="text-end">
                                          <button
                                            className="btn-comn-all btn-after-class"
                                            type="submit"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                      <div className="col-12">
                                        <div className="agnt-dtls-btm">
                                          <img
                                            src={Info}
                                            className="me-3 img-fluid"
                                            alt="arrow"
                                          />
                                          <div className="agent-head-info">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Mattis
                                            et sed nam sem tellus erat.
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  )}
                                </Formik>
                              </div>
                            </Collapse>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {/* --------------------------- */}
                <div className="recommendations-info mb-3">
                  <h3>Officer Information</h3>
                </div>
                <Formik
                  enableReinitialize
                  initialValues={{
                    president: existDirector?.president,
                    secretary: existDirector?.secretary,
                    treasurer: existDirector?.treasurer,
                    vice_president: existDirector?.vice_president,
                  }}
                  validationSchema={Yup.object({
                    president: Yup.string().required(
                      "president name is required."
                    ),
                    secretary: Yup.string().required(
                      "secretary name is required."
                    ),
                    treasurer: Yup.string().required(
                      "treasurer name is required."
                    ),
                    vice_president: Yup.string().required(
                      "vice_president is required."
                    ),
                  })}
                  onSubmit={(formData, { resetForm }) =>
                    submitFormData(formData, resetForm)
                  }
                >
                  {(runform) => (
                    <form className="row" onSubmit={runform.handleSubmit}>
                      <div className="white-box-main">
                        <div className="col-12 mb-3">
                          <div className="recommendations-info">
                            <h2 className="position-relative">President/CEO</h2>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <select
                            className="form-select input-style"
                            name="president"
                            onChange={(e) => setPresident(e.target.value)}
                          >
                            <option defaultValue="">Select President</option>
                            {existDirector?.length > 0
                              ? existDirector.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={item?.fname + " " + item?.lname}
                                    >
                                      {item.fname} {item.lname}
                                    </option>
                                  );
                                })
                              : director.length > 0 &&
                                director.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={item?.fname + " " + item?.lname}
                                    >
                                      {item.fname} {item.lname}
                                    </option>
                                  );
                                })}
                            <option value="other">Other</option>
                          </select>
                          {errorContainer(runform, "president")}
                          {president == "other" && (
                            <div className="col-lg-12 mb-3">
                              <label className="lbl-comn-info">Full Name</label>
                              <input
                                type="text"
                                className="form-control input-style"
                                name="president"
                                onChange={(e) =>
                                  setPresidentName(e.target.value)
                                }
                                required
                              />
                            </div>
                          )}
                        </div>
                        <div className="col-12 mb-3">
                          <div className="recommendations-info">
                            <h2 className="position-relative">Secretary</h2>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <select
                            className="form-select input-style"
                            name="secretary"
                            onChange={(e) => setSecretary(e.target.value)}
                          >
                            <option defaultValue="">Select secretary</option>
                            {existDirector?.length > 0
                              ? existDirector.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={item?.fname + " " + item?.lname}
                                    >
                                      {item.fname} {item.lname}
                                    </option>
                                  );
                                })
                              : director.length > 0 &&
                                director.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={item?.fname + " " + item?.lname}
                                    >
                                      {item.fname} {item.lname}
                                    </option>
                                  );
                                })}
                            <option value="other">Other</option>
                          </select>
                          {errorContainer(runform, "secretary")}
                          {secretary == "other" && (
                            <div className="col-lg-12 mb-3">
                              <label className="lbl-comn-info">Full Name</label>
                              <input
                                type="text"
                                className="form-control input-style"
                                name="seecretory"
                                onChange={(e) =>
                                  setSecretaryName(e.target.value)
                                }
                                required
                              />
                            </div>
                          )}
                        </div>
                        <div className="col-12 mb-3">
                          <div className="recommendations-info">
                            <h2 className="position-relative">Treasurer</h2>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <select
                            className="form-select input-style"
                            name="treasurer"
                            onChange={(e) => setTreasurer(e.target.value)}
                          >
                            <option defaultValue="">Select Treasurer</option>
                            {existDirector?.length > 0
                              ? existDirector.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={item?.fname + " " + item?.lname}
                                    >
                                      {item.fname} {item.lname}
                                    </option>
                                  );
                                })
                              : director.length > 0 &&
                                director.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={item?.fname + " " + item?.lname}
                                    >
                                      {item.fname} {item.lname}
                                    </option>
                                  );
                                })}
                            <option value="other">Other</option>
                          </select>
                          {errorContainer(runform, "treasurer")}
                          {treasurer == "other" && (
                            <div className="col-lg-12 mb-3">
                              <label className="lbl-comn-info">Full Name</label>
                              <input
                                type="text"
                                className="form-control input-style"
                                name="treasurer"
                                onChange={(e) =>
                                  setTreasurerName(e.target.value)
                                }
                                required
                              />
                            </div>
                          )}
                        </div>
                        <div className="col-12 mb-3">
                          <div className="recommendations-info">
                            <h2 className="position-relative">
                              Vice President (Optional)
                            </h2>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <select
                            className="form-select input-style"
                            name="vice_president"
                            onChange={(e) => setVice_president(e.target.value)}
                          >
                            <option defaultValue="">
                              Select vice president
                            </option>
                            {existDirector?.length > 0
                              ? existDirector.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={item?.fname + " " + item?.lname}
                                    >
                                      {item.fname} {item.lname}
                                    </option>
                                  );
                                })
                              : director.length > 0 &&
                                director.map((item, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={item?.fname + " " + item?.lname}
                                    >
                                      {item.fname} {item.lname}
                                    </option>
                                  );
                                })}
                            <option value="other">Other</option>
                          </select>
                          {errorContainer(runform, "vice_president")}
                          {vice_president == "other" && (
                            <div className="col-lg-12 mb-3">
                              <label className="lbl-comn-info">Full Name</label>
                              <input
                                type="text"
                                className="form-control input-style"
                                name="vice_president"
                                onChange={(e) =>
                                  setVice_presidentName(e.target.value)
                                }
                                required
                              />
                            </div>
                          )}
                        </div>
                        <div className="col-12">
                          <div className="d-flex align-items-center">
                            {!location.state?.director && (
                              <button
                                className="btn-comn-all3 btn-after-class"
                                type="button"
                                onClick={() => goPrevious()}
                              >
                                Previous
                              </button>
                            )}
                            <button
                              className="ms-auto btn-comn-all btn-after-class"
                              type="button"
                              onClick={() => goNext()}
                            >
                              {location.state?.director === "update"
                                ? "Update"
                                : "Next"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-lg-4">
              <Ordersummary
                progressbar={progressbar}
                service={""}
                userPlanId={userPlanId}
              />
              <Whitebox />
            </div>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
