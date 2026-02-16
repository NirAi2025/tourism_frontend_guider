import React, { useEffect } from 'react'
import { getProfile } from '../../api/userService';
import { Col, Row } from 'react-bootstrap';

const MyProfile = () => {

    const [profiledata, setProfiledata] = React.useState(null);

const getProfiledata = async () => {
    try {

        const res = await getProfile();
        if(res?.data?.success){
          console.log("profile data", res?.data?.data);
          setProfiledata(res?.data?.data);
        }
       
    } catch (error) {  }finally { }  
}

useEffect(() => {
   getProfiledata();
}, []);





  return (
   <div className='comon-lauout'>
      <h5>Profile</h5>
      <div className='split-card'>
    
        <div className='split-card-body'> 
            <Row>
                <Col lg={4} md={6}>
                    <div className='form-group'>
                      <img src={profiledata?.guide_public_profile?.profile_photo} width="100" />

                    </div>

                </Col>
                <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Name</label>
                              <input 
                              value={profiledata?.name ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Email</label>
                              <input 
                              value={profiledata?.email ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Country Code</label>
                              <input 
                              value={profiledata?.country_code ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Phone</label>
                              <input 
                              value={profiledata?.phone ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                         <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Whatsapp Number</label>
                              <input 
                              value={profiledata?.whatsapp_number ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Nationality</label>
                              <input 
                              value={profiledata?.profile?.nationality_country?.name ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                         <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Country of Operation</label>
                              <input 
                              value={profiledata?.profile?.tour_country?.name ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Primary City</label>
                              <input 
                              value={profiledata?.profile?.base_city?.name ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                        
                         <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Years of Experience</label>
                              <input 
                              value={profiledata?.profile?.years_of_experience ?? ""}
                           
                             className="form-control"
                              type='text'  placeholder='' />
                              
                            </div>
                        </Col>
                          <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Bio</label>
                              <textarea value={profiledata?.guide_public_profile?.bio ?? ""} className='form-control'></textarea>
                              
                            </div>
                          </Col>
            </Row>
        </div>
      </div>
    </div>
  )
}

export default MyProfile