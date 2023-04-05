import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PostApi } from "../ApiService";
import Layout from "../Components/Layout/Layout";
import { API_PATH } from "../const";
import AuthContext from "../Context/AuthContext";
import RtdDatatable from "../DataTable/RtdDatatable";

export default function Mailbox() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [mailbox, setMailBox] = useState([]);
    const [option, set_option] = useState({ sizePerPage: 10, totalRecord: 10, page: 1, sort: "createdAt", order: "ASC" });
    const [viewcompanyid, setviewcompanyid] = useState("");
    const [user, setuser] = useState("");
    const columns = [
        {
            value: "subject",
            label: "Subject",
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            value: "createdAt",
            label: "Received Date",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (data, i) => {
                    return <div className="table-action-icn">{moment(data[i]?.createdAt).format("DD-MM-YYYY")}</div>;
                },
            },
        },
        {
            value: "createdAt",
            label: "Time",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (data, i) => {
                    return <div className="table-action-icn">{moment(data[i]?.createdAt).format("hh:mm A")}</div>;
                },
            },
        },
        {
            value: "actions",
            label: "Attachment",
            options: {
                filter: false,
                customBodyRender: (data, i) => {
                    return (
                        <div
                            className="action-icon-class"
                            onClick={() => {
                                navigate("/mailbox-view", { state: { mailData: data[i], viewCompanyId: viewcompanyid } });
                            }}
                        >
                            <div>
                                <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9986 5.5C12.4454 5.5 12.0001 5.9082 12.0001 6.41523V15.5805C12.0001 18.1113 9.76418 20.1652 6.99856 20.1652C4.23293 20.1652 1.997 18.1113 1.997 15.5805V4.58047C1.997 3.06367 3.33762 1.83047 4.997 1.83047C6.65637 1.83047 7.997 3.06367 7.997 4.58047V13.75C7.997 14.257 7.547 14.6652 6.99856 14.6652C6.45012 14.6652 6.00012 14.257 6.00012 13.75V6.41523C6.00012 5.9082 5.55012 5.5 5.00168 5.5C4.44856 5.5 4.00325 5.9082 4.00325 6.41523V13.75C4.00325 15.2711 5.34387 16.5 7.00325 16.5C8.66262 16.5 10.0032 15.2711 10.0032 13.75V4.58477C9.99856 2.05391 7.75794 0 4.997 0C2.23606 0 0.00012207 2.05391 0.00012207 4.58477V15.5848C0.00012207 19.1297 3.13606 22 6.99856 22C10.8611 22 13.997 19.1254 13.997 15.5848V6.41523C13.997 5.9082 13.5517 5.5 12.9986 5.5Z" fill="#84879E" />
                                </svg>
                            </div>
                        </div>
                    );
                },
            },
        },
    ];

    useEffect(() => {
        setviewcompanyid(context.viewCompanyId);
        setuser(context.user);
        if (context.viewCompanyId || context.user) {
            getMailBoX(option, context.viewCompanyId, context.user);
        }
    }, [context.viewCompanyId, context.user]);

    const getMailBoX = (option, viewcompanyid, user) => {
        let data = { mail_type: viewcompanyid ? 1 : 2, _id: viewcompanyid ? viewcompanyid : user?._id, options: option };
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.getMailBox, data))).then((res) => {
            if (res.status === 200) {
                setMailBox(res.data.data.data);
                set_option({ ...option, totalRecord: res.data.data.totalRecord });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const tableCallBack = (option) => {
        set_option(option);
        getMailBoX(option, viewcompanyid, user);
    };

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="comn-title-info">
                                <h1>Mailbox</h1>
                            </div>
                        </div>
                        <div className="col-12 pb-3">
                            <div className="white-box-table">
                                <RtdDatatable data={mailbox} columns={columns} option={option} tableCallBack={tableCallBack} />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mail-not-box position-relative">
                                <span>
                                    <i className="bi bi-info-circle-fill"></i>
                                </span>
                                <div className="ps-3 cust-info-white">
                                    <bdi className="d-block">We have not received any correspondence on your behalf.</bdi>
                                    <p className="mb-0">
                                        You will be notified the moment we receive any mail, so please be sure your <Link to="/company-info">contact information</Link> is up to date
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
