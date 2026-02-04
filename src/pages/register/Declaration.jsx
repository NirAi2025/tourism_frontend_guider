
import React, { useState } from 'react'

const initialList = [
  { id: 1, label: "Individual Operator Declaration", ischeck: false },
  { id: 2, label: "Legal Right to Operate Tours", ischeck: false },
  { id: 3, label: "License Validity Declaration", ischeck: false },
  { id: 4, label: "Safety Responsibility Declaration", ischeck: false },
  { id: 5, label: "Platform Terms & Conditions", ischeck: false },
  { id: 6, label: "Privacy Policy Consent", ischeck: false },
  { id: 7, label: "Data Accuracy Declaration", ischeck: false },
];

const Declaration = ({ data, onChange, errors }) => {

      const [list, setList] = useState(initialList);

const CheckboxHandle = (clickedItem) => {
    const updatedList = list.map(item =>
      item.id === clickedItem.id
        ? { ...item, ischeck: !item.ischeck }
        : item
    );
    setList(updatedList);
    onChange("declaration", updatedList)
  };


  return (
     <div className='register-profile'>
           <h3>Declarations & Legal Agreements</h3>
           {list.map((item, i)=>{
            return (
                <div  className='checklist' key={i}>
                    <label>{item?.label}</label>
                    <div  className={`checkbox ${item.ischeck ? "checked" : ""}`} onClick={()=>CheckboxHandle(item)}></div>
                </div>  
            )
           })}

             {errors.declaration && (
                  <p className="text-sm text-destructive">{errors.declaration}</p>
                )}
              
           </div>
  )
}

export default Declaration