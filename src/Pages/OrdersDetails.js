import React from "react";
import Layout from "../Components/Layout/Layout";
import { AdminOrderSummary } from "./Common/AdminOrderSummary";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { Ordersummary } from "./Common/OrderSummary";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import moment from "moment";

export default function OrdersDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState("");
    const [billInfo, setBillInfo] = useState("");
    const [orderType, setOrderType] = useState("");
    const [userPlanId, setuserPlanId] = useState("");
    const [service, setservice] = useState("");
    const [serviceInfo, setServiceInfo] = useState("");

    const progressbar = { width: "100%", ariavaluenow: "100", ariavaluemin: "0", ariavaluemax: "100" };

    useEffect(() => {
        if (location?.state?.orderId !== undefined) {
            getOrderDetail(location.state.orderId);
        }
        if (location.state?.orderType !== undefined) {
            setOrderType(location.state.orderType);
        }
        if (location?.state?.service) {
            setservice(location?.state?.service);
        }
    }, [location?.state?.orderId, location.state?.orderType]);

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, null, window.location.href);
        };
    }, []);

    const getOrderDetail = (orderId) => {
        const data = { order_id: orderId };
        const orderInfo = new Promise((resolve) => resolve(PostApi(API_PATH.getOrderDetail, data)));
        orderInfo.then((res) => {
            if (res.status) {
                setOrderDetail(res.data.data[0]);
                setuserPlanId(res.data.data[0]?.userPlanId);
                setBillInfo(res.data.data[0].billing_info);
                setServiceInfo(res.data.data[0].servicePurchased);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const mainSection = () => {
        return (
            <div className="order-detail-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="order-detail-title ">
                                Thank You. Your order has been <span>received.</span>
                            </div>
                        </div>
                        <div className="col-lg-8 mb-3 mb-lg-0">
                            <div className="payment-box-main">
                                <div className="p-4  white-box-main">
                                    <div className="d-flex  justify-content-between">
                                        <div className="">
                                            <div className="order-title-txt mb-1">Order Details</div>
                                            <div className="border-botom"></div>
                                        </div>
                                        <div className={`order-status ${orderDetail?.status == 1 ? "green" : orderDetail?.status == 2 ? "blue" : orderDetail?.status == 3 ? "red" : orderDetail?.status == 4 && "gray"}`}>
                                            <span>{orderDetail?.status == 1 ? "Success" : orderDetail?.status == 2 ? "Processing" : orderDetail?.status == 3 ? "Failed" : orderDetail?.status == 4 && "Onhold"}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="order-txt">
                                                <div className="d-flex">
                                                    <span>Order Number: </span>
                                                    <bdi>{orderDetail?.order_no}</bdi>
                                                </div>
                                                <div className="d-flex">
                                                    <span>Date: </span>
                                                    <bdi>{moment(orderDetail?.createdAt).format("DD, MMM yyyy")}</bdi>
                                                </div>
                                                <div className="d-flex">
                                                    <span>Email: </span>
                                                    <bdi>{orderDetail?.email}</bdi>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="order-txt">
                                                <div className="d-flex">
                                                    <span>Total:</span>
                                                    <bdi>${parseFloat(orderDetail?.total).toFixed(2)} </bdi>
                                                </div>
                                                <div className="d-flex">
                                                    <span>Time: </span>
                                                    <bdi>{moment(orderDetail?.createdAt).format("hh:mm A")}</bdi>
                                                </div>
                                                <div className="d-flex">
                                                    <span>Card Detail:</span>
                                                    <bdi>{orderDetail?.payment_method}</bdi>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div>
                                            <div className="order-title-txt mb-1">Product Details</div>
                                            <div className="border-botom"></div>
                                        </div>
                                        <div className="table-responsive mt-3 border p-3 py-2 rounded product-table">
                                            <table className="table mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>Company Name</th>
                                                        <th>Entity Type</th>
                                                        <th>Plan</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderDetail?.plan_name && (
                                                        <tr>
                                                            <td>{orderDetail?.company_name}</td>
                                                            <td>{orderDetail?.entity_type}</td>
                                                            <td>{orderDetail?.plan_name}</td>
                                                            <td>${parseInt(orderDetail?.plan_total)?.toFixed(2)}</td>
                                                        </tr>
                                                    )}
                                                    {serviceInfo?.length > 0 &&
                                                        serviceInfo.map((item, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{item?.service_title}</td>
                                                                    <td>-</td>
                                                                    <td>-</td>
                                                                    <td>${parseInt(item?.service_price)?.toFixed(2)}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    {/* <tr>
                            <td>Sub total</td>
                            <td>-</td>
                            <td>-</td>
                            <td>${parseInt(orderDetail?.total)?.toFixed(2)}</td>
                          </tr> */}
                                                    <tr>
                                                        <td>Total</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>${parseInt(orderDetail?.total)?.toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-3">
                                            <div className="order-title-txt mb-1">Billing Details</div>
                                            <div className="border-botom"></div>
                                        </div>
                                        <div className="d-md-flex order-txt mt-2">
                                            <div className="">
                                                <div className="d-flex">
                                                    <span>Customers Name:</span>
                                                    <bdi>{billInfo?.fname + " " + billInfo?.lname}</bdi>
                                                </div>
                                                <div className="d-flex">
                                                    <span>Business Name:</span>
                                                    <bdi>{orderDetail?.company_name}</bdi>
                                                </div>
                                                <div className="d-flex">
                                                    <span>Address: </span>
                                                    <bdi>{`${billInfo?.street_address}, ${billInfo?.city}, ${billInfo?.state}, ${billInfo?.zip_code}`}</bdi>
                                                </div>
                                                <div className="d-flex">
                                                    <span>Email: </span>
                                                    <bdi>{orderDetail?.email}</bdi>
                                                </div>
                                                <div className="d-flex">
                                                    <span>Phone: </span>
                                                    <bdi>{orderDetail?.contact_No}</bdi>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {orderType === "company" ? <Ordersummary progressbar={progressbar} userPlanId={userPlanId} /> : <AdminOrderSummary service={service} />}
                            <div className=" d-flex">
                                <button type="button" className="btn-comn-all3 btn-after-class w-100" onClick={() => navigate("/receipt", { state: { orderId: orderDetail?._id } })}>
                                    Get Receipt
                                </button>
                                <button type="submit" className="btn-comn-all btn-after-class ms-3 w-100" onClick={() => (orderType === "company" ? navigate("/dashboard") : navigate("/orders-receipts"))}>
                                    {orderType === "company" ? "Go to Dashboard" : "Go to Order List"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return orderType === "company" ? <FrontLayout>{mainSection()}</FrontLayout> : <Layout>{mainSection()}</Layout>;
}
