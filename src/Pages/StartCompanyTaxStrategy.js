import React, { useContext, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import { Collapse } from "react-bootstrap";
import Info from "../Images/info-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { useServiceInfo } from "../Hooks/CustomHook";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AuthContext from "../Context/AuthContext";

export default function StartACompanyTaxStrategy() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AuthContext);

  const progressbar = {
    width: "80%",
    ariavaluenow: "80",
    ariavaluemin: "0",
    ariavaluemax: "100",
  };
  const [taxStrategy, setTaxStrategy] = useState(2);
  const [open, setOpenbusiness] = useState({
    freebusiness: false,
    otherbusiness: false,
  });
  const [company_Id, setcompany_Id] = useState("");
  const [userPlanId, setuserPlanId] = useState("");
  const [contactId, setcontactId] = useState("");
  const serviceInfo = useServiceInfo("Tax Strategy");
  const [company, setCompany] = useState("");
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    setCompany(context.company);
  }, [context.company]);

  useEffect(() => {
    if (
      location?.state?.company_Id !== undefined &&
      location?.state?.userPlanId !== undefined
    ) {
      setcompany_Id(location.state.company_Id);
      context.setviewCompanyId(location.state.company_Id);
      setuserPlanId(location.state.userPlanId);
      getTaxStretagyInfo(location.state.company_Id);
    } else {
      navigate("/start-company-business");
    }
    if (location?.state?.contactId !== undefined) {
      setcontactId(location.state.contactId);
    }
  }, [
    location?.state?.company_Id,
    location.state?.userPlanId,
    location?.state?.contactId,
  ]);

  useEffect(() => {
    location?.state?.previousLocation
      ? setPreviousLocation(location.state?.previousLocation)
      : setPreviousLocation(location.pathname);
  }, [location.state?.previousLocation]);

  const submitFormData = () => {
    let data = {
      userPlanId: userPlanId,
      company_Id: company_Id,
      taxStrategy: taxStrategy,
      addService: taxStrategy == 1 ? false : true,
      serviceTitle: "Tax Strategy",
    };
    const addInfo = new Promise((resolve) =>
      resolve(PostApi(API_PATH.addData, data))
    );
    addInfo.then((res) => {
      if (res.status === 200) {
        setPreviousLocation(location.pathname);
        navigate("/start-company-license-permits", {
          state: {
            userPlanId: userPlanId,
            contactId: contactId,
            company_Id: company_Id,
          },
        });
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const getTaxStretagyInfo = (id) => {
    const getBanking = new Promise((resolve) =>
      resolve(PostApi(API_PATH.getTaxStretagy, { company_Id: id }))
    );
    getBanking.then((res) => {
      if (res.status === 200) {
        setTaxStrategy(res.data.data[0]?.taxStrategy || 2);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const goPrevious = () => {
    navigate("/start-company-banking-info", {
      state: {
        userPlanId: userPlanId,
        contactId: contactId,
        company_Id: company_Id,
        previousLocation: previousLocation,
      },
    });
  };

  return (
    <FrontLayout>
      <div className="content-after-class">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="start-cmn-top">
                Complete your order for <span>{company?.company_name}</span>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="mb-3">
                <div className="white-box-main">
                  <div className="row">
                    <div className="col-12">
                      <div className="recommendations-info">
                        <h2 className="position-relative">
                          Tax Strategy / Free Consultation
                        </h2>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <div className="border-class">
                        <div className="dir-detail-comn mt-3">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                          <span className="d-block">What You’ll learn.</span>
                          <div className="row align-items-center">
                            <div className="col-lg-6">
                              <bdi className="d-flex align-items-center text-black m-0">
                                <i className="bi bi-check me-2"></i>How your LLC
                                is Taxed
                              </bdi>
                              <bdi className="d-flex align-items-center text-black m-0">
                                <i className="bi bi-check me-2"></i>How to
                                choose the proper IRS tax election
                              </bdi>
                              <bdi className="d-flex align-items-center text-black m-0">
                                <i className="bi bi-check me-2"></i>Commonly
                                missed tax deductions
                              </bdi>
                            </div>
                            <div className="col-lg-6">
                              <bdi className="d-flex align-items-center text-black m-0">
                                <i className="bi bi-check me-2"></i>Business
                                bookkeeping requirements
                              </bdi>
                              <bdi className="d-flex align-items-center text-black m-0">
                                <i className="bi bi-check me-2"></i>How to
                                reduce the chance of an IRS audit
                              </bdi>
                              <bdi className="d-flex align-items-center text-black m-0">
                                <i className="bi bi-check me-2"></i>How to
                                reduce self employment taxes
                              </bdi>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="d-flex"
                      value={taxStrategy}
                      onChange={(e) => setTaxStrategy(e.target.value)}
                    >
                      <div className="col-lg-6 mb-3">
                        <div
                          className="cust-radio-btn diff-radio-class"
                          onClick={() =>
                            setOpenbusiness({
                              ...open,
                              freebusiness: false,
                              otherbusiness: true,
                            })
                          }
                        >
                          <input
                            type="radio"
                            id="no_free"
                            name="strategy"
                            className="cust-radio"
                            checked={taxStrategy == 1}
                            value={1}
                          />
                          <label
                            className="comn-radio-box d-flex align-items-center"
                            htmlFor="no_free"
                          >
                            I’m not interested at this time.
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <div
                          className="cust-radio-btn diff-radio-class"
                          onClick={() =>
                            setOpenbusiness({
                              ...open,
                              freebusiness: true,
                              otherbusiness: false,
                            })
                          }
                        >
                          <input
                            type="radio"
                            id="free"
                            name="strategy"
                            className="cust-radio"
                            checked={taxStrategy == 2}
                            value={2}
                          />
                          <label
                            className="comn-radio-box d-flex align-items-center"
                            htmlFor="free"
                          >
                            <span>
                              Yes, I would like to recevie the Business Tax
                              Consultion <span className="fw-bold">(FREE)</span>
                              .
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <Collapse in={open.otherbusiness}>
                        <div className="my-2">
                          <div className="agnt-dtls-btm">
                            <img
                              src={Info}
                              className="me-3 img-fluid"
                              alt="arrow"
                            />
                            <div className="agent-head-info">
                              <bdi>
                                Is a Tax Strategy / Free Consultation Somthing I
                                should consider?
                              </bdi>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Mattis et sed nam sem tellus erat.
                            </div>
                          </div>
                        </div>
                      </Collapse>
                      <Collapse in={open.freebusiness}>
                        <div className="my-2">
                          <div className="agnt-dtls-btm">
                            <img
                              src={Info}
                              className="me-3 img-fluid"
                              alt="arrow"
                            />
                            <div className="agent-head-info">
                              <bdi>
                                How soon can I schedule my Tax Consultation?
                              </bdi>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Mattis et sed nam sem tellus erat.
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn-comn-all3 btn-after-class"
                          type="button"
                          onClick={() => goPrevious()}
                        >
                          Previous
                        </button>
                        <button
                          className=" ms-auto btn-comn-all btn-after-class"
                          type="button"
                          onClick={() => submitFormData()}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <Ordersummary
                progressbar={progressbar}
                service={taxStrategy == 2 ? serviceInfo : ""}
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
