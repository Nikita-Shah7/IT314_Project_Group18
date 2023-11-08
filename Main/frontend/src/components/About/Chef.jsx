import './about.css'
import chefBox from '../../assets/chefBox.png'
import chefPhoto from '../../assets/chef-photo.png'

export function Chef() {
    return (
        <div className='chef'>
            <div className='photoChef'>
                <img src={chefPhoto} width={300}/>
            </div>
            <div className='aboutchef'>
                <img src={chefBox} width={300}/>
                <div className='chefName'>
                    Walter White
                </div>
                <div className='chefDisc'>
                Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut. Ipsum exercitationem iure minima enim corporis et voluptate.
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}