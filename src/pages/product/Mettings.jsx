import React, { useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Autocomplete } from "@react-google-maps/api";
const Mettings = ({data, onChange, errors}) => {

const autocompleteRef = useRef(null);

 const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    console.log("Selected address:", place);
    getLatlong(place.formatted_address);

    onChange("mettingAddress", place.formatted_address);
  };

  const getLatlong = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const latitude = location.lat();
        const longitude = location.lng();
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        onChange("latitude", latitude);
        onChange("longitude", longitude);
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  };


  return (
     <div className='register-profile'>
        <h3>4. Meeting & Logistics  </h3>
        <Row>
             <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Meeting Point Name  <span className='atrisk'>*</span></label>
                              <input 
                              value={data.mettingName ?? ""}
                             onChange={(e) => onChange("mettingName", e.target.value)}
                             className={
                                errors.mettingName
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Public location name' />
                              {errors.mettingName && (
                              <p className="text-sm text-destructive">{errors.mettingName}</p>
                            )}
                            </div>
                        </Col>
                      
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Meeting Point Address  <span className='atrisk'>*</span></label>
                               
                                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                      <input
                                        type="text"
                                        placeholder="Enter address"
                                        className={
                                          errors.mettingAddress
                                                  ? "border-line form-control"
                                                  : "form-control"
                                              }
                                      />
                                    </Autocomplete>
                              
                            
                              {errors.mettingAddress && (
                              <p className="text-sm text-destructive">{errors.mettingAddress}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>End Point  <span className='atrisk'>*</span></label>
                              <input 
                              value={data.endPoint ?? ""}
                             onChange={(e) => onChange("endPoint", e.target.value)}
                             className={
                                errors.endPoint
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='url'  placeholder='Same / different' />
                              {errors.endPoint && (
                              <p className="text-sm text-destructive">{errors.endPoint}</p>
                            )}
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Pickup Offered  <span className='atrisk'>*</span></label>
                                <div className='d-flex'>
                                    <div className='form-check me-3'>   
                                        <input 
                                        className='form-check-input' 
                                        type='radio'    
                                        name='pickupOfferd'
                                        checked={data.pickupOfferd === true}
                                        onChange={() => onChange("pickupOfferd", true)}
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='pickupOfferd'
                                        checked={data.pickupOfferd === false}
                                        onChange={() => onChange("pickupOfferd", false)}
                                            />
                                        <label className='form-check-label'>No</label>
                                    </div>
                                </div>
                              {errors.pickupOfferd && (     
                                <p className="text-sm text-destructive">{errors.pickupOfferd}</p>
                                )}  
                            </div>
                        </Col>
                          <Col lg={12} md={12}>
                                                    <div className='form-group'>
                                                      <label>Pickup Details  <span className='atrisk'>*</span></label>
                                                      <textarea 
                                                      value={data.pickupDetails ?? ""}
                                                     onChange={(e) => onChange("pickupDetails", e.target.value)}
                                                     className={
                                                        errors.pickupDetails
                                                          ? "border-line form-control"
                                                          : "form-control"
                                                      }
                                                      type='text'  placeholder='Complete pickup details' />
                                                      {errors.pickupDetails && (
                                                      <p className="text-sm text-destructive">{errors.pickupDetails}</p>
                                                    )}
                                                    </div>
                                                </Col>
                         </Row>
                                </div>
                         
       
  )
}

export default Mettings