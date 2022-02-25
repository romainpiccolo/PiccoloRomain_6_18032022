class Validator {
    constructor() {}

    // Check if a name has 2 or more letters
    static #isValidName(value) {
        return value.length >= 2;
    };

    // Check if it's a valid email
    static #isValidEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    static validate(field) {
        let isValid = false;
        let value = null;

        switch (field.verifType) {
            case "name":
                value = document.getElementById(field.id).value;
                isValid = Validator.#isValidName(value);
                
                break;
                
            case "email":
                value = document.getElementById(field.id).value;
                isValid = Validator.#isValidEmail(value);
    
                break;
        
            default:
                break;
        }
    
        return isValid;
    }
}

export { Validator };