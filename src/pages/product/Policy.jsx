import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Policy = ({ data, onChange, errors }) => {
  return (
     <div className='register-profile'>
        <h3>11. Policy </h3>
            <Row>
                 <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Cancellation Policy <span className="atrisk">*</span></label>
                                <select
                                className={
                                errors.cancelelationPolicy
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                                value={data.cancelelationPolicy ?? ""}
                                onChange={(e) => onChange("cancelelationPolicy", e.target.value)}
                                >
                                    <option value="">Select cancellation policy</option>
                                    <option value="free">Free</option>
                                    <option value="partial">partial</option>
                                    <option value="none">None</option>
                                </select>
                                {errors.cancelelationPolicy && (
                              <p className="text-sm text-destructive">{errors.cancelelationPolicy}</p>
                            )}
                            </div>
                        </Col>
                          <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Cancellation Cut-off <span className="atrisk">*</span></label>
                                <select
                                className={
                                errors.cancelelationCutoff
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                                value={data.cancelelationCutoff ?? ""}
                                onChange={(e) => onChange("cancelelationCutoff", e.target.value)}
                                >
                                    <option value="">Select cancellation cutoff</option>
                                    <option value="free">Free</option>
                                    <option value="partial">partial</option>
                                    <option value="none">None</option>
                                </select>
                                {errors.cancelelationCutoff && (
                              <p className="text-sm text-destructive">{errors.cancelelationCutoff}</p>
                            )}
                            </div>
                        </Col>
                        <Col lg={12} md={12}>
                                  <div className="form-group">
                                    <label>
                                     No-show Policy 
                                    </label>
                                    <textarea
                                      value={data.noshowPolicy ?? ""}
                                      onChange={(e) => onChange("noshowPolicy", e.target.value)}
                                      className="form-control"
                                      type="text"
                                      placeholder="no-show policy"
                                    />
                                  
                                  </div>
                                </Col>
                                 <Col lg={12} md={12}>
                                  <div className="form-group">
                                    <label>
                                     Weather Policy 
                                    </label>
                                    <textarea
                                      value={data.weatherPolicy ?? ""}
                                      onChange={(e) => onChange("weatherPolicy", e.target.value)}
                                      className="form-control"
                                      type="text"
                                      placeholder="Rain / force majeure"
                                    />
                                  
                                  </div>
                                </Col>
            </Row>
        </div>
  )
}

export default Policy