import { dbDateTimeToView } from "./index.js";

const initEmployeeErrors = {
  firstnameerror: "",
  lastnameerror: "",
  usererror: "",
  passworderror: "",
  dnierror: "",
  phoneerror: "",
  activeerror: ""
};

const lengthAttribute = (object, employees, modal) => {
  let isError = false;
  let errors = {};
  for (let attr in object) {
    if (!attr.includes("error") && attr !== "id" && attr !== "active") {
      if (!/\S/.test(object[attr])) {
        isError = true;
        errors[`${attr}error`] =
        "Un campo no puede contener únicamente espacios en blanco";
      }
      if (attr === "password" && object[attr].length < 7) {
        isError = true;
        errors[
          `${attr}error`
        ] = `La contraseña debe contener como mínimo 7 caracteres`;
      }
      if (object[attr].length < 5) {
        isError = true;
        errors[
          `${attr}error`
        ] = `El campo debe contener como mínimo 5 caracteres`;
      }
      if (attr === "user" && object[attr] !== "" && userUnique(object[attr], employees) === false && modal === "add" ) {
        isError = true;
        errors[
          `${attr}error`
        ] = `El nombre de usuario ya esta siendo utilizado por otro empleado`;
      }
    }
  }
  return { isError, errors };
};

export const employeeValidation = (emp, employees, modal) => {
  let isError = false;
  let errors = Object.assign({}, { ...initEmployeeErrors });
  let employee = Object.assign({}, { ...emp, ...errors });
  const lengthvalidation = lengthAttribute(employee, employees, modal);
  if (lengthvalidation.isError) {
    isError = true;
    errors = lengthvalidation.errors;
    employee = Object.assign({}, { ...employee, ...errors });
  }
  return { isError, employee };
};

// Delete validation
export const notDeletable = (allServiceshifts, selected) => {
  let match = {};
  let error = false;
  let alert = "";
  selected.forEach(user => {
    allServiceshifts.map(serviceshift => {
      let empMatch = serviceshift.employees.find(emp => emp.user === user);
      if (empMatch !== undefined) {
        error = true;
        let msgSsh = `Horario de sede ${
          serviceshift.branch.branch
        } con inicio el ${
          dbDateTimeToView(serviceshift.begindate).dateTime
        } y fin el ${dbDateTimeToView(serviceshift.workspan).dateTime}\r\n`;
        if (match[user] === undefined) {
          match[user] = [msgSsh];
        } else {
          match[user].push(msgSsh);
        }
      }
      return null;
    });
  });
  let message = [];
  Object.keys(match).forEach(key => {
    message.push(
      `Empleado ${key} asociado con:\r\n${match[key].map(m => `${m}`)}`
    );
  });
  if (error) {
    alert = `No puede eliminar los siguientes empleados porque se encuentran asignados a uno o varios horarios:\r\n${message.map(
      m => `${m}`
    )}`;
  } else {
    alert = `Empleados(s) eliminado(s) correctamente`;
  }
  return { alert, error };
};

// Disable validation
export const notDisable = (allServiceshifts, selected) => {
  let match = {};
  let error = false;
  let alert = "";
  const activeServiceshifts = allServiceshifts.filter(
    serviceshift => serviceshift.active === true
  );
  selected.forEach(user => {
    activeServiceshifts.map(serviceshift => {
      let empMatch = serviceshift.employees.find(emp => emp.user === user);
      if (empMatch !== undefined) {
        error = true;
        let msgSsh = `Horario de sede ${
          serviceshift.branch.branch
        } con inicio el ${
          dbDateTimeToView(serviceshift.begindate).dateTime
        } y fin el ${dbDateTimeToView(serviceshift.workspan).dateTime}\r\n`;
        if (match[user] === undefined) {
          match[user] = [msgSsh];
        } else {
          match[user].push(msgSsh);
        }
      }
      return null;
    });
  });
  let message = [];
  Object.keys(match).forEach(key => {
    message.push(
      `Empleado ${key} asociado con:\r\n${match[key].map(m => `${m}`)}`
    );
  });
  if (error) {
    alert = `No puede deshabilitar los siguientes empleados porque se encuentran asignados a uno o varios horarios activos:\r\n${message.map(
      m => `${m}`
    )}`;
  } else {
    alert = `Estado de usuario(s) ha sido cambiado exitosamente`;
  }
  return { alert, error };
};

const userUnique = (newUser, employees) => {
  let unique = true;
  const match = employees.filter(employee => employee.user === newUser)
  if (match.length !== 0) {
    unique = false
  }
  return unique
}
