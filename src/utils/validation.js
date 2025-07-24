const validator = require("validator");

const CheckValidations = ({ firstName, lastName, emailId, password }) => {
  if (!firstName?.trim() || !lastName) {
    throw new Error("Please enter both first name and last");
  }
  const isEmailValid = validator.isEmail(emailId);
  if (!isEmailValid) {
    throw new Error("Please enter a valid email Id");
  }
  const isPasswordValid = validator.isStrongPassword(password);
  if (!isPasswordValid) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = { CheckValidations, validateEditProfileData };
