import React, { useRef, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Profile from "../Images/profile.png";
import Upload from "../Images/upload-icon.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import { errorContainer, formAttr } from "../const";

export default function ClientEdit() {
    const addrunforms = useRef();

    const unserInfo = useLocation()?.state;
    const navigate = useNavigate();

    const [img, setImg] = useState();

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

    const submitFormData = (formData, resetForm) => {
        new Promise((resolve, reject) => resolve(PostApi(API_PATH.updateuser, formData))).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                resetForm(formData);
                navigate("/client-settings");
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
                                <h1>Edit User</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="white-box-main">
                                <div className="stsg-box-list d-sm-flex align-items-center stsg-box-list-text mb-4">
                                    <span className="d-block">
                                        <img src={img ? img : unserInfo?.user?.profile_img ? unserInfo?.user?.profile_img : Profile} alt="profile" />
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
                                        _id: unserInfo?.user?._id,
                                        fname: unserInfo?.user?.fname ? unserInfo?.user?.fname : "",
                                        lname: unserInfo?.user?.lname ? unserInfo?.user?.lname : "",
                                        email: unserInfo?.user?.email ? unserInfo?.user?.email : "",
                                        phone: unserInfo?.user?.phone ? unserInfo?.user?.phone : "",
                                        profile_img: unserInfo?.user?.profile_img ? unserInfo?.user?.profile_img : "",
                                    }}
                                    validationSchema={Yup.object({
                                        fname: Yup.string().required("First name is required."),
                                        lname: Yup.string().required("Last name is required."),
                                        email: Yup.string().required("Email is required."),
                                        phone: Yup.string().required("Phone is required."),
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
                                                <input type="email" name="email" {...formAttr(runform, "email")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "email")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Phone</label>
                                                <div className="phone-cust-input">
                                                    <PhoneInput placeholder="(201) 555-01234" name="phone" {...formAttr(runform, "phone")} onChange={(e) => runform?.setFieldValue("phone", e)} country="us" />
                                                    {errorContainer(runform, "phone")}
                                                </div>
                                            </div>
                                            <div className="col-12 pt-4 text-md-end text-center">
                                                <button type="submit" className="btn-comn-all btn-after-class">
                                                    Save
                                                </button>
                                                <button type="button" className="btn-comn-all3 btn-after-class ms-1" onClick={() => navigate("/client-settings")}>
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
