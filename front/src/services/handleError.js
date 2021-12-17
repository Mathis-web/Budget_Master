import { toast } from "react-toastify";

const handleError = async (err) => {
    if(err) toast.error(err);
    else toast.error('Une erreur est survenue. Veuillez réessayer.');
};

export default handleError;