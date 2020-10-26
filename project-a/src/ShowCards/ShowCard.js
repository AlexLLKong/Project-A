import React, { useEffect, useState } from 'react'
import '../App.css';
import AddShowButton from '../ShowButtons/AddShowButton';
import MalShowButton from '../ShowButtons/MalShowButton';

function ShowCard(props){
    const [timeLeft, setTimeLeft] = useState('')
    useEffect(() => {
        const timeoutId = setInterval(() => {
            
            const timeDiff = (new Date(props.value.nextAirDate) - Date.now());
            let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            setTimeLeft(timeLeft => timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`) ;
            if(timeDiff < 0)
                clearTimeout(timeoutId);

        }, 1000);
        props.value.timeoutId = timeoutId;
        return () => {clearTimeout(timeoutId)};
    })

    return(
        <div className = 'col-4-xl'>
            <div className = 'card mb-4 mx-2 shadow-sm cust-card-size'>
                <img src= {props.value.image_url} className = 'img-fluid card-img-top' alt= 'missing'/>
                
                <div className = 'card-footer'>
                    <p className = 'card-title'><strong>{props.value.title}</strong></p>
                    <div className = 'ml-auto row align-items-center'>
                        <div>
                            <MalShowButton value={props.value} handlers= {props.handlers}/>
                            <AddShowButton value={props.value} handlers= {props.handlers}/>
                        </div>
                        <div className= 'col text-right'>
                            {timeLeft}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCard