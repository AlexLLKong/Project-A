import '../App.css';
import RemoveShowButton from '../ShowButtons/RemoveShowButton';
import MalShowButton from '../ShowButtons/MalShowButton';

function ShowCard(props){
    return(
        <div className = 'col-4-xl'>
            <div className = 'card mb-4 mx-2 shadow-sm cust-card-size'>
                <img src= {props.value.image_url} className = 'img-fluid card-img-top' alt= 'missing'/>
                
                <div className = 'card-footer'>
                    <p className = 'card-title'><strong>{props.value.title}</strong></p>
                    <MalShowButton value={props.value} handlers= {props.handlers}/>
                    <RemoveShowButton value={props.value} handlers= {props.handlers}/>
                </div>
            </div>
        </div>
    )
}

export default ShowCard