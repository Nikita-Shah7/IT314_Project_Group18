import { useState, useEffect } from 'react';
import { dishCategory } from '../AxiosCreate'
import CategoryList from './CategoryList';
import './MenuList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';

function MenuList() {

    const [dishCategoryItem, setdishCategoryItem] = useState([])

    useEffect(() => {
        dishCategory.get('').then((response) => {
            console.log("nik1 in MenuList.jsx")
            setdishCategoryItem(response.data);
        })
    }, []);


    const renderMenuList = dishCategoryItem.map((item) => {
        return (
            <div className="accordion-item">
                <h2 className="accordion-header" id={`panelsStayOpen-heading${item.categoryID}`}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${item.categoryID}`} aria-expanded="true" aria-controls={`#panelsStayOpen-collapse${item.categoryID}`}>
                        {item.categoryName}
                    </button>
                </h2>
                <CategoryList categoryID={item.categoryID} />
            </div>
        );
    });

    return (
        <>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                {renderMenuList}
            </div>
            <a href="/mycart" className="btn d-flex align-items-center justify-content-center rounded-circle shadow text-white border-0 bg-primary back-to-top">
                <FontAwesomeIcon icon={faBurger} />    
            </a>
        </>
    );
}

export default MenuList;