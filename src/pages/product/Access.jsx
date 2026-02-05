import { s } from 'motion/react-client';
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Select from 'react-dropdown-select';

const Access = ({ data, onChange, errors }) => {



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
        <h3>8. Access, Restrictions & Difficulty </h3>
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
                                <label>Age Restrictions </label>
                                <input 
                                    value={data.ageRestriction ?? ""}
                                onChange={(e) => onChange("ageRestriction", e.target.value)}
                                onKeyDown={handleKeyDown}
                                type='text' className='form-control' placeholder='Min / max age' />
                                
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
        </Row>

    </div>
  )
}

export default Access