import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
//GraphQL
import { Mutation } from "react-apollo";
import { GET_EMPLOYEEXSERVICESHIFTS } from "../../../../queries/employeexserviceshifts";
import { DELETE_EMPLOYEEXSERVICESHIFT } from "../../../../mutations/employeexserviceshifts";
//Customized components
import Display from "../../../../components/Modal/empxsrv/Display";
import BrchSshFilter from "../../../../components/Selector/Selector";
// Helper functions

import {
  dbDateTimeToView,
  getSshIdAndEmpId,
  getFilterData
} from "assets/helperFunctions/index.js";
import { adminFullPrivileges } from "assets/helperFunctions/index.js";


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "employeeName",
    numeric: false,
    disablePadding: true,
    label: "EMPLEADO"
  },
  { id: "branchName", numeric: false, disablePadding: true, label: "SEDE" },
  {
    id: "begindate",
    numeric: false,
    disablePadding: true,
    label: "HORARIO PROGRAMADO"
  },
  { id: "start", numeric: false, disablePadding: true, label: "INICIO" },
  { id: "comment", numeric: false, disablePadding: true, label: "COMENTARIO" },
  { id: "actions", numeric: false, disablePadding: true, label: "DETALLES" }
];

const privileges = adminFullPrivileges();

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      // onSelectAllClick,
      order,
      orderBy
      // numSelected,
      // rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              disabled
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={numSelected === rowCount}
              // onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
  i: {
    marginLeft: "-12px"
  }
});

const updateCacheDelete = (
  cache,
  { data: { deleteEmployeexserviceshift } }
) => {
  const { employeesxserviceshifts } = cache.readQuery({
    query: GET_EMPLOYEEXSERVICESHIFTS
  });
  cache.writeQuery({
    query: GET_EMPLOYEEXSERVICESHIFTS,
    data: {
      employeesxserviceshifts: employeesxserviceshifts.filter(
        n => n.id !== deleteEmployeexserviceshift.id
      )
    }
  });
};

