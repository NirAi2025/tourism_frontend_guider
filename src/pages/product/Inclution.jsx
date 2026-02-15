import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Select from 'react-dropdown-select';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Inclution = ({data, onChange, errors}) => {


const handleKeyDown = (e) => {
  const allowedKeys = [
    "Backspace",    
    "Tab",
    "ArrowLeft",
    "ArrowRight",   
    "Delete",
    "Home",
    "End"
  ];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault(); 
    }
    }

 const handlemultilang = (lang) => {
      onChange("accessibilityOptions",lang);
  
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



  return (
    <div className='register-profile'>
        <h3>7. Inclusions & Exclusions & Access, Restrictions & Difficulty </h3>
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
                                        checked={data.skipInlineAccess === true}
                                        onChange={() => onChange("skipInlineAccess", true)}
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='skipInlineAccess'
                                        checked={data.skipInlineAccess === false}
                                        onChange={() => onChange("skipInlineAccess", false)}
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
                                value={data.physicalLevel ?? ""}
                                onChange={(e) => onChange("physicalLevel", e.target.value)}
                                className={
                                errors.physicalLevel
                                  ? "border-line form-control"
                                  : "form-control"
                              }>
                                  <option value="">Select difficulty level</option>
                                  <option value="Easy">Easy</option>
                                  <option value="Moderate">Moderate</option>
                                  <option value="Challenging">Challenging</option>
                                  <option value="Strenuous">Strenuous</option>
                                </select>
                                {errors.physicalLevel && (
                              <p className="text-sm text-destructive">{errors.physicalLevel}</p>
                            )}
                            </div>
                        </Col>
                          <Col lg={4} md={6}>
                                <div className='form-group'>
                                <label className='mb-3'>Age Restrictions </label>
                                <RangeSlider min={0} max={80} step={1} defaultValue={[10, 80]} 
                                 onInput={(values) => {
                                    onChange("minageRestriction", values[0]);
                                    onChange("maxageRestriction", values[1]);
                                  }}
                                />
                                <div className='d-flex justify-content-between mt-2'>
                                  <span>Min Age: {data.minageRestriction ?? 10}</span>
                                  <span>Max Age: {data.maxageRestriction ?? 80}</span>
                                </div>
                                
                                </div>
            </Col>
                <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Accessibility Options </label>
                  <Select
                  values={[]}
                  multi
                  className={
                    errors.accessibilityOptions
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={accessibilityOptions}
                    value={data.accessibilityOptions ?? ""}
                    onChange={(value) =>handlemultilang(value)}
                  />
                 
                </div>
            </Col>
            <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Not Suitable For </label>
                  <Select
                  values={[]}
                  multi
                  className={
                    errors.notSuitableFor
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={suitabilityOptions}
                    value={data.notSuitableFor ?? ""}
                    onChange={(value) =>handlemultilang(value)}
                  />
                 
                </div>
            </Col>
             <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>What’s Included  <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.whatsInclude ?? ""}
                             onChange={(e) => onChange("whatsInclude", e.target.value)}
                             className={
                                errors.whatsInclude
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Included in tour price' />
                              {errors.whatsInclude && (
                              <p className="text-sm text-destructive">{errors.whatsInclude}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>What’s Not Included   <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.whatsExclude ?? ""}
                             onChange={(e) => onChange("whatsExclude", e.target.value)}
                             className={
                                errors.whatsExclude
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Exclusions' />
                              {errors.whatsExclude && (
                              <p className="text-sm text-destructive">{errors.whatsExclude}</p>
                            )}
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Optional Add-ons </label>
                              <textarea 
                              value={data.optionalAddons ?? ""}
                             onChange={(e) => onChange("optionalAddons", e.target.value)}
                             className="form-control"
                              type='text'  placeholder='Extra services' />
                             
                            </div>
                        </Col>
                      
                    </Row>
    </div>
  )
}

export default Inclution