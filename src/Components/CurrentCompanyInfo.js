import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import Info from "../Images/info-icon.svg";

export const CurrentCompanyInfo = ({ state = "", setState = "", error = "", setError = "", serviceState = false, allState = [] }) => {
  const context = useContext(AuthContext);
  const [company, setCompany] = useState("");

  useEffect(() => {
    setCompany(context.viewCompanyInfo);
  }, [context.viewCompanyInfo]);

  return (
    <div className="white-box-main mb-4">
      <div className="agnt-dtls-top">
        <span className="d-block">Current associate company</span>
        <bdi className="d-block">{company?.company_name}</bdi>
      </div>
      <div className="agnt-dtls-ctr">
        <div className="row me-0">
          <div className="col-sm-4 pe-0">
            <span className="d-block">Entity Type</span>
            <bdi className="d-block">{company?.entity_type}</bdi>
          </div>
          <div className="col-sm-4 pe-0">
            <span className="d-block">State Of Formation</span>
            <bdi className="d-block">{company?.state}</bdi>
          </div>
          {serviceState && (
            <div className="col-sm-4 pe-0">
              <label className="lbl-comn-info">State Requirin RA</label>
              <select
                className="form-select input-style"
                name="state"
                value={company?.state}
                onChange={(e) => {
                  setState(company?.state);
                  setError(false);
                }}
              >
                {allState?.length > 0 &&
                  allState?.map((item, i) => {
                    return (
                      <option key={i} value={item.label} id={item.value} disabled>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
              {error && <div className="text-danger">State is required.</div>}
            </div>
          )}
        </div>
      </div>
      <div className="agnt-dtls-btm">
        <img src={Info} className="me-3 img-fluid" alt="arrow" />
        The state of formation is where the company was formed, while the state of service is where you are seeking to obtain authority to transact business.
      </div>
    </div>
  );
};
