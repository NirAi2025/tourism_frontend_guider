import React, { useEffect, useState } from "react";
import StepIndicator from "./StepIndicator";
import { Container } from "react-bootstrap";
import ProfileCreation from "./ProfileCreation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Identity from "./Identity";
import TourismLicence from "./TourismLicence";
import Insurence from "./Insurence";
import LanguageSkill from "./LanguageSkill";
import Banking from "./Banking";
import Public from "./Public";
import Declaration from "./Declaration";
import { country, getCityByState, getStatesByCountry, language, StepFiveRegister, StepFourRegister, StepOneRegister, StepSevenRegister, StepSixRegister, StepThreeRegister, StepTwoRegister } from "../../api/authService";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/ReducerDataHandle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const {token, user} = useSelector((state) => state.ReducerDataHandle);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingStates, setLoadingStates] = useState(false)
  const [countryList, setcountryList] = useState([])
   const [currencyList, setCurrencyList] = useState([])
    const [phoneCodeList, setPhoneCodeList] = useState([])
    const [stateList, setStateList] = useState([])
      const [cityList, setCityList] = useState([])
   const [languageList, setLanguageList] = useState([])
  const [profileformData, setProfileformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    countryCode:"",
    phoneNo:"",
    whatsappNo:"",
    communicationLanguage:"",
    nationality: "",
    country: "",
    state: "",
    city: "",
    experience: "",
    password: "",
    confirmPassword: "",

    //identity
    governmentIssuedID:"",
    idNo:"",
   selfieWithId:"",
   addressProof:"",
   //Tourism 
   guidecertificate:"",
   departmentId:"",
   localGuide:"",
   specialLicence:"",
   //Insurance 
   liabilityInsurance:"",
   insuranceProviderName:"",
   policyNo:"",
   policyExpireDate:"",
   emergencyContactName:"",
   emergencyContactNo:"",
   //language
   languageSpoken:[],
   primaryTourLanguage:"",
   firstAid:"",
  //  Banking
   accountName:"",
   bankName:"",
   accountNo:"",
   ifscCode:"",
   currency:"",
   payoutMethod:"",
   taxCountry:"",
   taxId:"",
   //public

   guideBio:"",
   profilePhoto:"",
  profilePhotoPreview:"",
  extenalLinks:"",
  socialLink:"",

  //Declartian

  declaration:[]



  });
 
let dispatch = useDispatch();
let navigate = useNavigate()


