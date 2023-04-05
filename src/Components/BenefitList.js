import Maintain from "../Images/maintain-icon.svg";
import Saving from "../Images/saving.svg";

export const BenefitList = () => {
	return (
		<div className="white-box-main mb-4">
			<div className="order-total-info-btm mb-2">
				<div className="d-flex align-items-center order-total-title">
					<span className="d-flex align-items-center justify-content-center me-3">
						<img src={Maintain} alt="" />
					</span>
					Maintain business compliance.
				</div>
				<p className="mb-0 mt-3">Trusted by over 500,000 business owners to maintain their state's business compliance obligations.</p>
			</div>
			<div className="order-total-info-btm">
				<div className="d-flex align-items-center order-total-title">
					<span className="d-flex align-items-center justify-content-center me-3">
						<img src={Saving} alt="" />
					</span>
					Tax savings benefit
				</div>
				<p className="mb-0 mt-3">This is a fully deductible business expense.</p>
			</div>
		</div>
	);
};
