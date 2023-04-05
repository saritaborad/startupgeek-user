import React, { useContext, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import { useLocation, useNavigate } from "react-router-dom";
import Whitebox from "./Common/WhiteBox";
import { Ordersummary } from "./Common/OrderSummary";
import { useServiceInfo } from "../Hooks/CustomHook";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AuthContext from "../Context/AuthContext";

export default function StartACompanyBankingInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);

    const progressbar = { width: "70%", ariavaluenow: "70", ariavaluemin: "0", ariavaluemax: "100" };
    const [business, setBusiness] = useState(2);
    const [company_Id, setcompany_Id] = useState("");
    const [contactId, setcontactId] = useState("");
    const [userPlanId, setuserPlanId] = useState("");
    const serviceInfo = useServiceInfo("Business Banking");
    const [company, setCompany] = useState("");
    const [previousLocation, setPreviousLocation] = useState(null);

    useEffect(() => {
        setCompany(context.company);
    }, [context.company]);

    useEffect(() => {
        if (location?.state?.company_Id !== undefined && location?.state?.userPlanId !== undefined) {
            setcompany_Id(location.state.company_Id);
            context.setviewCompanyId(location.state.company_Id);
            setuserPlanId(location.state.userPlanId);
            getBankingInfo(location.state.company_Id);
        } else {
            navigate("/start-company-business");
        }
        if (location?.state?.contactId !== undefined) {
            setcontactId(location.state.contactId);
        }
    }, [location?.state?.company_Id, location.state?.userPlanId, location?.state?.contactId]);

    useEffect(() => {
        location?.state?.previousLocation ? setPreviousLocation(location.state?.previousLocation) : setPreviousLocation(location.pathname);
    }, [location.state?.previousLocation]);

    const submitFormData = () => {
        let data = { userPlanId: userPlanId, company_Id: company_Id, bussBanking: business, serviceTitle: "Business Banking", addService: business == 1 ? true : false };
        const addBanking = new Promise((resolve, reject) => resolve(PostApi(API_PATH.addBussBanking, data)));
        addBanking.then((res) => {
            if (res.status === 200) {
                setPreviousLocation(location.pathname);
                navigate("/start-company-tax-strategy", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id } });
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getBankingInfo = (id) => {
        const getBanking = new Promise((resolve) => resolve(PostApi(API_PATH.getBussBanking, { company_Id: id })));
        getBanking.then((res) => {
            if (res.status === 200) {
                setBusiness(res.data.data[0]?.bussBanking || 2);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const goPrevious = () => {
        navigate("/start-company-tax-info", { state: { userPlanId: userPlanId, contactId: contactId, company_Id: company_Id, previousLocation: previousLocation } });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="start-cmn-top">
                                Complete your order for <span>{company?.company_name}</span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <div className="white-box-main">
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <div className="recommendations-info">
                                                <h2 className="position-relative">Setting up Small Business Banking</h2>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="dir-detail-comn">
                                                <span className="d-block">Open your new account over the phone. No financial center visit required.</span>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3" value={business} onChange={(e) => setBusiness(e.target.value)}>
                                            <div className="dir-detail-comn mb-3">
                                                <span className="d-block">Earn up to a $500 bonus*. Put money back into your business banking account. </span>
                                            </div>
                                            <div className="cust-radio-btn diff-radio-class new-radio mb-3">
                                                <input type="radio" id="yes" name="banking" className="cust-radio" value={1} checked={business == 1} />
                                                <label className="comn-radio-box" htmlFor="yes">
                                                    <div className="mb-3">Yes, please have a Bank of America Small Business Specialist contact me (FREE).</div>
                                                    <div className="border-class">
                                                        <div className="dir-detail-comn mt-3">
                                                            <p>
                                                                <span className="fs-6">Earn up to a $500 bonus.</span> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                                            </p>
                                                            <p>
                                                                <span className="fs-6">Earn up to $200 bonus.</span> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                                            </p>
                                                            <p>
                                                                <span className="fs-6">Earn a $300 statement Credit:</span> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="cust-radio-btn diff-radio-class ">
                                                <input type="radio" id="no" name="banking" className="cust-radio" value={2} checked={business == 2} />
                                                <label className="comn-radio-box d-flex align-items-center" htmlFor="no">
                                                    No, not at this time
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="dir-detail-comn">
                                                <span className="d-block">One owner of the company is required to have a physical residence in the U.S. to open a small business bank account.</span>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex align-items-center">
                                                <button className="btn-comn-all3 btn-after-class" type="button" onClick={() => goPrevious()}>
                                                    Previous
                                                </button>
                                                <button
                                                    className=" ms-auto btn-comn-all btn-after-class"
                                                    type="button"
                                                    onClick={() => {
                                                        submitFormData();
                                                    }}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Ordersummary progressbar={progressbar} service={business == 1 ? serviceInfo : ""} userPlanId={userPlanId} />
                            <Whitebox />
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
}
