import data from './data2'
import Review from './Reviews'
import './Review.css'
export default function Reviewlist()
{
    
    return(
        <div className='bd'>
        <h1 className='ti-re'>Reviews : </h1>
        <section className='rev-list'>{reviewlist}</section>
        </div>
    )
}

const reviewlist = data.map((item) => {
    return(
        <Review 
        id = {item.id}
        sevicerate = {item.starate1}
        foodrate = {item.starate2}
        comments = {item.comments}
        date = {item.date_time.substring(0, 9)}
        />
    )
})

// {
//     "id":1,
//     "starate1" : 5, 
//     "starate2" : 1, 
//     "comments" : "I have the best dining experience with this place. Full five starts for the food.", 
//     "date_time" : "2023-12-25T12:50:30.126589+05:30"
// },