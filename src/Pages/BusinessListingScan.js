import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import Chart from "react-apexcharts";
import { Tab, Nav } from "react-bootstrap";
import RtdDatatable from "../DataTable/RtdDatatable";

export default function BusinessListingScan() {
	const [option, set_option] = useState({ sizePerPage: 5, search: "", totalRecord: 100, page: 1, sort: "id", order: "DESC" });
	const columns = [
		{
			value: "no",
			label: "No",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			value: "id",
			label: "ID",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			value: "label",
			label: "Collection",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			value: "action",
			label: "Action",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (data, i) => {
					return (
						<div className="table-cust-drop">
							<button className="border-0 bg-transparent p-0">
								<span className="edit-icn">
									<svg width="4" height="15" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M2 2L2 2.01M2 9L2 9.01M2 16L2 16.01M2 3C1.44772 3 1 2.55228 1 2C1 1.44772 1.44772 1 2 1C2.55228 1 3 1.44772 3 2C3 2.55228 2.55228 3 2 3ZM2 10C1.44771 10 1 9.55228 1 9C1 8.44772 1.44771 8 2 8C2.55228 8 3 8.44772 3 9C3 9.55228 2.55228 10 2 10ZM2 17C1.44771 17 0.999999 16.5523 0.999999 16C0.999999 15.4477 1.44771 15 2 15C2.55228 15 3 15.4477 3 16C3 16.5523 2.55228 17 2 17Z" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
									</svg>
								</span>
							</button>
						</div>
					);
				},
			},
		},
	];
	const data = [
		{
			no: "1",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "2",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "3",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "1",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "2",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "3",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "1",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "2",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "3",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "1",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "2",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "3",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "1",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "2",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "3",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "1",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "2",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
		{
			no: "3",
			id: "sdvsdv",
			label: "dvsdvsdverghdb",
		},
	];

	let tableCallBack = (option) => {
		set_option(option);
	};

	const chart1 = {
		series: [70],
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%", background: "#fff", image: undefined, imageOffsetX: 0, imageOffsetY: 0, position: "front" },
				track: { background: "#f6f6f6", strokeWidth: "90%", margin: 0 },
				dataLabels: {
					showOn: "always",
					name: { show: false },
					value: { color: "#18191F", fontWeight: 700, fontSize: "35px", show: true },
				},
			},
		},
		fill: { colors: "#FE2E89" },
	};
	return (
		<Layout>
			<div className="content-main-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="comn-title-info d-inline-flex align-items-center">
								<h1>Business Listings</h1>
							</div>
						</div>
						<div className="col-12">
							<div className="row">
								<div className="col-md-6 mb-3">
									<div className="white-box-main h-100">
										<div className="box-hdr-top border-0 m-0">
											<span>Scan Results</span>
										</div>
										<div className="scan-list-detail">
											<p>Houston It Developers LLC</p>
											<p>59 Acom Cluster Ct The Woodlands 77381 </p>
											<span className="d-block">This isn’t my business information</span>
										</div>
										<div className="mt-4">
											<button className="btn-comn-all" type="button">
												Fix All Errors
											</button>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-3">
									<div className="white-box-main h-100">
										<div className="box-hdr-top border-0 m-0">
											<span>Optimization Rate</span>
										</div>
										<div className="row align-items-center">
											<div className="col-xxl-6 col-md-12 col-sm-6">
												<Chart options={chart1} series={chart1.series} height={350} type="radialBar" />
											</div>
											<div className="col-xxl-6 col-md-12 col-sm-6">
												<div className="scan-list-detail">
													<p>70% of the time customers search for you, they will see incorrect or missing information.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="fix-listing-main">
							<Tab.Container id="left-tabs-example" defaultActiveKey="full-directory">
								<div className=""></div>
								<Nav variant="pills" className="list-view-show mb-2">
									<Nav.Item>
										<Nav.Link eventKey="full-directory">
											<svg width="16" height="13" className="me-3" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M2.75 0C3.16563 0 3.5 0.335938 3.5 0.75V2.25C3.5 2.66563 3.16563 3 2.75 3H1.25C0.835938 3 0.5 2.66563 0.5 2.25V0.75C0.5 0.335938 0.835938 0 1.25 0H2.75ZM15 0.5C15.5531 0.5 16 0.947812 16 1.5C16 2.05312 15.5531 2.5 15 2.5H6C5.44688 2.5 5 2.05312 5 1.5C5 0.947812 5.44688 0.5 6 0.5H15ZM15 5.5C15.5531 5.5 16 5.94688 16 6.5C16 7.05312 15.5531 7.5 15 7.5H6C5.44688 7.5 5 7.05312 5 6.5C5 5.94688 5.44688 5.5 6 5.5H15ZM15 10.5C15.5531 10.5 16 10.9469 16 11.5C16 12.0531 15.5531 12.5 15 12.5H6C5.44688 12.5 5 12.0531 5 11.5C5 10.9469 5.44688 10.5 6 10.5H15ZM0.5 5.75C0.5 5.33437 0.835938 5 1.25 5H2.75C3.16563 5 3.5 5.33437 3.5 5.75V7.25C3.5 7.66563 3.16563 8 2.75 8H1.25C0.835938 8 0.5 7.66563 0.5 7.25V5.75ZM2.75 10C3.16563 10 3.5 10.3344 3.5 10.75V12.25C3.5 12.6656 3.16563 13 2.75 13H1.25C0.835938 13 0.5 12.6656 0.5 12.25V10.75C0.5 10.3344 0.835938 10 1.25 10H2.75Z" fill="#060640" />
											</svg>
											See Full Directory List
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="category">
											<svg width="16" height="13" className="me-3" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M2.75 0C3.16563 0 3.5 0.335938 3.5 0.75V2.25C3.5 2.66563 3.16563 3 2.75 3H1.25C0.835938 3 0.5 2.66563 0.5 2.25V0.75C0.5 0.335938 0.835938 0 1.25 0H2.75ZM15 0.5C15.5531 0.5 16 0.947812 16 1.5C16 2.05312 15.5531 2.5 15 2.5H6C5.44688 2.5 5 2.05312 5 1.5C5 0.947812 5.44688 0.5 6 0.5H15ZM15 5.5C15.5531 5.5 16 5.94688 16 6.5C16 7.05312 15.5531 7.5 15 7.5H6C5.44688 7.5 5 7.05312 5 6.5C5 5.94688 5.44688 5.5 6 5.5H15ZM15 10.5C15.5531 10.5 16 10.9469 16 11.5C16 12.0531 15.5531 12.5 15 12.5H6C5.44688 12.5 5 12.0531 5 11.5C5 10.9469 5.44688 10.5 6 10.5H15ZM0.5 5.75C0.5 5.33437 0.835938 5 1.25 5H2.75C3.16563 5 3.5 5.33437 3.5 5.75V7.25C3.5 7.66563 3.16563 8 2.75 8H1.25C0.835938 8 0.5 7.66563 0.5 7.25V5.75ZM2.75 10C3.16563 10 3.5 10.3344 3.5 10.75V12.25C3.5 12.6656 3.16563 13 2.75 13H1.25C0.835938 13 0.5 12.6656 0.5 12.25V10.75C0.5 10.3344 0.835938 10 1.25 10H2.75Z" fill="#060640" />
											</svg>
											See Category List
										</Nav.Link>
									</Nav.Item>
								</Nav>
								<Tab.Content className="white-box-table">
									<Tab.Pane eventKey="full-directory">
										<RtdDatatable data={data} columns={columns} option={option} tableCallBack={tableCallBack} />
									</Tab.Pane>
									<Tab.Pane eventKey="category">
										<RtdDatatable data={data} columns={columns} option={option} tableCallBack={tableCallBack} />
									</Tab.Pane>
								</Tab.Content>
							</Tab.Container>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
