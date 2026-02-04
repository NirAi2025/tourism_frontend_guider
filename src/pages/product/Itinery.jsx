import React from 'react'
import { Col, Row } from 'react-bootstrap';

const Itinery = ({data, onChange, errors}) => {

    const [interestInput, setInterestInput] = React.useState([
        {name: '', description: ''}
    ]);

    const InputHandler = (e, index, field) => {
        const values = [...interestInput];
        values[index][field] = e.target.value;
        setInterestInput(values);
        onChange("pointsofinterest", values);
    }

    const AddHandle = () => {
        setInterestInput([...interestInput, {name: '', description: ''}]);
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


  return (
     <div className='register-profile'>
        <h3>3. Itinerary & Stops </h3>
        <Row>
             <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Itinerary Overview <span className='atrisk'>*</span></label>
                              <textarea 
                              value={data.overview ?? ""}
                             onChange={(e) => onChange("overview", e.target.value)}
                             className={
                                errors.overview
                                  ? "border-line form-control"
                                  : "form-control"
                              }
                              type='text'  placeholder='Complete experience description' />
                              {errors.overview && (
                              <p className="text-sm text-destructive">{errors.overview}</p>
                            )}
                            </div>
                        </Col>
                        <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Stops / Points of Interest </label>
                        
                                {interestInput && interestInput.map((item, index) => (
                                         <Row key={index}>
                                    <Col lg={5} md={5} >
                                        <div className='point-interest-box'>
                                            <div className='form-group'>    
                                                <label>Name</label>
                                                <input 
                                                type='text' 
                                                value={item.name}
                                                onChange={(e)=>InputHandler(e, index,'name')}
                                                className='form-control' 
                                                placeholder='Name of the stop' />   
                                            </div>
                                          
                                           
                                        </div>  
                                    </Col>
                                     <Col lg={5} md={5}>
                                        <div className='point-interest-box'>
                                           
                                            <div className='form-group'>    
                                                <label>Description</label>  
                                                <input 
                                                type='text' 
                                                value={item.description}    
                                                  onChange={(e)=>InputHandler(e, index,'description')}
                                                className='form-control' 
                                                placeholder='Brief description' />  
                                            </div>
                                         
                                        </div>  
                                    </Col>
                                     <Col lg={2} md={2} >
                                        <div className='point-interest-box'>
                                            {index === 0 ? null :  
                                             <button 
                                            type='button'   
                                            className='btn btn-danger btn-sm mt-4'
                                            onClick={() => {
                                                const newPoints = interestInput.filter((_, i) => i !== index);  
                                                setInterestInput(newPoints);
                                            }}
                                            >
                                                Remove 
                                            </button>
                                            }
                                            
                                           
                                        </div>  
                                    </Col>
                                         </Row>
                                ))} 
                        
                             <button 
                             type='button' 
                             className='btn btn-primary btn-sm'
                              onClick={AddHandle}
                             >
                                Add More  
                                </button>
                            
                            </div>
                        </Col>
                         <Col lg={12} md={12}>
                            <div className='form-group'>
                              <label>Approx. Duration per Stop </label>
                              <input
                              type='text' 
                              value={data.duration ?? ""}
                             onChange={(e) => onChange("duration", e.target.value)}
                                 onKeyDown={handleKeyDown}
                             className="form-control"
                                placeholder='Timing info' />
                            
                            </div>
                        </Col>
                    </Row>
    </div>
  )
}

export default Itinery