import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import Agreement from "../Images/agreement.svg";
import { PostApi } from "../ApiService";
import { API_PATH } from "../const";
import { toast } from "react-toastify";

export default function BusinessContract() {
	const [allDoc, setAllDoc] = useState();

	useEffect(() => {
		getAllDocument();
	}, []);

	const getAllDocument = () => {
		new Promise((resolve) => resolve(PostApi(API_PATH.getAllDocument))).then((res) => {
			if (res.status === 200) {
				setAllDoc(res.data.data.data);
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
								<h1>Business Contract Template</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="busstion-info-top">
								<div className="recommendations-info">
									<h2>We give you easy access to legal templates to assist with various business affairs. You can download them directly to your computer and edit them.</h2>
								</div>
								<div className="mail-not-box position-relative">
									<span className="">
										<i className="bi bi-info-circle-fill"></i>
									</span>
									<div className="ps-3 cust-info-white">
										<p className="mb-0">It’s important to note that these documents are not customized for your particular situation. If you’re using these documents for serious matters, it’s highly recommended that you customize and edit them to fit your situation. It’s also advised that an attorney review your edited agreement.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 mt-3">
							<div className="business-con-custom">
								<Accordion defaultActiveKey="0">
									{allDoc &&
										allDoc?.length > 0 &&
										allDoc?.map((item, i) => (
											<div key={i}>
												<Accordion.Item eventKey={i} className="white-box-main mb-3">
													<Accordion.Header>
														<div className="d-flex irs-btm-box">
															<bdi className="d-flex align-items-center justify-content-center">
																<img src={Agreement} alt="state irs" />
															</bdi>
															<div className="ps-3">
																<span className="d-block">{item?.title}</span>
																<p>{item?.description?.split("TIP") && item?.description?.split("TIP")[0]}</p>
															</div>
														</div>
													</Accordion.Header>
													<Accordion.Body>
														<div className="pt-2 ms-5">
															<div className="irs-btm-box">
																{item?.description?.split("TIP")[1] && (
																	<p>
																		<span>TIP:</span>
																		{item?.description?.split("TIP") && item?.description?.split("TIP")[1]}
																	</p>
																)}
																<div className="my-3">
																	<div className="row align-items-center">
																		<div className="col-lg-3 col-md-4 mb-md-0 mb-2">
																			<a href={item?.pdf[0]?.path} className="btn-comn-all3 w-100 text-center" target="_blank" rel="noreferrer">
																				<svg width="18" height="22" viewBox="0 0 18 22" className="me-2" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M9.45234 12.943L9.45937 12.9102C9.59531 12.35 9.76641 11.6516 9.63281 11.0187C9.54375 10.5195 9.17578 10.325 8.86172 10.3109C8.49141 10.2945 8.16094 10.5055 8.07891 10.8125C7.92422 11.375 8.0625 12.1437 8.31562 13.1234C7.99687 13.8828 7.48828 14.9867 7.11563 15.643C6.42188 16.0016 5.49141 16.5547 5.35312 17.2531C5.325 17.382 5.35781 17.5461 5.43516 17.6937C5.52187 17.8578 5.66016 17.9844 5.82187 18.0453C5.89219 18.0711 5.97656 18.0922 6.075 18.0922C6.4875 18.0922 7.15547 17.7594 8.04609 16.2313C8.18203 16.1867 8.32266 16.1398 8.45859 16.093C9.09609 15.8773 9.75703 15.6523 10.3547 15.5516C11.0156 15.9055 11.768 16.1328 12.2789 16.1328C12.7852 16.1328 12.9844 15.8328 13.0594 15.6523C13.1906 15.3359 13.1273 14.9375 12.9141 14.7242C12.6047 14.4195 11.8523 14.3398 10.6805 14.4852C10.1039 14.1336 9.72656 13.6555 9.45234 12.943ZM6.88125 16.5031C6.55547 16.9766 6.30937 17.2133 6.17578 17.3164C6.33281 17.0281 6.63984 16.7234 6.88125 16.5031ZM8.93438 10.9836C9.05625 11.1922 9.03984 11.8227 8.94609 12.1414C8.83125 11.675 8.81484 11.0141 8.88281 10.9367C8.90156 10.9391 8.91797 10.9531 8.93438 10.9836ZM8.89688 13.8078C9.14766 14.2414 9.46406 14.6141 9.81328 14.8906C9.30703 15.0055 8.84531 15.1953 8.43281 15.3641C8.33437 15.4039 8.23828 15.4438 8.14453 15.4813C8.45625 14.9164 8.71641 14.2766 8.89688 13.8078ZM12.5438 15.343C12.5461 15.3477 12.5484 15.3547 12.5344 15.3641H12.5297L12.525 15.3711C12.5063 15.3828 12.3141 15.4953 11.4867 15.1695C12.4383 15.125 12.5414 15.3406 12.5438 15.343ZM17.0297 6.24453L11.9859 1.20078C11.8453 1.06016 11.6555 0.980469 11.4562 0.980469H1.5C1.08516 0.980469 0.75 1.31562 0.75 1.73047V21.2305C0.75 21.6453 1.08516 21.9805 1.5 21.9805H16.5C16.9148 21.9805 17.25 21.6453 17.25 21.2305V6.77656C17.25 6.57734 17.1703 6.38516 17.0297 6.24453ZM15.5203 7.12109H11.1094V2.71016L15.5203 7.12109ZM15.5625 20.293H2.4375V2.66797H9.51562V7.73047C9.51562 7.99154 9.61934 8.24192 9.80394 8.42653C9.98855 8.61113 10.2389 8.71484 10.5 8.71484H15.5625V20.293Z" fill="#060640" />
																				</svg>
																				Preview.PDf
																			</a>
																		</div>
																		<div className="col-lg-3 col-md-4">
																			<a href={item?.doc[0]?.path} className="btn-comn-all3 w-100 text-center" target="_blank" rel="noreferrer">
																				<svg width="16" height="18" viewBox="0 0 16 18" className="me-2" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path fill-rule="evenodd" clip-rule="evenodd" d="M13 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H13C13.2652 16 13.5196 15.8946 13.7071 15.7071C13.8946 15.5196 14 15.2652 14 15V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2ZM3 0C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H13C13.7956 18 14.5587 17.6839 15.1213 17.1213C15.6839 16.5587 16 15.7956 16 15V3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.316071 13.7956 0 13 0H3Z" fill="#060640" />
																					<path d="M4 4H12V6H4V4ZM4 8H12V10H4V8ZM4 12H9V14H4V12Z" fill="#060640" />
																				</svg>
																				Preview.DOCx
																			</a>
																		</div>
																	</div>
																</div>
																<div className="my-3" style={{ fontWeight: "bold" }}>
																	Do you need to further customize {item?.title}?
																</div>
																<div className="green-bg-box">
																	<div className="d-flex align-items-center mb-2">
																		<div className="me-3">
																			<svg width="33" height="30" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path d="M16.4833 13.1329L15.7722 13.844C15.5499 14.0663 15.5499 14.4664 15.7722 14.6884C15.9055 14.8217 16.0834 14.8661 16.1722 14.8661C16.261 14.8661 16.4389 14.8217 16.5722 14.6884L17.9945 13.2661C18.0389 13.2217 18.0834 13.1772 18.1278 13.1328L16.4833 13.1329Z" fill="black" />
																				<path d="M32.3948 7.04463L25.9502 0.600054C25.8614 0.511214 25.7725 0.466797 25.639 0.466797H8.43905C8.21673 0.466797 7.99463 0.644477 7.99463 0.911214V16.3781C7.99463 16.7337 8.39463 16.8669 8.66137 16.6448L9.28371 16.0225C9.37255 15.9336 9.41697 15.8448 9.37255 15.7113C9.19487 13.9337 9.81697 12.1557 11.1058 10.8669C12.217 9.71131 13.7282 9.08925 15.3726 9.08925C15.5502 9.08925 15.7726 9.08925 15.9502 9.13367C16.6614 9.22251 17.3726 9.62251 17.6391 10.2893C17.7723 10.556 17.8167 10.8669 17.8167 11.1337C17.8167 11.356 17.95 11.4893 18.1723 11.4893L28.306 11.489C28.706 11.489 29.106 11.7558 29.1504 12.1558C29.2393 12.689 28.8393 13.089 28.3504 13.089H21.3727C21.106 13.089 20.9283 13.4002 21.0616 13.6223C21.1948 13.8446 21.2839 14.1111 21.3283 14.3779C21.4616 15.489 21.2839 16.6002 20.8395 17.5779C20.7506 17.8002 20.8839 18.0667 21.1506 18.0667L28.3061 18.067C28.7061 18.067 29.1061 18.3337 29.1505 18.7337C29.2393 19.267 28.8393 19.667 28.3505 19.667H19.3727C19.2395 19.667 19.106 19.7114 19.0172 19.8002C17.9504 20.6002 16.706 21.0446 15.3728 21.0446H14.8839C14.7062 21.0446 14.5283 21.089 14.3951 21.2223L9.4172 26.2446C9.28394 26.3779 9.23952 26.5114 9.23952 26.6891C9.15068 27.6667 7.81718 29.5334 8.43952 29.5334H32.0841C32.3064 29.5334 32.5285 29.3558 32.5285 29.089L32.5283 7.35589C32.5283 7.26705 32.4839 7.13357 32.395 7.04473L32.3948 7.04463ZM28.3504 26.3778H12.0389C11.5945 26.3778 11.2389 26.0222 11.2389 25.5778C11.2389 25.1334 11.5945 24.7778 12.0389 24.7778H28.3944C28.8388 24.7778 29.1944 25.1334 29.1944 25.5778C29.1944 26.0224 28.8388 26.3778 28.35 26.3778H28.3504ZM20.2618 6.55548H12.0395C11.5951 6.55548 11.2395 6.1999 11.2395 5.75548C11.2395 5.31107 11.5951 4.95548 12.0395 4.95548H20.2618C20.7062 4.95548 21.0618 5.31107 21.0618 5.75548C21.0618 6.1999 20.7062 6.55548 20.2618 6.55548ZM29.7732 8.91108H24.5286C24.3063 8.91108 24.0842 8.7334 24.0842 8.46667V3.26667C24.0842 2.86667 24.5286 2.68901 24.8398 2.95551L30.0398 8.15551C30.351 8.46667 30.1286 8.91111 29.7733 8.91111L29.7732 8.91108Z" fill="black" />
																				<path d="M7.77251 25.5774L13.8611 19.4888C13.9943 19.3555 14.1722 19.3111 14.3499 19.3555C15.7723 19.7111 17.3723 19.3111 18.4832 18.1999C19.4608 17.2223 19.9055 15.8888 19.7276 14.5999C19.6832 14.3332 19.4164 14.2444 19.2387 14.4223L17.8164 15.8446C16.9275 16.7335 15.5497 16.7335 14.6608 15.8446C13.7719 14.9557 13.7719 13.5779 14.6608 12.689L16.0831 11.2667C16.2608 11.089 16.172 10.7778 15.9055 10.7778C14.6166 10.6446 13.2831 11.0446 12.3055 12.0222C11.1943 13.1334 10.7943 14.7334 11.1499 16.1555C11.1943 16.3332 11.1499 16.5111 11.0166 16.6443L4.88289 22.7329C4.79405 22.8661 4.61614 22.9106 4.48289 22.8661C3.41614 22.8217 2.34963 23.2661 1.63849 24.1994C0.749631 25.3994 0.794088 27.0883 1.68291 28.2438C2.92731 29.8438 5.23851 29.9327 6.66056 28.555C7.37171 27.8438 7.68291 26.955 7.63822 26.0217C7.59403 25.844 7.63845 25.7108 7.77192 25.5773L7.77251 25.5774ZM3.19463 27.2665C2.57228 26.6441 2.57228 25.6665 3.19463 25.0888C3.81697 24.4665 4.79463 24.4665 5.37228 25.0888C5.99463 25.7111 5.99463 26.6888 5.37228 27.2665C4.79463 27.8886 3.81691 27.8886 3.19463 27.2665Z" fill="black" />
																			</svg>
																		</div>
																		<div className="green-box-head">Work directly with a certified attorney for customization</div>
																	</div>
																	<p className="green-box-p">Do you have a special provision or contingency that you need added to ensure your covering all liabilities? We have made it affordable to work one on one with a network attorney to provide the protection needed for your personal situation.</p>
																	<Link to="/payment-method" state={{ service: item }}>
																		<span className="btn-green-new">{`get custom drafted -${item?.price}`}</span>
																	</Link>
																</div>
															</div>
														</div>
													</Accordion.Body>
												</Accordion.Item>
											</div>
										))}
								</Accordion>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
