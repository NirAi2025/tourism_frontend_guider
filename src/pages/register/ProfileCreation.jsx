import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-dropdown-select';


const ProfileCreation = ({ data, onChange, errors, countryList, languageList, stateList, cityList, loadingStates, phoneCodeList }) => {


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
        <h3>Personal Profile Information </h3>
        <Row>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>First Name <span className='atrisk'>*</span></label>
                  <input 
                  value={data.firstName ?? ""}
                 onChange={(e) => onChange("firstName", e.target.value)}
                 className={
                    errors.firstName
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='text'  placeholder='Enter your first name' />
                  {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Last Name <span className='atrisk'>*</span></label>
                  <input
                  value={data.lastName ?? ""}
                 onChange={(e) => onChange("lastName", e.target.value)}
                 className={
                    errors.lastName
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='text' placeholder='Enter your last name' />
                   {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Email <span className='atrisk'>*</span></label>
                  <input
                   value={data.email ?? ""}
                 onChange={(e) => onChange("email", e.target.value)}
                 className={
                    errors.email
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='email' placeholder='Enter your email' />
                  <button className='validateBttn'>Validate</button>
                   {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
                </div>
            </Col>
            <Col lg={8} md={6}>
                <Row>
                    <Col lg={4} md={5}>
                          <div className='form-group'>
                  <label>Country code <span className='atrisk'>*</span></label>
                  <Select
                  className={
                    errors.countryCode
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={phoneCodeList}
                     labelField="label"
                    valueField="value"
                    value={data.countryCode ?? ""}
                    onChange={(value) => onChange("countryCode", value)}
                  />
                   {errors.countryCode && (
                  <p className="text-sm text-destructive">{errors.countryCode}</p>
                )}
                </div>
                    </Col>
                    <Col lg={8} md={7}>
                      <div className='form-group'>
                          <label>Phone no <span className='atrisk'>*</span></label>
                          <input 
                          value={data.phoneNo ?? ""}
                      onChange={(e) => onChange("phoneNo", e.target.value)}
                      onKeyDown={handleKeyDown}
                          type='text' className={
                              errors.phoneNo
                                ? "border-line form-control"
                                : "form-control"
                            } placeholder='Enter your phone no' />
      
                            {errors.phoneNo && (
                            <p className="text-sm text-destructive">{errors.phoneNo}</p>
                          )}
                          
                      </div>
                  </Col>
                </Row>
              
            </Col>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>WhatsApp Number  </label>
                  <input 
                     value={data.whatsappNo ?? ""}
                 onChange={(e) => onChange("whatsappNo", e.target.value)}
                 onKeyDown={handleKeyDown}
                  type='text' className='form-control' placeholder='Enter your experince' />
                  
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Preferred Communication Language  </label>
                  <Select
                  className="form-control"
                    options={languageList}
                       labelField="label"
                    valueField="value"
                    value={data.communicationLanguage ?? ""}
                    onChange={(value) => onChange("communicationLanguage", value)}
                  />
                
                </div>
            </Col>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Date of birth <span className='atrisk'>*</span></label>
                  <DatePicker selected={data.dob ?? ""} onChange={(date) => onChange("dob", date)} className={
                    errors.dob
                      ? "border-line form-control"
                      : "form-control"
                  } placeholderText="Select a date" />
                   {errors.dob && (
                  <p className="text-sm text-destructive">{errors.dob}</p>
                )}
                </div>
            </Col>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Nationality <span className='atrisk'>*</span></label>
                  <Select
                  className={
                    errors.nationality
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={countryList}
                    labelField="label"
                    valueField="value"
                    value={data.nationality ?? ""}
                    onChange={(value) => onChange("nationality", value)}
                  />
                   {errors.nationality && (
                  <p className="text-sm text-destructive">{errors.nationality}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Country of Operation <span className='atrisk'>*</span></label>
                  <Select
                   className={
                    errors.country
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={countryList}
                      labelField="label"
                    valueField="value"
                     searchable={true}
                    values={data.country ? [data.country] : []}
                    onChange={(value) => onChange("country", value)}
                  />
                   {errors.country && (
                  <p className="text-sm text-destructive">{errors.country}</p>
                )}
                </div>
            </Col>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>State of Operation <span className='atrisk'>*</span></label>
                  <Select
                   className={
                    errors.state
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={stateList}
                      labelField="label"
                    valueField="value"
                    value={data.state ?? ""}
                    onChange={(value) => onChange("state", value)}
                     disabled={loadingStates || !stateList.length}
                     placeholder={loadingStates ? "Loading states..." : "Select State"}
                  />
                   {errors.state && (
                  <p className="text-sm text-destructive">{errors.state}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Primary City / Region <span className='atrisk'>*</span></label>
                  <Select
                   className={
                    errors.city
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={cityList}
                      labelField="label"
                    valueField="value"
                    value={data.city ?? ""}
                    onChange={(value) => onChange("city", value)}
                     disabled={loadingStates || !cityList.length}
                     placeholder={loadingStates ? "Loading city..." : "Select City"}
                  />
                 
                   {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Years of Experience </label>
                  <input 
                     value={data.experience ?? ""}
                 onChange={(e) => onChange("experience", e.target.value)}
                 onKeyDown={handleKeyDown}
                  type='text' className='form-control' placeholder='Enter your experince' />
                  
                </div>
            </Col>
            
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Password <span className='atrisk'>*</span></label>
                  <input
                   value={data.password ?? ""}
                 onChange={(e) => onChange("password", e.target.value)}
                  type='password'  className={
                    errors.password
                      ? "border-line form-control"
                      : "form-control"
                  } placeholder='XXXXXXXXX' />
                   {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Confirm password <span className='atrisk'>*</span></label>
                  <input
                  value={data.confirmPassword ?? ""}
                   className={
                    errors.confirmPassword
                      ? "border-line form-control"
                      : "form-control"
                  }
                 onChange={(e) => onChange("confirmPassword", e.target.value)}
                  type='password' placeholder='XXXXXXXXX' />
                   {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
                </div>
            </Col>
        </Row>

        
    </div>
  )
}

export default ProfileCreation