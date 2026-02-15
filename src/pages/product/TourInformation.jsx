import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Select from 'react-dropdown-select';

const TourInformation = ({ data, onChange, errors, countryList, languageList, stateList, cityList, loadingStates, phoneCodeList, tourCategoriesList }) => {


  const handlemultilang = (lang) => {
      onChange("tourTags",lang);
  
  };

 
  var tagOptions = [
    { value: 'history', label: 'History' },
    { value: 'food', label: 'Food' },
    { value: 'nature', label: 'Nature' },
  ]






  return (
     <div className='register-profile'>
        <h3>1. Basic Tour Information </h3>
        <Row>
             <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Tour Title <span className='atrisk'>*</span></label>
                              <input 
                              value={data.tourtitle ?? ""}
                             onChange={(e) => onChange("tourtitle", e.target.value)}
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
                              value={data.tagline ?? ""}
                             onChange={(e) => onChange("tagline", e.target.value)}
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
                    values={data.tourCategory ? [data.tourCategory] : []}
                    onChange={(value) => onChange("tourCategory", value)}
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
                  values={[]}
                  multi
                  className={
                    errors.tourTags
                      ? "border-line form-control"
                      : "form-control"
                  }
                    options={tagOptions}
                    value={data.tourTags ?? ""}
                    onChange={(value) =>handlemultilang(value)}
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
                    values={data.country ? [data.country] : []}
                    onChange={(value) => onChange("country", value)}
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
                    value={data.state ?? ""}
                    onChange={(value) => onChange("state", value)}
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
                    value={data.city ?? ""}
                    onChange={(value) => onChange("city", value)}
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
                              value={data.landmark ?? ""}
                             onChange={(e) => onChange("landmark", e.target.value)}
                             className={
                                errors.landmark
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Place' />
                 
                 
                   {errors.landmark && (
                  <p className="text-sm text-destructive">{errors.landmark}</p>
                )}
                </div>
            </Col>
            </Row>
        </div>
  )
}

export default TourInformation