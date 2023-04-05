import React, { useContext } from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import RtdDatatable from "../DataTable/RtdDatatable";
import { useEffect } from "react";
import { API_PATH } from "../const";
import { PostApi } from "../ApiService";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import { useState } from "react";

export default function Dashboard() {
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const [allCompany, setAllCompany] = useState("");
    const [status, setStatus] = useState("");
    const [option, set_option] = useState({ sizePerPage: 10, search: {}, totalRecord: 0, page: 1, sort: "_id", order: "ASC" });
    const columns = [
        {
            value: "company_name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
                search: true,
            },
        },
        {
            value: "state",
            label: "State",
            options: {
                filter: false,
                sort: false,
                search: true,
            },
        },
        {
            value: "order_no",
            label: "Order",
            search: true,
            options: {
                filter: false,
                sort: true,
                customBodyRender: (data, i) => {
                    return <div>{data[i]?.order_no}</div>;
                },
            },
        },
        {
            value: "contact.email",
            label: "Email",
            search: true,
            options: {
                filter: false,
                sort: true,
                customBodyRender: (data, i) => {
                    return <div>{data[i]?.contact?.email}</div>;
                },
            },
        },
        {
            value: "status",
            label: "Status",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (data, i) => {
                    return (
                        <div className="custom-switch-toggle-menu" key={i}>
                            <label className="switch">
                                <input type="checkbox" name="status" value={status} defaultChecked={data[i].status == 0 ? false : true} onChange={(e) => updateStatus(data[i]._id, e.target.checked ? 1 : 0)} />
                                <span className="slider round"></span>
                                <bdi className="inactive-info-switch">Inactive/Good Standing</bdi>
                                <bdi className="active-info-switch">Active/Good Standing</bdi>
                            </label>
                        </div>
                    );
                },
            },
        },
        {
            value: "",
            label: "",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (data, i) => {
                    return (
                        <div className="btn-comn-all2 text-white" onClick={() => company_login(data[i]?._id)}>
                            view company
                        </div>
                    );
                },
            },
        },
    ];

    useEffect(() => {
        getUsersCompany(option);
    }, []);

    const getUsersCompany = (option) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getUsersCompany, { options: option }))).then((res) => {
            if (res.status === 200) {
                setAllCompany(res.data.data.data);
                set_option({ ...option, totalRecord: res.data.data.totalRecord });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const tableCallBack = (option) => {
        set_option(option);
        getUsersCompany(option);
    };

    const updateStatus = (id, status) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.updateCompanyInfo, { _id: id, status: status }))).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
            }
        });
    };

    const company_login = (id) => {
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.companyLogin, { company_id: id }))).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("startgeekcompany", res.data.data.token);
                context.setviewCompanyId(id);
                navigate("/recommendations");
            } else {
                toast.error(res.data.message);
            }
        });
    };

    return (
        <>
            <Layout>
                <div className="content-main-section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="comn-title-info">
                                    <h1>My Company</h1>
                                    <p>View company information and account details</p>
                                </div>
                            </div>
                            <div className="col-12 pb-3">
                                <div className="white-box-table">
                                    <RtdDatatable data={allCompany} columns={columns} option={option} tableCallBack={tableCallBack} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
