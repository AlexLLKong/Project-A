import React from 'react'

function handleAddShowClick(props, e){
    e.preventDefault();
    props.handlers.addShow(props.value)
}

function AddShowButton(props){
    return(
        <button onClick= {(e) => handleAddShowClick(props, e)} 
            className = 'btn btn-primary btn-sm ml-2'>Add</button>
    )
}
export default AddShowButton