class EnhancedTableToolbar extends React.Component {
  deleteOnClick(deleteEmployeexserviceshift, selected, history) {
    selected.map(id => {
      let ids = getSshIdAndEmpId(id, this.props.empxsrv);
      let employeeId = ids.employeeId;
      let serviceshiftId = ids.serviceshiftId;
      deleteEmployeexserviceshift({
        variables: { id: serviceshiftId, employeeId }
      });
      return null;
    });
    this.props.resetValues();
  }
  render() {
    const { numSelected, classes, selected, history } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : null}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {privileges && (numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <Mutation
                  mutation={DELETE_EMPLOYEEXSERVICESHIFT}
                  update={updateCacheDelete}
                  refetchQueries={() => {
                    return [{ query: GET_EMPLOYEEXSERVICESHIFTS }];
                  }}
                >
                  {deleteEmployeexserviceshift => (
                    <DeleteIcon
                      onClick={() => {
                        this.deleteOnClick(
                          deleteEmployeexserviceshift,
                          selected,
                          history
                        );
                        alert(`Turno(s) eliminado(s)`);
                        return null;
                      }}
                    />
                  )}
                </Mutation>
              </IconButton>
            </Tooltip>
          ) :
          null)
          /* (
            <Tooltip title="Filtrar lista">
              <IconButton aria-label="Filtrar lista">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          ) */
          }
        </div>
      </Toolbar>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020,
    align: "centre"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  td: {
    padding: "1%"
  },
  flexContainerActions: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cuttedView: {
    margin: "0 0 0 0",
    textOverflow: "ellipsis",
    width: "130px",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  marginComponent: {
    marginLeft: "20px"
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "user",
      selected: [],
      data: [],
      branches: [],
      serviceShifts: [],
      page: 0,
      rowsPerPage: 5,
      fBranches: [],
      fServiceShifts: []
    };
    this.resetValues = this.resetValues.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentWillMount() {
    let { data, branches, serviceShifts } = this.props;
    this.setState({ data, branches, serviceShifts });
    this.setState({
      fBranches: getFilterData(data, serviceShifts).branches,
      fServiceShifts: getFilterData(data, serviceShifts).serviceShifts
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  }

  resetValues() {
    this.setState({ selected: [] });
  }

  getBranchName(serviceshiftId) {
    let serviceshift = "";
    serviceshift = this.state.serviceShifts.filter(
      serviceshift => serviceshift.id === serviceshiftId
    );
    let branchName = serviceshift[0].branch.branch;
    let branchId = serviceshift[0].branch.id;
    serviceshift = {};
    serviceshift["branchName"] = branchName;
    serviceshift["branchId"] = branchId;
    return serviceshift;
  }

  getBegindate(serviceshiftId) {
    let serviceshift = "";
    serviceshift = this.state.serviceShifts.filter(
      serviceshift => serviceshift.id === serviceshiftId
    );
    let begindate = serviceshift[0].begindate;
    return begindate;
  }

  getEmployeeName(employeeId) {
    let arrEmployees = [];
    let employeeName = [];
    this.state.serviceShifts.map(serviceshift => {
      serviceshift.employees.map(employee =>
        arrEmployees.push({ ...employee })
      );
      return null;
    });
    arrEmployees = this.removeDuplicates(arrEmployees, "id");
    employeeName = arrEmployees.filter(employee => employee.id === employeeId);
    employeeName = `${employeeName[0].firstname} ${employeeName[0].lastname}`;
    return employeeName;
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};
    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  buildNewAllEmpxSrv(allEmpxSrv) {
    allEmpxSrv.map(empxsrv => {
      let branch = this.getBranchName(empxsrv.serviceshiftId);
      let begindate = this.getBegindate(empxsrv.serviceshiftId);
      let employeeName = this.getEmployeeName(empxsrv.employeeId);
      empxsrv["branchName"] = branch.branchName;
      empxsrv["branchId"] = branch.branchId;
      empxsrv["begindate"] = begindate;
      empxsrv["employeeName"] = employeeName;
      return null;
    });
  }

  onFilterChanged = (branchId, serviceshiftId) => {
    let allEmpxSrv = this.props.data;
    this.buildNewAllEmpxSrv(allEmpxSrv);
    let newAllEmpxsrvs = "";
    if (serviceshiftId === "x" && branchId === "x") {
      newAllEmpxsrvs = allEmpxSrv;
    } else if (branchId === "x" && serviceshiftId !== "x") {
      newAllEmpxsrvs = allEmpxSrv.filter(
        empxsrvs => empxsrvs.serviceshiftId === serviceshiftId
      );
    } else if (serviceshiftId === "x" && branchId !== "x") {
      newAllEmpxsrvs = allEmpxSrv.filter(
        empxsrvs => empxsrvs.branchId === branchId
      );
    } else if (serviceshiftId !== "x" && branchId !== "x") {
      newAllEmpxsrvs = allEmpxSrv
        .filter(empxsrvs => empxsrvs.serviceshiftId === serviceshiftId)
        .filter(empxsrvs => empxsrvs.branchId === branchId);
    }
    this.setState({ data: newAllEmpxsrvs });
  };

  render() {
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      fBranches,
      fServiceShifts
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    this.buildNewAllEmpxSrv(data);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          history={this.props.history}
          resetValues={this.resetValues}
          empxsrv={data}
        />
        <div className={classes.marginComponent}>
          <BrchSshFilter
            branches={fBranches}
            serviceShifts={fServiceShifts}
            onFilterChanged={this.onFilterChanged}
          />
        </div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      // hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      {<TableCell
                        padding="checkbox"
                        onClick={!privileges ? null : (event => this.handleClick(event, n.id))}
                      >
                        <Checkbox checked={isSelected} disabled={!privileges}/>
                      </TableCell>}
                      <TableCell component="th" scope="row" padding="none">
                        {n.employeeName}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.branchName}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {dbDateTimeToView(n.begindate).dateTime}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.start !== null
                          ? dbDateTimeToView(n.start).dateTime
                          : "SIN INICIO"}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <p className={classes.cuttedView}>{n.comment}</p>
                      </TableCell>
                      <TableCell
                        className={classNames(
                          classes.flexContainerActions,
                          classes.td
                        )}
                      >
                        <Display empxsrv={n} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
