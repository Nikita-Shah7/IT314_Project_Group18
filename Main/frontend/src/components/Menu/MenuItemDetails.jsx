import {restaurantMenu} from '../AxiosCreate'

function MenuItemDetails() {
    return (
        <div class="card" style={{width: '18rem'}}>
            <img src="https://images.unsplash.com/photo-1612886621865-47cd0e961fac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="/menu" class="btn btn-primary">Add to cart</a>
                </div>
        </div>
    );
}

export default MenuItemDetails;