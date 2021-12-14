import emailValidator from 'email-validator';
const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');

const validator = {
    bothPassword(password1, password2) {
        if(password1 === password2) return true;
        return false;
    },

    email(email) {
        const isEmailValid = emailValidator.validate(email);
        if(isEmailValid) return true;
        return false;
    },

    strengthPassword(password) {
        if(strongPassword.test(password)) return 'strong';
        if(mediumPassword.test(password)) return 'medium';
        return 'weak';
    }
}

export default validator;