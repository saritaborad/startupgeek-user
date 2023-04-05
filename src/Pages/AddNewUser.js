import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Profile from "../Images/profile.png";
import Upload from "../Images/upload-icon.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { errorContainer, formAttr } from "../const";
import AuthContext from "../Context/AuthContext";

export default function AddNewUser() {
    const addrunforms = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(AuthContext);

    const [img, setImg] = useState();
    const [company, setcompany] = useState();
    const [company_Id, setcompany_Id] = useState("");
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        if (location.state?.company) {
            setcompany(location?.state?.company);
        }
        if (location.state?.edit) {
            setUpdate(true);
            setUser(location.state?.user);
        }
    }, [location.state?.company, location.state?.edit]);

    useEffect(() => {
        if (context.viewCompanyId) {
            setcompany_Id(context.viewCompanyId);
        }
    }, [context.viewCompanyId]);

    const submitFormData = (formData, resetForm) => {
        formData.companyid = company_Id;
        formData.profile_img = img ? img : "";
        let data = { fname: formData?.fname, lname: formData?.lname, profile_img: img ? img : user?.profile_img ? user?.profile_img : "" };
        let path = update ? API_PATH.updateuser : API_PATH.addNewUser;
        new Promise((resolve, reject) => resolve(PostApi(path, update ? data : formData))).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                resetForm(formData);
                setTimeout(() => {
                    navigate("/company-settings", { state: { contact: company?.contact } });
                }, 1000);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const handleFileChange = (file) => {
        const data = new FormData();
        data.append("images", file);
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.uploadImg, data, "image"))).then((res) => {
            if (res.status === 200) {
                setImg(res.data.data.img[0]);
                addrunforms.current.setFieldValue("profile_img", res.data.data.img[0]);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    return (
        <Layout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="comn-title-info">
                                <h1>{update ? "Edit User" : "Add New User"}</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="white-box-main">
                                <div className="stsg-box-list d-sm-flex align-items-center stsg-box-list-text mb-4">
                                    <span className="d-block">
                                        <img src={img ? img : user?.profile_img ? user?.profile_img : Profile} alt="profile" />
                                    </span>
                                    <div className="stsg-box-list-text ps-sm-3">
                                        <bdi className="d-block">Upload your profile</bdi>
                                        <div className="upload-btn-wrapper mt-3">
                                            <button className="btn">
                                                <img src={Upload} className="pe-2" alt="profile" />
                                                Upload Image
                                            </button>
                                            <input type="file" name="myfile" onChange={(e) => handleFileChange(e.target.files[0])} accept="image/*" />
                                        </div>
                                    </div>
                                </div>
                                <Formik
                                    innerRef={addrunforms}
                                    enableReinitialize
                                    initialValues={{
                                        _id: update && user._id,
                                        fname: update ? user?.fname : "",
                                        lname: update ? user?.lname : "",
                                        email: update ? user?.email : "",
                                        phone: update ? user?.phone : "",
                                    }}
                                    validationSchema={Yup.object({
                                        fname: Yup.string().required("First name is required."),
                                        lname: Yup.string().required("Last name is required."),
                                        email: Yup.string().required("Email is required."),
                                        phone: Yup.string().required("Phone number is required."),
                                    })}
                                    onSubmit={(formData, { resetForm }) => submitFormData(formData, resetForm)}
                                >
                                    {(runform) => (
                                        <form className="row" onSubmit={runform.handleSubmit}>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">First Name</label>
                                                <input type="text" name="fname" {...formAttr(runform, "fname")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "fname")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Last Name</label>
                                                <input type="text" name="lname" {...formAttr(runform, "lname")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "lname")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Email Address</label>
                                                <input type="email" name="email" {...formAttr(runform, "email")} className="form-control input-style" placeholder="" disabled />
                                                {errorContainer(runform, "email")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Phone</label>
                                                <div className="phone-cust-input">
                                                    <PhoneInput placeholder="(201) 555-01234" name="phone" {...formAttr(runform, "phone")} country="us" onChange={(e) => runform?.setFieldValue("phone", e)} disabled />
                                                    {errorContainer(runform, "phone")}
                                                </div>
                                            </div>
                                            {/* <div className="col-12 mb-3">
												<label className="lbl-comn-info">CC Email Notifications</label>
												<label className="lbl-comn-info-2">Use the user as CC in the notifications for the company?</label>
												<div className="d-flex align-items-center">
													<div className="cust-radio-btn">
														<input type="radio" id="yes" defaultChecked name="Mark" />
														<label for="yes">Yes</label>
													</div>
													<div className="cust-radio-btn ms-3">
														<input type="radio" id="no" name="Mark" />
														<label for="no">No</label>
													</div>
												</div>
											</div> */}
                                            <div className="col-12 pt-4 text-md-end text-center">
                                                <button type="submit" className="btn-comn-all btn-after-class">
                                                    {update ? "Update" : "Save"}
                                                </button>
                                                <button type="button" className="btn-comn-all3 btn-after-class ms-1" onClick={() => navigate("/company-settings", { state: { contact: company?.contact } })}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
