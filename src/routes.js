import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Logo from "./Images/logo.png";

const Amendment = lazy(() => import("./Pages/Amendment"));
const AddNewUser = lazy(() => import("./Pages/AddNewUser"));
const AnnualReport = lazy(() => import("./Pages/AnnualReport"));
const BusinessBanking = lazy(() => import("./Pages/BusinessBanking"));
const BusinessListings = lazy(() => import("./Pages/BusinessListings"));
const BusinessContract = lazy(() => import("./Pages/BusinessContract"));
const BusinessContracts = lazy(() => import("./Pages/BusinessContracts"));
const BusinessInsurance = lazy(() => import("./Pages/BusinessInsurance"));
const BusinessListingScan = lazy(() => import("./Pages/BusinessListingScan"));
const BusinessFormationKit = lazy(() => import("./Pages/BusinessFormationKit"));
const BusinessListingPackage = lazy(() => import("./Pages/BusinessListingPackage"));
const BusinessListingStarted = lazy(() => import("./Pages/BusinessListingStarted"));
const BusinessLicenseResearch = lazy(() => import("./Pages/BusinessLicenseResearch"));
const BusinessLicensesPermits = lazy(() => import("./Pages/BusinessLicensesPermits"));
const BusinessContractTemplate = lazy(() => import("./Pages/BusinessContractTemplate"));
const BusinessListingVisibility = lazy(() => import("./Pages/BusinessLislingVisibility"));
const BusinessFormationKitPayment = lazy(() => import("./Pages/BusinessFormationKitPayment"));
const ClientEdit = lazy(() => import("./Pages/ClientEdit"));
const Compliance = lazy(() => import("./Pages/Compliance"));
const CompanyInfo = lazy(() => import("./Pages/CompanyInfo"));
const ClientSettings = lazy(() => import("./Pages/ClientSettings"));
const ComplianceAlert = lazy(() => import("./Pages/ComplianceAlert"));
const CompanySettings = lazy(() => import("./Pages/CompanySettings"));
const CompletedDocuments = lazy(() => import("./Pages/CompletedDocuments"));
const ChangeRegisteredAgent = lazy(() => import("./Pages/ChangeRegisteredAgent"));
const CertificateGoodStanding = lazy(() => import("./Pages/CertificateGoodStanding"));
const CertificateAssumedBusiness = lazy(() => import("./Pages/CertificateAssumedBusiness"));
const CertificateAssumedBusinessCompany = lazy(() => import("./Pages/CertificateAssumedBusinessCompany"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const DomainEmail = lazy(() => import("./Pages/DomainEmail"));
const Dissolution = lazy(() => import("./Pages/Dissolution"));
const DomainEmailSearch = lazy(() => import("./Pages/DomainEmailSearch"));
const Form2553 = lazy(() => import("./Pages/Form2553"));
const Financial = lazy(() => import("./Pages/Financial"));
const FiledArticles = lazy(() => import("./Pages/FiledArticles"));
const ForgotPassword = lazy(() => import("./Pages/Common/ForgotPassword"));
const ForeignQualification = lazy(() => import("./Pages/ForeignQualification"));
const Legal = lazy(() => import("./Pages/Legal"));
const Login = lazy(() => import("./Pages/Common/Login"));
const LegalTrandemark = lazy(() => import("./Pages/LegalTrandemark"));
const LegalTrandemarkNameSearch = lazy(() => import("./Pages/LegalTrademarkNameSearch"));
const Mailbox = lazy(() => import("./Pages/Mailbox"));
const MailboxView = lazy(() => import("./Pages/MailboxView"));
const OrdersDetails = lazy(() => import("./Pages/OrdersDetails"));
const OrdersReceipts = lazy(() => import("./Pages/OrdersReceipts"));
const PaymentMethod = lazy(() => import("./Pages/PaymentMethod"));
const Receipt = lazy(() => import("./Pages/Receipt"));
const Resetpassword = lazy(() => import("./Pages/Common/ResetPassword"));
const RegisteredAgent = lazy(() => import("./Pages/RegisteredAgent"));
const Recommendations = lazy(() => import("./Pages/Recommendations"));
const RegisteredAgentDetail = lazy(() => import("./Pages/RegisteredAgentDetail"));
const SignUp = lazy(() => import("./Pages/Common/SignUp"));
const StateIrs = lazy(() => import("./Pages/StateIrs"));
const StartACompanyInfo = lazy(() => import("./Pages/StartCompanyInfo"));
const StartACompanyMember = lazy(() => import("./Pages/StartCompanyMember"));
const StartACompanyTaxInfo = lazy(() => import("./Pages/StartCompanyTaxInfo"));
const StartACompanyDirector = lazy(() => import("./Pages/StartCompanyDirector"));
const StartACompanyBusiness = lazy(() => import("./Pages/StartCompanyBusiness"));
const StartACompanyTaxStrategy = lazy(() => import("./Pages/StartCompanyTaxStrategy"));
const StartACompanyContactInfo = lazy(() => import("./Pages/StartCompanyContactInfo"));
const StartACompanyReviewOrder = lazy(() => import("./Pages/StartCompanyReviewOrder"));
const StartACompanyBankingInfo = lazy(() => import("./Pages/StartCompanyBankingInfo"));
const StartACompanyShareholder = lazy(() => import("./Pages/StartCompanyShareholder"));
const StartACompanyPaymentInfo = lazy(() => import("./Pages/StartCompanyPaymentInfo"));
const StartACompanyLicensePermits = lazy(() => import("./Pages/StartCompanyLicensePermits"));
const StartACompanyRegisteredAgent = lazy(() => import("./Pages/StartCompanyRegisteredAgent"));
const StartACompanyPaymentInfoNext = lazy(() => import("./Pages/StartCompanyPaymentInfoNext"));
const Texes = lazy(() => import("./Pages/Texes"));
const Website = lazy(() => import("./Pages/Website"));
const WebsiteDetails = lazy(() => import("./Pages/WebsiteDetails"));

const RequireAuth = () => {
    let isAuthenticated = localStorage.getItem("startgeekuser");
    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default function RouterContainer() {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div>
                        <div className="loading">
                            <img src={Logo} className="img-fluid" alt="" />
                        </div>
                    </div>
                }
            >
                <Routes>
                    <Route path="/" strict element={<Login />} />
                    <Route path="/forgotpassword" strict element={<ForgotPassword />} />
                    <Route path="/login" strict element={<Login />} />
                    <Route path="/reset-password/:token" element={<Resetpassword />} />
                    <Route path="/signUp" strict element={<SignUp />} />
                    <Route path="*" element={<Navigate to={"/login"} />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/amendment" strict element={<Amendment />} />
                        <Route path="/add-new-user" strict element={<AddNewUser />} />
                        <Route path="/annual-report" strict element={<AnnualReport />} />
                        <Route path="/business-banking" strict element={<BusinessBanking />} />
                        <Route path="/business-listings" strict element={<BusinessListings />} />
                        <Route path="/business-contract" strict element={<BusinessContract />} />
                        <Route path="/business-contracts" strict element={<BusinessContracts />} />
                        <Route path="/business-insurance" strict element={<BusinessInsurance />} />
                        <Route path="/business-formation-kit" strict element={<BusinessFormationKit />} />
                        <Route path="/business-listing-package" strict element={<BusinessListingPackage />} />
                        <Route path="/business-listing-started" strict element={<BusinessListingStarted />} />
                        <Route path="/business-license-research" strict element={<BusinessLicenseResearch />} />
                        <Route path="/business-licenses-permits" strict element={<BusinessLicensesPermits />} />
                        <Route path="/business-contract-template" strict element={<BusinessContractTemplate />} />
                        <Route path="/business-listing-visibility" strict element={<BusinessListingVisibility />} />
                        <Route path="/business-formation-kit-payment" strict element={<BusinessFormationKitPayment />} />
                        <Route path="/business-listing-scan" strict element={<BusinessListingScan />} />
                        <Route path="/compliance" strict element={<Compliance />} />
                        <Route path="/company-info" strict element={<CompanyInfo />} />
                        <Route path="/client-edit" strict element={<ClientEdit />} />
                        <Route path="/client-settings" strict element={<ClientSettings />} />
                        <Route path="/company-settings" strict element={<CompanySettings />} />
                        <Route path="/compliance-alert" strict element={<ComplianceAlert />} />
                        <Route path="/completed-documents" strict element={<CompletedDocuments />} />
                        <Route path="/change-register-agent" strict element={<ChangeRegisteredAgent />} />
                        <Route path="/certificate-good-standing" strict element={<CertificateGoodStanding />} />
                        <Route path="/certificate-assumed-business" strict element={<CertificateAssumedBusiness />} />
                        <Route path="/certificate-assumed-business-company" strict element={<CertificateAssumedBusinessCompany />} />
                        <Route path="/dashboard" strict element={<Dashboard />} />
                        <Route path="/dissolution" strict element={<Dissolution />} />
                        <Route path="/domain-email" strict element={<DomainEmail />} />
                        <Route path="/domain-email-search" strict element={<DomainEmailSearch />} />
                        <Route path="/form2553" strict element={<Form2553 />} />
                        <Route path="/financial" strict element={<Financial />} />
                        <Route path="/filed-articles" strict element={<FiledArticles />} />
                        <Route path="/foreign-qualification" strict element={<ForeignQualification />} />
                        <Route path="/legal" strict element={<Legal />} />
                        <Route path="/legal-trandemark" strict element={<LegalTrandemark />} />
                        <Route path="/legal-trandemark-name-search" strict element={<LegalTrandemarkNameSearch />} />
                        <Route path="/mailbox" strict element={<Mailbox />} />
                        <Route path="/mailbox-view" strict element={<MailboxView />} />
                        <Route path="/orders-details" strict element={<OrdersDetails />} />
                        <Route path="/orders-receipts" strict element={<OrdersReceipts />} />
                        <Route path="/receipt" strict element={<Receipt />} />
                        <Route path="/recommendations" strict element={<Recommendations />} />
                        <Route path="/registered-agent" strict element={<RegisteredAgent />} />
                        <Route path="/registered-agent-detail" strict element={<RegisteredAgentDetail />} />
                        <Route path="/payment-method" strict element={<PaymentMethod />} />
                        <Route path="/state-irs" strict element={<StateIrs />} />
                        <Route path="/start-company-info" strict element={<StartACompanyInfo />} />
                        <Route path="/start-company-member" strict element={<StartACompanyMember />} />
                        <Route path="/start-company-director" strict element={<StartACompanyDirector />} />
                        <Route path="/start-company-business" strict element={<StartACompanyBusiness />} />
                        <Route path="/start-company-tax-info" strict element={<StartACompanyTaxInfo />} />
                        <Route path="/start-company-shareholder" strict element={<StartACompanyShareholder />} />
                        <Route path="/start-company-contact-info" strict element={<StartACompanyContactInfo />} />
                        <Route path="/start-company-banking-info" strict element={<StartACompanyBankingInfo />} />
                        <Route path="/start-company-tax-strategy" strict element={<StartACompanyTaxStrategy />} />
                        <Route path="/start-company-review-order" strict element={<StartACompanyReviewOrder />} />
                        <Route path="/start-company-payment-info" strict element={<StartACompanyPaymentInfo />} />
                        <Route path="/start-company-registered-agent" strict element={<StartACompanyRegisteredAgent />} />
                        <Route path="/start-company-license-permits" strict element={<StartACompanyLicensePermits />} />
                        <Route path="/start-company-payment-info-next" strict element={<StartACompanyPaymentInfoNext />} />
                        <Route path="/texes" strict element={<Texes />} />
                        <Route path="/website" strict element={<Website />} />
                        <Route path="/website-details" strict element={<WebsiteDetails />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
