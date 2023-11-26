import './about.css'
import chefBox from '../../assets/chef-box.png'
import chefPhoto from '../../assets/chefs-1.png'
import chefPhoto2 from '../../assets/chefs-2.png'
import chefphoto3 from '../../assets/chef-3.png'
//import chefphoto33 from '../../assets/chef-photo3'

export function Chef() {
    return (
        <div className='chefs'>
            <div className='chefAdjust'>
            <div className='photoChef'>
                <img src={chefPhoto}/>
            </div>
            <div className='aboutchef'>
                <div className='chefName'>
                    Walter White
                </div>
                <div className='chefDisc'>
                In the kitchen, Chef Walter is a culinary sorceress, conjuring dishes that ignite the senses. Known as "Flameheart," her fiery passion for cooking transforms each meal into a gastronomic adventure.
                </div>
            </div>
            </div>

            <div className='chefAdjust'>
            <div className='photoChef'>
                <img src={chefphoto3}/>
            </div>
            <div className='aboutchef'>
                <div className='chefName'>
                Michael Felix
                </div>
                <div className='chefDisc'>
                Meet Chef Felix, the maverick of flavor exploration. Known as "The Flavor Maverick," he fearlessly dives into the uncharted territories of taste.
                </div>
            </div>
            </div>

            <div className='chefAdjust'>
            <div className='photoChef'>
                <img src={chefPhoto2}/>
            </div>
            <div className='aboutchef'>
                <div className='chefName'>
                Isabella Jack
                </div>
                <div className='chefDisc'>
                Prepare to be enchanted by the culinary magic of Chef Isabella, our very own Gastronomic Alchemist. With a wand in one hand and a whisk in the other, she transforms ordinary ingredients into extraordinary delights.
                </div>
            </div>
            </div>

        </div>
    )
}