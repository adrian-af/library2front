import React, { useEffect, useState } from 'react';
import { AddBook } from './AddBook';
import { AddCopy } from './AddCopy';

    
export const Add = () => {
    //selectedValue is the current value of the dropdown and setSelectedValue the function to update it
    const [selectedValue, setSelectedValue] = useState("");
    const handleSelectChange = (event) => {
            setSelectedValue(event.target.value);
        };
    const renderComponent = () => {
        switch(selectedValue){
            case 'Book':
                return <AddBook/>
                break;
            case 'Copy':
                return <AddCopy/>
                break;
            default:
                return <AddBook/>
                break;
        }
    };
return(
    <div>
        <h1>Add</h1>
        <select value={selectedValue} onChange={handleSelectChange}>
            <option value="Book">Book</option>
            <option value="Copy">Copy</option>
        </select>
        <div>{ renderComponent() }</div>
    </div>
);};
