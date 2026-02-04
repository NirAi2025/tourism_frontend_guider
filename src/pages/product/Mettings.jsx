import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Mettings = ({data, onChange, errors}) => {
  return (
     <div className='register-profile'>
        <h3>4. Meeting & Logistics  </h3>
        <Row>
             <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Meeting Point Name  <span className='atrisk'>*</span></label>
                              <input 
                              value={data.mettingName ?? ""}
                             onChange={(e) => onChange("mettingName", e.target.value)}
                             className={
                                errors.mettingName
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Public location name' />
                              {errors.mettingName && (
                              <p className="text-sm text-destructive">{errors.mettingName}</p>
                            )}
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Meeting Point Address  <span className='atrisk'>*</span></label>
                              <input 
                              value={data.mettingAddress ?? ""}
                             onChange={(e) => onChange("mettingAddress", e.target.value)}
                             className={
                                errors.mettingAddress
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Full address' />
                              {errors.mettingAddress && (
                              <p className="text-sm text-destructive">{errors.mettingAddress}</p>
                            )}
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Google Maps Link  <span className='atrisk'>*</span></label>
                              <input 
                              value={data.mapsLink ?? ""}
                             onChange={(e) => onChange("mapsLink", e.target.value)}
                             className={
                                errors.mapsLink
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='url'  placeholder='Exact pin' />
                              {errors.mapsLink && (
                              <p className="text-sm text-destructive">{errors.mapsLink}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>End Point  <span className='atrisk'>*</span></label>
                              <input 
                              value={data.endPoint ?? ""}
                             onChange={(e) => onChange("endPoint", e.target.value)}
                             className={
                                errors.endPoint
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='url'  placeholder='Same / different' />
                              {errors.endPoint && (
                              <p className="text-sm text-destructive">{errors.endPoint}</p>
                            )}
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Pickup Offered  <span className='atrisk'>*</span></label>
                                <div className='d-flex'>
                                    <div className='form-check me-3'>   
                                        <input 
                                        className='form-check-input' 
                                        type='radio'    
                                        name='pickupOfferd'
                                        checked={data.pickupOfferd === true}
                                        onChange={() => onChange("pickupOfferd", true)}
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='pickupOfferd'
                                        checked={data.pickupOfferd === false}
                                        onChange={() => onChange("pickupOfferd", false)}
                                            />
                                        <label className='form-check-label'>No</label>
                                    </div>
                                </div>
                              {errors.pickupOfferd && (     
                                <p className="text-sm text-destructive">{errors.pickupOfferd}</p>
                                )}  
                            </div>
                        </Col>
                          <Col lg={12} md={12}>
                                                    <div className='form-group'>
                                                      <label>Pickup Details  <span className='atrisk'>*</span></label>
                                                      <textarea 
                                                      value={data.pickupDetails ?? ""}
                                                     onChange={(e) => onChange("pickupDetails", e.target.value)}
                                                     className={
                                                        errors.pickupDetails
                                                          ? "border-line form-control"
                                                          : "form-control"
                                                      }
                                                      type='text'  placeholder='Complete pickup details' />
                                                      {errors.pickupDetails && (
                                                      <p className="text-sm text-destructive">{errors.pickupDetails}</p>
                                                    )}
                                                    </div>
                                                </Col>
                         </Row>
                                </div>
                         
       
  )
}

export default Mettings