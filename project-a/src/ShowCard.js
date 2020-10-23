import './App.css';

function openUrl(url, e){
    e.preventDefault();
    console.log(url)
    window.open(url)
}
function ShowCard(props){
    return(
        <div className = 'col-4-lg'>
            <div className = 'card mb-4 mx-2 shadow-sm cust-card-size'>
                <img src= {props.value.image_url} className = 'img-fluid card-img-top' alt= 'missing'/>
                
                <div className = 'card-footer'>
                    <h5 className = 'card-title'>{props.value.title}</h5>
                    <button onClick= {(e) => openUrl(props.value.url, e)} className = 'btn btn-info btn-sm'>MAL</button>
                    <button className = 'btn btn-primary btn-sm ml-2'>Add</button>
                </div>
            </div>
        </div>
    )
}

export default ShowCard