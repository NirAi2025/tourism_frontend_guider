import React from 'react'
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
                              type='text'  placeholder='Total duration' />
                               <InputGroup.Text id="basic-addon1">Mints</InputGroup.Text>
                                 {errors.totalDuraion && (
                              <p className="text-sm text-destructive">{errors.totalDuraion}</p>
                            )}
                            </InputGroup>
                             </div>
                              
                        </Col>
                        <Col lg={4} md={6}>
                        <div className='form-group'>
                            <label>Start Time   <span className='atrisk'>*</span></label>
                            <DatePicker
                             showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={10}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            selected={data.startTime ?? ""} onChange={(date) => onChange("startTime", date)} className={
                                                errors.startTime
                                                  ? "border-line form-control"
                                                  : "form-control"
                                              } placeholderText="Select a time" />
                            {errors.startTime && (
                            <p className="text-sm text-destructive">{errors.startTime}</p>
                        )}
                        </div>
                    </Col>
                     <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Operating Days  <span className='atrisk'>*</span></label>
                  <Select
                  values={[]}
                  multi
                  className={
                    errors.operatingDays
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={dayOptions}
                    value={data.operatingDays ?? ""}
                    onChange={(value) =>handlemultilang(value)}
                  />
                   {errors.operatingDays && (
                  <p className="text-sm text-destructive">{errors.operatingDays}</p>
                )}
                </div>
            </Col>
                 <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Seasonal Availability  </label>
                  <DateRangePicker
                 showDateDisplay={false}
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
                
                </div>
            </Col>
            <Col lg={6} md={6}>
                <div className='form-group'>
                  <label>Blackout Dates </label>
                  <DateRangePicker
                 showDateDisplay={false}
                ranges={[blackoutSelectionRange]}
                onChange={handleSelectBlackout}
            />
                
                </div>
            </Col>
            <Col lg={4} md={6}>
                                        <div className='form-group'>
                                          <label>Minimum Travelers <span className='atrisk'>*</span></label>
                                          <input 
                                          value={data.minimumTravelers ?? ""}
                                         onChange={(e) => onChange("minimumTravelers", e.target.value)}
                                         className={
                                            errors.minimumTravelers
                                              ? "border-line form-control"
                                              : "form-control"
                                          }
                                          type='text'  placeholder='Required to run tour' />
                                          {errors.minimumTravelers && (
                                          <p className="text-sm text-destructive">{errors.minimumTravelers}</p>
                                        )}
                                        </div>
                                    </Col>
                                        <Col lg={4} md={6}>
                                        <div className='form-group'>
                                          <label>Maximum Group Size<span className='atrisk'>*</span></label>
                                          <input 
                                          value={data.maximumGroupSize ?? ""}
                                         onChange={(e) => onChange("maximumGroupSize", e.target.value)}
                                         className={
                                            errors.maximumGroupSize
                                              ? "border-line form-control"
                                              : "form-control"
                                          }
                                          type='text'  placeholder='Capacity' />
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