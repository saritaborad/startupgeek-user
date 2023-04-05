import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Banking from "../Images/banking-image.svg";
import { Accordion } from "react-bootstrap";
import { GoBackArrow } from "./Common/AdminOrderSummary";

export default function BusinessBanking() {
  return (
    <Layout>
      <div className="content-main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="comn-title-info d-sm-inline-flex align-items-center">
                <GoBackArrow />
                <h1>Business Banking</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="recommendations-info">
                    <h2 className="position-relative">Business Banking</h2>
                    <p>We teamed up with Bank of America® to help you take advantage of perks they offer to entrepreneurs to help their small business grow. Incfile clients have the opportunity to receive an exclusive offer from Bank of America® to help establish your small business banking account.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-md-end text-center">
                    <img src={Banking} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="white-box-main">
                <div className="recommendations-info">
                  <h2 className="position-relative bdr-remove mb-0 pb-2">Open your Business checking account with ease.</h2>
                </div>
                <ul className="learn-inform-list">
                  <li className="mt-3">
                    <div className="learn-inform-list-inr">
                      <span className="d-flex align-items-center justify-content-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <b> Save Time: </b> Open account virtually by not having to step foot in a financial center location.
                      </div>
                    </div>
                  </li>
                  <li className="mt-3">
                    <div className="learn-inform-list-inr">
                      <span className="d-flex align-items-center justify-content-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <b>Get Advice: </b> Work directly with a small business specialist by phone to get you setup.
                      </div>
                    </div>
                  </li>
                  <li className="mt-3">
                    <div className="learn-inform-list-inr">
                      <span className="d-flex align-items-center justify-content-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <b>Great Benefits: </b> Receive exclusive bonus offer not available in financial center locations
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link to="/" className="btn-comn-all text-white">
                    get started
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="white-box-main">
                <div className="recommendations-info">
                  <h2 className="position-relative bdr-remove mb-0 pb-2">Earn up to a $500 bonus</h2>
                </div>
                <ul className="learn-inform-list">
                  <li className="mt-3">
                    <div className="learn-inform-list-inr">
                      <span className="d-flex align-items-center justify-content-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <b>Earn up to $200 </b> when you open a new Bank of America business checking account over the phone and meet qualifying criteria
                      </div>
                    </div>
                  </li>
                  <li className="mt-3">
                    <div className="learn-inform-list-inr">
                      <span className="d-flex align-items-center justify-content-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.8954 9.93731C16.2704 13.0623 13.9142 16.0048 10.6079 16.6623C8.99541 16.9834 7.32269 16.7876 5.82793 16.1028C4.33317 15.418 3.09257 14.279 2.28279 12.848C1.47301 11.4171 1.13532 9.76717 1.31781 8.13316C1.5003 6.49914 2.19366 4.96434 3.29917 3.74731C5.56667 1.24981 9.39542 0.562313 12.5204 1.81231" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.27051 8.6875L9.39551 11.8125L16.8955 3.6875" stroke="#18191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <b>Earn a $300 statement credit:</b>
                        when you are approved for and open an eligible Bank of America small business credit card and make at least $3,000 in new Net Purchases with the card within the first 90 days of card account opening.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 pt-4">
              <div className="recommendations-info">
                <h2 className="position-relative">Frequently asked questions</h2>
              </div>
              <div className="white-box-main mb-3 custom-accordion-info">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>What documentation is required to open a small business checking account?</Accordion.Header>
                    <Accordion.Body>The most common documents required to open a new small business checking account include, but are not limited to a business tax ID and legal business name. Additional documents include current and stamped/filed articles of incorporation or certificates of organization.</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Can I open a small business account prior to the completion of my LLC or Corporation state filing?</Accordion.Header>
                    <Accordion.Body>After completing your order, you will receive a call from a Bank of America small business specialist for a small business consultation. At that point you will discuss the required documentation needed to open an account once your documents are filed with the state.</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Will I need to open a small business account by going to a local financial center location?</Accordion.Header>
                    <Accordion.Body>No, you can open a business checking account over the phone with a Bank of America® small business specialist. The bonus is only available by opening an account with a specialist over the phone.</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>When will I be contacted by a small business specialist?</Accordion.Header>
                    <Accordion.Body>A Bank of America small business specialist will contact you on the next business day, or if you prefer talking to a specialist today, you can reach us at 866.972.2960.</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="pt-1 pb-3">
                <Link to="/" className="btn-comn-all text-white">
                  get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
