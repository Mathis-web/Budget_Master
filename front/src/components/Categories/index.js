import './style.scss';
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify';

import dataService from '../../services/dataService';
import Category from './Category';
import { Loading, Modal } from '../index';

function Categories() {
    const [userData, setUserData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryInfo, setCategoryInfo] = useState({});

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        setIsLoading(true);
        const allData = await dataService.getAllUserData();
        const allCategories = await dataService.getAllCategories();
        setUserData(allData);
        setCategories(allCategories);
        setIsLoading(false);
    };

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const handleOnClickUpdateCategory = (id, name) => {
        setCategoryInfo({
            ...categoryInfo,
            id,
            name,
            type: 'update'
        });
        openModal();
    };

    const handleOnClickDeleteCategory = (id) => {
        setCategoryInfo({
            ...categoryInfo,
            id,
            type: 'delete'
        });
        openModal();
    };

    const deleteCategory = async () => {
        closeModal();
        const result = await dataService.deleteOneCategory(categoryInfo.id);
        toast.success(result);
        getUserData();
    }

    if(isLoading) return <Loading /> 

    return (
        <main className="categories">
            <h2 className="categories__title">Mes dépenses</h2>
            {categories.length === 0 && <p className="categories__text">Vous n'avez aucune catégorie, commencez par en créer une.</p>}
            <ul className="categories__list">
                {categories.map(category => <Category 
                    {...category}
                    onClickUpdate={handleOnClickUpdateCategory}
                    onClickDelete={handleOnClickDeleteCategory}
                    key={category.id}      
                />)}
            </ul>

            {categoryInfo.type && categoryInfo.type === 'delete' && 
                <Modal
                    isOpen={isModalOpen} 
                    content="Etes-vous sur de vouloir supprimer cette catégorie ?"
                    onClickPositive={deleteCategory}
                    onClickNegative={closeModal}
                />
            }

        </main>
    );
}

export default Categories;