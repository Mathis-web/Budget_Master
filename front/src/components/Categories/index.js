import './style.scss';
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify';

import dataService from '../../services/dataService';
import Category from './Category';
import { Loading, ConfirmModal, FormModal } from '../index';

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

    const handleOnClickCreateCategory = () => {
        setCategoryInfo({
            type: 'create'
        });
        openModal();
    };

    const deleteCategory = async () => {
        closeModal();
        const result = await dataService.deleteOneCategory(categoryInfo.id);
        toast.success(result);
        getUserData();
    };

    const updateCategory = async (e) => {
        e.preventDefault();
        closeModal();
        const name = e.target.elements['name'].value;
        await dataService.updateOneCategory(categoryInfo.id, name);
        toast.success('Votre catégorie a bien été modifiée.');
        getUserData();
    }

    const createCategory = async (e) => {
        e.preventDefault();
        closeModal();
        const name = e.target.elements['name'].value;
        await dataService.createOneCategory(name);
        toast.success('Votre catégorie a bien été créée.');
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
                <ConfirmModal
                    isOpen={isModalOpen} 
                    content="Etes-vous sur de vouloir supprimer cette catégorie ?"
                    onClickPositive={deleteCategory}
                    onClickNegative={closeModal}
                />
            }

            {categoryInfo.type && categoryInfo.type === 'update' && 
                <FormModal
                    isOpen={isModalOpen} 
                    content="Modifier une catégorie"
                    onSubmitForm={updateCategory}
                    onClickNegative={closeModal}
                    value={categoryInfo.name}
                >
                    <label>Nom</label>
                    <input type="text" placeholder="Nom de la catégorie" defaultValue={categoryInfo.name} name="name"/>
                </FormModal>
            }

           {categoryInfo.type && categoryInfo.type === 'create' &&
            <FormModal 
                    isOpen={isModalOpen}
                    content="Créer une catégorie"
                    onSubmitForm={createCategory}
                    onClickNegative={closeModal}
                >
                    <label>Nom</label>
                    <input type="text" placeholder="Nom de la catégorie" name="name"/>
                </FormModal>
           }

           <button className="categories__create-btn" onClick={handleOnClickCreateCategory}>
               Créer une catégorie
           </button>
        </main>
    );
}

export default Categories;