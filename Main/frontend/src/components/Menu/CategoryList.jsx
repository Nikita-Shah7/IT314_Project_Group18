import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { restaurantMenu } from '../AxiosCreate'
import './CategoryList.scss'

function CategoryList(props) {

    // useEffect( () => {
    //     console.log(props.categoryName)
    // },[props.categoryName]);

    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        restaurantMenu.get('').then((response) => {
            const filteredData = response.data.filter(item => item.category === props.categoryID);
            setCategoryItems(filteredData);
        })
    }, [categoryItems]);


    const renderCategoryList = categoryItems.map((item) => {
        return (
            <Link to={`/menu/${item.dishID}`} state={item}>
                <li className="list-group-item d-flex justify-content-between align-items-center"> {item.dishName} 
                    <span className="text-end">{item.rate}/-</span>
                </li>
            </Link>
        );
    });

    return (
        <div id={`panelsStayOpen-collapse${props.categoryID}`} className="accordion-collapse collapse show" aria-labelledby={`panelsStayOpen-heading${props.categoryID}`}>
            <div className="accordion-body">
                <ul className="list-group">
                    {renderCategoryList}
                </ul>
            </div>
        </div>
    );
}

export default CategoryList;