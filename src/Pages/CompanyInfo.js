import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Company from "../Images/building-house.svg";
import Location from "../Images/location-icon.svg";
import CheckDone from "../Images/check-done.svg";
import Client from "../Images/client-icon.svg";
import Members from "../Images/members-icon.svg";
import Edit from "../Images/edit-icon.svg";
import { Link } from "react-router-dom";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import moment from "moment";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function CompanyInfo() {
  const context = useContext(AuthContext);

  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [agent, setAgent] = useState("");
  const [member, setMember] = useState("");
  const [director, setDirector] = useState("");
  const [tax_info, settax_info] = useState("");
  const [viewcompanyid, setviewcompanyid] = useState("");

  useEffect(() => {
    if (context.viewCompanyId) {
      setviewcompanyid(context.viewCompanyId);
      getCompanyDetail(context.viewCompanyId);
    }
  }, [context.viewCompanyId]);

  const getCompanyDetail = (id) => {
    const getDetail = new Promise((resolve) => resolve(PostApi(API_PATH.getCompanyAllDetail, { company_id: id })));
    getDetail.then((res) => {
      if (res.status === 200) {
        setCompany(res.data.data[0]);
        setContact(res.data.data[0]?.contact);
        setAgent(res.data.data[0]?.agent);
        setMember(res.data.data[0]?.member);
        setDirector(res.data.data[0]?.director);
        settax_info(res.data.data[0]?.tax_info);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <Layout>
      <div className="content-main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="comn-title-info">
                <h1>Company Info</h1>
              </div>
            </div>
            <div className="col-12 mb-4">
              <div className="white-box-main">
                <div className="box-hdr-top d-flex align-items-center">
                  <span className="d-flex align-items-center">
                    <img src={Company} className="pe-2" alt="" />
                    Company Info
                  </span>
                  <div className="ms-auto">
                    <img src={CheckDone} alt="" />
                  </div>
                </div>
                <div className="cmpny-info-main">
                  <bdi className="d-block">{company?.Cname}</bdi>
                  <div className="row me-0">
                    <div className="col-md-6 pe-0">
                      {company?.entity_type !== "LLC" && (
                        <div className="d-flex align-items-center cmpny-info-text">
                          <span>Company Address</span>
                          <p className="mb-0">
                            :{company?.street_address} {company?.state} {company?.city}
                            {company?.zip_code}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 pe-0">
                      <div className="d-flex align-items-center cmpny-info-text">
                        <span>Formation Date</span>
                        <p className="mb-0">:{moment(company?.createdAt).format("MMM DD,YYYY")}</p>
                      </div>
                    </div>
                    <div className="col-md-6 pe-0">
                      <div className="d-flex align-items-center cmpny-info-text">
                        <span>Formation State</span>
                        <p className="mb-0">: {company?.state}</p>
                      </div>
                    </div>
                    <div className="col-md-6 pe-0">
                      <div className="d-flex align-items-center cmpny-info-text">
                        <span>EIN (Tax ID Number)</span>
                        <p className="mb-0">: {tax_info?.ein2Text ? tax_info?.ein2Text : "N/A"}</p>
                      </div>
                    </div>
                    <div className="col-md-6 pe-0">
                      <div className="d-flex align-items-center cmpny-info-text">
                        <span>Entity Type</span>
                        <p className="mb-0">: {company.entity_type}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mb-4">
              <div className="white-box-main">
                <div className="box-hdr-top d-flex align-items-center">
                  <span className="d-flex align-items-center">
                    <img src={Location} className="pe-2" alt="" />
                    Contact Info
                  </span>
                  <div className="ms-auto">
                    <Link to="/company-settings" state={{ tab: "company", contact: contact, viewCompanyId: viewcompanyid }} className="d-inline-block">
                      <img src={Edit} alt="" />
                    </Link>
                    <img src={CheckDone} className="ms-2" alt="" />
                  </div>
                </div>
                <div className="cmpny-info-main">
                  <bdi className="d-block">{contact?.fname + " " + contact?.lname}</bdi>
                  <div className="row me-0">
                    <div className="col-md-6 pe-0">
                      <div className="d-flex align-items-center cmpny-info-text">
                        <span>Address</span>
                        <p className="mb-0">: {company.Cname}</p>
                      </div>
                    </div>
                    <div className="col-md-6 pe-0">
                      <div className="d-flex align-items-center cmpny-info-text">
                        <span>Email</span>
                        <p className="mb-0">: {contact?.email}</p>
                      </div>
                    </div>
                    <div className="col-md-6 pe-0">
                      <div className="d-flex align-items-center cmpny-info-text">
                        <span>Phone</span>
                        <p className="mb-0">{contact?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {agent && agent?.hireAgent != 1 && (
              <div className="col-12 mb-4">
                <div className="white-box-main">
                  <div className="box-hdr-top d-flex align-items-center">
                    <span className="d-flex align-items-center">
                      <img src={Client} className="pe-2" alt="" />
                      Agent Info
                    </span>
                    <div className="ms-auto">
                      <img src={CheckDone} alt="" />
                    </div>
                  </div>
                  <div className="cmpny-info-main">
                    <bdi className="d-block">{agent?.name}</bdi>
                    <div className="row me-0">
                      <div className="col-md-6 pe-0">
                        <div className="d-flex align-items-center cmpny-info-text">
                          <span>Address</span>
                          <p className="mb-0">: {agent?.street_address + "," + agent?.state + "," + agent?.city + "," + agent?.zip_code}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-12">
              {(member || director) && (
                <div className="white-box-main">
                  <div className="box-hdr-top d-flex align-items-center">
                    <span className="d-flex align-items-center">
                      <img src={Members} className="pe-2" alt="" />
                      {member ? "Member Info" : "Director Info"}
                    </span>
                    <div className="ms-auto">
                      <img src={CheckDone} alt="" />
                    </div>
                  </div>
                  {member &&
                    member?.length > 0 &&
                    member?.map((item, i) => {
                      return (
                        <div className="" key={i}>
                          <div className="d-sm-flex align-items-center list-info-members">
                            <span>{i + 1}</span>
                            <div className="px-3">
                              <bdi className="d-block">{item?.fname + " " + item?.lname}</bdi>
                              <p className="mb-0">{item?.address}</p>
                            </div>
                            <div className="ms-auto list-info-text">
                              % OWNERSHIP: <mark className="p-0 bg-transparent ms-3">{item?.Ownership}</mark>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {director &&
                    director?.length > 0 &&
                    director?.map((item, i) => {
                      return (
                        <div className="" key={i}>
                          <div className="d-sm-flex align-items-center list-info-members">
                            <span>{i + 1}</span>
                            <div className="px-3">
                              <bdi className="d-block">{item?.fname + " " + item?.lname}</bdi>
                              <p className="mb-0">{item?.address}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
