import React from 'react'

function openUrl(url, e){
    e.preventDefault();
    window.open(url)
}

function MalShowButton(props){
    return(
        <button onClick= {(e) => openUrl(props.value.url, e)} 
            className = 'btn btn-info btn-sm'>MAL</button>
    )
}
export default MalShowButton