import { useState, useEffect } from 'react';
import { dishCategory } from '../AxiosCreate'
import CategoryList from './CategoryList';

function MenuList() {

    const [dishCategoryItem, setdishCategoryItem] = useState([])

    useEffect(() => {
        dishCategory.get('').then((response) => {
            setdishCategoryItem(response.data);
        })
    }, [dishCategoryItem]);


    const renderMenuList = dishCategoryItem.map((item) => {
        return (
            <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        {item.categoryName}
                    </button>
                </h2>
                <CategoryList categoryID={item.categoryID} />
            </div>
        );
    });

    return (
        <div className="accordion" id="accordionPanelsStayOpenExample">
            {renderMenuList}
        </div>
    );
}

export default MenuList;