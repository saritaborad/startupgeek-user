import React, { useEffect, useState, useContext } from "react";
import Layout from "../Components/Layout/Layout";
import ReceiptIcon from "../Images/receipt-icon.svg";
import RtdDatatable from "../DataTable/RtdDatatable";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function OrdersReceipts() {
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const [order, setOrder] = useState([]);
    const [option, set_option] = useState({ sizePerPage: 10, totalRecord: 10, page: 1, sort: "_id", order: "ASC" });
    const [viewcompanyid, setviewcompanyid] = useState("");

    const columns = [
        {
            value: "company_name",
            label: "Company Name",
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            value: "order_no",
            label: "Order NO.",
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            value: "total",
            label: "Amount",
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            value: "email",
            label: "Receipt",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (data, i) => {
                    return (
                        <button className="border-0 bg-transparent" onClick={() => navigate("/receipt", { state: { orderId: data[i]?._id } })}>
                            <img src={ReceiptIcon} alt="" />
                        </button>
                    );
                },
            },
        },
        {
            value: "dateTime",
            label: "Order Date",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (data, i) => {
                    return <div>{moment(data[i]?.dateTime).format("DD-MM-YYYY")}</div>;
                },
            },
        },
        {
            value: "pyment_status",
            label: "Status",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (data, i) => {
                    return <div>{data[i]?.pyment_status === "succeeded" ? <span className="txt-green">{data[i]?.pyment_status}</span> : data[i]?.pyment_status === "failed" ? <span className="txt-red">{data[i]?.pyment_status}</span> : <span className="txt-inprogress">processing</span>}</div>;
                },
            },
        },
    ];

    useEffect(() => {
        setviewcompanyid(context.viewCompanyId);
        if (context.viewCompanyId) {
            getCompanyOrder(option, context.viewCompanyId);
        } else {
            getCompanyOrder(option, "");
        }
    }, [context.viewCompanyId]);

    const getCompanyOrder = (option, id) => {
        const getOrder = new Promise((resolve, reject) => resolve(PostApi(API_PATH.getCompanyOrder, { options: option, company_Id: id })));
        getOrder.then((res) => {
            if (res.status === 200) {
                setOrder(res.data.data?.data);
                set_option({ ...option, totalRecord: res.data.data.totalRecord });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const tableCallBack = (option) => {
        set_option(option);
        getCompanyOrder(option, viewcompanyid);
    };

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="comn-title-info">
                                <h1>All Orders/Receipts</h1>
                            </div>
                        </div>
                        <div className="col-12 pb-3">
                            <div className="white-box-table">
                                <RtdDatatable data={order} columns={columns} option={option} tableCallBack={tableCallBack} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
