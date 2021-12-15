import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import bin from '../../assets/garbage.png';
import pen from '../../assets/pen.png'; 

function Category({id, name, onClickDelete, onClickUpdate }) {
    const handleOnClickDelete = () => {
        onClickDelete(id);
    };

    const handleOnClickUpdate = () => {
        onClickUpdate(id, name);
    };

    return (
        <li className="categories__list__li">
            <Link to={`/mesdepenses/${name}`}>
                <p className="categories__list__li__name">{name}</p>
            </Link>
            <div className="categories__list_li_img-container">
                <img src={pen} alt="Modifier une catégorie" className="categories__list__li__icon" onClick={handleOnClickUpdate} />
                <img src={bin} alt="Supprimer une catégorie" className="categories__list__li__icon" onClick={handleOnClickDelete}/>
            </div>
        </li>
    );
}

Category.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onClickUpdate: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
}

export default Category;