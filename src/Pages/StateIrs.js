import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IrsIcon1 from "../Images/irs-icon-1.svg";
import IrsIcon2 from "../Images/irs-icon-2.svg";
import IrsIcon3 from "../Images/irs-icon-3.svg";
import IrsIcon4 from "../Images/irs-icon-4.svg";
import IrsIcon5 from "../Images/irs-icon-5.svg";
import Layout from "../Components/Layout/Layout";
import Irs from "../Images/irs-image.svg";
import Financial from "../Images/financial-icon.svg";
import Legal from "../Images/legal-icon.svg";
import Consultation from "../Images/consultation-icon.svg";
import AuthContext from "../Context/AuthContext";

export default function StateIrs() {
  const context = useContext(AuthContext);

  const [viewcompanyid, setviewcompanyid] = useState("");

  useEffect(() => {
    setviewcompanyid(context.viewCompanyId);
  }, [context.viewCompanyId]);

  const ServiceInfo = [
    {
      title: "Business Formation Kit",
      description: "Your official state documents will be delivered in a high quality and professional kit with your company name stamped along the spine of the book.",
      image: IrsIcon1,
      redirectLink: "/business-formation-kit",
    },
    {
      title: "EIN / Tax ID Number",
      description: "An EIN is required to open a bank account, file taxes and submit payroll taxes.",
      image: IrsIcon2,
      redirectLink: "",
    },
    {
      title: "File Annual Report",
      description: "The majority of states require that companies file periodic reports that affirm the current information of the companies members, directors, and business address.",
      image: IrsIcon3,
      redirectLink: "/annual-report",
    },
    {
      title: "Certificate Of Assumed Business Name",
      description: "Filed if a company requires assumed business/fictitious name.",
      image: IrsIcon3,
      redirectLink: "/certificate-assumed-business-company",
    },
    {
      title: "Amendment",
      description: "Filed if a company requires changes to membership, addresses or company name.",
      image: IrsIcon3,
      redirectLink: "/amendment",
    },
    {
      title: "Foreign Qualification",
      description: "Filed when you need to expand your entity to new states.",
      image: IrsIcon3,
      redirectLink: "/foreign-qualification",
    },
    {
      title: "Form 2553",
      description: "The 2553 is the IRS form filed by a business entity in order to obtain the S-Corporation tax classification.",
      image: IrsIcon4,
      redirectLink: "/form2553",
    },
    {
      title: "Certificate Of Good Standing",
      description: "Required by governmental and private agencies to validate a companies status in order to facilitate specified transactions.",
      image: IrsIcon5,
      redirectLink: "/certificate-good-standing",
    },
    {
      title: "Dissolution",
      description: "Used to formally terminate the existence of a entity.",
      image: IrsIcon3,
      redirectLink: "/dissolution",
    },
  ];

  return (
    <Layout>
      <div className="content-main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="comn-title-info">
                <h1>State & IRS Fillings</h1>
              </div>
            </div>
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="recommendations-info">
                    <h2 className="position-relative">We can assist with protecting your good standing by filing various mandatory state and IRS requirements.</h2>
                    <p>As your business grows we'll help make sure that you have the resources at hand to service your companies ongoing needs.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-md-end text-center">
                    <img src={Irs} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                {ServiceInfo.map((val, i) => {
                  return (
                    <div className="col-md-4 space-class-box" key={i}>
                      <div className="order-box-btm">
                        <span>
                          <img src={val.image} className="img-fluid" alt="" />
                        </span>
                        <bdi className="d-block">{val.title}</bdi>
                        <p>{val.description}</p>
                        <div className="mt-auto order-box-btm-read">
                          <Link to={val.redirectLink} state={{ viewCompanyId: viewcompanyid }} className="d-inline-block">
                            Order →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-12 pt-4">
              <div className="recommendations-info">
                <h2 className="position-relative">As your business grows we'll be there every step of the way to make sure that you have the resources at hand to service your company's ongoing needs.</h2>
              </div>
              <div className="white-box-main mb-4">
                <div className="d-flex irs-btm-box">
                  <bdi className="d-flex align-items-center justify-content-center">
                    <img src={Financial} alt="financial" />
                  </bdi>
                  <div className="ps-3">
                    <span className="d-block">Financial</span>
                    <p>Having the right financial strategy gives you the peace of mind to focus on what matters - running your business.</p>
                    <div className="pt-2">
                      <Link to="/financial" state={{ viewCompanyId: viewcompanyid }} className="btn-comn-all text-white">
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="white-box-main mb-4">
                <div className="d-flex irs-btm-box">
                  <bdi className="d-flex align-items-center justify-content-center">
                    <img src={Legal} alt="legal" />
                  </bdi>
                  <div className="ps-3">
                    <span className="d-block">Legal</span>
                    <p>As a business owner, you are responsible for making sure your company has the proper protection against outside threats while maintaining compliance to operate legally on a federal, state, city, and county levels.</p>
                    <div className="pt-2">
                      <Link to="/legal" state={{ viewCompanyId: viewcompanyid }} className="btn-comn-all text-white">
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="white-box-main mb-4">
                <div className="d-flex irs-btm-box">
                  <bdi className="d-flex align-items-center justify-content-center">
                    <img src={Consultation} alt="consultation" />
                  </bdi>
                  <div className="ps-3">
                    <span className="d-block">Business Tax Consultation</span>
                    <p>The consultation can help you identify important tax deductions and provide insight into the IRS tax classification of your new business.</p>
                    <div className="pt-2">
                      <Link to="/texes" state={{ viewCompanyId: viewcompanyid }} className="btn-comn-all text-white">
                        Read more
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
