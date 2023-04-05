import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { parseDays } from "../Utils";
import Left from "../../Images/left-arrow-icon.svg";
import { servicePayment } from "../../CommonApi/CommonApi";
import { API_PATH } from "../../const";
import { PostApi } from "../../ApiService";
import { toast } from "react-toastify";

export const GoBackArrow = () => {
    const navigate = useNavigate();

    return (
        <Link to="#" onClick={() => navigate(-1)} className="d-inline-block">
            <img src={Left} className="me-3 mb-3 mb-sm-0 img-fluid" alt="arrow" />
        </Link>
    );
};

export const Previous = () => {
    const navigate = useNavigate();

    return (
        <button type="button" className="btn-comn-all3 my-3" onClick={() => navigate(-1)}>
            Previous
        </button>
    );
};

export const AdminOrderSummary = ({ service }) => {
    let total = Number(service?.service_price);

    return (
        <div className="white-box-main mb-4">
            <div className="recommendations-info agnet-dtl-btm">
                <h2 className="position-relative">Order Summary</h2>
                <div className="order-smry-info">
                    <p>${total || total == 0 ? total : ""}</p>
                    <div className="row me-0 my-2 align-items-center">
                        <span className="col-6 pe-0">
                            {service?.service_title} {service?.service_duration ? parseDays(service?.service_duration) : ""}
                        </span>
                        <bdi className="col-6 pe-0 text-end">${service?.service_price} </bdi>
                    </div>
                    <div className="bdr-top-total">
                        <div className="row me-0 align-items-center">
                            <span className="col-6 pe-0">Total</span>
                            <b className="col-6 pe-0 text-end">${total || total == 0 ? total : ""}</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const payment = (formData, type, company_Id, serviceInfo, navigate) => {
    let data;
    if (type === "default") {
        data = { serviceTitle: serviceInfo?.service_title, cardId: formData?._id, companyId: company_Id, CVV: formData.CVV, ...formData };
        servicePayment(data)
            .then((orderData) => {
                if (orderData?.orderID) {
                    navigate("/orders-details", { state: { orderId: orderData?.orderID, orderType: "admin", service: serviceInfo } });
                }
            })
            .catch((err) => toast.error(err.message));
    } else {
        let newData = { HolderName: formData.HolderName, Card_Number: formData.Card_Number, expiry_date: formData.expiry_date, CVV: formData.CVV, exp_month: Number(formData.month), exp_year: Number(formData.year) };
        new Promise((resolve) => resolve(PostApi(API_PATH.addCardDetail, newData))).then((res) => {
            if (res.status === 200) {
                data = { serviceTitle: serviceInfo?.service_title, cardId: res.data.data?._id, companyId: company_Id, CVV: formData.CVV, ...formData };
                servicePayment(data)
                    .then((orderData) => {
                        if (orderData?.orderID) {
                            navigate("/orders-details", { state: { orderId: orderData?.orderID, orderType: "admin", service: serviceInfo } });
                        }
                    })
                    .catch((err) => toast.error(err.message));
            }
        });
    }
};