console.log("reducer", user)
useEffect(()=>{
GetCountry()
Getlanguage()
},[])

  const updateProfileFormData = async (field, value) => {
  const selectedValue = Array.isArray(value) ? value[0] : value;

  setProfileformData((prev) => ({ ...prev, [field]: value }));

  // setProfileformData((prev) => ({
  //   ...prev,
  //   [field]: selectedValue,
  //   ...(field === "country" && { state: "", city: "" }),
  //   ...(field === "state" && { city: "" }),
  // }));

  if (errors[field]) {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  try {
    //  COUNTRY → STATES
    if (field === "country") {
      setLoadingStates(true);
        setStateList([]); 
      setCityList([]); 
   
      const res = await getStatesByCountry(selectedValue?.value);
          let arr = []
      res?.data?.data?.forEach(item=>{
    
        arr.push(
          {
            value:item?.id,
            label:item?.name
          })
        })
      setStateList(arr || []);
    }

    //  STATE → CITIES
    if (field === "state" && selectedValue?.value) {
      setLoadingStates(true);
      setCityList([]);

      const res = await getCityByState(selectedValue.value);

         let arr = []
      res?.data?.data?.forEach(item=>{    
        arr.push(
          {
            value:item?.id,
            label:item?.name
          })
        })
      setCityList(arr || []);
    }
  } catch (err) {
    console.error("Location fetch failed", err);
  } finally {
    setLoadingStates(false);
    setLoadingStates(false);
  }
};

  // Email Validate

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  //Password validate
  const isValidPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!profileformData.firstName?.trim())
          newErrors.firstName = "First name is required";
        if (!profileformData.lastName?.trim())
          newErrors.lastName = "Last name is required";
        if (!profileformData.email?.trim())
          newErrors.email = "Email is required";
        else if (!isValidEmail(profileformData.email)) {
          newErrors.email = "Enter a valid email address";
        }
         if (!profileformData.countryCode) newErrors.countryCode = "Country code is required";
          if (!profileformData.phoneNo) newErrors.phoneNo = "Phone no is required";
        if (!profileformData.dob) newErrors.dob = "DOB is required";

        if (!profileformData.nationality)
          newErrors.nationality = "Nationality is required";

        if (!profileformData.country) newErrors.country = "Country is required";
        if (!profileformData.state) newErrors.state = "State is required";

     

        if (!profileformData.city) newErrors.city = "City is required";

        if (!profileformData.password?.trim())
          newErrors.password = "Password is required";
        else if (!isValidPassword(profileformData.password)) {
          newErrors.password =
            "Password must have at least 8 characters, one uppercase letter, one number, and one special character.";
        }

        if (!profileformData.confirmPassword?.trim())
          newErrors.confirmPassword = "Confirm password is required";
        else if (
          profileformData.password?.trim() !==
          profileformData.confirmPassword?.trim()
        )
          newErrors.confirmPassword =
            "Confirm password does not math with password";

        break;
      case 2:
         if (!profileformData.governmentIssuedID)
          newErrors.governmentIssuedID = "Government id is required";

         if (!profileformData.idNo)
          newErrors.idNo = "Government id no is required";

         if (!profileformData.selfieWithId)
          newErrors.selfieWithId = "Selfie is required";

         if (!profileformData.addressProof)
          newErrors.addressProof = "Address proof  is required";

        break;
      case 3:
        if (!profileformData.guidecertificate)
          newErrors.guidecertificate = "Guide certificate is required";
        break;
      case 4:
        if (!profileformData.emergencyContactName)
          newErrors.emergencyContactName = "Name is required";
         if (!profileformData.emergencyContactNo)
          newErrors.emergencyContactNo = "Phone no is required";
        break;
         case 5:
           if (profileformData.languageSpoken.length === 0)
         newErrors.languageSpoken = "Languages spoken is required";         
          
         if (!profileformData.primaryTourLanguage)
          newErrors.primaryTourLanguage = "Primary tour language is required";
        break;
         case 6:
             if (!profileformData.accountName)
          newErrors.accountName = "Account name is required";
           if (!profileformData.bankName)
          newErrors.bankName = "Bank name is required";
          if (!profileformData.accountNo)
          newErrors.accountNo = "Account no is required";           
          if (!profileformData.ifscCode)
          newErrors.ifscCode = "IFSC / SWIFT / BIC Code is required";
          if (!profileformData.currency)
          newErrors.currency = "Currency is required";
          if (!profileformData.payoutMethod)
          newErrors.payoutMethod = "Please choose the payment method";
         if (!profileformData.taxCountry)
          newErrors.taxCountry = "Country is required";
          if (!profileformData.taxId)
          newErrors.taxId = "PAN / SSN / TIN is required";
        break;
        case 7:
        if (!profileformData.guideBio)
          newErrors.guideBio = "description is required";
          if (!profileformData.profilePhoto)
          newErrors.profilePhoto = "Profile photo is required";
        break;
        case 8:
         if (profileformData.declaration.length === 0)
         newErrors.declaration = "Declaration is required"; 
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNextContinue = () => {

    if (validateStep(currentStep)) {
      if(currentStep === 1){
        SubmitRegister()
      }
      if(currentStep === 2){
        SubmitTwoRegister()
      }
       if(currentStep === 3){
        SubmitThreeRegister()
      }
      if(currentStep === 4){
        SubmitFourRegister()
      }
       if(currentStep === 5){
        SubmitFiveRegister()
      }
      if(currentStep === 6){
        SubmitSixRegister()
      }
      
    }
  };

   const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const GetCountry = async () => {
  try {
    const res = await country();
    if(res?.data?.success){

      let CountryArr = []
      let CurrencyArr = []
      let codeArr = []

      res?.data?.data?.forEach(item=>{
        CountryArr.push(
          {
            value:item?.id,
            label:item?.name
          })
          CurrencyArr.push(
          {
            value:item?.currency,
            label:item?.currency
          })
           codeArr.push(
          {
            value:item?.phone_code,
            label:'+' + item?.phone_code
          })
      })
      setcountryList(CountryArr)
      setCurrencyList(CurrencyArr)
      setPhoneCodeList(codeArr)
    }
  
  } catch (err) {
    console.error(err.message);
  }
};

  const Getlanguage = async () => {
  try {
    const res = await language();
    if(res?.data?.success){
     let arr = []
      res?.data?.data?.forEach(item=>{
  
        arr.push(
          {
            value:item?.id,
            label:item?.name
          })
        })
      setLanguageList(arr)
    }
  
  } catch (err) {
    console.error(err.message);
  }
};



