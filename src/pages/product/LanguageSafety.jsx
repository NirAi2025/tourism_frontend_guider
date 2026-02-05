import React from "react";
import { Col, Row } from "react-bootstrap";
import Select from "react-dropdown-select";

const LanguageSafety = ({ data, onChange, errors, languageList }) => {
  const handlemultilang = (lang) => {
    onChange("tourLanguage", lang);
  };

  return (
    <div className="register-profile">
      <h3>9. Language and Safety </h3>
      <Row>
        <Col lg={4} md={6}>
          <div className="form-group">
            <label>
              Tour Language(s) <span className="atrisk">*</span>
            </label>
            <Select
              values={[]}
              multi
              className={
                errors.tourLanguage
                  ? "border-line form-control"
                  : "form-control"
              }
              options={languageList}
              value={data.tourLanguage ?? ""}
              onChange={(value) => handlemultilang(value)}
            />
            {errors.tourLanguage && (
              <p className="text-sm text-destructive">{errors.tourLanguage}</p>
            )}
          </div>
        </Col>
        <Col lg={4} md={6}>
          <div className="form-group">
            <label>Live Guide</label>
            <div className="d-flex">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="liveGuide"
                  checked={data.liveGuide === true}
                  onChange={() => onChange("liveGuide", true)}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="liveGuide"
                  checked={data.liveGuide === false}
                  onChange={() => onChange("liveGuide", false)}
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            {errors.liveGuide && (
              <p className="text-sm text-destructive">{errors.liveGuide}</p>
            )}
          </div>
        </Col>
        <Col lg={4} md={6}>
          <div className="form-group">
            <label>Required Fitness Level </label>
            <input
              value={data.fitnessLevel ?? ""}
              onChange={(e) => onChange("fitnessLevel", e.target.value)}
              className="form-control"
              type="text"
              placeholder="Physical requirements"
            />
          </div>
        </Col>
        <Col lg={12} md={12}>
          <div className="form-group">
            <label>
              Safety Instructions <span className="atrisk">*</span>
            </label>
            <textarea
              value={data.safetyInstructions ?? ""}
              onChange={(e) => onChange("safetyInstructions", e.target.value)}
              className={
                errors.safetyInstructions
                  ? "border-line form-control"
                  : "form-control"
              }
              type="text"
              placeholder="Confirms coverage of safety instructions"
            />
            {errors.safetyInstructions && (
              <p className="text-sm text-destructive">
                {errors.safetyInstructions}
              </p>
            )}
          </div>
        </Col>
         <Col lg={12} md={12}>
           <div className="form-group d-flex align-items-center gap-2 mb-2">
            <label>
             Permit Declaration
            </label>
            <input type="checkbox" checked={data.permitDecleartion} onChange={(e) => onChange("permitDecleartion", e.target.checked)} />
           
            {errors.permitDecleartion && (
              <p className="text-sm text-destructive">
                {errors.permitDecleartion}
              </p>
            )}
          </div>
        </Col>
        <Col lg={12} md={12}>
          <div className="form-group d-flex align-items-center gap-2">
            <label>
            Insurance Declaration
            </label>
            <input type="checkbox" checked={data.insuranceDeclaration} onChange={(e) => onChange("insuranceDeclaration", e.target.checked)} />
           
            {errors.insuranceDeclaration && (
              <p className="text-sm text-destructive">
                {errors.insuranceDeclaration}
              </p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LanguageSafety;
