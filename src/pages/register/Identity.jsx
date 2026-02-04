import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';

const Identity = ({ data, onChange, errors, onFileHandle }) => {


 const ALLOWED_TYPES = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
  ];

   const ALLOWED_VIDEO_TYPES = [
    "video/mp4",
    "video/mpV",
    "video/webm",
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







  return (
   <div className='register-profile'>
        <h3>Identity Verification </h3>
        <Row>
            <Col lg={8} md={7}>
                <div className='form-group'>
                  <label>Government-issued ID <span className='atrisk'>*</span></label>                 
                    <Form.Control type="file" onChange={(files) => handleFileChange(files, "governmentIssuedID")} className={
                    errors.governmentIssuedID
                      ? "border-line form-control"
                      : "form-control"
                  }
                  accept=".png, .jpg, .jpeg, .pdf, image/png, image/jpeg"
                  />
                 
                  {errors.governmentIssuedID && (
                  <p className="text-sm text-destructive">{errors.governmentIssuedID}</p>
                )}
                <p className='d-blck text-end small m-0'>JPEG, PNG, jpg, pdf, formats, up to 10MB</p>
                </div>
            </Col>
              <Col lg={4} md={5}>
                <div className='form-group'>
                  <label>ID No.<span className='atrisk'>*</span></label>               
                  <input 
                  value={data.idNo ?? ""}
                 onChange={(e) => onChange("idNo", e.target.value)}
                 className={
                    errors.idNo
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='text'  placeholder='Enter your id no' />
                  {errors.idNo && (
                  <p className="text-sm text-destructive">{errors.idNo}</p>
                )}
                </div>
            </Col>
            <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Selfie with ID <span className='atrisk'>*</span></label>                 
                    <Form.Control type="file" onChange={(files) => handleFileChange(files, "selfieWithId")}  className={
                    errors.selfieWithId
                      ? "border-line form-control"
                      : "form-control"
                  }
                  accept=".mpv, .mp4, .webm"
                  />
                  <p className='d-blck text-end small m-0'>mp4, webm, formats, up to 100 MB</p>
                  {errors.selfieWithId && (
                  <p className="text-sm text-destructive">{errors.selfieWithId}</p>
                )}
                </div>
            </Col>
            
             <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Address Proof </label>                 
                    <Form.Control type="file" onChange={(files) => handleFileChange(files, "addressProof")} className={
                    errors.addressProof
                      ? "border-line form-control"
                      : "form-control"
                  }
                   accept=".png, .jpg, .jpeg, .pdf, image/png, image/jpeg"
                  />
                     <p className='d-blck text-end small m-0'>JPEG, PNG, jpg, pdf,  formats, up to 10MB</p>
                  {errors.addressProof && (
                  <p className="text-sm text-destructive">{errors.addressProof}</p>
                )}
                </div>
            </Col>
        </Row>

        
    </div>
  )
}

export default Identity