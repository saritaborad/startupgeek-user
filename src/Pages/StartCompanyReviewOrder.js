import React, { useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import "react-phone-input-2/lib/style.css";
import Agent from "../Images/agent_info-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function StartACompanyReviewOrder() {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);

    const [company, setCompnay] = useState("");
    const [director, setDirector] = useState("");
    const [member, setMember] = useState("");
    const [shareholder, setShareHolder] = useState("");
    const [officer, stOfficer] = useState("");
    const [taxInfo, setTaxInfo] = useState("");
    const [owner, setOwner] = useState("");
    const [directorNo, setDirectorNo] = useState("");
    const [shareholder_no, setShareholderNo] = useState("");
    const [userPlanId, setuserPlanId] = useState("");
    const [company_Id, setcompany_Id] = useState("");
    const [contactId, setcontactId] = useState("");
    const [contact, setcontactInfo] = useState("");
    const progressbar = { width: "95%", ariavaluenow: "95", ariavaluemin: "0", ariavaluemax: "100" };
    const [previousLocation, setPreviousLocation] = useState(null);

    useEffect(() => {
        if (location?.state?.company_Id !== undefined) {
            setcompany_Id(location.state.company_Id);
            setuserPlanId(location.state.userPlanId);
            getCompanyDetail(location.state.company_Id);
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
            getContact(location.state.contactId);
        }
    }, [location?.state?.company_Id, location?.state?.userPlanId, location?.state?.contactId]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const getCompanyDetail = (id) => {
        let data = { company_id: id };
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.getCompanyAllDetail, data))).then((res) => {
            if (res.status) {
                setCompnay(res.data.data[0]);
                setDirector(res.data.data[0]?.director);
                setShareHolder(res.data.data[0]?.shareholders);
                setTaxInfo(res.data.data[0]?.tax_info);
                setMember(res.data.data[0]?.member);
                stOfficer(res.data.data[0]?.director);
                setOwner(res.data.data[0]?.member?.length);
                setDirectorNo(res.data.data[0]?.director?.length);
                setShareholderNo(res.data.data[0]?.shareholder?.length);
            } else {
                toast.error(res.data.data);
            }
        });
    };

    const getContact = (contactId) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getContact, { _id: contactId }))).then((res) => {
            if (res.status === 200) {
                setcontactInfo(res.data.data);
            }
        });
    };

    const goNext = () => {
        setPreviousLocation(location.pathname);
        navigate("/start-company-payment-info", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } });
    };

    const goPrevious = () => {
        navigate("/start-company-license-permits", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, previousLocation: previousLocation } });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="start-cmn-top">
                                Review Order for <span>{company?.company_name}</span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="white-box-main">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="recommendations-info d-flex">
                                                        <h2 className="position-relative">Formation Info</h2>
                                                        <div className="ms-auto">
                                                            <span className="icon-rgt-review" type="button">
                                                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.781174C14.0976 1.1717 14.0976 1.80486 13.7071 2.19539L5.70711 10.1954C5.31658 10.5859 4.68342 10.5859 4.29289 10.1954L0.292893 6.19539C-0.0976311 5.80486 -0.0976311 5.1717 0.292893 4.78117C0.683417 4.39065 1.31658 4.39065 1.70711 4.78117L5 8.07407L12.2929 0.781174C12.6834 0.39065 13.3166 0.39065 13.7071 0.781174Z" fill="white" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="border-class">
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">State of Formation</span>
                                                            <bdi className="d-block">{company?.state}</bdi>
                                                        </div>
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">Entity Type</span>
                                                            <bdi className="d-block">{company?.entity_type}</bdi>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="white-box-main">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="recommendations-info d-flex">
                                                        <h2 className="position-relative">Contact Info</h2>
                                                        <div className="ms-auto">
                                                            <button className="icon-btn-class" type="button" onClick={() => navigate("/start-company-contact-info", { state: { contact: "update", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } })}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <span className="icon-rgt-review ms-2">
                                                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.781174C14.0976 1.1717 14.0976 1.80486 13.7071 2.19539L5.70711 10.1954C5.31658 10.5859 4.68342 10.5859 4.29289 10.1954L0.292893 6.19539C-0.0976311 5.80486 -0.0976311 5.1717 0.292893 4.78117C0.683417 4.39065 1.31658 4.39065 1.70711 4.78117L5 8.07407L12.2929 0.781174C12.6834 0.39065 13.3166 0.39065 13.7071 0.781174Z" fill="white" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="border-class">
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">John Deo</span>
                                                            <bdi className="d-block">{contact?.street_address + "," + contact?.state + "," + contact?.city + "," + contact?.zip_code}</bdi>
                                                            <bdi className="d-block">{contact?.phone}</bdi>
                                                            <bdi className="d-block">{contact?.email}</bdi>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="white-box-main">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="recommendations-info d-flex">
                                                        <h2 className="position-relative">Agent Info</h2>
                                                        <div className="ms-auto">
                                                            <button className="icon-btn-class" type="button" onClick={() => navigate("/start-company-registered-agent", { state: { agent: "update", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } })}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <span className="icon-rgt-review ms-2">
                                                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.781174C14.0976 1.1717 14.0976 1.80486 13.7071 2.19539L5.70711 10.1954C5.31658 10.5859 4.68342 10.5859 4.29289 10.1954L0.292893 6.19539C-0.0976311 5.80486 -0.0976311 5.1717 0.292893 4.78117C0.683417 4.39065 1.31658 4.39065 1.70711 4.78117L5 8.07407L12.2929 0.781174C12.6834 0.39065 13.3166 0.39065 13.7071 0.781174Z" fill="white" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="border-class">
                                                        <div className="agnt-dtls-btm dif-info-bg mt-3">
                                                            <img src={Agent} className="me-3 img-fluid" alt="arrow" />
                                                            <div className="agent-head-info">
                                                                Join the 18,000+ business owners who have gained peace of mind with this package.
                                                                <span className="d-block fw-bold">First Year Free</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="white-box-main">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="recommendations-info d-flex">
                                                        <h2 className="position-relative">Company Info</h2>
                                                        <div className="ms-auto">
                                                            <button className="icon-btn-class" type="button" onClick={() => navigate("/start-company-info", { state: { company: "update", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } })}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <span className="icon-rgt-review ms-2">
                                                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.781174C14.0976 1.1717 14.0976 1.80486 13.7071 2.19539L5.70711 10.1954C5.31658 10.5859 4.68342 10.5859 4.29289 10.1954L0.292893 6.19539C-0.0976311 5.80486 -0.0976311 5.1717 0.292893 4.78117C0.683417 4.39065 1.31658 4.39065 1.70711 4.78117L5 8.07407L12.2929 0.781174C12.6834 0.39065 13.3166 0.39065 13.7071 0.781174Z" fill="white" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="border-class">
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">Company Name</span>
                                                            <bdi className="d-block">{company?.Cname}</bdi>
                                                        </div>
                                                        {company?.industry && (
                                                            <div className="dir-detail-comn mt-3">
                                                                <span className="d-block">Business Type / Industry</span>
                                                                <bdi className="d-block">{company?.industry}</bdi>
                                                            </div>
                                                        )}
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">Business Purpose</span>
                                                            <bdi className="d-block">{company?.business_purpose}</bdi>
                                                        </div>
                                                        {company?.entity_type !== "LLC" && (
                                                            <div className="dir-detail-comn mt-3">
                                                                <span className="d-block">Address</span>
                                                                <bdi className="d-block">{company?.street_address + "," + company?.state + "," + company?.city + "," + company?.zip_code}</bdi>
                                                            </div>
                                                        )}
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">NAICS CODE</span>
                                                            <bdi className="d-block">
                                                                {company?.naicsCodes_string} {"(" + company?.naicsCode + ")"}
                                                            </bdi>
                                                        </div>
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">NAICS SUBCODE</span>
                                                            <bdi className="d-block">
                                                                {company?.naicSubcodes_string} {"(" + company?.naicsSubCode + ")"}
                                                            </bdi>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="white-box-main">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="recommendations-info d-flex">
                                                        <h2 className="position-relative">{context.entity == "LLC" ? "Member Info" : "Director Info"}</h2>
                                                        <div className="ms-auto">
                                                            <button className="icon-btn-class" type="button" onClick={() => (context.entity == "LLC" ? navigate("/start-company-member", { state: { member: "update", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, owner: owner } }) : navigate("/start-company-director", { state: { director: "update", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, owner: directorNo } }))}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <span className="icon-rgt-review ms-2">
                                                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.781174C14.0976 1.1717 14.0976 1.80486 13.7071 2.19539L5.70711 10.1954C5.31658 10.5859 4.68342 10.5859 4.29289 10.1954L0.292893 6.19539C-0.0976311 5.80486 -0.0976311 5.1717 0.292893 4.78117C0.683417 4.39065 1.31658 4.39065 1.70711 4.78117L5 8.07407L12.2929 0.781174C12.6834 0.39065 13.3166 0.39065 13.7071 0.781174Z" fill="white" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                {context.entity === "LLC"
                                                    ? member &&
                                                      member.length > 0 &&
                                                      member?.map((item, i) => {
                                                          return (
                                                              <div className="col-12" key={i}>
                                                                  <div className="border-class">
                                                                      <div className="grey-box-check mt-3">
                                                                          <div className="dir-detail-comn d-flex align-items-center">
                                                                              <div className="me-3">
                                                                                  <span>{i + 1}</span>
                                                                              </div>
                                                                              <div className="ps-3 border-start">
                                                                                  <span className="d-block">Name</span>
                                                                                  <bdi className="d-block">{item?.fname + " " + item?.lname}</bdi>
                                                                                  <span className="d-block mt-2">Address</span>
                                                                                  <bdi className="d-block">{item?.street_address + "," + item?.state + "," + item?.city + "," + item?.zip_code}</bdi>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          );
                                                      })
                                                    : director &&
                                                      director.length > 0 &&
                                                      director?.map((item, i) => {
                                                          return (
                                                              <div className="col-12" key={i}>
                                                                  <div className="border-class">
                                                                      <div className="grey-box-check mt-3">
                                                                          <div className="dir-detail-comn d-flex align-items-center">
                                                                              <div className="me-3">
                                                                                  <span>{i + 1}</span>
                                                                              </div>
                                                                              <div className="ps-3 border-start">
                                                                                  <span className="d-block">Name</span>
                                                                                  <bdi className="d-block">{item?.fname + " " + item?.lname}</bdi>
                                                                                  <span className="d-block mt-2">Address</span>
                                                                                  <bdi className="d-block">{item?.street_address + "," + item?.state + "," + item?.city + "," + item?.zip_code}</bdi>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          );
                                                      })}
                                            </div>
                                        </div>
                                    </div>
                                    {context.entity != "LLC" &&
                                        shareholder &&
                                        shareholder?.length > 0 &&
                                        shareholder?.map((item, i) => {
                                            return (
                                                <div className="col-12 mb-3" key={i}>
                                                    <div className="white-box-main">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="recommendations-info d-flex">
                                                                    <h2 className="position-relative">Sharehoders Info</h2>
                                                                    <div className="ms-auto">
                                                                        <button className="icon-btn-class" type="button" onClick={() => navigate("/start-company-shareholder", { state: { shareholder: "update", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, shareholders_no: shareholder_no } })}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <span className="icon-rgt-review ms-2">
                                                                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.781174C14.0976 1.1717 14.0976 1.80486 13.7071 2.19539L5.70711 10.1954C5.31658 10.5859 4.68342 10.5859 4.29289 10.1954L0.292893 6.19539C-0.0976311 5.80486 -0.0976311 5.1717 0.292893 4.78117C0.683417 4.39065 1.31658 4.39065 1.70711 4.78117L5 8.07407L12.2929 0.781174C12.6834 0.39065 13.3166 0.39065 13.7071 0.781174Z" fill="white" />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="border-class">
                                                                    <div className="grey-box-check mt-3">
                                                                        <div className="dir-detail-comn d-flex align-items-center">
                                                                            <div className="me-3">
                                                                                <span>{i + 1}</span>
                                                                            </div>
                                                                            <div className="ps-3 border-start">
                                                                                <span className="d-block">Name</span>
                                                                                <bdi className="d-block">{item?.fname + " " + item?.lname}</bdi>
                                                                                <span className="d-block mt-2">Address</span>
                                                                                <bdi className="d-block">{item?.street_address + "," + item?.state + "," + item?.city + "," + item?.zip_code}</bdi>
                                                                                <span className="d-block mt-2">Number of Shares</span>
                                                                                <bdi className="d-block">{item?.no_of_shares}</bdi>
                                                                                <span className="d-block mt-2">SSN</span>
                                                                                <bdi className="d-block">{item?.ssn}</bdi>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {context.entity !== "LLC" && (
                                        <div className="col-12 mb-3">
                                            <div className="white-box-main">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="recommendations-info d-flex">
                                                            <h2 className="position-relative">Officer Info</h2>
                                                            <div className="ms-auto">
                                                                <button className="icon-btn-class" type="button" onClick={() => navigate("/start-company-director", { state: { director: "update", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } })}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <span className="icon-rgt-review ms-2">
                                                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.781174C14.0976 1.1717 14.0976 1.80486 13.7071 2.19539L5.70711 10.1954C5.31658 10.5859 4.68342 10.5859 4.29289 10.1954L0.292893 6.19539C-0.0976311 5.80486 -0.0976311 5.1717 0.292893 4.78117C0.683417 4.39065 1.31658 4.39065 1.70711 4.78117L5 8.07407L12.2929 0.781174C12.6834 0.39065 13.3166 0.39065 13.7071 0.781174Z" fill="white" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="border-class py-3">
                                                            <div className="dir-detail-comn">
                                                                <span className="d-block pb-2">President/CEO</span>
                                                                <span className="d-block">Name</span>
                                                                <bdi className="d-block">{officer?.president}</bdi>
                                                            </div>
                                                        </div>
                                                        <div className="border-class py-3">
                                                            <div className="dir-detail-comn">
                                                                <span className="d-block pb-2">Secretary</span>
                                                                <span className="d-block">Name</span>
                                                                <bdi className="d-block">{officer?.secretary}</bdi>
                                                            </div>
                                                        </div>
                                                        <div className="border-class py-3">
                                                            <div className="dir-detail-comn">
                                                                <span className="d-block pb-2">Treasurer</span>
                                                                <span className="d-block">Name</span>
                                                                <bdi className="d-block">{officer?.treasurer}</bdi>
                                                            </div>
                                                        </div>
                                                        <div className="border-class py-3">
                                                            <div className="dir-detail-comn">
                                                                <span className="d-block pb-2">Vice President </span>
                                                                <span className="d-block">Name</span>
                                                                <bdi className="d-block">{officer?.vice_president}</bdi>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-12 mb-3">
                                        <div className="white-box-main">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="recommendations-info d-flex">
                                                        <h2 className="position-relative">EIN / Tax Info</h2>
                                                        <div className="ms-auto">
                                                            <button className="icon-btn-class" type="button" onClick={() => navigate("/start-company-tax-info", { state: { tax: "update", userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } })}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <span className="icon-rgt-review ms-2">
                                                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.781174C14.0976 1.1717 14.0976 1.80486 13.7071 2.19539L5.70711 10.1954C5.31658 10.5859 4.68342 10.5859 4.29289 10.1954L0.292893 6.19539C-0.0976311 5.80486 -0.0976311 5.1717 0.292893 4.78117C0.683417 4.39065 1.31658 4.39065 1.70711 4.78117L5 8.07407L12.2929 0.781174C12.6834 0.39065 13.3166 0.39065 13.7071 0.781174Z" fill="white" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="border-class">
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">Name</span>
                                                            <bdi className="d-block">{taxInfo?.fname + " " + taxInfo?.lname}</bdi>
                                                        </div>
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">Address</span>
                                                            <bdi className="d-block">{taxInfo?.street_address + "," + taxInfo?.city + "," + taxInfo?.zip_code}</bdi>
                                                        </div>
                                                        <div className="dir-detail-comn mt-3">
                                                            <span className="d-block">{taxInfo?.EIN_Type == 1 ? "ITIN" : "SSN"}</span>
                                                            <bdi className="d-block">{taxInfo?.ein2Text}</bdi>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-center">
                                            <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                Previous
                                            </button>
                                            <button className=" ms-auto btn-comn-all btn-after-class" type="button" onClick={() => goNext()}>
                                                Next
                                            </button>
                                        </div>
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
