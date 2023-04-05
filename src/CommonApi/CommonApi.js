import { toast } from "react-toastify";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";

export const getAllState = (setAllState) => {
    new Promise((resolve, reject) => resolve(PostApi(API_PATH.getAllState))).then((res) => {
        if (res.status === 200) {
            setAllState(res.data.data);
        } else {
            console.log(res.data.message);
        }
    });
};

export const getAllCountry = (setAllCountry) => {
    new Promise((resolve, reject) => resolve(PostApi(API_PATH.getAllCountry))).then((res) => {
        if (res.status === 200) {
            setAllCountry(res.data.data);
        } else {
            console.log(res.data.message);
        }
    });
};

export const getOnePlan = (setOnePlan, userPlanId) => {
    new Promise((resolve) => resolve(PostApi(API_PATH.getOnePlan, { userplanId: userPlanId }))).then((res) => {
        if (res.status === 200) {
            setOnePlan(res.data.data);
        } else {
            console.log(res.data.message);
        }
    });
};

export const getContact = (setContactInfo, contactId) => {
    new Promise((resolve) => resolve(PostApi(API_PATH.getContact, { _id: contactId }))).then((res) => {
        if (res.status === 200) {
            setContactInfo(res.data.data);
        }
    });
};

export const getServiceInfo = (service_title, setServiceInfo) => {
    new Promise((resolve, reject) => resolve(PostApi(API_PATH.getServiceInfo, { service_title: service_title }))).then((res) => {
        if (res.status === 200) {
            setServiceInfo(res.data.data);
        }
    });
};

export const servicePayment = async (data) => {
    return new Promise((resolve, reject) => resolve(PostApi(API_PATH.servicePayment, data))).then((res) => res.data.data).catch((err) => err);
};

export const getStartCompnayInfo = (setStartCompany, company_Id) => {
    new Promise((resolve, reject) => resolve(PostApi(API_PATH.getCompanyDetail, { company_Id }))).then((res) => {
        if (res.status === 200) {
            setStartCompany(res.data.data);
        }
    });
};

export const getUsersCard = (setDefaultCard) => {
    new Promise((resolve) => resolve(PostApi(API_PATH.getUsersCard, { status: 1 }))).then((res) => {
        if (res.status === 200) {
            setDefaultCard(res.data.data?.[0]);
        } else {
            toast.error(res.data.message);
        }
    });
};
