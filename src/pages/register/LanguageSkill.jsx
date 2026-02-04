import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-dropdown-select';

const LanguageSkill = ({ data, onChange, errors, onFileHandle, languageList }) => {


 const ALLOWED_TYPES = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
  ];



  const handleFileChange = (event, type) => {

     const selectedFile = event.target.files[0]
    if (!selectedFile) return;   

    

      if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error("Please upload a png, jpg, jpeg  file"
      );
      return false;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File too large, Maximum file size is 10MB")
      return false;
    }

     onFileHandle('firstAid', selectedFile)
  };


    const handlemultilang = (lang) => {
      onChange("languageSpoken",lang);
  
  };




  return (
       <div className='register-profile'>
           <h3>Languages & Skills</h3>
           <Row>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Languages Spoken <span className='atrisk'>*</span></label>
                  <Select
                  values={[]}
                  multi
                  className={
                    errors.languageSpoken
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={languageList}
                    value={data.languageSpoken ?? ""}
                    onChange={(value) =>handlemultilang(value)}
                  />
                   {errors.languageSpoken && (
                  <p className="text-sm text-destructive">{errors.languageSpoken}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Primary Tour Language <span className='atrisk'>*</span></label>
                  <Select
                  className={
                    errors.primaryTourLanguage
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={languageList}
                    value={data.primaryTourLanguage ?? ""}
                    onChange={(value) => onChange("primaryTourLanguage", value)}
                  />
                   {errors.primaryTourLanguage && (
                  <p className="text-sm text-destructive">{errors.primaryTourLanguage}</p>
                )}
                </div>
            </Col>
               <Col lg={4} md={6}>
                   <div className='form-group'>
                     <label>First Aid / Safety Training </label>                 
                       <Form.Control type="file" onChange={(files) => handleFileChange(files, "firstAid")} className="form-control"
                     accept=".png, .jpg, .jpeg, .pdf, image/png, image/jpeg"
                     />
                    
                    
                   <p className='d-blck text-end small m-0'>JPEG, PNG, jpg, pdf, formats, up to 10MB</p>
                   </div>
               </Col>
            
            
          
              
              
           </Row>
   
           
       </div>
  )
}

export default LanguageSkill