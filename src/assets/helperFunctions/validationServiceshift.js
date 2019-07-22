import { modalDateTimeToLocalTime, dbDateTimeToView } from "./index.js";

// Helpers
const initServiceshiftErrors = {
  begindateerror: "",
  workspanerror: "",
  activeerror: "",
  branchIderror: ""
};

// Create and Update validation
const lengthAttribute = object => {
  let isError = false;
  let errors = {};
  for (let attr in object) {
    if (!attr.includes("error") && attr !== "id" && attr !== "active") {
      if (
        (attr === "begindate" || attr === "workspan") &&
        object[attr].length === 0
      ) {
        isError = true;
        errors[`${attr}error`] = "Elija una fecha y hora";
      }
      if (
        (attr === "branchId" || attr === "active") &&
        object[attr].length === 0
      ) {
        isError = true;
        errors[`${attr}error`] = `Seleccione una opción de la lista`;
      }
    }
  }
  return { isError, errors };
};

const dateCoherence = object => {
  let isError = false;
  let errors = {};
  let { begindate, workspan } = object;
  begindate = modalDateTimeToLocalTime(begindate).format.db;
  workspan = modalDateTimeToLocalTime(workspan).format.db;
  if (begindate >= workspan) {
    isError = true;
    errors[`begindateerror`] =
      "La fecha de inicio debe de ser anterior a la fecha de fin";
  }
  return { isError, errors };
};

export const serviceShiftValidation = ssh => {
  let isError = false;
  let errors = Object.assign({}, { ...initServiceshiftErrors });
  let serviceShift = Object.assign({}, { ...ssh, ...errors });
  const lengthvalidation = lengthAttribute(serviceShift);
  if (lengthvalidation.isError) {
    isError = true;
    errors = lengthvalidation.errors;
    serviceShift = Object.assign({}, { ...serviceShift, ...errors });
  }
  let dateValidation = dateCoherence(ssh);
  if (dateValidation.isError) {
    isError = true;
    errors = dateValidation.errors;
    serviceShift = Object.assign({}, { ...serviceShift, ...errors });
  }
  return { isError, serviceshift: serviceShift };
};

// Delete validation
export const notDeletable = (allServiceshifts, selected) => {
  let message = [];
  let error = false;
  let alert = "";
  selected.forEach(id => {
    const match = allServiceshifts.find(serviceshift => serviceshift.id === id);
    if (match.employees.length > 0) {
      error = true;
      message.push(
        `Horario con sede en ${match.branch.branch}, inicio: ${
          dbDateTimeToView(match.begindate).dateTime
        }, fin: ${
          dbDateTimeToView(match.workspan).dateTime}`
      );
    }
  });
  if (error) {
    alert = `No puede eliminar los horarios de las siguientes sedes porque se encuentran asignados a uno o varios empleados:\r\n ${message.map(
      m => `${m}\r\n`
    )}`;
  } else {
    alert = `Horarios(s) eliminado(s) correctamente`;
  }
  return { alert, error };
};
