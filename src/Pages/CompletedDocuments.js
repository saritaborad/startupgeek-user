import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Articles from "../Images/articles-icon.svg";
import Organizer from "../Images/organizer-icon.svg";
import CompletedImage from "../Images/completed-image.svg";

export default function CompletedDocuments() {
    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="comn-title-info">
                                <h1>Completed Documents</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <div className="recommendations-info">
                                        <h2 className="position-relative">Congratulations! Here are each of your completed company documents.</h2>
                                        <p>This is your document repository where all of your company documents are stored. You can access these documents 24/7 and will be the location where any future documentation we fulfill on your behalf will be safely stored.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-md-end text-center">
                                        <img src={CompletedImage} className="img-fluid" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-6 space-class-box">
                                    <div className="order-box-btm">
                                        <span>
                                            <img src={Articles} className="img-fluid" alt="" />
                                        </span>
                                        <bdi className="d-block">Filed Articles</bdi>
                                        <p>A set of formal documents filed with the Secretary of State to legally document the creation of a new business entity.</p>
                                        <div className="mt-auto order-box-btm-read">
                                            <Link to="https://hprojecttesting.s3.amazonaws.com/startupGeek/files/3RiHjd.pdf" className="d-inline-block">
                                                View .PDF →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 space-class-box">
                                    <div className="order-box-btm">
                                        <span>
                                            <img src={Organizer} className="img-fluid" alt="" />
                                        </span>
                                        <bdi className="d-block">Statement Of The Organizer</bdi>
                                        <p>A document signed by the Organizer which identifies the initial members of the Limited Liability Company.</p>
                                        <div className="mt-auto order-box-btm-read">
                                            <Link to="https://hprojecttesting.s3.amazonaws.com/startupGeek/files/aXFj2L.pdf" className="d-inline-block">
                                                View .PDF →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
