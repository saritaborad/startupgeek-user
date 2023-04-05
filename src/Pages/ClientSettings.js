import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Client from "../Images/client-icon.svg";
import Edit from "../Images/edit-icon.svg";
import Companies from "../Images/companies-icon.svg";
import Payment from "../Images/payment-icon.svg";
import Profile from "../Images/profile.png";
import { useEffect } from "react";
import { API_PATH } from "../const";
import { PostApi } from "../ApiService";
import moment from "moment/moment";
import { toast } from "react-toastify";

export default function ClientSettings() {
  const [user, setUser] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
    getUsersCompany();
  }, []);

  const getUserInfo = () => {
    const userInfo = new Promise((resolve, reject) => resolve(PostApi(API_PATH.getUserInfo)));
    userInfo.then((res) => {
      if (res.status === 200) {
        setUser(res.data.data);
      }
    });
  };

  const getUsersCompany = () => {
    new Promise((resolve) => resolve(PostApi(API_PATH.getUsersCompany))).then((res) => {
      if (res.status === 200) {
        setCompanyData(res.data.data.data);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const company_login = (item, type) => {
    new Promise((resolve, reject) => resolve(PostApi(API_PATH.companyLogin, { company_id: item._id }))).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("startgeekcompany", res.data.data.token);
        navigate("/company-settings", type === "payment" ? { state: { tab: "payment", viewCompanyId: item._id } } : { state: { contact: item.contact, viewCompanyId: item._id } });
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
                <h1>Settings</h1>
              </div>
            </div>
            <div className="col-12 mb-4">
              <div className="white-box-main">
                <div className="box-hdr-top d-flex align-items-center">
                  <span className="d-flex align-items-center">
                    <img src={Client} className="pe-2" alt="" />
                    Client
                  </span>
                  <div className="ms-auto">
                    <Link to="/client-edit" state={{ user }} className="d-inline-block">
                      <img src={Edit} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="row me-0 align-items-center">
                  <div className="col-xxl-3 col-lg-4 pe-0">
                    <div className="stsg-box-list d-flex align-items-center stsg-box-list-text">
                      <span className="d-block">
                        <img src={user?.profile_img ? user?.profile_img : Profile} alt="profile" />
                      </span>
                      <div className="stsg-box-list-text ps-3">
                        <bdi className="d-block">{user?.fname ? user?.fname : " " + " " + user?.lname ? user?.lname : " "}</bdi>
                        <p className="mb-0">Added: {moment(user?.createdAt)?.format("MMM D,YYYY")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 pe-0">
                    <div className="stsg-box-list">
                      <div className="stsg-box-list-text ">
                        <bdi className="d-block">Phone</bdi>
                        <p className="mb-0 ">{user?.phone ? user?.phone : " "}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 pe-0">
                    <div className="stsg-box-list">
                      <div className="stsg-box-list-text">
                        <bdi className="d-block">Client ID</bdi>
                        <p className="mb-0">{user?._id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-2 col-lg-3 pe-0">
                    <div className="stsg-box-list">
                      <div className="stsg-box-list-text">
                        <bdi className="d-block">Email</bdi>
                        <p className="mb-0">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="white-box-main">
                <div className="box-hdr-top d-flex align-items-center">
                  <span className="d-flex align-items-center">
                    <img src={Companies} className="pe-2" alt="" />
                    Companies
                  </span>
                </div>
                {companyData?.length > 0 &&
                  companyData?.map((item, i) => {
                    return (
                      <div className="row me-0 align-items-center client-info py-2" key={i}>
                        <div className="col-xxl-3 col-lg-4 pe-0">
                          <div className="stsg-box-list">
                            <div className="stsg-box-list-text">
                              <bdi className="d-block">{item?.company_name}</bdi>
                              <p className="mb-0">{item?.entity_type !== "LLC" && item?.street_address + "," + item?.city + "," + item?.zip_code}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 pe-0">
                          <div className="stsg-box-list">
                            <div className="stsg-box-list-text">
                              <bdi className="d-block">Primary Contact</bdi>
                              <p className="mb-0">{item?.contact ? item?.contact?.fname + " " + item?.contact?.lname : ""}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 pe-0">
                          <div className="stsg-box-list">
                            <div className="stsg-box-list-text">
                              <bdi className="d-block">Phone</bdi>
                              <p className="mb-0">{item?.contact ? item?.contact?.phone : ""}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-2 col-lg-3 pe-0">
                          <div className="stsg-box-list">
                            <div className="stsg-box-list-text">
                              <bdi className="d-block">Email Address</bdi>
                              <p className="mb-0">{item?.contact ? item?.contact?.email : ""}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 text-end">
                          <div className="">
                            <button className="d-inline-block ms-3 bg-transparent border-0" onClick={() => company_login(item, "payment")}>
                              <img src={Payment} alt="" />
                            </button>
                            <button className="d-inline-block ms-3 bg-transparent border-0" onClick={() => company_login(item, "edit")}>
                              <img src={Edit} alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
