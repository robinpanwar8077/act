"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var validation = function validation(registrationForm) {
  var errors = {};

  if (!registrationForm.first_name) {
    errors.first_name = "Enter First Name";
  }

  if (!registrationForm.last_name) {
    errors.last_name = "Enter First Name";
  }

  if (!registrationForm.address) {
    errors.address = "Enter First Name";
  }

  if (!registrationForm.city) {
    errors.city = "Enter First Name";
  }

  if (!registrationForm.state) {
    errors.state = "Enter First Name";
  }

  if (!registrationForm.zip_Code) {
    errors.zip_Code = "Enter First Name";
  }

  if (!registrationForm.mobile) {
    errors.mobile = "Enter First Name";
  }

  if (!registrationForm.age) {
    errors.age = "Enter First Name";
  }

  if (!registrationForm.gender) {
    errors.gender = "Enter First Name";
  }

  if (!registrationForm.email) {
    errors.email = "Enter First Name";
  }

  if (!registrationForm.password) {
    errors.password = "Enter First Name";
  }

  if (!registrationForm.confirmPassword) {
    errors.confirmPassword = "Enter First Name";
  }

  return errors;
};

var _default = validation;
exports.default = _default;