function GetId(arr){
  return  Array.isArray(arr) ? arr[0]?.value : arr;
}

// Step One
  const SubmitRegister = async () => {
  
    setIsSubmitting(true)

    let payload ={
      "firstName": profileformData.firstName,
      "lastName": profileformData.lastName,
      "email": profileformData.email,
      "country_code":GetId(profileformData.countryCode) ,
      "phone": profileformData.phoneNo,
      "password": profileformData.password,
      "whatsAppNumber": profileformData.whatsappNo,
      "languageId": GetId(profileformData.communicationLanguage),
      "dob":moment(profileformData.dob).format('YYYY-MM-DD'),
      "stateId":GetId(profileformData.state),
      "nationality": GetId(profileformData.nationality),
      "countryOfOperation": GetId(profileformData.country),
      "primaryCity": GetId(profileformData.city),
      "yearsOfExperience": profileformData.yearsOfExperience
    }

  try {
    const res = await StepOneRegister(payload);
      setIsSubmitting(false)
    if(res?.data?.success){
    dispatch(
      setAuth({
        token: res?.data?.data?.accessToken,
        user: res.data.data.user,
      })
    );
      handleNextStep()
          console.log(res?.data); 
    } else {
      toast.error(res?.data?.message)
    }

  } catch (err) {
     setIsSubmitting(false)
     console.log(err)
     toast.error(err?.response?.data?.message)
  }
};

// Step Two
  const SubmitTwoRegister = async () => {
  
    setIsSubmitting(true)

    const formData = new FormData();
      formData.append("government_id",profileformData.governmentIssuedID);
      formData.append("id_number",  profileformData.idNo);
      formData.append("selfie", profileformData.selfieWithId);
      formData.append("address_proof", profileformData.addressProof);

  try {
    const res = await StepTwoRegister(formData);
      setIsSubmitting(false)
    if(res?.data?.success){
      handleNextStep()
   
    } else {
      toast.error(res?.data?.message)
    }

  } catch (err) {
     setIsSubmitting(false)
     console.log(err)
     toast.error(err?.response?.data?.message)
  }
};

// Step three
  const SubmitThreeRegister = async () => {
  
    setIsSubmitting(true)

     const formData = new FormData();
      formData.append("licensed_tour_guide",profileformData.guidecertificate);
      formData.append("tourism_department_id",  profileformData.departmentId);
      formData.append("local_guide_permit", profileformData.localGuide);
      formData.append("special_activity_license", profileformData.specialLicence);

  try {
    const res = await StepThreeRegister(formData);
      setIsSubmitting(false)
    if(res?.data?.success){
      handleNextStep()
   
    } else {
      toast.error(res?.data?.message)
    }

  } catch (err) {
     setIsSubmitting(false)
     console.log(err)
     toast.error(err?.response?.data?.message)
  }
};

