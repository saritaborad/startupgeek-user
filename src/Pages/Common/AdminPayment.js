import React from "react";
import Card1 from "../../Images/mastercard.svg";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import CardForm from "../../CommonForm/CardForm";
import { useDefaultCard } from "../../Hooks/CustomHook";

const AdminPayment = ({ submitFormData, buttonId = "", allState, country }) => {
    const [openpayment, setOpenPayment] = useState(false);
    const [intialize, setInitialize] = useState(false);
    const defaultCard = useDefaultCard();

    return (
        <>
            <div className="comn-title-info pt-0">
                <h1>Payment Method</h1>
            </div>
            <div className="white-box-main">
                <div className="box-hdr-top border-0 p-0">
                    <span>Select a company associated with your purchase</span>
                </div>
                <div className="d-sm-flex d-block align-items-center border-bottom">
                    <div className="d-flex align-items-center">
                        <div className="cust-radio-btn position-relative ms-3">
                            <input
                                type="radio"
                                id="existmethod"
                                defaultChecked
                                onChange={() => {
                                    setOpenPayment(false);
                                    setInitialize(true);
                                }}
                                name="payment"
                            />
                            <label htmlFor="existmethod" className="position-static"></label>
                        </div>
                        <div className="ms-2 stsg-box-list d-flex align-items-center stsg-box-list-text stsg-box-list-profile">
                            <span className="d-block">
                                <img src={Card1} alt="profile" />
                            </span>
                            <div className="stsg-box-list-text ps-3">
                                <p className="mb-0">XXXX XXXX {defaultCard?.Card_Number?.toString()?.slice(-4)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="ms-auto my-2">
                        <button
                            type="submit"
                            className="btn-comn-all4 w-100 btn-hide-show"
                            id="pay-btn"
                            aria-expanded={openpayment}
                            onClick={() => {
                                if (buttonId) {
                                    document.getElementById(buttonId)?.click();
                                }
                                submitFormData(defaultCard, "default");
                            }}
                        >
                            pay now
                        </button>
                    </div>
                </div>
                <div className="my-3">
                    <div className="cust-radio-btn ms-3">
                        <input
                            type="radio"
                            id="payment-2"
                            name="payment"
                            onChange={() => {
                                setOpenPayment(!openpayment);
                                setInitialize(false);
                            }}
                        />
                        <label for="payment-2">New Payment Method</label>
                    </div>
                </div>
            </div>
            <Collapse in={openpayment}>
                <div className="my-3" id="NewCard">
                    <CardForm setOpenPayment={setOpenPayment} submitFormData={submitFormData} buttonId={buttonId} intialize={intialize} allState={allState} country={country} />
                </div>
            </Collapse>
        </>
    );
};

export default AdminPayment;
