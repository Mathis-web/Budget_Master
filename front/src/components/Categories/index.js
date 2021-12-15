import './style.scss';
import { useState, useEffect } from 'react';

import dataService from '../../services/dataService';
import Category from './Category';

function Categories() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getUserData() {
            const data = await dataService.getUserData();
            setUserData(data);
            setIsLoading(false);
        }
        getUserData();
    }, []);

    return (
        <main className="categories">
            
        </main>
    );
}

export default Categories;