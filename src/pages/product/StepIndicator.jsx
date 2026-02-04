import React from 'react'
import { FaCheck } from 'react-icons/fa';

const StepIndicator = ({ currentStep, onStepClick, completedSteps }) => {

 const steps = [
    { number: 1, label: "Tour" },
    { number: 2, label: "Description" },
    { number: 3, label: "Itinerary" },
    { number: 4, label: "Meeting" },
    { number: 5, label: "Duration" },
    { number: 6, label: "Pricing" },
    { number: 7, label: "Inclusions" },
      { number: 8, label: "Access" },
        { number: 9, label: "Languages" },
         { number: 10, label: "Safety" },  
    { number: 11, label: "Media" },
        { number: 12, label: "Policies" },
    { number: 13, label: "Customer" },
    { number: 14, label: "SEO" },
  ];

  return (
      <div className="step-list">
            <div className="step-information">
                <span>Step {currentStep} of 14</span>
                <label>{
                currentStep == 1 ? 'Profile'
                 : 
                 currentStep == 2 ? "Identitiy"
                 :
                 currentStep == 3 ? "Tourism"
                 :
                currentStep == 4 ? "Insurance" 
                   :
                currentStep == 5 ? "Contact" 
                  :
                  ""
                }  
                
                </label>
            </div>
            <ul className="for-desktop">
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = completedSteps.has(step.number);
          const isClickable = isCompleted || step.number < currentStep;

          return (
            <li  key={step.number} className={isActive
                  ? "active"
                  : isCompleted || step.number < currentStep
                  ? "completed active"
                  : "inactive"
              }  >
            <button            
              onClick={() => isClickable && onStepClick(step.number)} 
                    
            >
            {isActive
                  ?  step.number
                  : isCompleted || step.number < currentStep
                  ? <FaCheck />
                  : step.number
              }
            </button>
            <label>{step.label}</label>
            </li>
          );
        })}
        </ul>
        </div>
  )
}

export default StepIndicator