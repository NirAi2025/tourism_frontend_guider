import React, { use, useEffect, useRef, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { getToursDetails } from '../../api/userService';
import { useParams } from 'react-router-dom';
import { country, getCityByState, getStatesByCountry, language, tourCategories } from '../../api/authService';
import { Col, InputGroup, Row } from 'react-bootstrap';
import Select from 'react-dropdown-select';
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import DatePicker from 'react-datepicker';
import moment from 'moment';
const libraries = ["places"];


const ViewProduct = () => {
  const [countryList, setcountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [phoneCodeList, setPhoneCodeList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [tourCategoriesList, setTourCategoriesList] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState(false);
  const [loadingTourCategories, setLoadingTourCategories] = useState(false);
  const [errors, setErrors] = useState({});
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
    minageRestriction: "",
    maxageRestriction: "",
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
  const [data, setData] = useState({})

const autocompleteRef = useRef(null);

 const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  console.log("data", data)

let {id} = useParams()
const tourId = id


const getTourDetails = async () => {
  try {
    const res = await getToursDetails(tourId);
    if (res?.data?.success) {
      var tourData = res?.data?.data;
      setData(tourData);
      GetState(tourData.country_id);
      getCity(tourData.state_id);
    }
    } catch (err) {
    }
}      

useEffect(() => {
    getTourDetails()
    GetTourCategories()
    GetCountry()
    Getlanguage()
},[])

const GetState = async (countryId) => {
    try {
      const res = await getStatesByCountry(countryId);
      let arr = [];
      res?.data?.data?.forEach((item) => {
        arr.push({
          value: item?.id,
          label: item?.name,
        });
      }
      );
      setStateList(arr);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCity = async (stateId) => {
    try {
      const res = await getCityByState(stateId);
      let arr = [];
      res?.data?.data?.forEach((item) => {
        arr.push({
          value: item?.id,
          label: item?.name,
        });
      });
      setCityList(arr);
    } catch (err) {
      console.error(err.message);
    }
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

    const updateProfileFormData = async (field, value) => {
      const selectedValue = Array.isArray(value) ? value[0] : value;
  
      setProfileformData((prev) => ({ ...prev, [field]: value }));
  
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
  //  try {
  //       //  COUNTRY → STATES
  //       if (field === "country") {
  //         setLoadingStates(true);
  //         setStateList([]);
  //         setCityList([]);
  
  //         const res = await getStatesByCountry(selectedValue?.value);
  //         let arr = [];
  //         res?.data?.data?.forEach((item) => {
  //           arr.push({
  //             value: item?.id,
  //             label: item?.name,
  //           });
  //         });
  //         setStateList(arr || []);
  //       }
  
  //       //  STATE → CITIES
  //       if (field === "state" && selectedValue?.value) {
  //         setLoadingStates(true);
  //         setCityList([]);
  
  //         const res = await getCityByState(selectedValue.value);
  
  //         let arr = [];
  //         res?.data?.data?.forEach((item) => {
  //           arr.push({
  //             value: item?.id,
  //             label: item?.name,
  //           });
  //         });
  //         setCityList(arr || []);
  //       }
  //     } catch (err) {
  //       console.error("Location fetch failed", err);
  //     } finally {
  //       setLoadingStates(false);
  //       setLoadingCities(false);
  //     }
     
    };

  function GetId(arr){
  return  Array.isArray(arr) ? arr[0]?.value : arr;
}

  var tagOptions = [
    { value: 'history', label: 'History' },
    { value: 'food', label: 'Food' },
    { value: 'nature', label: 'Nature' },
  ]

  const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: "AIzaSyAgKRGF-rKCWYY6yzrzEMCn6GEzrqTjbrM",
  libraries,
});

const selectedTagValues =
  data.tour_tag_maps?.map(tag => ({
    value: tag.tour_tag.name,
    label: tag.tour_tag.name
  })) || [];

  const selectedLanguageValues =
  data.tour_languages?.map(lang => ({
    value: lang?.language?.id,
    label: lang?.language?.name
  })) || [];


  const selectedAccessibilityValues =
   data?.accessibility_options?.split(',')?.map(access => ({
    value: access,
    label: access
  })) || [];

    const selectednotsuitableValues =
   data?.not_suitable_for?.split(',')?.map(access => ({
    value: access,
    label: access
  })) || [];


   const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    console.log("Selected address:", place);
    getLatlong(place.formatted_address);
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
     
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  };


  const accessibilityOptions = [
    { value: 'wheelchair', label: 'Wheelchair Accessible' },
    { value: 'hearing', label: 'Hearing Assistance Available' },
    { value: 'visual', label: 'Visual Assistance Available' },
    { value: 'mobility', label: 'Mobility Assistance Available' },
  ]

    const suitabilityOptions = [
    { value: 'pregnant', label: 'Pregnant Individuals' },
    { value: 'heart', label: 'Heart Conditions' },
    { value: 'respiratory', label: 'Respiratory Issues' },
    { value: 'mobility', label: 'Mobility Impairments' },
  ]




   if (!isLoaded) return <div>Loading...</div>;

  return (
        <div className='comon-lauout'>
      <h5>View Product</h5>
      <div className='split-card'>
        
        <div className='split-card-body'> 
               <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Basic Tour Information</Accordion.Header>
        <Accordion.Body>
          <Row>
             <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Tour Title <span className='atrisk'>*</span></label>
                              <input 
                              value={data.title ?? ""}
                            // onChange={(e) => updateProfileFormData("tourtitle", e.target.value)}
                             className={
                                errors.tourtitle
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Customer-facing tour name' />
                              {errors.tourtitle && (
                              <p className="text-sm text-destructive">{errors.tourtitle}</p>
                            )}
                            </div>
                        </Col>
                   <Col lg={4} md={6}>
                    <div className='form-group'>
                      <label>Tour Subtitle / Tagline</label>
                      <input
                      value={data.subtitle ?? ""}
                    onChange={(e) => updateProfileFormData("subtitle", e.target.value)}
                    className="form-control"
                      type='text' placeholder='Short marketing line' />
                    
                    </div>
                </Col>
                     <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Tour Category <span className='atrisk'>*</span></label>
                  <Select
           
                   className={
                    errors.tourCategory
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={tourCategoriesList}
                      labelField="label"
                    valueField="value"
                     searchable={true}
                    values={
                        data.tour_category_id
                          ? tourCategoriesList.filter(
                              item => item.value === data.tour_category_id
                            )
                          : []
                      }
                   // onChange={(value) => updateProfileFormData("tourCategory", value)}
                  />
                   {errors.tourCategory && (
                  <p className="text-sm text-destructive">{errors.tourCategory}</p>
                )}
                </div>
            </Col>
              <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Tour Tags <span className='atrisk'>*</span></label>
                  <Select
                  values={selectedTagValues}
                  multi
                  className={
                    errors.tourTags
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={tagOptions}
                   // onChange={(value) =>handlemultilang(value)}
                  />
                   {errors.tourTags && (
                  <p className="text-sm text-destructive">{errors.tourTags}</p>
                )}
                </div>
            </Col>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Country <span className='atrisk'>*</span></label>
                  <Select
                   className={
                    errors.country
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={countryList}
                      labelField="label"
                    valueField="value"
                     searchable={true}
                    values={
                        data.country_id
                          ? countryList.filter(
                              item => item.value === data.country_id
                            )
                          : []
                      }
                   // onChange={(value) => onChange("country", value)}
                  />
                   {errors.country && (
                  <p className="text-sm text-destructive">{errors.country}</p>
                )}
                </div>
            </Col>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>State <span className='atrisk'>*</span></label>
                  <Select
                   className={
                    errors.state
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={stateList}
                      labelField="label"
                    valueField="value"
                     values={
                        data.state_id
                          ? stateList.filter(
                              item => item.value === data.state_id
                            )
                          : []
                      }
                   // onChange={(value) => onChange("state", value)}
                     disabled={loadingStates || !stateList.length}
                     placeholder={loadingStates ? "Loading states..." : "Select State"}
                  />
                   {errors.state && (
                  <p className="text-sm text-destructive">{errors.state}</p>
                )}
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>City <span className='atrisk'>*</span></label>
                  <Select
                   className={
                    errors.city
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={cityList}
                      labelField="label"
                    valueField="value"
                    values={
                        data.city_id
                          ? cityList.filter(
                              item => item.value === data.city_id
                            )
                          : []
                      }
                 //   onChange={(value) => onChange("city", value)}
                     disabled={loadingStates || !cityList.length}
                     placeholder={loadingStates ? "Loading city..." : "Select City"}
                  />
                 
                   {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
                </div>
            </Col>
             <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Landmark/Place <span className='atrisk'>*</span></label>
                    <input 
                              value={data.place ?? ""}
                            // onChange={(e) => onChange("place", e.target.value)}
                             className={
                                errors.place
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Place' />
                 
                 
                   {errors.place && (
                  <p className="text-sm text-destructive">{errors.place}</p>
                )}
                </div>
            </Col>
            </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Tour Description & Content </Accordion.Header>
        <Accordion.Body>
            <Row>
                     <Col lg={12} md={12}>
                                    <div className='form-group'>
                                      <label>Full Tour Description  <span className='atrisk'>*</span></label>
                                      <textarea 
                                      value={data.full_description ?? ""}
                                
                                     className={
                                        errors.full_description
                                          ? "border-line form-control"
                                          : "form-control"
                                      }
                                      type='text'  placeholder='Complete experience description' />
                                      {errors.full_description && (
                                      <p className="text-sm text-destructive">{errors.full_description}</p>
                                    )}
                                    </div>
                                </Col>
                                 <Col lg={12} md={12}>
                                    <div className='form-group'>
                                      <label>What You’ll Do  <span className='atrisk'>*</span></label>
                                      <textarea 
                                      value={data.what_you_will_do ?? ""}
                                
                                     className={
                                        errors.what_you_will_do
                                          ? "border-line form-control"
                                          : "form-control"
                                      }
                                      type='text'  placeholder='Step-by-step overview' />
                                      {errors.what_you_will_do && (
                                      <p className="text-sm text-destructive">{errors.what_you_will_do}</p>
                                    )}
                                    </div>
                                </Col>
                                 <Col lg={12} md={12}>
                                    <div className='form-group'>
                                      <label>Key Highlights   <span className='atrisk'>*</span></label>
                                      <textarea 
                                      value={data.key_highlights ?? ""}
                               
                                     className={
                                        errors.key_highlights
                                          ? "border-line form-control"
                                          : "form-control"
                                      }
                                      type='text'  placeholder='Key highlights of the tour' />
                                      {errors.key_highlights && (
                                      <p className="text-sm text-destructive">{errors.key_highlights}</p>
                                    )}
                                    </div>
                                </Col>
                                <Col lg={12} md={12}>
                                    <div className='form-group'>
                                      <label>What Makes This Tour Unique </label>
                                      <textarea 
                                      value={data.unique_points ?? ""}
                             
                                     className="form-control"
                                      type='text'  placeholder='Differentiator' />
                                     
                                    </div>
                                </Col>
                            </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Itinerary & Stops</Accordion.Header>
        <Accordion.Body>
                 <Row>
                            <Col lg={12} md={12}>
                                           <div className='form-group'>
                                             <label>Itinerary Overview <span className='atrisk'>*</span></label>
                                             <textarea 
                                             value={data?.tour_itinerary?.overview ?? ""}
                                         
                                            className={
                                               errors.tour_itinerary?.overview
                                                 ? "border-line form-control"
                                                 : "form-control"
                                             }
                                             type='text'  placeholder='Complete experience description' />
                                             {errors.tour_itinerary?.overview && (
                                             <p className="text-sm text-destructive">{errors.tour_itinerary?.overview}</p>
                                           )}
                                           </div>
                                       </Col>
                                       <Col lg={12} md={12}>
                                           <div className='form-group'>
                                             <label>Stops / Points of Interest </label>
                                       
                                               {data?.tour_stops && data?.tour_stops?.map((item, index) => (
                                                        <Row key={index}>
                                                   <Col lg={3} md={3} >
                                                       <div className='point-interest-box'>
                                                           <div className='form-group'>    
                                                               <label>Name</label>
                                                               <input 
                                                               type='text' 
                                                               value={item.stop_name}
          
                                                               className='form-control' 
                                                               placeholder='Name of the stop' />   
                                                           </div>
                                                         
                                                          
                                                       </div>  
                                                   </Col>
                                                    <Col lg={4} md={4}>
                                                       <div className='point-interest-box'>
                                                          
                                                           <div className='form-group'>    
                                                               <label>Description</label>  
                                                               <input 
                                                               type='text' 
                                                               value={item.description}    
                                                    
                                                               className='form-control' 
                                                               placeholder='Brief description' />  
                                                           </div>
                                                        
                                                       </div>  
                                                   </Col>
                                                   <Col lg={2} md={2}>
                                                        <div className='form-group'>    
                                                               <label>Duration</label>  
                                                               <input 
                                                               type='text' 
                                                               value={item.duration}    
                                                              
                                                               className='form-control' 
                                                               placeholder='Duration in minutes' />  
                                                           </div>
                                                   </Col>
                                                   
                                                        </Row>
                                               ))} 
                                       
                                          
                                           
                                           </div>
                                       </Col>
                                      
                                   </Row>                     
        </Accordion.Body>
      </Accordion.Item>
       <Accordion.Item eventKey="3">
        <Accordion.Header>Meeting & Logistics </Accordion.Header>
        <Accordion.Body>
                  <Row>
             <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Meeting Point Name  <span className='atrisk'>*</span></label>
                              <input 
                              value={data.meeting_point_name ?? ""}
                          
                             className={
                                errors.meeting_point_name
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Public location name' />
                              {errors.meeting_point_name && (
                              <p className="text-sm text-destructive">{errors.meeting_point_name}</p>
                            )}
                            </div>
                        </Col>
                      
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Meeting Point Address  <span className='atrisk'>*</span></label>
                               
                                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                      <input
                                      value={data?.meeting_point_address}
                                        type="text"
                                        placeholder="Enter address"
                                        className={
                                          errors.meeting_point_address
                                                  ? "border-line form-control"
                                                  : "form-control"
                                              }
                                      />
                                    </Autocomplete>
                              
                            
                              {errors.meeting_point_address && (
                              <p className="text-sm text-destructive">{errors.meeting_point_address}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>End Point  <span className='atrisk'>*</span></label>
                              <input 
                              value={data.end_point ?? ""}
                        
                             className={
                                errors.end_point
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='url'  placeholder='Same / different' />
                              {errors.end_point && (
                              <p className="text-sm text-destructive">{errors.end_point}</p>
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
                                        name='pickup_offered'
                                        checked={data.pickup_offered === true}
                                 
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='pickup_offered'
                                        checked={data.pickup_offered === false}
                                    
                                            />
                                        <label className='form-check-label'>No</label>
                                    </div>
                                </div>
                              {errors.pickup_offered && (     
                                <p className="text-sm text-destructive">{errors.pickup_offered}</p>
                                )}  
                            </div>
                        </Col>
                          <Col lg={12} md={12}>
                                                    <div className='form-group'>
                                                      <label>Pickup Details  <span className='atrisk'>*</span></label>
                                                      <textarea 
                                                      value={data.pickup_details ?? ""}
                                                
                                                     className={
                                                        errors.pickup_details
                                                          ? "border-line form-control"
                                                          : "form-control"
                                                      }
                                                      type='text'  placeholder='Complete pickup details' />
                                                      {errors.pickup_details && (
                                                      <p className="text-sm text-destructive">{errors.pickup_details}</p>
                                                    )}
                                                    </div>
                                                </Col>
                         </Row>                               
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Duration, Timing, Availability & Capacity </Accordion.Header>
        <Accordion.Body>
           <Row>
             <Col lg={4} md={6}>
                <div className='form-group'>
                    <label>Total Duration  <span className='atrisk'>*</span></label>
                            <InputGroup >                           
                                  <input 
                              value={data.duration ?? ""}
                           
                             className={
                                errors.duration
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                             
                              type='text'  placeholder='Total duration' />
                              <select className='px-2'
                              value={data.duration_type}
                           
                              >
                                <option value="MINUTES">Minutes</option>
                                <option value="HOURS">Hours</option>  
                                <option value="DAYS">Days</option> 
                              </select>
                              
                            </InputGroup>
                               {errors.duration && (
                              <p className="text-sm text-destructive">{errors.duration}</p>
                            )}
                             </div>
                              
                        </Col>

                            <Col lg={12} md={12}>
                            {data?.tour_availabilities?.map((slot, index) => (
                                <Row key={index} className="align-items-center">
                                    <Col lg={4} md={4}>
                                        <div className='form-group'>
                                            <label>Start Time <span className='atrisk'>*</span></label>
                                           <span>{slot.start_time}</span>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4}>
                                        <div className='form-group'>  
                                        <label>Operating Days   <span className='atrisk'>*</span></label>
                                        <span>{moment(slot.available_date).format('DD-MM-YYYY')}</span>
                                    
                                        </div>  
                                    </Col>  
                                   
                                 
                                </Row>
                            ))} 
                            {errors.operatingTimeSlots && (
                              <p className="text-sm text-destructive">{errors.operatingTimeSlots}</p>
                            )}
                            </Col>
                        
                    
                
                 <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Seasonal Availability  </label>
                   <div className='d-flex gap-3 align-items-center'>
                    <div>
                            <label>Start Date</label>
                            <span>{data.season_start_date}</span>
                      </div>         
             <div>
                            <label>End Date</label>
                            <span>{data.season_end_date}</span>
                      </div> 
                
                </div>
                  </div>
            </Col>
        
            <Col lg={4} md={6}>
                                        <div className='form-group'>
                                          <label>Minimum Travelers <span className='atrisk'>*</span></label>
                                          <input 
                                          value={data.minimum_travelers ?? ""}
                                        
                                         className={
                                            errors.minimum_travelers
                                              ? "border-line form-control"
                                              : "form-control"
                                          }
                                          type='text'  placeholder='minimum travelers' />
                                          {errors.minimum_travelers && (
                                          <p className="text-sm text-destructive">{errors.minimum_travelers}</p>
                                        )}
                                        </div>
                                    </Col>
                                        <Col lg={4} md={6}>
                                        <div className='form-group'>
                                          <label>Maximum Group Size<span className='atrisk'>*</span></label>
                                          <input 
                                          value={data.maximum_group_size ?? ""}
                                     
                                         className={
                                            errors.maximum_group_size
                                              ? "border-line form-control"
                                              : "form-control"
                                          }
                                          type='text'  placeholder='maximum group size' />
                                          {errors.maximum_group_size && (
                                          <p className="text-sm text-destructive">{errors.maximum_group_size}</p>
                                        )}
                                        </div>
                                    </Col>
                                    
                        </Row>
        </Accordion.Body>
      </Accordion.Item>
       <Accordion.Item eventKey="5">
        <Accordion.Header>Pricing & Ticketing  </Accordion.Header>
        <Accordion.Body>
          <Row>
                   <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Ticket Included in Tour Price  <span className='atrisk'>*</span></label>
                                <div className='d-flex'>
                                    <div className='form-check me-3'>   
                                        <input 
                                        className='form-check-input' 
                                        type='radio'    
                                        name='ticketIncludeTourPrice'
                                        checked={data?.tour_ticket == null ? false: true}
                                     
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='ticketIncludeTourPrice'
                                        checked={data?.tour_ticket == null ? true: false}
                                    
                                            />
                                        <label className='form-check-label'>No</label>
                                    </div>
                                </div>
                              {errors.ticket_required && (     
                                <p className="text-sm text-destructive">{errors.ticket_required}</p>
                                )}  
                            </div>
                        </Col>
             {
              data?.tour_ticket == null &&
             
                <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Total Tour Price <span className='atrisk'>*</span></label>
                              <input 
                              value={data?.tour_price?.price ?? ""}
                          
                             className={
                                errors?.tour_price?.price
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Flat price per product' />
                              {errors?.tour_price?.price && (
                              <p className="text-sm text-destructive">{errors?.tour_price?.price}</p>
                            )}
                            </div>
                        </Col>
}
{
              data?.tour_ticket == null &&
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Currency  <span className='atrisk'>*</span></label>
                              <Select
                              className={
                                errors?.tour_price?.currency
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                                options={currencyList}
                                 values={
                                    data?.tour_price?.currency
                                      ? currencyList.filter(
                                          item => item.value === data?.tour_price?.currency
                                        )
                                      : []
                                  }
                                value={data?.tour_price?.currency ?? ""}
                              
                              />
                              {errors?.tour_price?.currency && (
                              <p className="text-sm text-destructive">{errors?.tour_price?.currency}</p>
                            )}
                            </div>
                        </Col>
}
                     
                        

   <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Entry Ticket Required  <span className='atrisk'>*</span></label>
                                <div className='d-flex'>
                                    <div className='form-check me-3'>   
                                        <input 
                                        className='form-check-input' 
                                        type='radio'    
                                        name='entryTicket'
                                        checked={data?.tour_ticket !== null ? data?.tour_ticket?.ticket_required : false}
                                     
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='entryTicket'
                                        checked={data?.tour_ticket !== null ? !data?.tour_ticket?.ticket_required : true}
                                  
                                            />
                                        <label className='form-check-label'>No</label>
                                    </div>
                                </div>
                              {errors?.tour_price?.ticket_included && (     
                                <p className="text-sm text-destructive">{errors?.tour_price?.ticket_included}</p>
                                )}  
                            </div>
                        </Col>
                        { data?.tour_ticket !== null &&

                         <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Adult Ticket Price <span className='atrisk'>*</span></label>
                  <input 
                     value={data.tour_ticket?.adult_price ?? ""}
              
                  type='text' className={errors.adult_price ? "form-control is-invalid" : "form-control"} placeholder='Per-person cost ' />
                  {errors.adult_price && (
                    <p className="text-sm text-destructive">{errors.adult_price}</p>
                  )}
                </div>
            </Col>
            }
                { data?.tour_ticket !== null &&
                 <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Child Ticket Price</label>
                  <input 
                     value={data.tour_ticket?.child_price ?? ""}
               
                  type='text' className='form-control' placeholder='Child cost ' />
                  
                </div>
            </Col>
}
    { data?.tour_ticket !== null &&
               <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Infant Ticket Price </label>
                  <input 
                     value={data.tour_ticket?.infant_price ?? ""}
              
                  type='text' className='form-control' placeholder='Infant cost ' />
                  
                </div>
            </Col>
}
               </Row>
        </Accordion.Body>
      </Accordion.Item>
        <Accordion.Item eventKey="6">
        <Accordion.Header>Inclusions & Exclusions & Access, Restrictions & Difficulty </Accordion.Header>
        <Accordion.Body>
                      <Row>
           <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Skip-the-line Access</label>
                                <div className='d-flex'>
                                    <div className='form-check me-3'>   
                                        <input 
                                        className='form-check-input' 
                                        type='radio'    
                                        name='skipInlineAccess'
                                        checked={data.skip_the_line_access === true}
                                       
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='skipInlineAccess'
                                        checked={data.skip_the_line_access === false}
                                        onChange={() => onChange("skip_the_line_access", false)}
                                            />
                                        <label className='form-check-label'>No</label>
                                    </div>
                                </div>
                             
                            </div>
                        </Col>
                           <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Physical Difficulty Level</label>
                                <select 
                                value={data.difficulty_level ?? ""}
                              
                                className={
                                errors.difficulty_level
                                  ? "border-line form-control"
                                  : "form-control"
                              }>
                                  <option value="">Select difficulty level</option>
                                  <option value="EASY">Easy</option>
                                  <option value="MODERATE">Moderate</option>
                                  <option value="CHALLENGING">Challenging</option>
                                  <option value="STRENUOUS">Strenuous</option>
                                </select>
                                {errors.difficulty_level && (
                              <p className="text-sm text-destructive">{errors.difficulty_level}</p>
                            )}
                            </div>
                        </Col>
                          <Col lg={4} md={6}>
                                <div className='form-group'>
                                <label className='mb-3'>Age Restrictions </label>
                              
                                <div className='d-flex justify-content-between mt-2'>
                                  <span>Min Age: {data.age_min ?? 10}</span>
                                  <span>Max Age: {data.age_max ?? 80}</span>
                                </div>
                                
                                </div>
            </Col>
                <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Accessibility Options </label>
                  <Select
                  
                  multi
                  className={
                    errors.accessibilityOptions
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={accessibilityOptions}
                    values={selectedAccessibilityValues}
                
                  />
                 
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Not Suitable For </label>
                  <Select
                  
                  multi
                  className={
                    errors.notSuitableFor
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={suitabilityOptions}
                    values={selectednotsuitableValues}
                  
                  />
                 
                </div>
            </Col>
             <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>What’s Included  <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.tour_inclusion_exclusion?.included ?? ""}
                          
                             className={
                                errors.tour_inclusion_exclusion?.included
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Included in tour price' />
                              {errors.tour_inclusion_exclusion?.included && (
                              <p className="text-sm text-destructive">{errors.tour_inclusion_exclusion?.included}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>What’s Not Included   <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.tour_inclusion_exclusion?.excluded ?? ""}
                             className={
                                errors.tour_inclusion_exclusion?.excluded
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Exclusions' />
                              {errors.tour_inclusion_exclusion?.excluded && (
                              <p className="text-sm text-destructive">{errors.tour_inclusion_exclusion?.excluded}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Optional Add-ons </label>
                              <textarea 
                              value={data?.tour_inclusion_exclusion?.optional_addons ?? ""}
                             className="form-control"
                              type='text'  placeholder='Extra services' />
                             
                            </div>
                        </Col>
                      
                    </Row>
        </Accordion.Body>
      </Accordion.Item>
        <Accordion.Item eventKey="7">
        <Accordion.Header>Language and Safety </Accordion.Header>
        <Accordion.Body>
            <Row>
        <Col lg={4} md={6}>
          <div className="form-group">
            <label>
              Tour Language(s) <span className="atrisk">*</span>
            </label>
            <Select             
              multi
              className={
                errors.tourLanguage
                  ? "border-line form-control"
                  : "form-control"
              }
              options={languageList}
              values={selectedLanguageValues}
           
       
            />
            {errors.tourLanguage && (
              <p className="text-sm text-destructive">{errors.tourLanguage}</p>
            )}
          </div>
        </Col>
        <Col lg={4} md={6}>
          <div className="form-group">
            <label>Live Guide</label>
            <div className="d-flex">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="liveGuide"
                  checked={data?.tour_safety?.permit_declared === true}
             
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="liveGuide"
                  checked={data?.tour_safety?.permit_declared === false}
                
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            {errors.liveGuide && (
              <p className="text-sm text-destructive">{errors.liveGuide}</p>
            )}
          </div>
        </Col>
        <Col lg={4} md={6}>
          <div className="form-group">
            <label>Required Fitness Level </label>
            <input
              value={data?.tour_safety?.fitness_requirements ?? ""}
         
              className="form-control"
              type="text"
              placeholder="Physical requirements"
            />
          </div>
        </Col>
        <Col lg={12} md={12}>
          <div className="form-group">
            <label>
              Safety Instructions <span className="atrisk">*</span>
            </label>
            <textarea
              value={data?.tour_safety?.safety_instructions ?? ""}
             
              className={
                errors.safety_instructions
                  ? "border-line form-control"
                  : "form-control"
              }
              type="text"
              placeholder="Confirms coverage of safety instructions"
            />
            {errors.safety_instructions && (
              <p className="text-sm text-destructive">
                {errors.safety_instructions}
              </p>
            )}
          </div>
        </Col>
         <Col lg={12} md={12}>
           <div className="form-group d-flex align-items-center gap-2 mb-2">
            <label>
             Permit Declaration
            </label>
            <input type="checkbox" checked={data?.tour_safety?.permit_declared} />
      
            {errors.permit_declared && (
              <p className="text-sm text-destructive" style={{position:'relative'}}>
                {errors.permit_declared}
              </p>
            )}
          </div>
          
        </Col>
        <Col lg={12} md={12}>
          <div className="form-group d-flex align-items-center gap-2">
            <label>
            Insurance Declaration
            </label>
            <input type="checkbox" checked={data?.tour_safety?.insurance_declared} />
           
          {errors.insurance_declared && (
              <p className="text-sm text-destructive" style={{position:'relative'}}>
                {errors.insurance_declared}
              </p>
            )}
          </div>
            
        </Col>
      </Row>
        </Accordion.Body>
      </Accordion.Item>
         <Accordion.Item eventKey="8">
        <Accordion.Header> Media & Assets</Accordion.Header>
        <Accordion.Body>
                <Row>
                    <Col lg={6} md={6}>
                        <div className='form-group'>
                          <label>Cover Image  <span className='atrisk'>*</span></label>
                          
                          {data?.tour_medias && (
                            <img src={data.tour_medias?.cover} alt="Cover Preview" style={{ marginTop: '10px', maxWidth: '150px', height: 'auto' }} />
                          )}
                        </div>
                    </Col>
                     <Col lg={6} md={6}>
                        <div className='form-group'>
                          <label>Gallery Images (Multiples Images) ({data?.tour_medias?.gallery.length ?? 0})  </label>
                        
                          
                          {data?.tour_medias && data?.tour_medias?.gallery.length > 0 && ( 
                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {data.tour_medias.gallery.map((src, index) => (
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
                            value={data?.tour_medias?.video ?? ""}
                     
                        type='text' className='form-control' placeholder='YouTube / Vimeo' />
                        
                        </div>
                   </Col>
                    <Col lg={12} md={12}>
                         <div className="form-group d-flex align-items-center gap-2">
            <label>
            Image Rights Confirmation <span className="atrisk">*</span>
            </label>
            <input type="checkbox" checked={data.image_rights_confirmation}
           />
           
            {errors.image_rights_confirmation && (
              <p className="text-sm text-destructive" style={{position:'relative'}}>
                {errors.image_rights_confirmation}
              </p>
            )}
          </div>
                   </Col>
             </Row>
        </Accordion.Body>
      </Accordion.Item>
       <Accordion.Item eventKey="9">
        <Accordion.Header>Policy & Customer Preparation</Accordion.Header>
        <Accordion.Body>
          <Row>
                         <Col lg={4} md={6}>
                                    <div className='form-group'>
                                      <label>Cancellation Policy <span className="atrisk">*</span></label>
                                        <select
                                        className={
                                        errors.cancelelationPolicy
                                          ? "border-line form-control"
                                          : "form-control"
                                      }
                                        value={data?.tour_policy?.cancellation_policy ?? ""}
                                       
                                        >
                                            <option value="">Select cancellation policy</option>
                                            <option value="FREE">Free</option>
                                            <option value="PARTIAL">Partial</option>
                                            <option value="NONE">None</option>
                                        </select>
                                        {errors.cancelelationPolicy && (
                                      <p className="text-sm text-destructive">{errors.cancelelationPolicy}</p>
                                    )}
                                    </div>
                                </Col>
                                  <Col lg={4} md={6}>
                                    <div className='form-group'>
                                      <label>Cancellation Cut-off <span className="atrisk">*</span></label>
                                        <select
                                        className={
                                        errors.cancelelationCutoff
                                          ? "border-line form-control"
                                          : "form-control"
                                      }
                                        value={data?.tour_policy?.cancellation_cutoff ?? ""}
                                    
                                        >
                                            <option value="">Select cancellation cutoff</option>
                                            <option value="24_HOURS">24 Hours</option>
                                            <option value="PARTIAL">Partial</option>
                                            <option value="NONE">None</option>
                                        </select>
                                        {errors.cancellation_cutoff && (
                                      <p className="text-sm text-destructive">{errors.cancellation_cutoff}</p>
                                    )}
                                    </div>
                                </Col>
                                <Col lg={12} md={12}>
                                          <div className="form-group">
                                            <label>
                                             No-show Policy 
                                            </label>
                                            <textarea
                                              value={data?.tour_policy?.no_show_policy ?? ""}
                                           
                                              className="form-control"
                                              type="text"
                                              placeholder="no-show policy"
                                            />
                                          
                                          </div>
                                        </Col>
                                         <Col lg={12} md={12}>
                                          <div className="form-group">
                                            <label>
                                             Weather Policy 
                                            </label>
                                            <textarea
                                              value={data?.tour_policy?.weather_policy ?? ""}
                                              onChange={(e) => onChange("weather_policy", e.target.value)}
                                              className="form-control"
                                              type="text"
                                              placeholder="Rain / force majeure"
                                            />
                                          
                                          </div>
                                        </Col>
                                         <Col lg={4} md={6}>
                                                        <div className='form-group'>
                                                        <label>Dress Code </label>
                                                        <input 
                                                            value={data?.dress_code ?? ""}
                                                     
                                                        type='text' className='form-control' placeholder='dress code' />
                                                        
                                                        </div>
                                                                </Col>
                                                    <Col lg={12} md={12}>
                                                        <div className="form-group">
                                                        <label>
                                                            What to Bring <span className="atrisk">*</span>
                                                        </label>
                                                        <textarea
                                                            value={data.what_to_bring ?? ""}
                                                     
                                                            className={
                                                            errors.what_to_bring
                                                                ? "border-line form-control"
                                                                : "form-control"
                                                            }
                                                            type="text"
                                                            placeholder="Shoes, ID, etc."
                                                        />
                                                        {errors.what_to_bring && (
                                                            <p className="text-sm text-destructive">
                                                            {errors.what_to_bring}  
                                                            </p>
                                                        )}
                                                        </div>
                                                    </Col>
                                                       <Col lg={12} md={12}>
                                                        <div className="form-group">
                                                        <label>
                                                            Important Notes
                                                        </label>
                                                        <textarea
                                                            value={data.important_notes ?? ""}
                                                        
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter any important notes here"
                                                        />
                                                       
                                                        </div>
                                                    </Col>
                    </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </div>
      </div>
    </div>
  )
}

export default ViewProduct