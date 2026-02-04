import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

const Insurence = ({ data, onChange, errors, onFileHandle }) => {

 const ALLOWED_TYPES = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
  ];

  const handleFileChange = (event, type) => {

     const selectedFile = event.target.files[0]
    if (!selectedFile) return;   

       if (type !== "selfieWithId") {

      if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error("Please upload a png, jpg, jpeg  file"
      );
      return false;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File too large, Maximum file size is 10MB")
      return false;
    }

  } else {
    if (!ALLOWED_VIDEO_TYPES.includes(selectedFile.type)) {
      toast.error("Please upload a mp4, webm"
      );
      return false;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error("File too large, Maximum file size is 10MB")
      return false;
    }
  }

   

    if (type === "governmentIssuedID") {
        onFileHandle('governmentIssuedID', selectedFile)
    } else if(type == 'addressProof'){
         onFileHandle('addressProof', selectedFile)
    } else {
       onFileHandle('selfieWithId', selectedFile)
    }
  };

  
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
           <h3> Insurance & Emergency Information</h3>
           <Row>
               <Col lg={4} md={6}>
                   <div className='form-group'>
                     <label>Personal Liability Insurance </label>                 
                       <Form.Control type="file" onChange={(files) => handleFileChange(files, "liabilityInsurance")} className={
                       errors.liabilityInsurance
                         ? "border-line form-control"
                         : "form-control"
                     }
                     accept=".png, .jpg, .jpeg, .pdf, image/png, image/jpeg"
                     />
                    
                     {errors.liabilityInsurance && (
                     <p className="text-sm text-destructive">{errors.liabilityInsurance}</p>
                   )}
                   <p className='d-blck text-end small m-0'>JPEG, PNG, jpg, pdf, formats, up to 10MB</p>
                   </div>
               </Col>
                 <Col lg={4} md={6}>
                   <div className='form-group'>
                     <label>Insurance Provider Name </label>               
                     <input 
                     value={data.insuranceProviderName ?? ""}
                    onChange={(e) => onChange("insuranceProviderName", e.target.value)}
                    className={
                       errors.insuranceProviderName
                         ? "border-line form-control"
                         : "form-control"
                     }
                     type='text'  placeholder='Enter provider name' />
                     {errors.insuranceProviderName && (
                     <p className="text-sm text-destructive">{errors.insuranceProviderName}</p>
                   )}
                   </div>
               </Col>
               <Col lg={4} md={6}>
                   <div className='form-group'>
                     <label>Policy Number </label>               
                     <input 
                     value={data.policyNo ?? ""}
                    onChange={(e) => onChange("policyNo", e.target.value)}
                    className={
                       errors.policyNo
                         ? "border-line form-control"
                         : "form-control"
                     }
                     type='text'  placeholder='Enter policy no' />
                     {errors.policyNo && (
                     <p className="text-sm text-destructive">{errors.policyNo}</p>
                   )}
                   </div>
               </Col>
               <Col lg={4} md={6}>
                <div className='form-group'>
                    <label>Policy Expiry Date </label>
                    <DatePicker selected={data.policyExpireDate ?? ""} onChange={(date) => onChange("policyExpireDate", date)} className={
                    errors.policyExpireDate
                        ? "border-line form-control"
                        : "form-control"
                    } placeholderText="Select a date" />
                    {errors.policyExpireDate && (
                    <p className="text-sm text-destructive">{errors.policyExpireDate}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                   <div className='form-group'>
                     <label>Emergency Contact Name <span className='atrisk'>*</span></label>               
                     <input 
                     value={data.emergencyContactName ?? ""}
                    onChange={(e) => onChange("emergencyContactName", e.target.value)}
                    className={
                       errors.emergencyContactName
                         ? "border-line form-control"
                         : "form-control"
                     }
                     type='text'  placeholder='Enter your contact name' />
                     {errors.emergencyContactName && (
                     <p className="text-sm text-destructive">{errors.emergencyContactName}</p>
                   )}
                   </div>
               </Col>
               <Col lg={4} md={6}>
                <div className='form-group'>
                    <label>Emergency Contact Phone <span className='atrisk'>*</span></label>
                    <input 
                    value={data.emergencyContactNo ?? ""}
                onChange={(e) => onChange("emergencyContactNo", e.target.value)}
                onKeyDown={handleKeyDown}
                    type='text' className={
                       errors.emergencyContactNo
                         ? "border-line form-control"
                         : "form-control"
                     } placeholder='Enter your contact no' />

                     {errors.emergencyContactNo && (
                     <p className="text-sm text-destructive">{errors.emergencyContactNo}</p>
                   )}
                    
                </div>
            </Col>
              
           </Row>
   
           
       </div>
  )
}

export default Insurence