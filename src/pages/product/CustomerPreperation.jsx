import React from 'react'
import { Col, Row } from 'react-bootstrap'

const CustomerPreparation = ({ data, onChange, errors }) => {
  return (
     <div className='register-profile'>
        <h3>12. Customer Preparation </h3>

          <Row>
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

export default CustomerPreparation