// Step Four
  const SubmitFourRegister = async () => {  
    setIsSubmitting(true)

         const formData = new FormData();
      formData.append("insurance_provider",profileformData.insuranceProviderName);
      formData.append("policy_number", profileformData.policyNo);
      formData.append("policy_expiry_date", moment( profileformData.policyExpireDate).format('YYYY-MM-DD'));
      formData.append("insurance_document", profileformData.liabilityInsurance);
       formData.append("emergency_contact_name", profileformData.emergencyContactName);
      formData.append("emergency_contact_phone", profileformData.emergencyContactNo);
      formData.append("emergency_contact_relation", "");


  try {
    const res = await StepFourRegister(formData);
      setIsSubmitting(false)
    if(res?.data?.success){
      handleNextStep()
   
    } else {
      toast.error(res?.data?.message)
    }

  } catch (err) {
     setIsSubmitting(false)
     console.log(err)
     toast.error(err?.response?.data?.message)
  }
};

// Step five
  const SubmitFiveRegister = async () => {  

   const arr = profileformData.languageSpoken.map(item =>
  parseInt(item.value, 10)
);


    setIsSubmitting(true)
      const formData = new FormData();
      formData.append("language_ids", arr);
      formData.append("primary_language_id", GetId( profileformData.primaryTourLanguage));
      //formData.append("certification_type", "First Aid");
      formData.append("certification_document", profileformData.firstAid);


  try {
    const res = await StepFiveRegister(formData);
      setIsSubmitting(false)
    if(res?.data?.success){
      handleNextStep()
   
    } else {
      toast.error(res?.data?.message)
    }

  } catch (err) {
     setIsSubmitting(false)
     console.log(err)
     toast.error(err?.response?.data?.message)
  }
};

// Step Six
  const SubmitSixRegister = async () => {
  
    setIsSubmitting(true)

    let payload ={
       "account_holder_name": profileformData.accountName,
      "bank_name": profileformData.bankName,
      "account_number": profileformData.accountNo,
      "ifsc_swift_bic": profileformData.ifscCode,
      "payout_currency":GetId(profileformData.currency) ,
      "payout_method":GetId(profileformData.payoutMethod),
      "tax_residency_country_id":GetId(profileformData.taxCountry) ,
      "tax_id": profileformData.taxId
    }

  try {
    const res = await StepSixRegister(payload);
      setIsSubmitting(false)
    if(res?.data?.success){
  
      handleNextStep()
          console.log(res?.data); 
    } else {
      toast.error(res?.data?.message)
    }

  } catch (err) {
     setIsSubmitting(false)
     console.log(err)
     toast.error(err?.response?.data?.message)
  }
};

// Step Seven @ Final
  const SubmitSevenRegister = async () => {  

    setIsSubmitting(true)
      const formData = new FormData();
      formData.append("bio", profileformData.guideBio);
      formData.append("profile_photo", profileformData.profilePhoto);
      formData.append("external_review_links", profileformData.extenalLinks);
      formData.append("social_media_url", profileformData.socialLink);


  try {
    const res = await StepSevenRegister(formData);
      setIsSubmitting(false)
    if(res?.data?.success){
      toast.success(res?.data?.message)
      navigate("/")
   
    } else {
      toast.error(res?.data?.message)
    }

  } catch (err) {
     setIsSubmitting(false)
     console.log(err)
     toast.error(err?.response?.data?.message)
  }
};

