import './AdminMenu.css'
import Item from './Item'
import data from './data'
import React,{ useState } from 'react'
export default function(){
    const [item, setItem] = useState({
        categoryName : '',  
        menu_name : '', 
        price : 0,  
        description : '', 
        profit : 0,
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
    const allitem = data.map((item)=>{
        return (
            <Item 
            id = {item.id}
            catname = {item.categoryName}
                  name = {item.menu_name}
                  price = {item.price}
                  profit = {item.profit}
                  desc = {item.description}
                  img = {item.img}
            />
        )
    })
    const addItem = async e => {
        data.push(item);
    }

    return(
        <div className='adm'>
        <div className="addi-ad">
        <h2 className='ti-ad'>Menu Items : </h2>
        <button className="but-list-ad" onClick={toggleModal}>Add Items</button>
        </div>
        {modal && (
         
            <div className='overlay-ad' onClick={toggleModal}>
                <div className='content-ad' onClick={(event) => event.stopPropagation()} >
                <form className='mrow-ad' onSubmit={addItem}>
                <div className="row-ad">
                    <div >
                        <label htmlFor="title" ><p>Item Name : </p></label>
                    </div>
                    <div>
                        <input type="text" className="in-ad" name="menu_name" placeholder="Item Name"required value={item.menu_name} onChange={onChangeInput} />
                    </div>
                </div>
                <div className="row-ad">
                    <div >
                        <label htmlFor="text" ><p>Category Name : </p></label>
                    </div>
                    <div>
                        <input type="text" className="in-ad" name="categoryName" placeholder="Category Name" required value={item.categoryName} onChange={onChangeInput} />
                    </div>
                </div>
                <div className="row-ad">
                    <div>
                        <label htmlFor="author"><p>Short Description : </p></label>
                    </div>
                    <div>
                        <input type="text" className="in-ad" name="description" placeholder="Item Description Here ..." required value={item.description} onChange={onChangeInput} />
                    </div>
                </div>
                <div className="row-ad">
                    <div>
                        <label htmlFor="img" ><p>Image URL : </p></label>
                    </div>
                    <div>
                        <input type="text" className="in-ad" name="img" placeholder="Link of a relatable image for your item" required value={item.img} onChange={onChangeInput}/>
                    </div>
                </div>
                <div className="row-ad">
                    <div>
                        <label htmlFor="content" ><p>Price : </p></label>
                    </div>
                    <div >
                    <input type="text" className="in-ad" name="price" placeholder="The Price of Your Dish" required value={item.price} onChange={onChangeInput}/>
                    </div>
                </div>
                <div className="row-ad">
                    <div >
                        <label htmlFor="content" ><p>Profit : </p></label>
                    </div>
                    <div>
                    <input type="text" className="in-ad" name="profit" placeholder="The Profit of Your Dish" required value={item.profit} onChange={onChangeInput} />
                    </div>
                </div>
                    <button className="item-post" type="submit">ADD</button>
            </form>
                </div>
        </div>)}
        <section className="item-list">
        {allitem}
        </section>
        </div>
    )
}