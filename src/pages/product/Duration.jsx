import React, { useState } from 'react'
import { Col, InputGroup, Row } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-dropdown-select';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';

const Duration = ({data, onChange, errors}) => {

    const [selectionRange, setSelectionRange] = React.useState({
        startDate: data.seasonalAvailability ? data.seasonalAvailability.startDate : new Date(),
        endDate: data.seasonalAvailability ? data.seasonalAvailability.endDate : new Date(),
        key: 'selection',
      });

        const [blackoutSelectionRange, setBlackoutSelectionRange] = React.useState({
        startDate: data.blackoutDates ? data.blackoutDates.startDate : new Date(),
        endDate: data.blackoutDates ? data.blackoutDates.endDate : new Date(),
        key: 'selection',
      });

      const [operatingTimeSlots, setOperatingTimeSlots] = React.useState( [{
        start_time: "",
        operating_day: "1",
      }]);




  const handlemultilang = (lang) => {
      onChange("operatingDays",lang);
  
  };

  var dayOptions = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ]

  const handleSelect = (ranges) => {
    console.log(ranges);
    setSelectionRange(ranges.selection);
    onChange("seasonalAvailability",ranges.selection);
  }
    const handleSelectBlackout = (ranges) => {  
    console.log(ranges);
    setBlackoutSelectionRange(ranges.selection);
    onChange("blackoutDates",ranges.selection);
  }

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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const DateHandle = (dates) => {
    const [start, end] = dates;
    onChange("seasonStartDate", start);
    onChange("seasonEndDate", end);
    setStartDate(start);
    setEndDate(end);
  };


  return (
     <div className='register-profile'>
        <h3>5. Duration, Timing, Availability & Capacity  </h3>
        <Row>
             <Col lg={4} md={6}>
                <div className='form-group'>
                    <label>Total Duration  <span className='atrisk'>*</span></label>
                            <InputGroup >                           
                                  <input 
                              value={data.totalDuraion ?? ""}
                             onChange={(e) => onChange("totalDuraion", e.target.value)}
                             className={
                                errors.totalDuraion
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                                 onKeyDown={handleKeyDown}
                              type='text'  placeholder='Total duration' />
                              <select className='px-2'
                              value={data.durationUnit}
                              onChange={(e) => onChange("durationUnit", e.target.value)}
                              >
                                <option value="minutes">Minutes</option>
                                <option value="hours">Hours</option>  
                                <option value="days">Days</option> 
                              </select>
                              
                            </InputGroup>
                               {errors.totalDuraion && (
                              <p className="text-sm text-destructive">{errors.totalDuraion}</p>
                            )}
                             </div>
                              
                        </Col>

                            <Col lg={12} md={12}>
                            {operatingTimeSlots.map((slot, index) => (
                                <Row key={index} className="align-items-center">
                                    <Col lg={4} md={4}>
                                        <div className='form-group'>
                                            <label>Start Time <span className='atrisk'>*</span></label>
                                            <DatePicker 
                                              showTimeSelect  
                                              showTimeSelectOnly
                                              timeIntervals={10}
                                              timeCaption="Time"
                                              dateFormat="h:mm aa"
                                              selected={slot.start_time ? new Date(slot.start_time) : null} 
                                              onChange={(date) => { 
                                                const updatedSlots = [...operatingTimeSlots];
                                                updatedSlots[index].start_time = date;
                                                setOperatingTimeSlots(updatedSlots);
                                                onChange("operatingTimeSlots", updatedSlots);
                                              }}
                                              className={
                                                errors.operatingTimeSlots 
                                                  ? "border-line form-control"
                                                  : "form-control"
                                               }  
                                              placeholderText="Select a time"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4}>
                                        <div className='form-group'>  
                                        <label>Operating Days   <span className='atrisk'>*</span></label>
                                        <select className='form-control'
                                        value={slot.operating_day}
                                        onChange={(e) => {
                                          const updatedSlots = [...operatingTimeSlots];
                                          updatedSlots[index].operating_day = e.target.value;
                                          setOperatingTimeSlots(updatedSlots);
                                          onChange("operatingTimeSlots", updatedSlots);
                                        }}
                                        >
                                          <option value="1">Monday</option>
                                          <option value="2">Tuesday</option>
                                          <option value="3">Wednesday</option>
                                          <option value="4">Thursday</option>
                                          <option value="5">Friday</option>
                                          <option value="6">Saturday</option>
                                          <option value="7">Sunday</option>
                                        </select>
                                    
                                        </div>  
                                    </Col>  
                                   
                                    {index > 0 && (
                                      <Col lg={2} md={2}>     
                                        <button 
                                          className="remove-slot-btn btn btn-danger btn-sm" 
                                          onClick={() => {
                                            const updatedSlots = operatingTimeSlots.filter((_, i) => i !== index);
                                            setOperatingTimeSlots(updatedSlots);
                                            onChange("operatingTimeSlots", updatedSlots);
                                          }}
                                        >
                                          Remove  
                                        </button>
                                      </Col>
                                    )}
                                </Row>
                            ))} 
                            {errors.operatingTimeSlots && (
                              <p className="text-sm text-destructive">{errors.operatingTimeSlots}</p>
                            )}
                            </Col>
                            <Col lg={12} md={12}>
                            <button 
                              className="add-slot-btn btn btn-primary btn-sm mb-3" 
                              onClick={() => setOperatingTimeSlots([...operatingTimeSlots, { startTime: "", days: "" }])}
                            >
                              Add Time Slot  
                            </button>
                            </Col>
                    
                
                 <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Seasonal Availability  </label>
                  <DatePicker
                  selected={startDate}
                  onChange={DateHandle}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className='form-control'
                />
                  {/* <DateRangePicker
                 showDateDisplay={false}
                ranges={[selectionRange]}
                onChange={handleSelect}
            /> */}
                
                </div>
            </Col>
            {/* <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Blackout Dates </label>
                  <DateRangePicker
                 showDateDisplay={false}
                ranges={[blackoutSelectionRange]}
                onChange={handleSelectBlackout}
            />
                
                </div>
            </Col> */}
            <Col lg={4} md={6}>
                                        <div className='form-group'>
                                          <label>Minimum Travelers <span className='atrisk'>*</span></label>
                                          <input 
                                          value={data.minimumTravellers ?? ""}
                                         onChange={(e) => onChange("minimumTravellers", e.target.value)}
                                         onKeyDown={handleKeyDown}
                                         className={
                                            errors.minimumTravellers
                                              ? "border-line form-control"
                                              : "form-control"
                                          }
                                          type='text'  placeholder='minimum travelers' />
                                          {errors.minimumTravellers && (
                                          <p className="text-sm text-destructive">{errors.minimumTravellers}</p>
                                        )}
                                        </div>
                                    </Col>
                                        <Col lg={4} md={6}>
                                        <div className='form-group'>
                                          <label>Maximum Group Size<span className='atrisk'>*</span></label>
                                          <input 
                                          value={data.maximumGroupSize ?? ""}
                                         onChange={(e) => onChange("maximumGroupSize", e.target.value)}
                                          onKeyDown={handleKeyDown}
                                         className={
                                            errors.maximumGroupSize
                                              ? "border-line form-control"
                                              : "form-control"
                                          }
                                          type='text'  placeholder='maximum group size' />
                                          {errors.maximumGroupSize && (
                                          <p className="text-sm text-destructive">{errors.maximumGroupSize}</p>
                                        )}
                                        </div>
                                    </Col>
                                    
                        </Row>
                        </div>
  )
}

export default Duration