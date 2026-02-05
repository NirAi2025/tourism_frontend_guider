import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Inclution = ({data, onChange, errors}) => {
  return (
    <div className='register-profile'>
        <h3>7.Inclusions & Exclusions </h3>
        <Row>
             <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>What’s Included  <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.whatsInclude ?? ""}
                             onChange={(e) => onChange("whatsInclude", e.target.value)}
                             className={
                                errors.whatsInclude
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Included in tour price' />
                              {errors.whatsInclude && (
                              <p className="text-sm text-destructive">{errors.whatsInclude}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>What’s Not Included   <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.whatsExclude ?? ""}
                             onChange={(e) => onChange("whatsExclude", e.target.value)}
                             className={
                                errors.whatsExclude
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Exclusions' />
                              {errors.whatsExclude && (
                              <p className="text-sm text-destructive">{errors.whatsExclude}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Optional Add-ons </label>
                              <textarea 
                              value={data.optionalAddons ?? ""}
                             onChange={(e) => onChange("optionalAddons", e.target.value)}
                             className="form-control"
                              type='text'  placeholder='Extra services' />
                             
                            </div>
                        </Col>
                      
                    </Row>
    </div>
  )
}

export default Inclution