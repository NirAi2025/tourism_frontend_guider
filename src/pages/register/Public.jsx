import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

const initialList = [
  { id: 1, label: "Individual Operator Declaration", ischeck: false },
  { id: 2, label: "Legal Right to Operate Tours", ischeck: false },
  { id: 3, label: "License Validity Declaration", ischeck: false },
  { id: 4, label: "Safety Responsibility Declaration", ischeck: false },
  { id: 5, label: "Platform Terms & Conditions", ischeck: false },
  { id: 6, label: "Privacy Policy Consent", ischeck: false },
  { id: 7, label: "Data Accuracy Declaration", ischeck: false },
];

const Public = ({ data, onChange, errors, onFileHandle }) => {

    const [preview, setPreiew] = useState("")
       const [list, setList] = useState(initialList);

       console.log('data', data)


 const ALLOWED_TYPES = [
    "image/png",
    "image/jpg",
    "image/jpeg",
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

        onFileHandle('profilePhoto', selectedFile)
        const newPreviews =  URL.createObjectURL(selectedFile);
        setPreiew(newPreviews)
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

const CheckboxHandle = (clickedItem) => {
  const updatedList = list.map(item =>
    item.id === clickedItem.id
      ? { ...item, ischeck: !item.ischeck }
      : item
  );

  setList(updatedList);

  const updatedItem = updatedList.find(
    item => item.id === clickedItem.id
  );

  const safeDeclaration = Array.isArray(data.declaration)
    ? data.declaration
    : [];

  if (updatedItem.ischeck) {
    onChange("declaration", [
      ...safeDeclaration,
      {
        id: updatedItem.id,
        label: updatedItem.label,
      },
    ]);
  } else {
    onChange(
      "declaration",
      safeDeclaration.filter(
        item => item.id !== updatedItem.id
      )
    );
  }
};







  return (
       <div className='register-profile'>
           <h3>Profile Trust & Public Information</h3>
           <Row>
            <Col lg={12} md={12}>
                   <div className='form-group'>
                     <label>Guide Bio <span className='atrisk'>*</span> </label>      
                     <textarea
                       value={data.guideBio ?? ""}
                    onChange={(e) => onChange("guideBio", e.target.value)}
                     className={
                       errors.guideBio
                         ? "border-line form-control"
                         : "form-control"
                     }
                     type='text'  placeholder='Enter short personal intro'
                     ></textarea>         
                  
                     {errors.guideBio && (
                     <p className="text-sm text-destructive">{errors.guideBio}</p>
                   )}
                   </div>
               </Col>
             
               <Col lg={6} md={6}>
                   <div className='form-group'>
                     <label>External Review Links  </label>               
                     <input 
                     value={data.extenalLinks ?? ""}
                    onChange={(e) => onChange("extenalLinks", e.target.value)}
                    className="form-control"
                     type='text'  placeholder='Google / Tripadvisor URL' />
                    
                   </div>
               </Col>
            <Col lg={6} md={6}>
                   <div className='form-group'>
                     <label>Social Media Profile </label>               
                     <input 
                     value={data.socialLink ?? ""}
                    onChange={(e) => onChange("socialLink", e.target.value)}
                    className="form-control"
                     type='text'  placeholder='Instagram / LinkedIn URL' />
                    
                   </div>
               </Col>
                <Col lg={12} md={12}>
                   <div className='form-group'>
                     <label>Profile Photo </label>
                    <div className='upload-profile-photo'>
                        {preview == '' ? 
                              <CgProfile size={100} />
                              :
                                    <img src={preview} />
                    }
                
                          
                            <div className='edit-photo'>
                                <MdOutlineEdit />
                                 <Form.Control type="file" onChange={(files) => handleFileChange(files, "liabilityInsurance")} 
                                    accept=".png, .jpg, .jpeg, image/png, image/jpeg"
                                    />
                            </div>
                        </div>                 
                      
                    
                     {errors.profilePhoto && (
                     <p className="text-sm text-destructive">{errors.profilePhoto}</p>
                   )}
                 
                   </div>
               </Col>
               <Col lg={12}>
                    <h3>Declarations & Legal Agreements</h3>
           {list.map((item, i)=>{
            return (
                <div  className='checklist' key={i}>
                    <label>{item?.label}</label>
                    <div  className={`checkbox ${item.ischeck ? "checked" : ""}`} onClick={()=>CheckboxHandle(item)}></div>
                </div>  
            )
           })}

             {errors.declaration && (
                  <p className="text-sm text-destructive">{errors.declaration}</p>
                )}
               </Col>
           </Row>
   
           
       </div>
  )
}

export default Public