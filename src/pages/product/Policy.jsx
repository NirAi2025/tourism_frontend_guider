import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Policy = ({ data, onChange, errors }) => {
  return (
     <div className='register-profile'>
        <h3>10. Policy & Customer Preparation </h3>
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
                                value={data.cancellation_cutoff ?? ""}
                                onChange={(e) => onChange("cancellation_cutoff", e.target.value)}
                                >
                                    <option value="">Select cancellation cutoff</option>
                                    <option value="24_HOURS">24 Hours</option>
                                    <option value="partial">Partial</option>
                                    <option value="none">None</option>
                                </select>
                                {errors.cancellation_cutoff && (
                              <p className="text-sm text-destructive">{errors.cancellation_cutoff}</p>
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
                                      value={data.wetherPolicy ?? ""}
                                      onChange={(e) => onChange("wetherPolicy", e.target.value)}
                                      className="form-control"
                                      type="text"
                                      placeholder="Rain / force majeure"
                                    />
                                  
                                  </div>
                                </Col>
                                 <Col lg={4} md={6}>
                                                <div className='form-group'>
                                                <label>Dress Code </label>
                                                <input 
                                                    value={data.dressCode ?? ""}
                                                onChange={(e) => onChange("dressCode", e.target.value)}
                                                type='text' className='form-control' placeholder='dress code' />
                                                
                                                </div>
                                                        </Col>
                                            <Col lg={12} md={12}>
                                                <div className="form-group">
                                                <label>
                                                    What to Bring <span className="atrisk">*</span>
                                                </label>
                                                <textarea
                                                    value={data.whatBring ?? ""}
                                                    onChange={(e) => onChange("whatBring", e.target.value)}
                                                    className={
                                                    errors.whatBring
                                                        ? "border-line form-control"
                                                        : "form-control"
                                                    }
                                                    type="text"
                                                    placeholder="Shoes, ID, etc."
                                                />
                                                {errors.whatBring && (
                                                    <p className="text-sm text-destructive">
                                                    {errors.whatBring}  
                                                    </p>
                                                )}
                                                </div>
                                            </Col>
                                               <Col lg={12} md={12}>
                                                <div className="form-group">
                                                <label>
                                                    Important Notes
                                                </label>
                                                <textarea
                                                    value={data.importantNotes ?? ""}
                                                    onChange={(e) => onChange("importantNotes", e.target.value)}
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter any important notes here"
                                                />
                                               
                                                </div>
                                            </Col>
            </Row>
        </div>
  )
}

export default Policy