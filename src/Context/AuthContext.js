import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [isComLogin, setCompanyLogin] = useState(false);
    const [user, setUser] = useState("");
    const [company, setCompany] = useState("");
    const [startCompany, setStartCompany] = useState(null);
    const [contactInfo, setContactInfo] = useState();
    const [totalService, setTotalService] = useState([]);
    const [defaultCard, setDefaultCard] = useState();
    const [userPlanId, setUserPlanId] = useState("");
    const [entity, setEntity] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [contactId, setContactId] = useState("");
    const [viewCompanyId, setviewCompanyId] = useState("");
    const [viewCompanyInfo, setViewCompanyInfo] = useState("");

    const provider = new GoogleAuthProvider();
    const provider2 = new FacebookAuthProvider();

    provider.setCustomParameters({ promt: "select_account" });
    provider2.setCustomParameters({ prompt: "select_account" });

    useEffect(() => {
        if (localStorage.getItem("startgeekuser") && (user === "" || company === "")) {
            getUserInfo();
        }
    }, []);

    const facebookLogin = () => {
        return new Promise((resolve, reject) => {
            signInWithPopup(auth, provider2)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const googleLogin = () => {
        return new Promise((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const logOut = () => {
        signOut(auth);
    };

    const getUserInfo = () => {
        const userInfo = new Promise((resolve, reject) => resolve(PostApi(API_PATH.getUserInfo)));
        userInfo.then((res) => {
            if (res.status === 200) {
                setUser(res.data.data);
            }
        });
    };

    useEffect(() => {
        if (localStorage.getItem("startgeekuser") && viewCompanyId) {
            getCompanyDetail(viewCompanyId);
        }
    }, [viewCompanyId]);

    const getCompanyDetail = (id) => {
        new Promise((resolve) => resolve(PostApi(API_PATH.getCompanyAllDetail, { company_id: id }))).then((res) => {
            if (res.status === 200) {
                setViewCompanyInfo(res.data.data?.[0]);
                setCompany(res.data.data?.[0]);
                setContactInfo(res.data.data[0]?.contact);
            }
        });
    };

    useEffect(() => {
        if (viewCompanyId === "") {
            company_detail_id_change();
        }
    }, [viewCompanyId]);

    const company_detail_id_change = async () => {
        let token = localStorage.getItem("startgeekcompany");
        if (token !== null) {
            let company_detail_page_id = await parseJwt(token);
            setviewCompanyId(company_detail_page_id.company_id);
        }
    };

    const parseJwt = (token) => {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    };

    return (
        <AuthContext.Provider
            value={{
                ...{
                    user,
                    company,
                    startCompany,
                    defaultCard,
                    contactInfo,
                    isComLogin,
                    totalService,
                    userPlanId,
                    entity,
                    companyId,
                    contactId,
                    viewCompanyId,
                    viewCompanyInfo,
                },
                setUser,
                facebookLogin,
                googleLogin,
                logOut,
                setCompany,
                setStartCompany,
                setDefaultCard,
                setContactInfo,
                setCompanyLogin,
                setTotalService,
                setUserPlanId,
                setEntity,
                setCompanyId,
                setContactId,
                setviewCompanyId,
                setViewCompanyInfo,
                parseJwt,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
