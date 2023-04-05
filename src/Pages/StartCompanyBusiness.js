import React, { useContext, useEffect, useState } from "react";
import FrontLayout from "../Components/FrontLayout/FrontLayout";
import { Accordion, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import MainImg from "../Images/form-order.png";
import Review from "../Images/review.svg";
import ReviewProfile1 from "../Images/feed_1.png";
import ReviewProfile2 from "../Images/feed_2.png";
import ReviewProfile3 from "../Images/feed_3.png";
import ReviewProfile4 from "../Images/feed_4.png";
import ReviewProfile5 from "../Images/feed_5.png";
import ReviewSideComma from "../Images/review-side-comma.svg";
import StartOver from "../Images/startover.png";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { useAllState } from "../Hooks/CustomHook";
import AuthContext from "../Context/AuthContext";

export default function StartACompanyBusiness() {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const location = useLocation();

    const [show, setShow] = useState(false);
    const [company, setCompany] = useState("");
    const [Plans, setPlans] = useState("");
    const States = useAllState();
    const [SelectedStates, setSelectedStates] = useState("");
    const [StateDisabled, setStateDisabled] = useState(true);
    const [SelectPlan, setSelectPlan] = useState(false);
    const [company_Id, setcompany_Id] = useState("");
    const [contactId, setcontactId] = useState("");
    const [userPlanId, setuserPlanId] = useState("");

    useEffect(() => {
        if (location.state?.previousLocation) {
            setShow(true);
        }
    }, [location.state?.previousLocation]);

    useEffect(() => {
        if (location.state?.userPlanId) {
            setuserPlanId(location.state.userPlanId);
        }
        if (location?.state?.company_Id) {
            setcompany_Id(location.state.company_Id);
        }
        if (location?.state?.contactId) {
            setcontactId(location.state.contactId);
        }
    }, [location?.state?.company_Id, location?.state?.userPlanId, location?.state?.contactId]);

    const onSlectPlan = (e) => {
        setCompany(e.target.value);
        setStateDisabled(false);
    };

    const onSelectState = (e) => {
        var index = e.target.selectedIndex;
        var el = e.target.childNodes[index];
        var sizeId = el?.getAttribute("id");
        setSelectedStates(e.target.value);
        setSelectPlan(true);
        ShowPlan(sizeId);
    };

    const handleResumeClick = () => {
        navigate(location.state?.previousLocation, { state: { contactId: contactId, userPlanId: userPlanId, company_Id: company_Id } });
    };

    const ShowPlan = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getPlans, { stateId: id, company_type: company }))).then((res) => {
            if (res.status === 200) {
                setPlans(res.data.data[0]);
            }
        });
    };

    const AddPlan = (plan) => {
        let addPlanReqData = { userplanId: "", _id: Plans._id, planid: plan._id, entity_type: company, stateName: SelectedStates };
        new Promise((resolve) => resolve(PostApi(API_PATH.addUserPlan, addPlanReqData))).then((res) => {
            if (res.status === 200) {
                context.setUserPlanId(res.data.data._id);
                context.setEntity(company);
                navigate(`/start-company-contact-info`, { state: { userPlanId: res.data.data._id, entity: company } });
            }
        });
    };

    return (
        <FrontLayout>
            <div className="content-after-class">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-8">
                            <div className="form-order-top">
                                <div className="text-center">
                                    <div className="common-heading-part">
                                        <h1>Start your business with confidence</h1>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,</p>
                                    </div>
                                    <img src={MainImg} alt="StartUp Geeks" className="img-fluid mt-md-5" />
                                </div>
                                <div className="row my-5">
                                    <div className="col-md-6">
                                        <select className="form-ans-comn-class select-form-class" onChange={onSlectPlan}>
                                            <option defaultValue="">select company type</option>
                                            <option value="LLC">LLC</option>
                                            <option value="Nonprofit">Nonprofit</option>
                                            <option value="C-Corporation">C-Corporation</option>
                                            <option value="S-Corporation">S-Corporation</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mt-md-0 mt-3">
                                        <select className="form-ans-comn-class select-form-class" onChange={onSelectState} disabled={StateDisabled}>
                                            <option>select</option>
                                            {States.length > 0 &&
                                                States.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item.label} id={item.value}>
                                                            {item.label}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <p className="mb-0">State specific pricing will display below once your selection have been made.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {SelectPlan && (
                    <>
                        <div id="choose-plan">
                            <div className="row-common-class">
                                <div className="container">
                                    <div className="row align-items-center justify-content-center">
                                        {Plans !== "" &&
                                            Plans.plan.map((item, i) => {
                                                return (
                                                    <div className="col-lg-4 col-md-6" key={i}>
                                                        <div className="plan-main-part">
                                                            <div className="plan-top-box">
                                                                <h5>{item.name}</h5>
                                                                <p>{item.description}</p>
                                                                <h1>${item.package_fee}</h1>
                                                                <button type="submit" className="button-class w-100" onClick={() => AddPlan(item)}>
                                                                    <span className="position-relative">Buy {item.name}</span>
                                                                </button>
                                                            </div>
                                                            <div className="plan-detail-btm border-0">
                                                                <p>WHAT`S INCLUDED</p>
                                                                <ul className="plan-list">
                                                                    {item.features.map((features, i) => {
                                                                        return (
                                                                            <li key={i}>
                                                                                <p className="d-flex align-items-center">
                                                                                    <i className="bi bi-check me-2"></i>
                                                                                    {features}
                                                                                </p>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row-common-class bg-dif-row">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <div className="ms-5 review-head">
                                            <img className="img-fluid review-comma" src={Review} alt='"' />
                                            <h2>Most Trusted, Verified Reviews</h2>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="my-md-5">
                                            <div className="row align-items-center  justify-content-center">
                                                <div className="col-xxl-7">
                                                    <div>
                                                        <div className="position-relative">
                                                            <div className="review-main-part">
                                                                <div className="review-main-box">
                                                                    <div className="d-flex">
                                                                        <div className="mx-2">
                                                                            <img src={ReviewSideComma} className="fix-comma-class" alt="" />
                                                                        </div>
                                                                        <p>We had an incredible experience working with Startup Geeks and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the product concept so quickly. It acted as a catalyst to take our design to the next level and get more eyes on our product.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-7 d-flex align-items-center justify-content-center">
                                                    <div>
                                                        <div className="reviewer-profile">
                                                            <img src={ReviewProfile1} alt="Reviewer_1" />
                                                            <div className="ms-2 reviewer-info">
                                                                <bdi>Jane Cooper</bdi>
                                                                <p>CEO, ABC Corporation</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="reviewer-profile">
                                                            <img src={ReviewProfile2} alt="Reviewer_2" />
                                                            <div className="ms-2 reviewer-info">
                                                                <bdi>Jane Cooper</bdi>
                                                                <p>CEO, ABC Corporation</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="reviewer-profile">
                                                            <img src={ReviewProfile3} alt="Reviewer_3" />
                                                            <div className="ms-2 reviewer-info">
                                                                <bdi>Jane Cooper</bdi>
                                                                <p>CEO, ABC Corporation</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="reviewer-profile">
                                                            <img src={ReviewProfile4} alt="Reviewer_4" />
                                                            <div className="ms-2 reviewer-info">
                                                                <bdi>Jane Cooper</bdi>
                                                                <p>CEO, ABC Corporation</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="reviewer-profile">
                                                            <img src={ReviewProfile5} alt="Reviewer_5" />
                                                            <div className="ms-2 reviewer-info">
                                                                <bdi>Jane Cooper</bdi>
                                                                <p>CEO, ABC Corporation</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="reviewer-profile">
                                                            <img src={ReviewProfile3} alt="Reviewer_6" />
                                                            <div className="ms-2 reviewer-info">
                                                                <bdi>Jane Cooper</bdi>
                                                                <p>CEO, ABC Corporation</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row-common-class bg-white">
                            <div className="container">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-xl-8">
                                        <div className="row-title-class text-center mb-xl-5 mb-3">
                                            <h2>Frequently asked questions</h2>
                                        </div>
                                        <div className="faq-main-div">
                                            <Accordion defaultActiveKey="0">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Accordion.Header>
                                                    <Accordion.Body>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.</Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Accordion.Header>
                                                    <Accordion.Body>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.</Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Accordion.Header>
                                                    <Accordion.Body>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s.</Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Modal show={show} size="md" dialogClassName="agree-modal-main" className="resume-modal" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="agree-modal-part">
                        <div className="row m-auto" style={{ maxWidth: "260px", maxHeight: "150px" }}>
                            <img src={StartOver} alt="" />
                        </div>
                        <div className="row">
                            <div className="col-12 m-auto mt-3">
                                <p className="text-center fw-bold" style={{ fontSize: "22px" }}>
                                    It appears you may already have an order in progress.
                                </p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6 m-auto">
                                <button type="button" className="btn-comn-all w-100" style={{ borderRadius: "50px" }} onClick={() => handleResumeClick()}>
                                    Resume Over
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mt-3 m-auto">
                                <button type="button" className="btn-comn-all3 w-100" style={{ borderRadius: "50px" }} onClick={() => setShow(false)}>
                                    Start Over
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </FrontLayout>
    );
}
