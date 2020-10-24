import React from 'react'

function handleRemoveShowClick(props, e){
    e.preventDefault()
    props.handlers.removeShow(props.value)
}

function RemoveShowButton(props){
    return(
        <button onClick= {(e) => handleRemoveShowClick(props, e)} 
            className = 'btn btn-danger btn-sm ml-2'>Remove</button>
    )
}

export default RemoveShowButton