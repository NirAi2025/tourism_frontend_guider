import React, { useEffect, useState } from 'react'
import { Col, Container, Dropdown, Modal, Row } from 'react-bootstrap'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom'
import { login } from '../api/authService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/ReducerDataHandle';
import { getToken } from '../utils/token';
import { getProfile } from '../api/userService';
import Loader from './Loader';

const AppHeader = () => {
 const [show, setShow] = useState(false);
 const [showpassword, setshowpassword] = useState(false);
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false)
//  const [authdata, setAuthdata] = useState({
//      email:"shiba@gmail.com",
//      password:"Shiba@123"
//  })
 const [authdata, setAuthdata] = useState({
     email:"",
     password:""
 })
 const [profiledata, setProfiledata] = useState(null);
 const [isloading, setIsloading] = useState(false);

 let dispatch = useDispatch()
 let navigate = useNavigate()
 const token = getToken();

   // Email Validate
 
   const isValidEmail = (email) => {
     return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
   };
 
   const validateStep = () => {
     const newErrors = {};
 
          if (!authdata.email?.trim())
           newErrors.email = "Email is required";
          else if (!isValidEmail(authdata.email)) {
           newErrors.email = "Enter a valid email address";
         }
            if (!authdata.password?.trim())
           newErrors.password = "Password is required";
 
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
 
   const LoginHandle = async () => {
 
     if (validateStep()) {
      setLoading(true)
     try {

      let payload = {
        email:authdata.email,
        password:authdata.password
      }

      const res = await login(payload);
         setLoading(false)
        if(res?.data?.success){
          setShow(false)
          var useData = res.data.data.user
          if(useData?.completed_steps == 7){
             localStorage.setItem("token", res?.data?.data?.accessToken);
            window.location.href = "/dashboard";
          } else       
           dispatch(
            setAuth({
              token: res?.data?.data?.accessToken,
              user: res.data.data.user,
            })
          );
            navigate("/sign-up")

        } else{
              toast.error(res?.data?.message)
        }



  
    } catch (err) {
        setLoading(false)
      toast.error(err?.response?.data?.message)
    
    } finally {
       setLoading(false)
         setShow(false)
    }
     }
   };
 
     const updateProfileFormData = (field, value) => {
     setAuthdata((prev) => ({ ...prev, [field]: value }));
     if (errors[field]) {
       setErrors((prev) => ({ ...prev, [field]: "" }));
     }
   };
   const getProfiledata = async () => {
    setIsloading(true);
       try {
   
           const res = await getProfile();
           setIsloading(false);
           if(res?.data?.success){
            setProfiledata(res?.data?.data);
             console.log("profile data", res?.data?.data);
           }
          
       } catch (error) { setIsloading(false); }finally {setIsloading(false); }  
   }
   
   useEffect(() => {
    if(token){
      getProfiledata();
    }

   }, []);

   const LogoutHandle = () => {
    localStorage.removeItem("token");
    dispatch(setAuth({ token: null, user: null }));
    navigate("/")
   }



  return (
    <>
    {isloading && <Loader />}
    <div className='header'>
       
        {/* Main header */}
        <div className='main-header'>
            <Container>
                    <Row className='align-items-center'>
                        {/* logo */}
                        <Col lg={2}>
                            <NavLink to="/">Your Guide</NavLink>
                        </Col>
                      
                       
                        {/* Header right */}
                         <Col lg={10}>
                         {token ? (
                            <ul className='header-right'>
                     
                                <li>
                                  <Dropdown className='header-profile'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">                                     
                                            <img src={profiledata?.guide_public_profile?.profile_photo} alt="user" className='profile-picture' />                                      
                                    </Dropdown.Toggle>    
                                    <Dropdown.Menu>
                                      <Dropdown.Item as={NavLink} to="/dashboard">Dashboard</Dropdown.Item>
                                      <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item> 
                                      <Dropdown.Item as={NavLink} to="#" onClick={()=>LogoutHandle()}>Logout</Dropdown.Item> 
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </li>
                            </ul>
                         ) : (
                            <ul className='header-right'>
                                <li><button className="loginBttn" onClick={()=>setShow(true)}>Login</button></li>
                                 <li> <NavLink to="/sign-up" className="getstartedBttn">Get Started</NavLink></li>
                            </ul>
                          )}
                         </Col>
                    </Row>
            </Container>
        </div>
          <Modal show={show} onHide={()=>setShow(false)} animation={true} centered  size="lg" className='login-modal'>

        <Modal.Body>
            <button className='closeBttn' onClick={()=>setShow(false)}><IoCloseSharp /></button>
                  <div className='Login-form'>
                <h3>Login</h3>
                <h4>New to YourGuide? <NavLink to="/sign-up">Sign up for free</NavLink>  </h4>
                 <div className='form-group'>
                  <label>Email <span className='atrisk'>*</span></label>
                  <input
                   value={authdata.email ?? ""}
                 onChange={(e) => updateProfileFormData("email", e.target.value)}
                 className={
                    errors.email
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='email' placeholder='Enter your email' />
                 
                   {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
                </div>
                <div className='form-group'>
                  <label>Password <span className='atrisk'>*</span></label>
                  <button className='showhideBttn' onClick={() => setshowpassword(!showpassword)}>{!showpassword ? <> <BsEyeFill /> Show </> : <> <BsEyeSlashFill /> Hide </>} </button>
                  <input
                   value={authdata.password ?? ""}
                 onChange={(e) => updateProfileFormData("password", e.target.value)}
                  type={showpassword ? 'text' : 'password'}  className={
                    errors.password
                      ? "border-line form-control"
                      : "form-control"
                  } placeholder='XXXXXXXXX' />
                   {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
                </div>
                <div className='form-group'>
                    <button className='no-bttn'>Forgot Password ?</button>
                 </div>
                 <div className='form-group'>
                    <button disabled={loading} className='themeBttn' onClick={LoginHandle}>{loading ? 'Loading...' : 'Login'}</button>
                 </div>
                <h6>By continuing, you agree to the <NavLink>Terms of use</NavLink> and <NavLink>Privacy Policy.</NavLink>  </h6>
            </div>
        </Modal.Body>
  
      </Modal>
    </div>
    </>
  )
}

export default AppHeader