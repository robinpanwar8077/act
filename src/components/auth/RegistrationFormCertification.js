import {
  AiFillCaretDown,
  AiOutlineClose,
  AiOutlineMinus,
} from "react-icons/ai";
import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Header from "../Header";


export default function RegistrationFormCertification() {
  
  const history = useHistory();
  const intialValues = {
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    zip_Code: "",
    mobile: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    church: "",
    maritalStatus: "",
    firstChildren: "",
    secondChildren: "",
    thirdChildren: "",
    forthChildren: "",
    fifthChildren: "",
    sixChildren: "",
    seventhChildren: "",
    eightChildren: "",
    ninthChildren: "",
    tenthChildren: "",
    most_Passionate_Activity: "",
    second_Most_Passionate_Activity: "",
    third_Most_Passionate_Activity: "",
    most_Challenging_Past_Exp: "",
    second_Most_Challenging_Past_Exp: "",
    third_Most_Challenging_Past_Exp: "",
    been_saved: "",
    been_discipled: "",
    mentoring_Experience: "",
    membership_Experience: "",
    ministry_Experience: "",
    ordained: "",
    education_Level: "",
    languages_Spoken: "",
    veteran: "",
  };

  const [registrationForm, setRegistrationForm] = useState(intialValues);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState(false);
  const [children, setChildren] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [value, setValue] = useState("");
  const location = useLocation();
 
  const params = location.state?.descipleData;
  const params1 = location.state?.mentorData;
  const [verror, setVError] = useState(false);
  const closePopupp = () => setVError(false);
  console.log(params,"SEE")
  console.log(params1,"seeeeeeee")
  const states = [
    { name: 'Select a State' },
    { value: 'AK', name: 'Alaska' },
    { value: 'AL', name: 'Alabama' },
    { value: 'AR', name: 'Arkansas' },
    { value: 'AZ', name: 'Arizona' },
    { value: 'CA', name: 'California' },
    { value: 'CO', name: 'Colorado' },
    { value: 'CT', name: 'Connecticut' },
    { value: 'DC', name: 'DistrictofColumbia' },
    { value: 'DE', name: 'Delaware' },
    { value: 'FL', name: 'Florida' },
    { value: 'GA', name: 'Georgia' },
    { value: 'HI', name: 'Hawaii' },
    { value: 'IA', name: 'Iowa' },
    { value: 'ID', name: 'Idaho' },
    { value: 'IL', name: 'Illinois' },
    { value: 'IN', name: 'Indiana' },
    { value: 'KS', name: 'Kansas' },
    { value: 'KY', name: 'Kentucky' },
    { value: 'LA', name: 'Louisiana' },
    { value: 'MA', name: 'Massachusetts' },
    { value: 'MD', name: 'Maryland' },
    { value: 'ME', name: 'Maine' },
    { value: 'MI', name: 'Michigan' },
    { value: 'MN', name: 'Minnesota' },
    { value: 'MO', name: 'Missouri' },
    { value: 'MS', name: 'Mississippi' },
    { value: 'MT', name: 'Montana' },
    { value: 'NC', name: 'NorthCarolina' },
    { value: 'ND', name: 'NorthDakota' },
    { value: 'NE', name: 'Nebraska' },
    { value: 'NH', name: 'NewHampshire' },
    { value: 'NJ', name: 'NewJersey' },
    { value: 'NM', name: 'NewMexico' },
    { value: 'NV', name: 'Nevada' },
    { value: 'NY', name: 'NewYork' },
    { value: 'OH', name: 'Ohio' },
    { value: 'OK', name: 'Oklahoma' },
    { value: 'OR', name: 'Oregon' },
    { value: 'PA', name: 'Pennsylvania' },
    { value: 'RI', name: 'RhodeIsland' },
    { value: 'SC', name: 'SouthCarolina' },
    { value: 'SD', name: 'SouthDakota' },
    { value: 'TN', name: 'Tennessee' },
    { value: 'TX', name: 'Texas' },
    { value: 'UT', name: 'Utah' },
    { value: 'VA', name: 'Virginia' },
    { value: 'VT', name: 'Vermont' },
    { value: 'WA', name: 'Washington' },
    { value: 'WI', name: 'Wisconsin' },
    { value: 'WV', name: 'WestVirginia' },
    { value: 'WY', name: 'Wyoming' }
  ];


  useEffect(() => {
    getdisciple();
  }, [params]);
  useEffect(() => {
    getMentor();
  }, [params1]);

  const getdisciple = () => {
    console.log(params, "data", typeof params);
  }
  const getMentor = () => {
    console.log(params1, "data1", typeof params1);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(registrationForm);
    }
  }, [formErrors, isSubmit, registrationForm]);

  const onSubmit = async (e) => {
    
    e.preventDefault();
    setFormErrors(validate(registrationForm));
    
    setIsSubmit(true);


    if(Object.keys(formErrors).length === 0 || Object.keys(formErrors).length === undefined  && isSubmit) {
      console.log("there:", Object.keys(formErrors).length);
      const discipleData = { ...registrationForm, "user_type": "1" };
      const mentorData = { ...registrationForm, "user_type": "2" };
      const url = "api/register/";
      const config = {
        headers: {
          "Content-Type": "Application/json",

        },
        
      };
    
      if ((params)) {
      
        console.log("1", params);
        try {
          const body = JSON.stringify(discipleData);
          const res = await axios.post(url, body, config);
          console.log(res.data);
          setShow(true);
          setRegistrationForm(registrationForm);
          navigate();
        } catch (err) {
          // console.error(err.response.data)
          setErrors(true);
          console.log("error dis");
        }
      } else if ((params1)) {
 
        console.log("2", params1.user_type);

        try {
          const body = JSON.stringify(mentorData);
          const res = await axios.post(url, body, config);
          console.log(res.data);
          setShow(true);
          setRegistrationForm(registrationForm);
          navigate();
        } catch (err) {
          // console.error(err.response.data)
          setErrors(true);
          console.log("error menr");
        }
      }



    }
    else {
      setVError(true)
    }
  };

  const validate = (values) => {

    
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    if (!values.first_name) {
      errors.first_name = "First Name is Required!";
    }
    if (!values.last_name) {
      errors.last_name = "Last Name is Required!";
    }
    if (!values.age) {
      errors.age = "Age is Required";
    } else if (!Number(values.age)) {
      errors.age = "Only Number is required"
    }
    else if (values.age >= 100) {
      errors.age = "Invalid Age"
      console.log(values.age);
    }
    if (!values.gender) {
      errors.gender = "Please Select Gender";
    }
    if (!values.maritalStatus) {
      errors.maritalStatus = "Please Select maritalStatus";
    }
    if (!values.veteran) {
      errors.veteran = "Please Select yes or no";
    }
    if (!values.email) {
      errors.email = "Email ID is Required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid Email format!";
    }
    if (!values.mobile) {
      errors.mobile = "Contact Number is Required";
    } else if (values.mobile.length > 10) {
      errors.mobile = "Invalid Mobile Number"
    } else if (!Number(values.mobile)) {
      errors.mobile = "Only number is required"
      console.log("fs")
    }
    if (!values.password) {
      errors.password = "Password is Required!";
    } else if (values.password.length < 4) {
      errors.password = "PassWord Must be greater than 4 characters";
      console.log("true");
    } else if (values.password.length > 12) {
      errors.password = "PassWord Must be less than 12 characters";
      console.log(values.password);
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required!";
    } else if (!(values.confirmPassword.length === values.password.length)) {
      errors.confirmPassword = "Password do not match";
      console.log(values.confirmPassword, values.password);
    }
    if (!Number(values.zip_Code)) {
      errors.zip_Code = "Only number is required"
      console.log("fs")
    }


    return errors;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValue(e.target.value)
    if(e.target.value == "no"){
      history.push({pathname:"/checkout",state:{rform:registrationForm}});
     
    }
   
    setRegistrationForm({
      ...registrationForm,
      [name]: value,
    });
    console.log(registrationForm)
  };
  const handleClose = () => setErrors(false);
  const close = () => setShow(false);
  const navigate = () => {
    setTimeout(function () {
      history.push("/login");
    }, 2000);
  };

  const childArray = [
    "first",
    "second",
    "third",
    "forth",
    "fifth",
    "sixth",
    "seven",
    "eight",
    "ninth",
    "tenth",
  ];
  const addChild = (e) => {
    e.preventDefault();
    const add = children;
    const size = add.length + 1;
    if (size < 10) {
      setChildren([...children, childArray[size]]);
    } else {
      alert("max 10 children only");
    }
  };
  const removeChild = (e) => {
    e.preventDefault();
    let remove = children;
    remove.splice(children.length - 1, 1);
    setChildren([...remove]);
  };

  const ContactValidation = (object) => {

    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  const PassValidation = (object) => {

    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }


  const ZipValidation = (object) => {

    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }



  const handleAge = (object) => {

    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  const onChangeValue = (e) => {

   
  }
  console.log("value is", value);







  return (
    <div className="RegistrationForm">
      <Modal show={errors} onHide={handleClose} closebutton>
        <div className="popup-content error">
          <span onClick={handleClose}>
            <AiOutlineClose />
          </span>
          <h3>Error !!!</h3>
          <p> Please Fill the form Correctly.</p>
        </div>
      </Modal>
      <Modal show={verror} onHide={closePopupp}>
        <div className="popup-content error">
          <span onClick={closePopupp}>
            <AiOutlineClose />
          </span>
          <h3></h3>
          <h3>The application is not completely filled out. </h3>
        </div>
      </Modal>
      <Modal show={show} onHide={close} closebutton>
        <div className="popup-content success">
          <span>
            <GiCheckMark />
          </span>
          <h3>congratulation !!!</h3>
          <p>You've been Registered Successfully.</p>
        </div>
      </Modal>

      <form onSubmit={onSubmit} autoComplete="off">

        <Header heading="Registration for ACT Certification" />
        <div className="container">
          <div className="form-body">
            <div className="field-control">
              <label>Name<span className="required">*</span></label>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={onChange}
                  value={registrationForm.first_name}
                />
                <span className="error">{formErrors.first_name}</span>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={onChange}
                  value={registrationForm.last_name}
                />
                <span className="error">{formErrors.last_name}</span>
              </div>
            </div>
            <div className="field-control">

              <label>Address</label>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={onChange}
                />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={onChange}
                />
              </div>

              <div className="input-field custom-select">
                <select name="state" onChange={onChange}>
                  {states.map((e) => {
                    return (

                      <option value="state">{e.name}</option>


                    )
                  })}

                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>



              <div className="input-field">
                <input
                  type="number"
                  placeholder="Zip Code"
                  name="zip_Code"
                  maxLength="5"
                  onInput={ZipValidation}
                  onChange={onChange}
                />
                <span className="error">{formErrors.zip_Code}</span>
              </div>
            </div>
            <div className="field-control">
              <label>Personal Info<span className="required">*</span></label>
              <div className="input-field">
                <input
                  type="number"
                  placeholder="Contact No."
                  name="mobile"
                  onChange={onChange}
                  onInput={ContactValidation}
                  maxLength="11"
                />
                <span className="error">{formErrors.mobile}</span>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  placeholder="Age"
                  name="age"
                  onChange={onChange}
                  maxLength="3"
                  onInput={handleAge}
                />
                <span className="error">{formErrors.age}</span>
              </div>
              <div className="input-field custom-select">
                <select name="gender" onChange={onChange}>
                  <option value="gender">Select your Gender</option>
                  <option value="Male">Male</option>
                  <option value="Girl">Female</option>
                  <option value="other">Dont Want to discolse</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
                <span className="error">{formErrors.gender}</span>

              </div>
              <div className="input-field custom-select">
                <select name="maritalStatus" onChange={onChange}>
                  <option value="MaritalStatus">Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorce">Divorce</option>
                  <option value="widow">Widow</option>
                  <option value="widower">Widower</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
                <span className="error">{formErrors.maritalStatus}</span>

              </div>
              <div className="input-field custom-select">
                <select name="veteran" onChange={onChange} >
                  <option selected value="veteran" >Are you a veteran or first-responder?</option>
                  <option value="yes">Yes</option>
                  <option value="no" >No</option>

                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
                <span className="error">{formErrors.veteran}</span>

              </div>
            </div>
            <div className="field-control ">
              <label>Children</label>
              <div className="input-field children">
                <input
                  type="text"
                  placeholder="Birth Date of First Child"
                  // name={registrationForm.firstChildren}
                  name="firstChildren"
                  onChange={onChange}
                />
              </div>
              {children.map((child, index) => {
                return (
                  <div className="input-field children" key={index}>
                    <input
                      type="text"
                      placeholder={`Birth Date of ${child} Child`}
                      name={`${child}Children`}
                      onChange={onChange}
                    />
                    <button className="plus-btn" onClick={removeChild}>
                      <AiOutlineMinus className="plus-icon" />
                    </button>
                  </div>
                );
              })}
              <div className="child-field">
                <button className="plus-btn" onClick={addChild}>
                  <BsPlus className="plus-icon" />
                </button>
              </div>
            </div>
            <div className="field-control">
              <label>ACT Account Info<span className="required">*</span></label>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email ID"
                  name="email"
                  onChange={onChange}
                  value={registrationForm.email}
                />
                <span className="error">{formErrors.email}</span>
              </div>
              <div className="input-field">
                <input
                  type="Password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                  password="true"
                  maxLength="12"
                  onInput={PassValidation}
                  value={registrationForm.password}
                />
                <span className="error">{formErrors.password}</span>
              </div>
              <div className="input-field">
                <input
                  type="Password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={onChange}
                  maxLength="12"
                  onInput={PassValidation}
                  value={registrationForm.confirmPassword}
                />
                <span className="error">{formErrors.confirmPassword}</span>
              </div>
            </div>
            <div className="field-control">
              <label>Church</label>
              <div className="input-field custom-select">
                <select name="church" onChange={onChange}>
                  <option value="" disabled selected>
                    Select One
                  </option>
                  <option value="Not Affiliated">
                    Not Affiliated
                  </option>
                  <option value="Catholic">
                    Catholic
                  </option>
                  <option value="Protestant">
                    Protestant
                  </option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
            </div>
            <div className="field-control">
              <label>Your Real Life Experiences (RLES)</label>
              <p>Your Most Passionate Experiences (TOP 3)</p>
              <div className="input-field custom-select">
                <select name="most_Passionate_Activity" onChange={onChange}>
                  <option value="Most Passionate Activity" disabled selected >
                    Most Passionate Activity
                  </option>
                  <option value="Church Volunteer">Church Volunteer</option>
                  <option value="Community Volunteer Services">Community Volunteer Services</option>
                  <option value="Small Group Leader/Member Ministry">Small Group Leader/Member Ministry</option>
                  <option value="Sports and Recreational Ministry">Sports and Recreational Ministry</option>
                  <option value="Mission and Travel Ministry">Mission and Travel Ministry</option>

                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field custom-select">
                <select name="second_Most_Passionate_Activity" onChange={onChange}>
                  <option value="Second Most Passionate Activity" disabled selected>
                    Second Most Passionate Activity
                  </option>
                  <option value="Church Volunteer">Church Volunteer</option>
                  <option value="Community Volunteer Services">Community Volunteer Services</option>
                  <option value="Small Group Leader/Member Ministry">Small Group Leader/Member Ministry</option>
                  <option value="Sports and Recreational Ministry">Sports and Recreational Ministry</option>
                  <option value="Mission and Travel Ministry">Mission and Travel Ministry</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field custom-select">
                <select name="third_Most_Passionate_Activity" onChange={onChange}>
                  <option value="Third Most Passionate Activity" disabled selected>
                    Third Most Passionate Activity
                  </option>
                  <option value="Church Volunteer">Church Volunteer</option>
                  <option value="Community Volunteer Services">Community Volunteer Services</option>
                  <option value="Small Group Leader/Member Ministry">Small Group Leader/Member Ministry</option>
                  <option value="Sports and Recreational Ministry">Sports and Recreational Ministry</option>
                  <option value="Mission and Travel Ministry">Mission and Travel Ministry</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <p>Your Most Challenging Experiences (TOP 3)</p>
              <div className="input-field custom-select">
                <select name="most_Challenging_Past_Exp" onChange={onChange}>
                  <option value="Most Challenging Past Experience" disabled selected >
                    Most Challenging Past Experience
                  </option>
                  <option value="PTSD (Post Traumatic Stress - all forms)">PTSD (Post Traumatic Stress - all forms)
                  </option>
                  <option value="Suicidal Ideation (Current)">Suicidal Ideation (Current)</option>
                  <option value="Suicidal Ideation (Past)">Suicidal Ideation (Past)</option>
                  <option value="Abortion">Abortion</option>
                  <option value="Addictions">Addictions</option>
                  <option value="Adultery">Adultery</option>
                  <option value="Relationship dissolution and divorce">Relationship dissolution and divorce</option>
                  <option value="Cult Experience">Cult Experience</option>
                  <option value="Child Abuse">Child Abuse</option>
                  <option value="Spousal Abuse">Spousal Abuse</option>
                  <option value="Discrimination">Discrimination</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field custom-select">
                <select name="second_Most_Challenging_Past_Exp" onChange={onChange}>
                  <option value="Second Most Challenging Past Experience" disabled selected>
                    Second Most Challenging Past Experience
                  </option>
                  <option value="PTSD (Post Traumatic Stress - all forms)">PTSD (Post Traumatic Stress - all forms)
                  </option>
                  <option value="Suicidal Ideation (Current)">Suicidal Ideation (Current)</option>
                  <option value="Suicidal Ideation (Past)">Suicidal Ideation (Past)</option>
                  <option value="Abortion">Abortion</option>
                  <option value="Addictions">Addictions</option>
                  <option value="Adultery">Adultery</option>
                  <option value="Relationship dissolution and divorce">Relationship dissolution and divorce</option>
                  <option value="Cult Experience">Cult Experience</option>
                  <option value="Child Abuse">Child Abuse</option>
                  <option value="Spousal Abuse">Spousal Abuse</option>
                  <option value="Discrimination">Discrimination</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field custom-select">
                <select name="third_Most_Challenging_Past_Exp" onChange={onChange}>
                  <option value="Third Most Challenging Past Experience" disabled selected>
                    Third Most Challenging Past Experience
                  </option>
                  <option value="PTSD (Post Traumatic Stress - all forms)">PTSD (Post Traumatic Stress - all forms)
                  </option>
                  <option value="Suicidal Ideation (Current)">Suicidal Ideation (Current)</option>
                  <option value="Suicidal Ideation (Past)">Suicidal Ideation (Past)</option>
                  <option value="Abortion">Abortion</option>
                  <option value="Addictions">Addictions</option>
                  <option value="Adultery">Adultery</option>
                  <option value="Relationship dissolution and divorce">Relationship dissolution and divorce</option>
                  <option value="Cult Experience">Cult Experience</option>
                  <option value="Child Abuse">Child Abuse</option>
                  <option value="Spousal Abuse">Spousal Abuse</option>
                  <option value="Discrimination">Discrimination</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
            </div>
            <div className="field-control">
              <label>Your Faith</label>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="When were you saved? (year only)"
                  name="been_saved"
                  onChange={onChange}
                  value={registrationForm.been_saved}
                />
              </div>
              <div className="input-field custom-select">
                <select name="been_discipled" onChange={onChange}>
                  <option value="Have You Been Discipled?" disabled selected>
                    Have You Been Discipled?
                  </option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field custom-select">
                <select name="mentoring_Experience" onChange={onChange}>
                  <option value="Do You Have Any Spiritual Mentoring Experience?" disabled selected>
                    Do You Have Any Spiritual Mentoring Experience?
                  </option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field custom-select">
                <select name="membership_Experience" onChange={onChange}>
                  <option value="Do You Have Any Small Group Leadership or Membership
                  Experience?" disabled selected>
                    Do You Have Any Small Group Leadership or Membership
                    Experience?
                  </option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field custom-select">
                <select name="ministry_Experience" onChange={onChange}>
                  <option value=" Do You Have Any Church Ministry Experience?" disabled selected>
                    Do You Have Any Church Ministry Experience?
                  </option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field custom-select">
                <select name="ordained" onChange={onChange}>
                  <option value="Are You Ordained?" disabled selected>
                    Are You Ordained?
                  </option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
            </div>
            <div className="field-control">
              <label>Education and Languages Spoken</label>
              <div className="input-field custom-select">
                <select name="education_Level" onChange={onChange}>
                  <option value="Education Level" disabled selected >
                    Education Level
                  </option>
                  <option value="High School Diploma">High School Diploma</option>
                  <option value="College or Undergraduate">College or Undergraduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="None">None</option>
                </select>
                <span className="arrow">
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="input-field">
                <input type="text" name="languages_Spoken" placeholder="Languages Spoken" onChange={onChange} />
              </div>
            </div>
            <Link to="login">  <button type="button" class="btn btn-secondary canc">Cancel</button></Link>

            <button type="submit" class="btn btn-secondary subm"> <p style={{ "color": "#fbbb00" }}>Submit</p></button>
          </div>
        </div>
      </form>
    </div>
  );
}
