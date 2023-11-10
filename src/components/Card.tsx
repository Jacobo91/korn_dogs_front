import { NavLink } from 'react-router-dom';
import { User } from 'types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function Card({ user }: { user: User }) {
    return (
        <NavLink to={`/admin/users/${user.username}`} className="card-wrapper">
            <div className="card">
                <LazyLoadImage 
                    src={user.image}  
                    alt={`${user.firstname}'s picture`} 
                    className='card__image'
                    effect="blur"
                    height="156"
                    width="156"
                />
                <div className="card__info">
                    <p>{`${user.firstname} ${user.lastname}`}</p>
                    <p className='highlight'>{user.role}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default Card