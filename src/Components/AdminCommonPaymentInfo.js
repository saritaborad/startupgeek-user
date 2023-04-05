import { useNavigate } from "react-router-dom";
import { useAllState } from "../Hooks/CustomHook";
import { AdminOrderSummary, GoBackArrow } from "../Pages/Common/AdminOrderSummary";
import AdminPayment from "../Pages/Common/AdminPayment";
import { BenefitList } from "./BenefitList";
import { CurrentCompanyInfo } from "./CurrentCompanyInfo";
import Layout from "./Layout/Layout";

export const AdminCommonPaymentInfo = ({ name, submitFormData, serviceInfo = "", state, setState, error, setError, serviceState, allState, country }) => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-sm-inline-flex align-items-center comn-title-info">
                                <GoBackArrow />
                                <h1>{name}</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <CurrentCompanyInfo state={state} setState={setState} error={error} setError={setError} serviceState={serviceState} allState={allState} />
                                    <div className="payment-area">
                                        <AdminPayment submitFormData={submitFormData} allState={allState} country={country} />
                                        <button type="button" className="btn-comn-all3 my-3" onClick={() => navigate(-1)}>
                                            Previous
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <AdminOrderSummary service={serviceInfo} />
                                    <BenefitList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