useEffect(()=>{

  if(user !== null){
  let Stepcount = user?.completed_steps
   setCompletedSteps((prev) => new Set([...prev, Stepcount]));
   setCurrentStep((prev) => Math.min(Stepcount + 1, 7));
  }



},[user])



    

  




  return (
    <Container>
      <div className="Register-sec">
        <StepIndicator
          currentStep={currentStep}
          //onStepClick={handleStepClick}
          completedSteps={completedSteps}
        />
        <div className="Register-form">
          {currentStep === 1 && (
            <ProfileCreation
              data={{
                firstName: profileformData.firstName,
                lastName: profileformData.lastName,
                email: profileformData.email,    
                dob: profileformData.dob,  
                countryCode:profileformData.countryCode,   
                phoneNo:profileformData.phoneNo,    
                whatsappNo:profileformData.whatsappNo,
                communicationLanguage:profileformData.communicationLanguage,  
                nationality: profileformData.nationality,
                country: profileformData.country,
                state:profileformData.state,
                city: profileformData.city,
                experience: profileformData.experience,
                password: profileformData.password,
                confirmPassword: profileformData.confirmPassword,
              }}
              onChange={updateProfileFormData}
              countryList={countryList}
              phoneCodeList={phoneCodeList}
              languageList={languageList}
              stateList={stateList}
              cityList={cityList}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <Identity
              data={{
                governmentIssuedID: profileformData.governmentIssuedID,
                idNo: profileformData.idNo,
                selfieWithId: profileformData.selfieWithId,
                addressProof: profileformData.addressProof,               
              }}
              onFileHandle={(field , files) => {
                updateProfileFormData(field, files)
              }}
              onChange={updateProfileFormData}
              errors={errors}
            />
          )}
           {currentStep === 3 && (
            <TourismLicence
              data={{
                guidecertificate: profileformData.guidecertificate,
                departmentId: profileformData.departmentId,
                localGuide: profileformData.localGuide,
                specialLicence: profileformData.specialLicence,               
              }}
              onFileHandle={(field , files) => {
                updateProfileFormData(field, files)
              }}
              onChange={updateProfileFormData}
              errors={errors}
            />
          )}
            {currentStep === 4 && (
            <Insurence
              data={{
                liabilityInsurance: profileformData.liabilityInsurance,
                insuranceProviderName:profileformData.insuranceProviderName,
                policyNo: profileformData.policyNo,
                policyExpireDate:profileformData.policyExpireDate,
                emergencyContactName: profileformData.emergencyContactName,   
                emergencyContactNo: profileformData.emergencyContactNo,               
              }}
              onFileHandle={(field , files) => {
                updateProfileFormData(field, files)
              }}
              onChange={updateProfileFormData}
              errors={errors}
            />
          )}
           {currentStep === 5 && (
            <LanguageSkill
              data={{
                languageSpoken: profileformData.languageSpoken,
                primaryTourLanguage:profileformData.primaryTourLanguage,
                firstAid: profileformData.firstAid,           
              }}
              onFileHandle={(field , files) => {
                updateProfileFormData(field, files)
              }}
              onChange={updateProfileFormData}
              errors={errors}
              languageList={languageList}
            />
          )}
          {currentStep === 6 && (
            <Banking
              data={{
                accountName: profileformData.accountName,
                bankName:profileformData.bankName,
                accountNo:profileformData.accountNo,
                ifscCode: profileformData.ifscCode,    
                currency: profileformData.currency,  
                payoutMethod: profileformData.payoutMethod,
                taxCountry:profileformData.taxCountry,
                 taxId:profileformData.taxId        
              }}
             currencyList={currencyList}
             countryList={countryList}
              onChange={updateProfileFormData}
              errors={errors}
            />
          )}
            {currentStep === 7 && (
            <Public
              data={{
                guideBio: profileformData.guideBio,
                extenalLinks: profileformData.extenalLinks,
                socialLink:profileformData.socialLink,  
                declaration:profileformData.declaration,                   
              }}
              onFileHandle={(field , files) => {
                updateProfileFormData(field, files)
              }}
              onChange={updateProfileFormData}
              errors={errors}
            />
          )}
            {currentStep === 8 && (
            <Declaration
              data={{
                declaration:profileformData.declaration,             
              }}
              
              onChange={updateProfileFormData}
              errors={errors}
            />
          )}
        </div>
        <div className="form-button">
          <button
            onClick={handlePrevious}
            disabled={true}
            className="back-bttn"
          >
            <IoIosArrowBack /> Back
          </button>

          {currentStep < 7 ? (
            <button 
            disabled={isSubmitting}
            onClick={handleNextContinue} className="next-bttn">
            {isSubmitting ? 'Loading..' : 'Save & next'}  
              <IoIosArrowForward />
            </button>
          ) : (
            <button

              onClick={SubmitSevenRegister}
              className="next-bttn"
              disabled={profileformData.declaration.length < 7 ? true : false}
            >
              {isSubmitting ? 'Loading..' : 'Submit'}  
              
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Register;
