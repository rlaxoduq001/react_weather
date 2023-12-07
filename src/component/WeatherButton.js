import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export const WeatherButton = ({cities, setCity, changeHandler}) => {
    return (
        <div className='box_container'>
            <Button 
                variant="warning"
                onClick={()=>changeHandler()}
                >Current Location</Button>{' '}

            {cities.map((item, index) => (
                <Button 
                    variant="warning"
                    key={index}
                    onClick={()=>setCity(item)}
                    >{item}</Button>
            ))}

        </div>
  )
}
