import person from './person.png'
import './Review.css'


export default function Review(props)
{
    // console.log(props.data)
    return(
        <div className='card-re'>
            <div className='wrp-re'>
            <img className='im-re' src={person}/>
            {/* <p className='p-re'>User{props.id}</p> */}
            </div>
            <div className='wrp-re2'>
                <p className='p-re'> <span id='te-re'>Service Rating :</span> {props.data.starate1} 
                                    <span id='te-re1'>Food Rating :</span> {props.data.starate2}
                </p>
               <p className='de-re'>{props.data.comments}</p>
               <p className='da-re'>Date: {props.data.date_time.substring(0,10)}</p>
               <p className='da-re'>Time: {props.data.date_time.substring(11,19)}</p>
            </div>
        </div>
    )
}