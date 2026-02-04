import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-dropdown-select';

const Banking = ({ data, onChange, errors, currencyList,countryList }) => {



const payout = [
  {
    value: 'Bank transfer',
    label: 'Bank transfer'
  },
  {
    value: 'PayPal',
    label: 'PayPal'
  }
];

const handleKeyDown = (e) => {
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "Tab"
  ) {
    e.preventDefault();
  }
};


  return (
      <div className='register-profile'>
        <h3>Banking & Payout Information</h3>
        <Row>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Account Holder Name <span className='atrisk'>*</span></label>
                  <input 
                  value={data.accountName ?? ""}
                 onChange={(e) => onChange("accountName", e.target.value)}
                 className={
                    errors.accountName
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='text'  placeholder='Enter your account name' />
                  {errors.accountName && (
                  <p className="text-sm text-destructive">{errors.accountName}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Bank Name <span className='atrisk'>*</span></label>
                  <input
                  value={data.bankName ?? ""}
                 onChange={(e) => onChange("bankName", e.target.value)}
                 className={
                    errors.bankName
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='text' placeholder='Enter your bank name' />
                   {errors.bankName && (
                  <p className="text-sm text-destructive">{errors.bankName}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Account Number / IBAN  <span className='atrisk'>*</span></label>
                  <input
                   value={data.accountNo ?? ""}
                 onChange={(e) => onChange("accountNo", e.target.value)}
                    onKeyDown={handleKeyDown}
                 className={
                    errors.accountNo
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='text' placeholder='Enter account number' />
                
                   {errors.accountNo && (
                  <p className="text-sm text-destructive">{errors.accountNo}</p>
                )}
                </div>
            </Col>
           <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>IFSC / SWIFT / BIC Code <span className='atrisk'>*</span></label>
                  <input
                   value={data.ifscCode ?? ""}
                 onChange={(e) => onChange("ifscCode", e.target.value)}
                 className={
                    errors.ifscCode
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='text' placeholder='Enter IFSC / SWIFT / BIC Code' />
                
                   {errors.ifscCode && (
                  <p className="text-sm text-destructive">{errors.ifscCode}</p>
                )}
                </div>
            </Col>
           
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Payout Currency  <span className='atrisk'>*</span></label>
                  <Select
                  className={
                    errors.currency
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={currencyList}
                    value={data.currency ?? ""}
                    onChange={(value) => onChange("currency", value)}
                  />
                   {errors.currency && (
                  <p className="text-sm text-destructive">{errors.currency}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Payout Method  <span className='atrisk'>*</span></label>
                  <Select
                   className={
                    errors.payoutMethod
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={payout}
                    value={data.payoutMethod ?? ""}
                    onChange={(value) => onChange("payoutMethod", value)}
                  />
                   {errors.payoutMethod && (
                  <p className="text-sm text-destructive">{errors.payoutMethod}</p>
                )}
                </div>
            </Col>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Tax Residency Country  <span className='atrisk'>*</span></label>
                  <Select
                  className={
                    errors.taxCountry
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={countryList}
                    value={data.taxCountry ?? ""}
                    onChange={(value) => onChange("taxCountry", value)}
                  />
                   {errors.taxCountry && (
                  <p className="text-sm text-destructive">{errors.taxCountry}</p>
                )}
                </div>
            </Col>
         <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Individual Tax ID <span className='atrisk'>*</span></label>
                  <input
                   value={data.taxId ?? ""}
                 onChange={(e) => onChange("taxId", e.target.value)}
                 className={
                    errors.taxId
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='text' placeholder='Enter PAN / SSN / TIN' />
                
                   {errors.taxId && (
                  <p className="text-sm text-destructive">{errors.taxId}</p>
                )}
                </div>
            </Col>
        </Row>

        
    </div>
  )
}

export default Banking