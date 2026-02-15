import React, { useEffect, useState } from "react";
import StepIndicator from "./StepIndicator";
import TourInformation from "./TourInformation";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  country,
  getCityByState,
  getStatesByCountry,
  language,
  tourCategories,
} from "../../api/authService";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import TourDescription from "./TourDescription";
import Itinery from "./Itinery";
import Mettings from "./Mettings";
import Duration from "./Duration";
import PricingTicket from "./PricingTicket";
import Inclution from "./Inclution";
import Access from "./Access";
import LanguageSafety from "./LanguageSafety";
import { form, nav, video } from "motion/react-client";
import MediaAssets from "./MediaAssets";
import Policy from "./Policy";
import CustomerPreparation from "./CustomerPreperation";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useJsApiLoader } from "@react-google-maps/api";
import { createTourStepEight, createTourStepFive, createTourStepFour, createTourStepNine, createTourStepOne, createTourStepSeven, createTourStepSix, createTourStepTen, createTourStepThree, createTourStepTwo } from "../../api/userService";
import { toast } from "react-toastify";
import moment from "moment";
import { setTourResponse } from "../../redux/ReducerDataHandle";

const libraries = ["places"];

const CreateProduct = () => {
     const { tourResponse} = useSelector((state) => state.ReducerDataHandle);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingStates, setLoadingStates] = useState(false);
  const [countryList, setcountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [phoneCodeList, setPhoneCodeList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [tourCategoriesList, setTourCategoriesList] = useState([]);
  const [returnResult, setReturnResult] = useState(null);
  const [profileformData, setProfileformData] = useState({
    tourtitle: "",
    tagline: "",
    tourCategory: "",
    tourTags: [],
    country: "",
    state: "",
    city: "",
    landmark: "",

    fullTourDescription: "",
    whatyoudo: "",
    keyhighlights: "",
    tourunique: "",

    overview: "",
    pointsofinterest: [],
    durationHours: "",

    mettingName: "",
    mettingAddress: "",
    latlatitude: "",
    longitude: "",
    endPoint: "",
    pickupOfferd: false,
    pickupDetails: "",

    totalDuraion: "",
    durationUnit: "minutes",
    operatingTimeSlots: [],
    startTime: "",
    operatingDays: [],
    seasonalAvailability: "",
    seasonStartDate: "",
    seasonEndDate: "",
    blackoutDates: "",
    minimumTravellers: "",
    maximumGroupSize: "",

    tourPrice: "",
    entryTicket: true,
    ticketIncludeTourPrice: false,
    adultTicketPrice: "",
    childTicketPrice: "",
    infantTicketPrice: "",
    currency: "",

    whatsInclude: "",
    whatsExclude: "",
    optionalAddons: "",

    skipInlineAccess: false,
    physicalLevel: "",
    minageRestriction: "10",
    maxageRestriction: "80",
    accessibilityOptions: [],
    notSuitableFor: [],

    tourLanguage: [],
    liveGuide: true,
    safetyInstructions: "",
    fitnessLevel: "",
    permitDecleartion: false,
    insuranceDecleartion: false,

    coverImage: null,
    galleryImages: [],
    videoUrl: "",
    imageConfirmation: false,

    cancelelationPolicy: "",
    cancellation_cutoff: "",
    noshowPolicy: "",
    wetherPolicy: "",

    whatBring: "",
    dressCode: "",
    importantNotes: "",



  });

  let dispatch = useDispatch();
  let navigate = useNavigate();
console.log("tourResponse", profileformData)

const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: "AIzaSyAgKRGF-rKCWYY6yzrzEMCn6GEzrqTjbrM",
  libraries,
});


  useEffect(() => {
    GetCountry();
    Getlanguage();
    GetTourCategories();
  }, []);

  const updateProfileFormData = async (field, value) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;

    setProfileformData((prev) => ({ ...prev, [field]: value }));

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
        let arr = [];
        res?.data?.data?.forEach((item) => {
          arr.push({
            value: item?.id,
            label: item?.name,
          });
        });
        setStateList(arr || []);
      }

      //  STATE → CITIES
      if (field === "state" && selectedValue?.value) {
        setLoadingStates(true);
        setCityList([]);

        const res = await getCityByState(selectedValue.value);

        let arr = [];
        res?.data?.data?.forEach((item) => {
          arr.push({
            value: item?.id,
            label: item?.name,
          });
        });
        setCityList(arr || []);
      }
    } catch (err) {
      console.error("Location fetch failed", err);
    } finally {
      setLoadingStates(false);
      setLoadingStates(false);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!profileformData.tourtitle?.trim())
          newErrors.tourtitle = "Tour title is required";
        if (!profileformData.tourCategory)
          newErrors.tourCategory = "Tour category is required";
        if (profileformData.tourTags?.length === 0)
          newErrors.tourTags = "Tour tags is required";

        if (!profileformData.country) newErrors.country = "Country is required";
        if (!profileformData.state) newErrors.state = "State is required";
        if (!profileformData.city) newErrors.city = "City is required";
        if (!profileformData.landmark)
          newErrors.landmark = "Landmark is required";

        break;
      case 2:
        if (!profileformData.fullTourDescription)
          newErrors.fullTourDescription = "Full tour description is required";
        if (!profileformData.whatyoudo)
          newErrors.whatyoudo = "What you do is required";
        if (!profileformData.keyhighlights)
          newErrors.keyhighlights = "Key highlights is required";

        break;
      case 3:
        if (!profileformData.overview)
          newErrors.overview = "Overview is required";
        if (profileformData.pointsofinterest.length === 0)
          newErrors.pointsofinterest = "Points of interest is required";

        break;
      case 4:
        if (!profileformData.mettingName)
          newErrors.mettingName = "Meeting name is required";
        if (!profileformData.mettingAddress)
          newErrors.mettingAddress = "Meeting address is required";
        if (profileformData.pickupOfferd === true)
          if (!profileformData.pickupDetails)
            newErrors.pickupDetails = "Pickup details is required";
        break;
      case 5:
        if (!profileformData.totalDuraion)
          newErrors.totalDuraion = "Total duration is required";
        
        if (!profileformData.minimumTravellers)
          newErrors.minimumTravellers = "Minimum travellers is required";
        if (!profileformData.maximumGroupSize)
          newErrors.maximumGroupSize = "Maximum group size is required";
        break;
      case 6:
        if(profileformData.ticketIncludeTourPrice === false){
          
        if (!profileformData.tourPrice)
          newErrors.tourPrice = "Tour price is required";
         if (!profileformData.currency)
          newErrors.currency = "Currency is required";
        }
        if (profileformData.entryTicket === true) {
          if (!profileformData.adultTicketPrice)
            newErrors.adultTicketPrice = "Adult ticket price is required";
          if (!profileformData.childTicketPrice)
            newErrors.childTicketPrice = "Child ticket price is required";
        }

        break;
      case 7:
        if (!profileformData.whatsInclude)
          newErrors.whatsInclude = "What's included is required";
        if (!profileformData.whatsExclude)
          newErrors.whatsExclude = "What's excluded is required";
          if (!profileformData.physicalLevel)
          newErrors.physicalLevel = "Physical level is required";
        break;
      case 8:
             if (profileformData.tourLanguage.length === 0)
          newErrors.tourLanguage = "Tour language is required";

        if (!profileformData.safetyInstructions)
          newErrors.safetyInstructions = "Safety instructions is required";
        if (!profileformData.permitDecleartion)
          newErrors.permitDecleartion = "Permit decleartion is required";
        if (!profileformData.insuranceDecleartion)
          newErrors.insuranceDecleartion = "Insurance decleartion is required";
        break;
      case 9:
        if (!profileformData.coverImage)     
              newErrors.coverImage = "Cover image is required";
            if(!profileformData.imageConfirmation)
              newErrors.imageConfirmation = "Image confirmation is required";
        break;
        case 10:
        if (!profileformData.cancelelationPolicy)     
              newErrors.cancelelationPolicy = "Cancellation policy is required";
            if(!profileformData.cancellation_cutoff)
              newErrors.cancellation_cutoff = "Cancellation cutoff is required";
            if (!profileformData.whatBring)     
              newErrors.whatBring = "What to bring is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextContinue = () => {

    if (validateStep(currentStep)) {
        if(currentStep === 1){
        SubmitStepOne()
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
        if(currentStep === 7){      
        SubmitSevenRegister()
      }
        if(currentStep === 8){
        SubmitEightRegister()
      }
        if(currentStep === 9){
        SubmitNineRegister()
      }
      
    }
  };

  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    setCurrentStep((prev) => Math.min(prev + 1, 10));
  };

  const GetCountry = async () => {
    try {
      const res = await country();
      if (res?.data?.success) {
        let CountryArr = [];
        let CurrencyArr = [];
        let codeArr = [];

        res?.data?.data?.forEach((item) => {
          CountryArr.push({
            value: item?.id,
            label: item?.name,
          });
          CurrencyArr.push({
            value: item?.currency,
            label: item?.currency,
          });
          codeArr.push({
            value: item?.phone_code,
            label: "+" + item?.phone_code,
          });
        });
        setcountryList(CountryArr);
        setCurrencyList(CurrencyArr);
        setPhoneCodeList(codeArr);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const Getlanguage = async () => {
    try {
      const res = await language();
      if (res?.data?.success) {
        let arr = [];
        res?.data?.data?.forEach((item) => {
          arr.push({
            value: item?.id,
            label: item?.name,
          });
        });
        setLanguageList(arr);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

    const GetTourCategories = async () => {
    try {
      const res = await tourCategories();
      if (res?.data?.success) {
        let arr = [];
        res?.data?.data?.forEach((item) => {
          arr.push({
            value: item?.id,
            label: item?.name,
          });
        });
        setTourCategoriesList(arr);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  function GetId(arr){
  return  Array.isArray(arr) ? arr[0]?.value : arr;
}

// Step One
  const SubmitStepOne = async () => {
  
    setIsSubmitting(true)

    let payload ={
      "title": profileformData.tourtitle,
      "subtitle": profileformData.tagline,
      "tour_category_id": GetId(profileformData.tourCategory),
      "country_id":GetId(profileformData.country) ,
      "state_id": GetId(profileformData.state),
      "city_id": GetId(profileformData.city),
      "place": profileformData.landmark,
      "tags": profileformData.tourTags.map((item) => item.value),

    }

  try {
    const res = await createTourStepOne(payload);
      setIsSubmitting(false)
    if(res?.data?.success){
       dispatch(setTourResponse(res?.data?.data));
      setReturnResult(res?.data?.data)
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

// Step Two
  const SubmitTwoRegister = async () => {
  
    setIsSubmitting(true)

  let payload = {
  "tour_id": tourResponse?.tour_id || returnResult?.tour_id,
  "full_description": profileformData.fullTourDescription,
  "what_you_will_do": profileformData.whatyoudo,
  "key_highlights": profileformData.keyhighlights,
  "unique_points": profileformData.tourunique
}

  try {
    const res = await createTourStepTwo(payload);
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

// Step Three
  const SubmitThreeRegister = async () => {
  
    setIsSubmitting(true)

  let payload = {
  "tour_id": tourResponse?.tour_id || returnResult?.tour_id,
  "overview": profileformData.overview,
  "stops": profileformData.pointsofinterest,
}

  try {
    const res = await createTourStepThree(payload);
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

  let payload = {
  "tour_id": tourResponse?.tour_id || returnResult?.tour_id,
  "meeting_point_name": profileformData.mettingName,
  "meeting_point_address": profileformData.mettingAddress,
  "meeting_point_latitude": profileformData.latlatitude,
  "meeting_point_longitude": profileformData.longitude,
  "end_point": profileformData.endPoint,
  "pickup_offered": profileformData.pickupOfferd,
  "pickup_details": profileformData.pickupDetails,
}

  try {
    const res = await createTourStepFour(payload);
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
// Step Five
  const SubmitFiveRegister = async () => {

  
    setIsSubmitting(true)

    let Arr = []

    profileformData.operatingTimeSlots.forEach((item) => {
      Arr.push({  
        start_time: moment(item?.start_time).format("HH:mm"),
        operating_day: item?.operating_day,
      })
    })

  let payload = {
   "tour_id": tourResponse?.tour_id || returnResult?.tour_id,
  "duration": profileformData.totalDuraion,
  "duration_type": profileformData.durationUnit,
  "operating_time_slots": Arr,
  "season_start_date": profileformData.seasonStartDate ? moment(profileformData.seasonStartDate).format("YYYY-MM-DD") : null,
  "season_end_date": profileformData.seasonEndDate ? moment(profileformData.seasonEndDate).format("YYYY-MM-DD") : null,
  "minimum_travelers": profileformData.minimumTravellers,
  "maximum_group_size": profileformData.maximumGroupSize,
}

  try {
    const res = await createTourStepFive(payload);
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

    let Arr = []

    profileformData.operatingTimeSlots.forEach((item) => {
      Arr.push({  
        start_time: moment(item?.start_time).format("HH:mm"),
        operating_day: item?.operating_day,
      })
    })

  let payload = {
 "tour_id": tourResponse?.tour_id || returnResult?.tour_id,
  "price": profileformData.tourPrice,
  "ticket_required": profileformData.entryTicket,
  "currency" : GetId(profileformData.currency),
  "ticket_included": profileformData.ticketIncludeTourPrice,
  "adult_price": profileformData.adultTicketPrice,
  "child_price": profileformData.childTicketPrice,
  "infant_price": profileformData.infantTicketPrice,
}

  try {
    const res = await createTourStepSix(payload);
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

// Step Seven
  const SubmitSevenRegister = async () => {
    setIsSubmitting(true)

   let Arr = []

    profileformData.accessibilityOptions?.forEach((item) => {
      Arr.push(item.value)
    }
    )

    let Arr2 = []

    profileformData.notSuitableFor?.forEach((item) => {
      Arr2.push(item.value)
    }
    )


  let payload = {
  "tour_id": tourResponse?.tour_id || returnResult?.tour_id,
  "included": profileformData.whatsInclude,
  "excluded": profileformData.whatsExclude,
  "optional_addons": profileformData.optionalAddons,
  "skip_the_line_access": profileformData.skipInlineAccess,
  "difficulty_level": profileformData.physicalLevel,
  "minage_restriction": profileformData.minageRestriction,
  "maxage_restriction": profileformData.maxageRestriction,
  "accessibility_options": Arr,
  "not_suitable_for": Arr2,
}


  try {
    const res = await createTourStepSeven(payload);
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


// Step Eight
  const SubmitEightRegister = async () => {
    setIsSubmitting(true)

   var arr = []
   profileformData.tourLanguage?.forEach((item) => {
    arr.push(item.value)
   })

  let payload = {
  "tour_id": tourResponse?.tour_id || returnResult?.tour_id,
  "language_ids": arr,
  "is_live_guide": profileformData.liveGuide,
  "safety_instructions": profileformData.safetyInstructions,
  "fitness_requirements": profileformData.fitnessLevel,
  "permit_declared": profileformData.permitDecleartion,
  "insurance_declared": profileformData.insuranceDecleartion,
}


  try {
    const res = await createTourStepEight(payload);
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

// Step Nine
  const SubmitNineRegister = async () => {


    setIsSubmitting(true)

   const formData = new FormData();
      formData.append("tour_id", tourResponse?.tour_id || returnResult?.tour_id);
      formData.append("cover_image", profileformData.coverImage);
      {profileformData.galleryImages?.forEach((file, index) => {
        formData.append(`gallery_images`, file);
      } )}

      formData.append("video_url", profileformData.videoUrl);
      formData.append("image_rights_confirmation", profileformData.imageConfirmation);

  try {
    const res = await createTourStepNine(formData);
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

// Step Ten & Final
  const SubmitTenRegister = async () => {
if (validateStep(currentStep)) {

    setIsSubmitting(true)
  let payload = {
  "tour_id": tourResponse?.tour_id || returnResult?.tour_id,
  "cancellation_policy": profileformData.cancelelationPolicy,
  "cancellation_cutoff": profileformData.canceletionCutoff,
  "no_show_policy": profileformData.noshowPolicy,
  "weather_policy": profileformData.wetherPolicy,
  "refund_policy": profileformData.whatBring,
  "reschedule_policy": "",
  "what_to_bring": profileformData.whatBring,
  "dress_code": profileformData.dressCode,
  "important_notes": profileformData.importantNotes,
}

  try {
    const res = await createTourStepTen(payload);
      setIsSubmitting(false)
    if(res?.data?.success){
      toast.success("Tour created successfully")
      navigate("/product")
    } else {
      toast.error(res?.data?.message)
    }

  } catch (err) {
     setIsSubmitting(false)
     console.log(err)
     toast.error(err?.response?.data?.message)
  }
}
};

   



useEffect(()=>{

  if(tourResponse !== '' && tourResponse !== null){
  let Stepcount = tourResponse?.completed_steps
   setCompletedSteps((prev) => new Set([...prev, Stepcount]));
   setCurrentStep((prev) => Math.min(Stepcount + 1, 10));
  }

},[tourResponse])



    if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="comon-lauout">
      <h5>Create Product</h5>
      <StepIndicator
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
      <div className="Register-form">
        
        {currentStep === 1 && (
          <TourInformation
            data={{
              tourtitle: profileformData.tourtitle,
              tagline: profileformData.tagline,
              tourCategory: profileformData.tourCategory,
              tourTags: profileformData.tourTags,
              country: profileformData.country,
              state: profileformData.state,
              city: profileformData.city,
              landmark: profileformData.landmark,
            }}
            onChange={updateProfileFormData}
            countryList={countryList}
            phoneCodeList={phoneCodeList}
            languageList={languageList}
            stateList={stateList}
            cityList={cityList}
            tourCategoriesList={tourCategoriesList}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <TourDescription
            data={{
              fullTourDescription: profileformData.fullTourDescription,
              whatyoudo: profileformData.whatyoudo,
              keyhighlights: profileformData.keyhighlights,
              tourunique: profileformData.tourunique,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
        )}
        {currentStep === 3 && (
          <Itinery
            data={{
              overview: profileformData.overview,
              pointsofinterest: profileformData.pointsofinterest,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
        )}
        {currentStep === 4 && (
          <Mettings
            data={{
              mettingName: profileformData.mettingName,
              mettingAddress: profileformData.mettingAddress,
              latlatitude: profileformData.latlatitude,
              longitude: profileformData.longitude,
              endPoint: profileformData.endPoint,
              pickupOfferd: profileformData.pickupOfferd,
              pickupDetails: profileformData.pickupDetails,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
        )}
        {currentStep === 5 && (
          <Duration
            data={{
              totalDuraion: profileformData.totalDuraion,
              startTime: profileformData.startTime,
              durationUnit: profileformData.durationUnit,
              operatingTimeSlots: profileformData.operatingTimeSlots,
              operatingDays: profileformData.operatingDays,
              seasonStartDate: profileformData.seasonStartDate,
              seasonEndDate: profileformData.seasonEndDate,
              seasonalAvailability: profileformData.seasonalAvailability,
              blackoutDates: profileformData.blackoutDates,
              minimumTravellers: profileformData.minimumTravellers,
              maximumGroupSize: profileformData.maximumGroupSize,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
        )}
        {currentStep === 6 && (
          <PricingTicket
            data={{
              tourPrice: profileformData.tourPrice,
              entryTicket: profileformData.entryTicket,
              ticketIncludeTourPrice: profileformData.ticketIncludeTourPrice,
              adultTicketPrice: profileformData.adultTicketPrice,
              childTicketPrice: profileformData.childTicketPrice,
              infantTicketPrice: profileformData.infantTicketPrice,
              currency: profileformData.currency,
            }}
            onChange={updateProfileFormData}
            errors={errors}
            currencyList={currencyList}
          />
        )}
        {currentStep === 7 && (
          <Inclution
            data={{
              whatsInclude: profileformData.whatsInclude,
              whatsExclude: profileformData.whatsExclude,
              optionalAddons: profileformData.optionalAddons,
                skipInlineAccess: profileformData.skipInlineAccess,
              physicalLevel: profileformData.physicalLevel,
              minageRestriction: profileformData.minageRestriction,
              maxageRestriction: profileformData.maxageRestriction,
              accessibilityOptions: profileformData.accessibilityOptions,
              notSuitableFor: profileformData.notSuitableFor,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
        )}
     
        {currentStep === 8 && (
          <LanguageSafety
            data={{
              tourLanguage: profileformData.tourLanguage,
              liveGuide: profileformData.liveGuide,
              safetyInstructions: profileformData.safetyInstructions,
              fitnessLevel: profileformData.fitnessLevel,
              permitDecleartion: profileformData.permitDecleartion,
              insuranceDecleartion: profileformData.insuranceDecleartion,
            }}
            onChange={updateProfileFormData}
            languageList={languageList}
            errors={errors}
          />
        )}
         {currentStep === 9 && (
          <MediaAssets
            data={{
              coverImage: profileformData.coverImage,
              galleryImages: profileformData.galleryImages,
              videoUrl: profileformData.videoUrl,
              imageConfirmation: profileformData.imageConfirmation, 
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
         )}
         {currentStep === 10 && (
          <Policy
            data={{
              cancelelationPolicy: profileformData.cancelelationPolicy,              
              cancellation_cutoff: profileformData.cancellation_cutoff,
              noshowPolicy: profileformData.noshowPolicy,
              wetherPolicy: profileformData.wetherPolicy,
              whatBring: profileformData.whatBring,
              dressCode: profileformData.dressCode,
              importantNotes: profileformData.importantNotes,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
         )}
   
      </div>
      <div className="form-button">
        <button disabled={true} className="back-bttn">
          <IoIosArrowBack /> Back
        </button>

        {currentStep < 10 ? (
          <button
            disabled={isSubmitting}
            onClick={handleNextContinue}
            className="next-bttn"
          >
            {isSubmitting ? "Loading.." : "Save & next"}
            <IoIosArrowForward />
          </button>
        ) : (
          <button className="next-bttn" disabled={isSubmitting} onClick={()=>SubmitTenRegister()}>
            {isSubmitting ? "Loading.." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
