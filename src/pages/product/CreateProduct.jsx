import React, { useEffect, useState } from "react";
import StepIndicator from "./StepIndicator";
import TourInformation from "./TourInformation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  country,
  getCityByState,
  getStatesByCountry,
  language,
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
import { video } from "motion/react-client";
import MediaAssets from "./MediaAssets";
import Policy from "./Policy";
import CustomerPreparation from "./CustomerPreperation";

const CreateProduct = () => {
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
    mapsLink: "",
    endPoint: "",
    pickupOfferd: false,
    pickupDetails: "",

    totalDuraion: "",
    startTime: "",
    operatingDays: [],
    seasonalAvailability: "",
    blackoutDates: "",
    minimumTravellers: "",
    maximumGroupSize: "",

    tourPrice: "",
    entryTicket: true,
    ticketIncludeTourPrice: false,
    adultTicketPrice: "",
    childTicketPrice: "",
    infantTicketPrice: "",

    whatsInclude: "",
    whatsExclude: "",
    optionalAddons: "",

    skipInlineAccess: false,
    physicalLevel: "",
    ageRestriction: "",
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
    canceletionCutoff: "",
    noshowPolicy: "",
    wetherPolicy: "",

    whatBring: "",
    dressCode: "",
    importantNotes: "",



  });

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    GetCountry();
    Getlanguage();
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
        if (!profileformData.mapsLink)
          newErrors.mapsLink = "Maps link is required";
        if (profileformData.pickupOfferd === true)
          if (!profileformData.pickupDetails)
            newErrors.pickupDetails = "Pickup details is required";
        break;
      case 5:
        if (!profileformData.totalDuraion)
          newErrors.totalDuraion = "Total duration is required";
        if (!profileformData.startTime)
          newErrors.startTime = "Start time is required";
        if (profileformData.operatingDays.length === 0)
          newErrors.operatingDays = "Operating days is required";

        if (!profileformData.minimumTravellers)
          newErrors.minimumTravellers = "Minimum travellers is required";
        if (!profileformData.maximumGroupSize)
          newErrors.maximumGroupSize = "Maximum group size is required";
        break;
      case 6:
        if (!profileformData.tourPrice)
          newErrors.tourPrice = "Tour price is required";
        if (profileformData.entryTicket === true) {
          if (!profileformData.adultTicketPrice)
            newErrors.adultTicketPrice = "Adult ticket price is required";
        }

        break;
      case 7:
        if (!profileformData.whatsInclude)
          newErrors.whatsInclude = "What's included is required";
        if (!profileformData.whatsExclude)
          newErrors.whatsExclude = "What's excluded is required";
        break;
      case 8:
        if (!profileformData.physicalLevel)
          newErrors.physicalLevel = "Physical level is required";
        break;
      case 9:
        if (profileformData.tourLanguage.length === 0)
          newErrors.tourLanguage = "Tour language is required";
        if (!profileformData.safetyInstructions)
          newErrors.safetyInstructions = "Safety instructions is required";
        if (!profileformData.permitDecleartion)
          newErrors.permitDecleartion = "Permit decleartion is required";
        if (!profileformData.insuranceDecleartion)
          newErrors.insuranceDecleartion = "Insurance decleartion is required";
        break;
        case 10:
          if (!profileformData.coverImage)     
              newErrors.coverImage = "Cover image is required";
            if(!profileformData.imageConfirmation)
              newErrors.imageConfirmation = "Image confirmation is required";
        break;

         case 11:
          if (!profileformData.cancelelationPolicy)     
              newErrors.cancelelationPolicy = "Cancellation policy is required";
            if(!profileformData.canceletionCutoff)
              newErrors.canceletionCutoff = "Cancellation cutoff is required";
        break;

        case 12:
          if (!profileformData.whatBring)     
              newErrors.whatBring = "What to bring is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextContinue = () => {
    handleNextStep();
    return;
    if (validateStep(currentStep)) {
      handleNextStep();
    }
  };

  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    setCurrentStep((prev) => Math.min(prev + 1, 15));
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
              durationHours: profileformData.durationHours,
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
              mapsLink: profileformData.mapsLink,
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
              operatingDays: profileformData.operatingDays,
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
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
        )}
        {currentStep === 7 && (
          <Inclution
            data={{
              whatsInclude: profileformData.whatsInclude,
              whatsExclude: profileformData.whatsExclude,
              optionalAddons: profileformData.optionalAddons,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
        )}
        {currentStep === 8 && (
          <Access
            data={{
              skipInlineAccess: profileformData.skipInlineAccess,
              physicalLevel: profileformData.physicalLevel,
              ageRestriction: profileformData.ageRestriction,
              accessibilityOptions: profileformData.accessibilityOptions,
              notSuitableFor: profileformData.notSuitableFor,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
        )}
        {currentStep === 9 && (
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
         {currentStep === 10 && (
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
         {currentStep === 11 && (
          <Policy
            data={{
              cancelelationPolicy: profileformData.cancelelationPolicy,
              canceletionCutoff: profileformData.canceletionCutoff,
              noshowPolicy: profileformData.noshowPolicy,
              wetherPolicy: profileformData.wetherPolicy,
            }}
            onChange={updateProfileFormData}
            errors={errors}
          />
         )}
         {currentStep === 12 && (
          <CustomerPreparation
            data={{
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

        {currentStep < 12 ? (
          <button
            disabled={isSubmitting}
            onClick={handleNextContinue}
            className="next-bttn"
          >
            {isSubmitting ? "Loading.." : "Save & next"}
            <IoIosArrowForward />
          </button>
        ) : (
          <button className="next-bttn" disabled={isSubmitting}>
            {isSubmitting ? "Loading.." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
