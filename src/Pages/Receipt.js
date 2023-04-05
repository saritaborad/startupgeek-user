import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Logo from "../Images/logo.png";
import Done from "../Images/green-check.svg";
import { useRef } from "react";
import Left from "../Images/left-arrow-icon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";

export default function Receipt() {
    const receiptRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const [billInfo, setBillInfo] = useState("");
    const [serviceInfo, setServiceInfo] = useState("");
    const [orderDetail, setOrderDetail] = useState("");

    useEffect(() => {
        if (location.state?.orderId) {
            getReceiptDetail(location.state?.orderId);
        }
    }, [location.state?.orderId]);

    const getReceiptDetail = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getOrderDetail, { order_id: id }))).then((res) => {
            if (res.status === 200) {
                setServiceInfo(res.data.data[0].servicePurchased);
                setBillInfo(res.data.data[0].billing_info);
                setOrderDetail(res.data.data[0]);
            }
        });
    };

    const handlePrint = useReactToPrint({
        content: () => receiptRef.current,
    });

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row comn-title-info">
                        <div ref={receiptRef}>
                            <div className="col-sm-12 text-end p-3">
                                <img src={Logo} className="img-fluid" alt="logo" />
                                <div className="pt-3 fix-info-addrs ms-auto">
                                    <p>{billInfo?.street_address + ", " + billInfo?.city + ", " + billInfo?.state + ", " + billInfo?.zip_code}</p>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div className="white-box-main p-0">
                                    <div className="hdr-recipt-info">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="info-addrs-left">
                                                    <span className="d-block">{orderDetail?.company_name}</span>
                                                    <p className="mb-0">{billInfo?.street_address + ", " + billInfo?.city + ", " + billInfo?.state + ", " + billInfo?.zip_code}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-end info-addrs-left">
                                                    <span className="d-block">
                                                        Invoice Date <bdi>: {moment(orderDetail?.dateTime).format("DD/MM/YYYY")}</bdi>
                                                    </span>
                                                    <span className="d-block">
                                                        Order Number <bdi>: {orderDetail?.order_no}</bdi>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="body-recipt-info">
                                        <div className="">
                                            <div className="row me-0 pb-3">
                                                <div className="col-6 pe-0">
                                                    <div className="text-body-recipt">
                                                        <span className="d-block">PACKAGE ITEMS</span>
                                                    </div>
                                                </div>
                                                <div className="col-6 pe-0 text-end">
                                                    <div className="text-body-recipt">
                                                        <span className="d-block">TOTAL PRICE</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {orderDetail?.plan_name && (
                                                <div className="text-inr-bdr">
                                                    <div className="row me-0">
                                                        <div className="col-6 pe-0">
                                                            <span className="d-block text-inr-recipt">
                                                                {orderDetail?.entity_type} {orderDetail?.plan_name} Package
                                                            </span>
                                                        </div>
                                                        <div className="col-6 pe-0 text-end">
                                                            <span className="d-block text-inr-recipt">${Number(orderDetail?.plan_total).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {serviceInfo &&
                                                serviceInfo?.length > 0 &&
                                                serviceInfo?.map((item, i) => {
                                                    return (
                                                        <div className="text-inr-bdr" key={i}>
                                                            <div className="row me-0">
                                                                <div className="col-6 pe-0">
                                                                    <span className="d-block text-inr-recipt">{item?.service_title}</span>
                                                                </div>
                                                                {Number(item?.service_price) == 0 ? (
                                                                    <div className="col-6 pe-0 text-end">
                                                                        <span className="d-block text-inr-recipt">
                                                                            <img src={Done} className="me-3 img-fluid" alt="arrow" />
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="col-6 pe-0 text-end">
                                                                        <span className="d-block text-inr-recipt">${Number(item?.service_price).toFixed(2)}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            <div className="info-addrs-left text-end">
                                                <span className="d-block py-3">
                                                    TOTAL : <bdi>${Number(orderDetail?.total).toFixed(2)}</bdi>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 text-end">
                        <button type="button" className="btn-comn-all text-end" onClick={handlePrint}>
                            Print Receipt
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
