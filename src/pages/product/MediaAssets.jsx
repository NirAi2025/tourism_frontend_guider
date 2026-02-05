import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FileUploader } from "react-drag-drop-files";
import { RiFilePpt2Line } from 'react-icons/ri';

const MediaAssets = ({ onChange , data, errors}) => {
    const [coverImagePreview, setCoverImagePreview] = React.useState(null);
    const [galleryImagePreviews, setGalleryImagePreviews] = React.useState([]);

const coverImageHandle = (file) => {

    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        return;
      }
      onChange("coverImage", file);
    const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
  }
}

  const GaleryImageHandle = (file) => {    
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        if (file[i].size > 50 * 1024 * 1024) {  
            return;
        }
      }
    }   
    onChange("galleryImages", file);
    const previews = [];    
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();  
        reader.onload = (e) => {
            previews.push(e.target.result); 
            if (previews.length === file.length) {
                setGalleryImagePreviews(previews);
            }
        };
        reader.readAsDataURL(file[i]);
    }
  }


  return (
        <div className="register-profile">
             <h3>10. Media & Assets  </h3>

             <Row>
                    <Col lg={6} md={6}>
                        <div className='form-group'>
                          <label>Cover Image  <span className='atrisk'>*</span></label>
                          <FileUploader
                            handleChange={coverImageHandle}
                            name="file"
                            types={["png", "jpg", "jpeg"]}
                            dropMessageStyle={{ backgroundColor: "#2557a7" }}
                            children={
                                <div className="upload-style mb-3">
                                 <h3>Choose a file or drag & drop it here</h3>
                                    <p>png, jpg, jpeg formats, up to 50MB</p>
                                    <span>Browse File</span>
                                </div>
                            }
                            />
                     
                          {coverImagePreview && (
                            <img src={coverImagePreview} alt="Cover Preview" style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }} />
                          )}
                        </div>
                    </Col>
                     <Col lg={6} md={6}>
                        <div className='form-group'>
                          <label>Gallery Images (Multiples Images) ({galleryImagePreviews.length})  </label>
                           <FileUploader
                           multiple={true}
                            handleChange={GaleryImageHandle}
                            name="file"
                            types={["png", "jpg", "jpeg"]}
                            dropMessageStyle={{ backgroundColor: "#2557a7" }}
                            children={
                                <div className="upload-style mb-3">
                                 <h3>Choose a file or drag & drop it here</h3>
                                    <p>png, jpg, jpeg formats, up to 50MB</p>
                                    <span>Browse File</span>
                                </div>
                            }
                            />
                        
                          {galleryImagePreviews.length > 0 && ( 
                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {galleryImagePreviews.map((src, index) => (
                                <img key={index} src={src} alt={`Gallery Preview ${index + 1}`} style={{ maxWidth: '150px', height: 'auto' }} />    
                                ))}
                            </div>
                          )}
                        </div>
                    </Col>
                     <Col lg={6} md={6}>
                        <div className='form-group'>
                        <label>Video URL </label>
                        <input 
                            value={data.videoURL ?? ""}
                        onChange={(e) => onChange("videoURL", e.target.value)}

                        type='text' className='form-control' placeholder='YouTube / Vimeo' />
                        
                        </div>
                   </Col>
                    <Col lg={12} md={12}>
                         <div className="form-group d-flex align-items-center gap-2">
            <label>
            Image Rights Confirmation <span className="atrisk">*</span>
            </label>
            <input type="checkbox" checked={data.imageRightsConfirmation} onChange={(e) => onChange("imageRightsConfirmation", e.target.checked)} />
           
            {errors.imageRightsConfirmation && (
              <p className="text-sm text-destructive">
                {errors.imageRightsConfirmation}
              </p>
            )}
          </div>
                   </Col>
             </Row>

      </div>
  )
}

export default MediaAssets