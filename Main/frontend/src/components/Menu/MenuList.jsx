import { useState, useEffect } from 'react';
import { dishCategory } from '../AxiosCreate'
import CategoryList from './CategoryList';
import './MenuList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

// to get tableID
import { useContext } from 'react';
import { Context } from '../../context/context';
import ContextProvider from '../../context/context';

function MenuList() {

    console.log("nik1 in MenuList.jsx")
    
    
    // to get tableID from route '/table'
    // agar me '/table' matthi jai ne table select karu chu and then if 
    // i go to '/menu' to if() block kaam karse
    // if i go to '/menu' without selecting the table
    // then else() wala block kaam karse
    // const location = useLocation();
    // if(location.state)
    //     console.log(location.state)
    // else 
    //     console.log("table yet not selected!!")

    
    // instead of using useLocation() to get tableID, 
    // i use context.jsx since i have made the tableID variable
    // to be available globally
    const { selectedTable } = useContext(Context)

    console.log("selectedTable => ",selectedTable)
    if(selectedTable) {
        console.log(selectedTable)
        console.log(selectedTable.tableID)
    }
    else 
        console.log("table yet not selected!!")
    

    const [dishCategoryItem, setdishCategoryItem] = useState([])

    useEffect(() => {
        dishCategory.get('').then((response) => {
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
            { selectedTable ? (
                <a href="/mycart" className="btn d-flex align-items-center justify-content-center rounded-circle shadow text-white border-0 bg-primary back-to-top">
                    <FontAwesomeIcon icon={faBurger} />    
                </a>
            ) : ( <></>) } 
        </>
    );
}

export default MenuList;