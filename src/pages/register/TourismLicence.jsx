import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';

const TourismLicence = ({ data, onChange, errors, onFileHandle }) => {


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


    if (type === "guidecertificate") {
        onFileHandle('guidecertificate', selectedFile)
    } else if(type == 'departmentId'){
         onFileHandle('departmentId', selectedFile)
    } else if(type == 'localGuide'){
         onFileHandle('localGuide', selectedFile)
    } else {
       onFileHandle('specialLicence', selectedFile)
    }
  };




  return (
    <div className='register-profile'>
        <h3>Tourism Licenses & Official Permissions</h3>
        <Row>
            <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Licensed Tour Guide Certificate  <span className='atrisk'>*</span></label>                 
                    <Form.Control type="file" onChange={(files) => handleFileChange(files, "guidecertificate")} className={
                    errors.guidecertificate
                      ? "border-line form-control"
                      : "form-control"
                  }
                  accept=".png, .jpg, .jpeg, .pdf, image/png, image/jpeg"
                  />
                 
                  {errors.guidecertificate && (
                  <p className="text-sm text-destructive">{errors.guidecertificate}</p>
                )}
                <p className='d-blck text-end small m-0'>JPEG, PNG, jpg, pdf, formats, up to 10MB</p>
                </div>
            </Col>
             
            <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Tourism Department ID / Card </label>                 
                    <Form.Control type="file" onChange={(files) => handleFileChange(files, "departmentId")}  className={
                    errors.departmentId
                      ? "border-line form-control"
                      : "form-control"
                  }
                   accept=".png, .jpg, .jpeg, .pdf, image/png, image/jpeg"
                  />
                     <p className='d-blck text-end small m-0'>JPEG, PNG, jpg, pdf, formats, up to 10MB</p>
                  {errors.departmentId && (
                  <p className="text-sm text-destructive">{errors.departmentId}</p>
                )}
                </div>
            </Col>
            
             <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Local Guide Permit  </label>                 
                    <Form.Control type="file" onChange={(files) => handleFileChange(files, "localGuide")} className={
                    errors.localGuide
                      ? "border-line form-control"
                      : "form-control"
                  }
                   accept=".png, .jpg, .jpeg, .pdf, image/png, image/jpeg"
                  />
                     <p className='d-blck text-end small m-0'>JPEG, PNG, jpg, pdf, formats, up to 10MB</p>
                  {errors.localGuide && (
                  <p className="text-sm text-destructive">{errors.localGuide}</p>
                )}
                </div>
            </Col>
            <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Special Activity License   </label>                 
                    <Form.Control type="file" onChange={(files) => handleFileChange(files, "specialLicence")} className={
                    errors.specialLicence
                      ? "border-line form-control"
                      : "form-control"
                  }
                   accept=".png, .jpg, .jpeg, .pdf, image/png, image/jpeg"
                  />
                     <p className='d-blck text-end small m-0'>JPEG, PNG, jpg, pdf, formats, up to 10MB</p>
                  {errors.specialLicence && (
                  <p className="text-sm text-destructive">{errors.specialLicence}</p>
                )}
                </div>
            </Col>
        </Row>

        
    </div>
  )
}

export default TourismLicence