import React from 'react'
import { FaCheck } from 'react-icons/fa';

const StepIndicator = ({ currentStep, onStepClick, completedSteps }) => {

 const steps = [
    { number: 1, label: "Profile" },
    { number: 2, label: "Identitiy" },
    { number: 3, label: "Tourism" },
    { number: 4, label: "Insurance" },
    { number: 5, label: "Languages" },
    { number: 6, label: "Banking" },
    { number: 7, label: "Public" },
    // { number: 8, label: "Declarations" },
  ];

  return (
      <div className="step-list">
            <div className="step-information">
                <span>Step {currentStep} of 9</span>
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