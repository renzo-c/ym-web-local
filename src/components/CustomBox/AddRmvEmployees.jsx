import React from "react";
// @material-ui/core components
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { ADD_EMPLOYEE_TO_SERVICESHIFT } from "../../mutations/serviceShift";
import { GET_SERVICESHIFTS } from "../../queries/serviceShift";
import { DELETE_EMPLOYEE_FROM_SERVICESHIFT } from "../../mutations/serviceShift";

const updateCacheDeleteEmployee = (
  cache,
  { data: { deleteEmployeeFromServiceShift } }
) => {
  const { serviceShifts } = cache.readQuery({ query: GET_SERVICESHIFTS });
  const index = deleteEmployeeFromServiceShift.id;
  serviceShifts[index] = deleteEmployeeFromServiceShift;
  cache.writeQuery({
    query: GET_SERVICESHIFTS,
    data: {
      serviceShifts: serviceShifts
    }
  });
};

const updateCacheAdd = (cache, { data: { addEmployeeToServiceShift } }) => {
  const { serviceShifts } = cache.readQuery({ query: GET_SERVICESHIFTS });
  const index = addEmployeeToServiceShift.id;
  serviceShifts[index] = addEmployeeToServiceShift;
  cache.writeQuery({
    query: GET_SERVICESHIFTS,
    data: {
      serviceShifts: serviceShifts
    }
  });
};

class AddRmvEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assigned: []
    };
    this.handleAssigned = this.handleAssigned.bind(this);
    this.handleUnlinked = this.handleUnlinked.bind(this);
  }

  handleAssigned(e, id, addEmployeeToServiceShift) {
    e.preventDefault();
    let assigned = JSON.parse(JSON.stringify(this.state.assigned));
    assigned = [...assigned, id];
    this.setState({ assigned });
    this.props.handleSave(addEmployeeToServiceShift, id);
  }

  handleUnlinked(e, id, deleteEmployeeFromServiceShift) {
    e.preventDefault();
    let assigned = JSON.parse(JSON.stringify(this.state.assigned));
    assigned.splice(assigned.indexOf(id), 1);
    this.setState({ assigned });
    this.props.handleDelete(deleteEmployeeFromServiceShift, id);
  }

  isNotAssigned = id => this.state.assigned.indexOf(id) === -1;

  componentWillMount() {
    let { employees } = this.props.serviceShift;
    let assigned = [];
    employees.map(employee => assigned.push(employee.id));
    this.setState({ assigned });
  }

  render() {
    return (
      <form>
        <div>Asignar empleados:</div>
        {this.props.employees.map((employee, index) => {
          return (
            <div key={index} value={employee.id}>
              {this.isNotAssigned(employee.id) && (
                <Tooltip title="Asignar">
                  <Mutation
                    mutation={ADD_EMPLOYEE_TO_SERVICESHIFT}
                    update={updateCacheAdd}
                    refetchQueries={() => {
                        return [{ query: GET_SERVICESHIFTS }];
                      }}
                  >
                    {addEmployeeToServiceShift => (
                      <IconButton
                        aria-label="Asignar"
                        style={{ padding: "2px" }}
                        onClick={e =>
                          this.handleAssigned(
                            e,
                            employee.id,
                            addEmployeeToServiceShift
                          )
                        }
                      >
                        <i className="material-icons md-18">done</i>
                      </IconButton>
                    )}
                  </Mutation>
                </Tooltip>
              )}
              {!this.isNotAssigned(employee.id) && (
                <Tooltip title="Desvincular">
                  <Mutation
                    mutation={DELETE_EMPLOYEE_FROM_SERVICESHIFT}
                    update={updateCacheDeleteEmployee}
                    refetchQueries={() => {
                        return [{ query: GET_SERVICESHIFTS }];
                      }}
                  >
                    {deleteEmployeeFromServiceShift => (
                      <IconButton
                        aria-label="Asignar"
                        style={{ padding: "2px" }}
                        onClick={e =>
                          this.handleUnlinked(
                            e,
                            employee.id,
                            deleteEmployeeFromServiceShift
                          )
                        }
                      >
                        <i className="material-icons md-18">clear</i>
                      </IconButton>
                    )}
                  </Mutation>
                </Tooltip>
              )}
              {employee.firstname + " " + employee.lastname}
            </div>
          );
        })}
      </form>
    );
  }
}

export default AddRmvEmployees;
