import React from 'react'
import { Col, Row } from 'react-bootstrap'

const TourDescription = ({ data, onChange, errors }) => {
  return (
   <div className='register-profile'>
        <h3>2. Tour Description & Content </h3>
        <Row>
             <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Full Tour Description  <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.fullTourDescription ?? ""}
                             onChange={(e) => onChange("fullTourDescription", e.target.value)}
                             className={
                                errors.fullTourDescription
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Complete experience description' />
                              {errors.fullTourDescription && (
                              <p className="text-sm text-destructive">{errors.fullTourDescription}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>What You’ll Do  <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.whatyoudo ?? ""}
                             onChange={(e) => onChange("whatyoudo", e.target.value)}
                             className={
                                errors.whatyoudo
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Step-by-step overview' />
                              {errors.whatyoudo && (
                              <p className="text-sm text-destructive">{errors.whatyoudo}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Key Highlights   <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.keyhighlights ?? ""}
                             onChange={(e) => onChange("keyhighlights", e.target.value)}
                             className={
                                errors.keyhighlights
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Key highlights of the tour' />
                              {errors.keyhighlights && (
                              <p className="text-sm text-destructive">{errors.keyhighlights}</p>
                            )}
                            </div>
                        </Col>
                        <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>What Makes This Tour Unique </label>
                              <textarea 
                              value={data.tourunique ?? ""}
                             onChange={(e) => onChange("tourunique", e.target.value)}
                             className="form-control"
                              type='text'  placeholder='Differentiator' />
                             
                            </div>
                        </Col>
                    </Row>
    </div>
  )
}

export default TourDescription