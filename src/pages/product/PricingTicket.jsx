import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Select from 'react-dropdown-select';

const PricingTicket = ({data, onChange, errors, currencyList}) => {


const handleKeyDown = (e) => {
  const allowedKeys = [
    'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'
  ];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }   
    };




  return (
      <div className='register-profile'>
        <h3>6. Pricing & Ticketing  </h3>
       
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
                                        checked={data.ticketIncludeTourPrice === true}
                                        onChange={() => onChange("ticketIncludeTourPrice", true)}
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='ticketIncludeTourPrice'
                                        checked={data.ticketIncludeTourPrice === false}
                                        onChange={() => onChange("ticketIncludeTourPrice", false)}
                                            />
                                        <label className='form-check-label'>No</label>
                                    </div>
                                </div>
                              {errors.ticketIncludeTourPrice && (     
                                <p className="text-sm text-destructive">{errors.ticketIncludeTourPrice}</p>
                                )}  
                            </div>
                        </Col>
             {!data.ticketIncludeTourPrice && 
                <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Total Tour Price <span className='atrisk'>*</span></label>
                              <input 
                              value={data.tourPrice ?? ""}
                             onChange={(e) => onChange("tourPrice", e.target.value)}
                             className={
                                errors.tourPrice
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Flat price per product' />
                              {errors.tourPrice && (
                              <p className="text-sm text-destructive">{errors.tourPrice}</p>
                            )}
                            </div>
                        </Col>
                        }
                         {!data.ticketIncludeTourPrice && 
                        <Col lg={4} md={6}>
                            <div className='form-group'>
                              <label>Currency  <span className='atrisk'>*</span></label>
                              <Select
                              className={
                                errors.currency
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                                options={currencyList}
                                value={data.currency ?? ""}
                                onChange={(value) => onChange("currency", value)}
                              />
                              {errors.currency && (
                              <p className="text-sm text-destructive">{errors.currency}</p>
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
                                        checked={data.entryTicket === true}
                                        onChange={() => onChange("entryTicket", true)}
                                         />
                                        <label className='form-check-label'>Yes</label>
                                    </div>
                                    <div className='form-check'>        
                                        <input 
                                        className='form-check-input' 
                                        type='radio'
                                        name='entryTicket'
                                        checked={data.entryTicket === false}
                                        onChange={() => onChange("entryTicket", false)}
                                            />
                                        <label className='form-check-label'>No</label>
                                    </div>
                                </div>
                              {errors.entryTicket && (     
                                <p className="text-sm text-destructive">{errors.entryTicket}</p>
                                )}  
                            </div>
                        </Col>
                          {data.entryTicket &&
                         <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Adult Ticket Price <span className='atrisk'>*</span></label>
                  <input 
                     value={data.adultTicketPrice ?? ""}
                 onChange={(e) => onChange("adultTicketPrice", e.target.value)}
                 onKeyDown={handleKeyDown}
                  type='text' className={errors.adultTicketPrice ? "form-control is-invalid" : "form-control"} placeholder='Per-person cost ' />
                  {errors.adultTicketPrice && (
                    <p className="text-sm text-destructive">{errors.adultTicketPrice}</p>
                  )}
                </div>
            </Col>
}
 {data.entryTicket &&
                 <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Child Ticket Price</label>
                  <input 
                     value={data.childTicketPrice ?? ""}
                 onChange={(e) => onChange("childTicketPrice", e.target.value)}
                 onKeyDown={handleKeyDown}
                  type='text' className='form-control' placeholder='Child cost ' />
                  
                </div>
            </Col>
}
 {data.entryTicket &&
               <Col lg={4} md={6}>
                <div className='form-group'>
                  <label>Infant Ticket Price </label>
                  <input 
                     value={data.infantTicketPrice ?? ""}
                 onChange={(e) => onChange("infantTicketPrice", e.target.value)}
                 onKeyDown={handleKeyDown}
                  type='text' className='form-control' placeholder='Infant cost ' />
                  
                </div>
            </Col>
}
               </Row>
        </div>
  )
}

export default PricingTicket