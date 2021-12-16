import moment from 'moment';
import 'moment/locale/fr';

const returnJsDate = (postgresDate) => {
    moment.locale('fr'); 
    const date = moment(postgresDate).format('ll');
    return date;
}

export default returnJsDate;