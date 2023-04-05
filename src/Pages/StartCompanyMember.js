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
import { useRef } from "react";
import { toast } from "react-toastify";
import { Ordersummary } from "./Common/OrderSummary";
import Whitebox from "./Common/WhiteBox";
import { useAllState, useStartCompanyInfo } from "../Hooks/CustomHook";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { ContactCheckBox } from "../Components/ContactCheckBox";

export default function StartACompanyMember() {
  const location = useLocation();
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const memberRef = useRef([]);
  const existMemberRef = useRef([]);
  const states = useAllState();

  const progressbar = {
    width: "30%",
    ariavaluenow: "30",
    ariavaluemin: "0",
    ariavaluemax: "100",
  };
  const [member, setMember] = useState([]);
  const [errShow, setErrShow] = useState(false);
  const [existMember, setExistMember] = useState([]);
  const [memberType, setMemberType] = useState({ val: 1, index: 0 });
  const [open, setOpenEdit] = useState({
    detailopen: true,
    editdetail: false,
    index: "",
  });
  const companyInfo = useStartCompanyInfo(location.state?.company_Id);
  const [company_Id, setcompany_Id] = useState("");
  const [contactId, setcontactId] = useState("");
  const [contactInfo, setcontactInfo] = useState("");
  const [userPlanId, setuserPlanId] = useState("");
  const [owner, setowner] = useState("");
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    if (
      location.state?.company_Id !== undefined &&
      location?.state?.userPlanId !== undefined
    ) {
      setcompany_Id(location.state?.company_Id);
      setuserPlanId(location.state.userPlanId);
      getMemberData(location.state?.company_Id, location?.state?.owner);
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
    location.state?.company_Id,
    location?.state?.userPlanId,
    location?.state?.contactId,
    location?.state?.owner,
  ]);

  useEffect(() => {
    location?.state?.previousLocation
      ? setPreviousLocation(location.state?.previousLocation)
      : setPreviousLocation(location.pathname);
  }, [location.state?.previousLocation]);

  useEffect(() => {
    window?.scrollTo(0, 0); // scroll to the top of the page on component mount
  }, []);

  const getMemberData = (id, ownerNo) => {
    let data = { company_Id: id };
    new Promise((resolve) =>
      resolve(PostApi(API_PATH.getMemberByCompany, data))
    ).then((res) => {
      if (res.status === 200) {
        context.setCompanyId(id);
        setExistMember(res.data.data?.member ? res.data.data?.member : []);
        setowner(ownerNo ? ownerNo : res.data.data?.member?.length);
      }
    });
  };

  const formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  const errorContainer = (form, field) => {
    return form.touched[field] && form.errors[field] ? (
      <span className="error text-danger">{form.errors[field]}</span>
    ) : null;
  };

  const submitFormData = () => {
    setErrShow(false);
    let data = {
      userPlanId: userPlanId,
      company_Id: company_Id,
      member:
        existMember?.length > 0
          ? existMember.map(({ id, ...rest }, i) => {
              let obj = { ...rest, companyType: rest[`companyType${i}`] };
              delete obj[`companyType${i}`];
              return obj;
            })
          : member.map(({ id, ...rest }, i) => {
              let obj = { ...rest, companyType: rest[`companyType${i}`] };
              delete obj[`companyType${i}`];
              return obj;
            }),
    };
    new Promise((resolve) =>
      resolve(PostApi(API_PATH.createMember, data))
    ).then((res) => {
      if (res.status === 200) {
        setMember([]);
        location.state?.member == "update"
          ? navigate("/start-company-review-order", {
              state: {
                contactId: contactId,
                userPlanId: userPlanId,
                company_Id: company_Id,
              },
            })
          : navigate("/start-company-registered-agent", {
              state: {
                type: "member",
                contactId: contactId,
                userPlanId: userPlanId,
                company_Id: company_Id,
              },
            });
      } else {
        toast.error(res.data.message);
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
    member.length !== parseInt(location.state?.owner) &&
      existMember?.length == 0 &&
      setErrShow(true);
    (member.length == parseInt(location.state?.owner) ||
      existMember?.length > 0) &&
      submitFormData();
  };

  return (
    <FrontLayout>
      <div className="content-after-class">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="start-cmn-top">
                Please provide Members Information for
                <span>
                  {" " + companyInfo?.Cname}{" "}
                  <span className="m-1">{companyInfo?.designator}</span>
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
                {existMember &&
                  existMember.length < parseInt(owner) &&
                  [
                    ...Array(
                      parseInt(owner) - existMember?.length - member?.length
                    ),
                    ...member,
                  ].map((item, i) => {
                    return (
                      <div className="white-box-main mb-3" key={i}>
                        <div className="row">
                          <div className="col-12">
                            <div className="recommendations-info d-flex">
                              <h2 className="position-relative">
                                Member {i + 1}
                              </h2>
                              <div className="ms-auto">
                                <button
                                  className="icon-btn-class btn-hide-show"
                                  type="button"
                                  onClick={() => {
                                    setOpenEdit({
                                      ...open,
                                      editdetail: true,
                                      detailopen: false,
                                      index: i,
                                    });
                                    setMemberType({ ...memberType, index: i });
                                  }}
                                  aria-expanded={
                                    open.editdetail && open.index === i
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
                            <Collapse in={open.detailopen}>
                              <div className="dir-detail-comn" key={i}>
                                {/* <span className="d-block">John Deo</span>
                                <bdi className="d-block">50, Avenue, Rk Road, New York, New York 10001</bdi> */}
                              </div>
                            </Collapse>
                            <Collapse in={open.editdetail && open.index === i}>
                              <div id="EditDetail">
                                <Formik
                                  innerRef={(el) => (memberRef.current[i] = el)}
                                  initialValues={{
                                    id: `member${i}`,
                                    fname: item ? item?.fname : "",
                                    lname: item ? item?.lname : "",
                                    street_address: item
                                      ? item?.street_address
                                      : "",
                                    address: item ? item?.address : "",
                                    city: item ? item?.city : "",
                                    state: item ? item?.state : "",
                                    zip_code: item ? item?.zip_code : "",
                                    Ownership: item ? item?.Ownership : "",
                                    [`companyType${i}`]: 1,
                                    company_name: "",
                                  }}
                                  validationSchema={Yup.object({
                                    fname:
                                      memberType.val == 1 &&
                                      Yup.string().required(
                                        "First name is required."
                                      ),
                                    lname:
                                      memberType.val == 1 &&
                                      Yup.string().required(
                                        "Last name is required."
                                      ),
                                    street_address: Yup.string().required(
                                      "Street Address is required."
                                    ),
                                    // address: Yup.string().required("Address is required."),
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
                                    Ownership: Yup.string().required(
                                      "ownership is required."
                                    ),
                                    company_name:
                                      memberType.val == 2 &&
                                      Yup.string().required(
                                        "Company Name is required."
                                      ),
                                  })}
                                  onSubmit={(formData, { resetForm }) => {
                                    let index =
                                      member?.length > 0
                                        ? member.findIndex(
                                            (item) => item?.id === formData.id
                                          )
                                        : -1;
                                    if (member?.length > 0 && index !== -1) {
                                      member[index] = formData;
                                    }
                                    setMember(
                                      index === -1
                                        ? [...member, formData]
                                        : [...member]
                                    );
                                    setOpenEdit({
                                      ...open,
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
                                      <div
                                        className="col-12 d-flex"
                                        {...formAttr(
                                          runform,
                                          `companyType${i}`
                                        )}
                                      >
                                        <div
                                          className="col-lg-6 mb-3"
                                          onClick={() =>
                                            setMemberType({ val: 1, index: i })
                                          }
                                        >
                                          <div className="cust-radio-btn diff-radio-class">
                                            <input
                                              type="radio"
                                              id={`individual${i}`}
                                              name={`companyType${i}`}
                                              className="cust-radio"
                                              value={1}
                                              defaultChecked
                                            />
                                            <label
                                              className="comn-radio-box"
                                              htmlFor={`individual${i}`}
                                            >
                                              Individual
                                              {/* <p>John Doe</p> */}
                                            </label>
                                          </div>
                                        </div>
                                        <div
                                          className="col-lg-6 mb-3"
                                          onClick={() =>
                                            setMemberType({ val: 2, index: i })
                                          }
                                        >
                                          <div className="cust-radio-btn diff-radio-class">
                                            <input
                                              type="radio"
                                              id={`company${i}`}
                                              name={`companyType${i}`}
                                              className="cust-radio"
                                              value={2}
                                            />
                                            <label
                                              className="comn-radio-box"
                                              htmlFor={`company${i}`}
                                            >
                                              Company
                                              {/* <p>Rentech Digital</p> */}
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 mb-3">
                                        {ContactCheckBox(
                                          contactInfo,
                                          memberRef.current[i],
                                          memberType?.val == 2 ? "address" : ""
                                        )}
                                      </div>
                                      {memberType.val == 1 &&
                                        memberType.index === i && (
                                          <>
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
                                          </>
                                        )}
                                      {memberType.val == 2 &&
                                        memberType.index === i && (
                                          <div className="col-lg-6 mb-3">
                                            <label className="lbl-comn-info">
                                              Company Name
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control input-style"
                                              name="company_name"
                                              {...formAttr(
                                                runform,
                                                "company_name"
                                              )}
                                            />
                                            {errorContainer(
                                              runform,
                                              "company_name"
                                            )}
                                          </div>
                                        )}
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
                                          Address (Cont)
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-style"
                                          name="address"
                                          {...formAttr(runform, "address")}
                                        />
                                        {errorContainer(runform, "address")}
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
                                          State
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
                                      <div className="col-lg-6 mb-3">
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
                                      <div className="col-lg-6 mb-3">
                                        <label className="lbl-comn-info">
                                          % of Ownership
                                        </label>
                                        <select
                                          className="form-select input-style"
                                          {...formAttr(runform, "Ownership")}
                                          name="Ownership"
                                        >
                                          <option defaultValue="">
                                            --- % Ownership ---
                                          </option>
                                          <option value={20}>20 %</option>
                                          <option value={30}>30 %</option>
                                          <option value={90}>90 %</option>
                                        </select>
                                        {errorContainer(runform, "Ownership")}
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
                {existMember &&
                  existMember?.length > 0 &&
                  existMember.map((item, i) => {
                    return (
                      <div
                        className="white-box-main mb-3"
                        key={parseInt(owner) - existMember?.length + i + 1}
                      >
                        <div className="row">
                          <div className="col-12">
                            <div className="recommendations-info d-flex">
                              <h2 className="position-relative">
                                Member{" "}
                                {parseInt(owner) - existMember?.length + i + 1}
                              </h2>
                              <div className="ms-auto">
                                <button
                                  className="icon-btn-class btn-hide-show"
                                  type="button"
                                  onClick={() => {
                                    setOpenEdit({
                                      ...open,
                                      editdetail: true,
                                      detailopen: false,
                                      index:
                                        parseInt(owner) -
                                        existMember?.length +
                                        i +
                                        1,
                                    });
                                    setMemberType({
                                      ...memberType,
                                      index:
                                        parseInt(owner) -
                                        existMember?.length +
                                        i +
                                        1,
                                    });
                                  }}
                                  aria-expanded={
                                    open.editdetail &&
                                    open.index ===
                                      parseInt(owner) -
                                        existMember?.length +
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
                            <Collapse in={open.detailopen}>
                              <div
                                className="dir-detail-comn"
                                key={
                                  parseInt(owner) - existMember?.length + i + 1
                                }
                              >
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
                                open.editdetail &&
                                open.index ===
                                  parseInt(owner) - existMember?.length + i + 1
                              }
                            >
                              <div id="EditDetail">
                                <Formik
                                  innerRef={(el) =>
                                    (existMemberRef.current[i] = el)
                                  }
                                  enableReinitialize
                                  initialValues={{
                                    _id: item?._id,
                                    id: `member${
                                      parseInt(owner) -
                                      existMember?.length +
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
                                    Ownership: item?.Ownership,
                                    [`companyType${
                                      parseInt(owner) -
                                      existMember?.length +
                                      i +
                                      1
                                    }`]: item?.companyType,
                                  }}
                                  validationSchema={Yup.object({
                                    fname:
                                      memberType.val == 1 &&
                                      Yup.string().required(
                                        "First name is required."
                                      ),
                                    lname:
                                      memberType.val == 1 &&
                                      Yup.string().required(
                                        "Last name is required."
                                      ),
                                    street_address: Yup.string().required(
                                      "Street Address is required."
                                    ),
                                    // address: Yup.string().required("Address is required."),
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
                                    Ownership: Yup.string().required(
                                      "ownership is required."
                                    ),
                                    company_name:
                                      memberType.val == 2 &&
                                      Yup.string().required(
                                        "Company Name is required."
                                      ),
                                  })}
                                  onSubmit={(formData, { resetForm }) => {
                                    let index =
                                      existMember?.length > 0
                                        ? existMember.findIndex(
                                            (item) =>
                                              item?.id === formData.id ||
                                              item?._id === formData?._id
                                          )
                                        : -1;
                                    if (
                                      existMember?.length > 0 &&
                                      index !== -1
                                    ) {
                                      setExistMember(
                                        (existMember[index] = formData)
                                      );
                                    }
                                    setExistMember(
                                      index === -1
                                        ? [...existMember, formData]
                                        : [...existMember]
                                    );
                                    setOpenEdit({
                                      ...open,
                                      editdetail: false,
                                      detailopen: true,
                                      index:
                                        parseInt(owner) -
                                        existMember?.length +
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
                                      <div
                                        className="col-12 d-flex"
                                        {...formAttr(
                                          runform,
                                          `companyType${
                                            parseInt(owner) -
                                            existMember?.length +
                                            i +
                                            1
                                          }`
                                        )}
                                      >
                                        <div
                                          className="col-lg-6 mb-3"
                                          onClick={() =>
                                            setMemberType({
                                              val: 1,
                                              index:
                                                parseInt(owner) -
                                                existMember?.length +
                                                i +
                                                1,
                                            })
                                          }
                                        >
                                          <div className="cust-radio-btn diff-radio-class">
                                            <input
                                              type="radio"
                                              id={`individual${
                                                parseInt(owner) -
                                                existMember?.length +
                                                i +
                                                1
                                              }`}
                                              name={`companyType${
                                                parseInt(owner) -
                                                existMember?.length +
                                                i +
                                                1
                                              }`}
                                              className="cust-radio"
                                              value={1}
                                              defaultChecked
                                            />
                                            <label
                                              className="comn-radio-box"
                                              htmlFor={`individual${
                                                parseInt(owner) -
                                                existMember?.length +
                                                i +
                                                1
                                              }`}
                                            >
                                              Individual
                                              <p>
                                                {item?.fname +
                                                  " " +
                                                  item?.lname}
                                              </p>
                                            </label>
                                          </div>
                                        </div>
                                        <div
                                          className="col-lg-6 mb-3"
                                          onClick={() =>
                                            setMemberType({
                                              val: 2,
                                              index:
                                                parseInt(owner) -
                                                existMember?.length +
                                                i +
                                                1,
                                            })
                                          }
                                        >
                                          <div className="cust-radio-btn diff-radio-class">
                                            <input
                                              type="radio"
                                              id={`company${
                                                parseInt(owner) -
                                                existMember?.length +
                                                i +
                                                1
                                              }`}
                                              name={`companyType${
                                                parseInt(owner) -
                                                existMember?.length +
                                                i +
                                                1
                                              }`}
                                              className="cust-radio"
                                              value={2}
                                            />
                                            <label
                                              className="comn-radio-box"
                                              htmlFor={`company${
                                                parseInt(owner) -
                                                existMember?.length +
                                                i +
                                                1
                                              }`}
                                            >
                                              Company
                                              <p>{companyInfo?.Cname}</p>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 mb-3">
                                        {ContactCheckBox(
                                          contactInfo,
                                          existMemberRef.current[
                                            parseInt(owner) -
                                              existMember?.length +
                                              i +
                                              1
                                          ],
                                          memberType?.val == 2 ? "address" : ""
                                        )}
                                      </div>
                                      {memberType.val == 1 &&
                                        memberType.index ===
                                          parseInt(owner) -
                                            existMember?.length +
                                            i +
                                            1 && (
                                          <>
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
                                          </>
                                        )}
                                      {memberType.val == 2 &&
                                        memberType.index ===
                                          parseInt(owner) -
                                            existMember?.length +
                                            i +
                                            1 && (
                                          <div className="col-lg-6 mb-3">
                                            <label className="lbl-comn-info">
                                              Company Name
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control input-style"
                                              name="company_name"
                                              {...formAttr(
                                                runform,
                                                "company_name"
                                              )}
                                            />
                                            {errorContainer(
                                              runform,
                                              "company_name"
                                            )}
                                          </div>
                                        )}
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
                                          Address (Cont)
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control input-style"
                                          name="address"
                                          {...formAttr(runform, "address")}
                                        />
                                        {errorContainer(runform, "address")}
                                      </div>
                                      <div className="col-lg-6 mb-3">
                                        <label className="lbl-comn-info">
                                          State
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
                                      <div className="col-lg-6 mb-3">
                                        <label className="lbl-comn-info">
                                          % of Ownership
                                        </label>
                                        <select
                                          className="form-select input-style"
                                          {...formAttr(runform, "Ownership")}
                                          name="Ownership"
                                        >
                                          <option defaultValue="">
                                            --- % Ownership ---
                                          </option>
                                          <option value={20}>20 %</option>
                                          <option value={30}>30 %</option>
                                          <option value={90}>90 %</option>
                                        </select>
                                        {errorContainer(runform, "Ownership")}
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
                <div className="col-12">
                  <div className="d-flex align-items-center">
                    {!location.state?.member && (
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
                      {location.state?.member == "update" ? "Update" : "Next"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <Ordersummary progressbar={progressbar} userPlanId={userPlanId} />
              <Whitebox />
            </div>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
