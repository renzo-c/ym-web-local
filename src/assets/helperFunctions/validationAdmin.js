const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

const resetErrors = {
  usernameerror: [],
  passworderror: [],
  emailerror: []
};

const alertMessages = {
  empty: "Un campo no puede contener únicamente espacios en blanco",
  minAdmin: "El campo debe contener como mínimo 5 caracteres",
  maxAdmin: "El campo debe contener como máximo 15 caracteres",
  repeatedAdmin: "El nombre de administrador ya esta siendo utilizado",
  minEmail: "El campo debe contener como mínimo 13 caracteres",
  maxEmail: "El campo debe contener como máximo 35 caracteres",
  format: "El dato ingresado debe tener el siguiente formato: <abc@xyz.com>",
  repeatedEmail: "El correo de administrador ya esta siendo utilizado",
  minPassword: "El campo debe contener como mínimo 5 caracteres",
  maxPassword: "El campo debe contener como máximo 15 caracteres"
};

const uniqueValue = (newValue, admins, attr) => {
  let unique = true;
  const match = admins.filter(admin => admin[`${attr}`] === newValue);
  if (match.length !== 0) {
    unique = false;
  }
  return unique;
};

const examiner = (adm, admins, modal) => {
  let isError = false;
  let errors = JSON.parse(JSON.stringify(resetErrors));
  for (let attr in adm) {
    if (!attr.includes("error") && attr !== "id") {
      if (!/\S/.test(adm[attr])) {
        isError = true;
        errors[`${attr}error`].push(alertMessages.empty);
      }
    }
    if (attr === "username") {
      const currentValue = adm[attr];
      const storedValue = adm.id
        ? admins.filter(n => n.id === adm.id)[0].username
        : "new";
      if (adm[attr].length < 5) {
        isError = true;
        errors[`${attr}error`].push(alertMessages.minAdmin);
      }
      if (adm[attr].length > 15) {
        isError = true;
        errors[`${attr}error`].push(alertMessages.maxAdmin);
      }
      if (currentValue !== storedValue) {
        if (
          !uniqueValue(adm[attr], admins, attr) ||
          adm[attr] === "superadmin"
        ) {
          isError = true;
          errors[`${attr}error`].push(alertMessages.repeatedAdmin);
        }
      }
    }
    if (attr === "email") {
      const currentValue = adm[attr];
      const storedValue = adm.id
        ? admins.filter(n => n.id === adm.id)[0].email
        : "new";
      if (adm[attr].length < 13) {
        isError = true;
        errors[`${attr}error`].push(alertMessages.minEmail);
      }
      if (adm[attr].length > 35) {
        isError = true;
        errors[`${attr}error`].push(alertMessages.maxEmail);
      }
      if (!emailRegex.test(String(currentValue).toLowerCase())) {
        isError = true;
        errors[`${attr}error`].push(alertMessages.format);
      }
      if (currentValue !== storedValue) {
        if (
          !uniqueValue(adm[attr], admins, attr) ||
          adm[attr] === "superadmin@gmail.com"
        ) {
          isError = true;
          errors[`${attr}error`].push(alertMessages.repeatedEmail);
        }
      }
    }
    if (attr === "password") {
      const currentValue = adm[attr];
      const storedValue = adm.id
        ? admins.filter(n => n.id === adm.id)[0].password
        : "new";
      if (currentValue !== storedValue) {
        if (adm[attr].length < 5) {
          isError = true;
          errors[`${attr}error`].push(alertMessages.minPassword);
        }
        if (adm[attr].length > 15) {
          isError = true;
          errors[`${attr}error`].push(alertMessages.maxPassword);
        }
      }
    }
  }
  return { isError, errors };
};

export const adminValidation = (adm, admins, modal) => {
  let isError = false;
  let errors = JSON.parse(JSON.stringify(resetErrors));
  let object = JSON.parse(JSON.stringify(adm));
  for (let attr in object) {
    if (attr.includes("error")) {
      delete object[attr];
    }
  }
  let admin = JSON.parse(JSON.stringify(object));
  const result = examiner(admin, admins, modal);
  if (result.isError) {
    isError = true;
    errors = result.errors;
    admin = Object.assign({}, { ...admin, ...errors });
  }
  return { isError, admin };
};
