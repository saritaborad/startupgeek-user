let LIVE = Number(process.env.REACT_APP_PRODUCTION);
let api_base_url;
if (LIVE === 1) {
    api_base_url = process.env.REACT_APP_LIVE_BASE_URL;
} else {
    api_base_url = process.env.REACT_APP_LOCAL_BASE_URL;
}

export const ApiBaseUrl = api_base_url;

export const API_PATH = {
    signup: ApiBaseUrl + "api/signup",
    login: ApiBaseUrl + "api/login",
    socialLogin: ApiBaseUrl + "api/socialLogin",
    resetPassword: ApiBaseUrl + "api/setPassword",
    forgotPassword: ApiBaseUrl + "api/forgotPassword",
    getUserInfo: ApiBaseUrl + "api/getUserInfo",
    updateuser: ApiBaseUrl + "api/updateuser",
    uploadImg: ApiBaseUrl + "upload/document",
    getAllState: ApiBaseUrl + "admin/getAllState",
    getTotalState: ApiBaseUrl + "stateList",
    getAllCity: ApiBaseUrl + "cityList",
    getAllCountry: ApiBaseUrl + "countryList",
    getPlans: ApiBaseUrl + "admin/getPlan",
    addUserPlan: ApiBaseUrl + "userPlan/addPlan",
    getOnePlan: ApiBaseUrl + "userPlan/getUserPlan",
    addcompany: ApiBaseUrl + "company/addcompany",
    getCompanyAllDetail: ApiBaseUrl + "company/getCompanyAllDetail",
    getContact: ApiBaseUrl + "contact/getContact",
    addContact: ApiBaseUrl + "contact/addContact",
    contactUpdate: ApiBaseUrl + "contact/contactUpdate",
    updateCompanyInfo: ApiBaseUrl + "company/infoupdate",
    getCompanyOrder: ApiBaseUrl + "admin/getCompanyOrder",
    createDirector: ApiBaseUrl + "director/createDirector",
    getDirectorByCompany: ApiBaseUrl + "director/getDirectorByCompany",
    createMember: ApiBaseUrl + "member/createMember",
    getMemberByCompany: ApiBaseUrl + "member/getMemberByCompany",
    addShareHolderData: ApiBaseUrl + "shareholder/addShareHolderData",
    getShareHolderByCompany: ApiBaseUrl + "shareholder/getShareHolderByCompany",
    getTaxInfoByCompany: ApiBaseUrl + "taxid/getTaxInfoByCompany",
    addTaxId: ApiBaseUrl + "taxid/addTaxId",
    addAgent: ApiBaseUrl + "agent/addAgent",
    addBusinessData: ApiBaseUrl + "business/addBusinessData",
    getBusinessByCompany: ApiBaseUrl + "business/getBusinessByCompany",
    getBillInfoByCompany: ApiBaseUrl + "billing/getBillInfoByCompany",
    addBillInfo: ApiBaseUrl + "billing/addBillInfo",
    updateBilling: ApiBaseUrl + "billing/updatebill",
    getUsersCard: ApiBaseUrl + "billing/getAllCard",
    getCompanyGroup: ApiBaseUrl + "company/getCompanyGroup",
    companyLogin: ApiBaseUrl + "company/companyLogin",
    getUsersCompany: ApiBaseUrl + "company/getUsersCompany",
    getCompanysAgent: ApiBaseUrl + "company/getCompanysAgent",
    getCompanyDetail: ApiBaseUrl + "company/getCompanyDetail",
    getMailBox: ApiBaseUrl + "mailbox/getMailBox",
    getServiceInfo: ApiBaseUrl + "admin/getServiceInfo",
    updateServices: ApiBaseUrl + "userPlan/updateServices",
    getNaicsCodes: ApiBaseUrl + "company/getNaicsCode",
    getOrderDetail: ApiBaseUrl + "admin/getOrderDetail",
    getAllDocument: ApiBaseUrl + "admin/getAllDocument",
    getAgentByCompany: ApiBaseUrl + "agent/getAgentByCompany",
    getBussBanking: ApiBaseUrl + "common/getDataInfo",
    getTaxStretagy: ApiBaseUrl + "common/getDataInfo",
    addBussBanking: ApiBaseUrl + "common/addBussBanking",
    addData: ApiBaseUrl + "common/addData",
    planPayment: ApiBaseUrl + "billing/PayForPlan",
    addBilling: ApiBaseUrl + "billing/addbill", // add card detail
    addCardDetail: ApiBaseUrl + "billing/addCard",
    servicePayment: ApiBaseUrl + "billing/servicePay",
    addNewUser: ApiBaseUrl + "company/addUser",
    getCompanyUser: ApiBaseUrl + "company/companyUser",
};

export const errorContainer = (form, field) => {
    return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
};

export const formAttr = (form, field) => ({ onBlur: form.handleBlur, onChange: form.handleChange, value: form.values[field] });

export const handleContactChecked = (e, ref, contactInfo, setField = []) => {
   
    let obj = {};
    let obj1 = {};
    setField?.length > 0 && setField.map((item) => (obj[item] = contactInfo?.[item]));
    setField?.length > 0 && setField.map((item) => (obj1[item] = ""));
    if (e.target.checked) {
        ref?.setValues((prev) => ({ ...prev, ...obj }));
    } else {
        ref?.setValues((prev) => ({ ...prev, ...obj1 }));
    }
};
