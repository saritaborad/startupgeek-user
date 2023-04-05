import React from "react";
import Profile1 from "../Images/profile.png";
import { useLocation } from "react-router-dom";
import Layout from "../Components/Layout/Layout";

export default function MailboxView() {
    const docs = useLocation()?.state?.mailData?.document;
    const mailData = useLocation()?.state?.mailData;

    const downloadDoc = async (e, pdfUrl) => {
        let ext = pdfUrl?.split(".")?.pop();
        fetch(`${pdfUrl}`, {
            method: "GET",
        }).then((res) => {
            return res.blob().then((blob) => {
                var a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `Document.${ext}`;
                a.click();
            });
        });
    };

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row m-0">
                        <div className=" col-md-4 col-sm-6 comn-title-info px-0">
                            <h1>Mailbox</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 ">
                            <div className="white-box-main">
                                <div className="box-hdr-top d-sm-flex align-items-center">
                                    <span className="d-flex align-items-center">{mailData?.subject}</span>
                                </div>
                                <div className="mail-main-top box-hdr-top">
                                    <div className="d-md-flex">
                                        <div className="d-flex align-items-center agent-detail-txt">
                                            <span className="d-block img-mail-box-pro">
                                                <img src={Profile1} alt="profile" />
                                            </span>
                                            <div className="d-flex align-items-start">
                                                <div className="agent-list-txt ps-3">
                                                    <bdi className="d-block"></bdi>
                                                    <label className="d-block">{mailData?.email}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>{mailData?.description && <p dangerouslySetInnerHTML={{ __html: mailData?.description }} className="mt-3 mb-5"></p>}</div>
                                </div>
                                <div className="box-hdr-top border-0 pb-0">
                                    <span>{document?.length} Attachment</span>
                                </div>
                                <div className="attach-items-sec">
                                    {docs &&
                                        docs?.length > 0 &&
                                        docs?.map((doc, i) => {
                                            return (
                                                <div className="attach-item mb-3 position-relative" key={i}>
                                                    <embed src={doc} width="320px" height="240px" scroll="no" />
                                                    <span className="download-pdf" onClick={(e) => downloadDoc(e, doc)}>
                                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" role="none" style={{ display: "block", width: "27px", height: "27px", fill: "#b4b4b4" }}>
                                                            <g>
                                                                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
