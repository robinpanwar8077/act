const validation = (registrationForm) => {
    let errors = {};
    if((!registrationForm.first_name)){
        errors.first_name="Enter age";
    }
    if((!registrationForm.last_name)){
        errors.last_name="Enter last Name";
    }
    if((!registrationForm.address)){
        errors.address="Enter address";
    }
    if((!registrationForm.city)){
        errors.city="Enter city";
    }
    if((!registrationForm.state)){
        errors.state="Enter state";
    }
    if((!registrationForm.zip_Code)){
        errors.zip_Code="Enter zip_Code";
    }
    if((!registrationForm.mobile)){
        errors.mobile="Enter mobile";
    }
    if((!registrationForm.age)){
        errors.age="Enter age";
    }
    if((!registrationForm.gender)){
        errors.gender="Enter gender";
    }
    if((!registrationForm.email)){
        errors.email="Enter email";
    }
    if((!registrationForm.password)){
        errors.password="Enter password";
    }
    if((!registrationForm.confirmPassword)){
        errors.confirmPassword="Enter confirmPassword";
    }
    return errors;
}
export default validation;
