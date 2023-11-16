import './Items.css'
import React,{ useState } from 'react';
export default function Item(props)
{
    const [item, setItem] = useState({
        categoryName : '',  
        menu_name : '', 
        price : '',  
        description : '', 
        profit : '',
        img : '',
    });

    const onChangeInput = e => {
        const {name, value} = e.target;
        setItem({...item, [name]:value});
    }

    const [modal,setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }
    const editItem = async e => {
       
    }

    return(
        <div className='card-it'>
            <img className='im-it' src={props.img}/>
                <div className='wrp-it'>
                    <h3 className='te-it'>{props.name}</h3>
                    <p className='cat-it'>{props.catname}</p>
                </div>
            <p className='cat2-it'><span className='te-it'>Price :</span> {props.price}$</p>
            <p className='cat2-it'><span className='te-it'>Profit :</span> {props.profit}$</p>
            <button className='but-it'onClick={toggleModal}>Edit</button>
            {modal && (
         
         <div className='overlay-it' onClick={toggleModal}>
             <div className='content-it' onClick={(event) => event.stopPropagation()} >
             <form className='mrow-it' onSubmit={editItem}>
             <div className="row-it">
                 <div>
                     <label htmlFor="title" ><p>Item Name : </p></label>
                 </div>
                 <div>
                     <input type="text" className="in-it" name="menu_name" placeholder={props.name} required value={item.menu_name} onChange={onChangeInput} />
                 </div>
             </div>
             <div className="row-it">
                 <div>
                     <label htmlFor="tittle" ><p>Category Name : </p></label>
                 </div>
                 <div>
                     <input type="text" className="in-it" name="categoryName" placeholder={props.catname} required value={item.categoryName} onChange={onChangeInput} />
                 </div>
             </div>
             <div className="row-it">
                 <div>
                     <label htmlFor="author"><p>Short Description : </p></label>
                 </div>
                 <div >
                     <input type="text" className="in-it" name="description" placeholder={props.desc} required value={item.description} onChange={onChangeInput} />
                 </div>
             </div>
             <div className="row-it">
                 <div>
                     <label htmlFor="img" ><p>Image URL : </p></label>
                 </div>
                 <div>
                     <input type="text" className="in-it" name="img" placeholder={props.img} required value={item.img} onChange={onChangeInput}/>
                 </div>
             </div>
             <div className="row-it">
                 <div >
                     <label htmlFor="content" ><p>Price :</p></label>
                 </div>
                 <div>
                 <input type="text" className="in-it" name="price" placeholder={props.price} required value={item.price} onChange={onChangeInput}/>
                 </div>
             </div>
             <div className="row-it">
                 <div>
                     <label htmlFor="content" ><p>Profit :</p></label>
                 </div>
                 <div >
                 <input type="text" className="in-it" name="profit" placeholder={props.profit} required value={item.profit} onChange={onChangeInput} />
                 </div>
             </div>
             <div>
                 <button type="submit">Edit</button>
             </div>
         </form>
             </div>
     </div>)}
        </div>
    )
}
// {
//     "categoryName" : "Soups & Starters",  
//     "menu_name" : "Monchow Soup", 
//     "price" : 120,  
//     "description" : "Indulge in the exotic flavors of the Far East with our tantalizing Manchow Soup. This aromatic masterpiece combines a rich broth simmered to perfection with a medley of fresh vegetables, soy sauce, and a secret blend of spices. Topped with crispy fried noodles for that perfect crunch, it's an authentic Asian delight that will leave your taste buds craving for more.", 
//     "profit" : 60,
//     "img" : "abc"
// }