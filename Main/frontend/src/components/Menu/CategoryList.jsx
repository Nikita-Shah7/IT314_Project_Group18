import { useEffect, useState } from 'react';
import { restaurantMenu } from '../AxiosCreate'

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
            <li className="list-group-item"> {item.dishName} </li>
        );
    });

    return (
        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div className="accordion-body">
                <ul className="list-group">
                    {renderCategoryList}
                </ul>
            </div>
        </div>
    );
}

export default CategoryList;