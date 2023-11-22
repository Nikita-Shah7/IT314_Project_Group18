import person from './person.png'
import './Review.css'
export default function Review(props)
{
    return(
        <div className='card-re'>
            <div className='wrp-re'>
            <img className='im-re' src={person}/>
            <p className='p-re'>User{props.id}</p>
            </div>
            <div className='wrp-re2'>
               <p className='p-re'> <span id='te-re'>Service Rating :</span> {props.sevicerate} <span id='te-re1'> Food Rating :</span> {props.foodrate}</p>
               <p className='de-re'>{props.comments}</p>
               <p className='da-re'>{props.date}</p>
            </div>
        </div>
    )
}