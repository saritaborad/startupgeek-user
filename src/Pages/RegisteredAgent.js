import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
import Company1 from "../Images/user-white.svg";
import RtdDatatable from "../DataTable/RtdDatatable";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

export default function RegisteredAgent() {
  const context = useContext(AuthContext);

  const [agent, setAgent] = useState([]);
  const [hireAgent, setHireAgent] = useState("");
  const [viewcompanyid, setviewcompanyid] = useState("");
  const [option, set_option] = useState({ sizePerPage: 1, totalRecord: 1, page: 1, sort: "_id", order: "DESC" });
  const columns = [
    {
      value: "state",
      label: "State",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      value: "name",
      label: "Agent Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      value: "street_address",
      label: "Agent Address",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <div className="fix-address-info">{data[i]?.street_address + "," + data[i]?.city + "," + data[i]?.zip_code}</div>;
        },
      },
    },
    {
      name: "date",
      label: "Renewal Date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <div className="">N/A</div>;
        },
      },
    },
    {
      name: "agentStatus",
      label: "Status",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (data, i) => {
          return <div className="">{data[i]?.agentStatus == 1 ? "Active" : "Inactive"}</div>;
        },
      },
    },
  ];

  useEffect(() => {
    setviewcompanyid(context.viewCompanyId);
    if (context.viewCompanyId) {
      getCompanysAgent(context.viewCompanyId);
    }
  }, [context.viewCompanyId]);

  const getCompanysAgent = (id) => {
    new Promise((resolve, reject) => resolve(PostApi(API_PATH.getCompanysAgent, { company_id: id }))).then((res) => {
      if (res.status === 200) {
        let arr = res.data.data?.filter((item, i) => item?.hireAgent == 2);
        setAgent(arr);
        setHireAgent(res.data.data[0]?.hireAgent);
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
                <h1>Registered Agent</h1>
              </div>
            </div>
            {agent?.length > 0 && (
              <div className="col-12">
                <div className="white-box-table">
                  <RtdDatatable data={agent} columns={columns} option={option} />
                </div>
              </div>
            )}
            <div className="col-12">
              <div className="row">
                {agent?.length > 0 && (
                  <div className="col-md-6 space-class-box">
                    <div className="order-box-btm">
                      <span>
                        <img src={Company1} className="img-fluid" alt="" />
                      </span>
                      <bdi className="d-block">New Registered Agent Service</bdi>
                      <p>New Registered Agent Service</p>
                      <div className="mt-auto order-box-btm-read">
                        <Link to="/registered-agent-detail" className="d-inline-block">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                {(agent?.length > 0 || hireAgent == 1) && (
                  <div className="col-md-6 space-class-box">
                    <div className="order-box-btm">
                      <span>
                        <img src={Company1} className="img-fluid" alt="" />
                      </span>
                      <bdi className="d-block">Change Registered Agent</bdi>
                      <p>Use to update the registered agent on file with the state of formation.</p>
                      <div className="mt-auto order-box-btm-read">
                        <Link to="/change-register-agent" className="d-inline-block">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
