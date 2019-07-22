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
import { DELETE_PARKING } from "../../../../mutations/parking";
import { GET_PARKINGS } from "../../../../queries/parking";
//Customized components
import Display from "../../../../components/Modal/parking/Display";
import BrchSshFilter from "../../../../components/Selector/Selector";
// Helper functions
import {
  dbDateTimeToView,
  getShiftandBranch
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
  { id: "begindate", numeric: false, disablePadding: true, label: "HORARIO" },
  { id: "branch", numeric: false, disablePadding: true, label: "SEDE" },
  { id: "owner", numeric: false, disablePadding: true, label: "PROPIETARIO" },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "HORA DE RECEPCIÓN"
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: true,
    label: "HORA DE RETORNO"
  },
  { id: "user", numeric: false, disablePadding: true, label: "EMPLEADO" },
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

const updateCacheDelete = (cache, { data: { deleteParking } }) => {
  const { parkings } = cache.readQuery({ query: GET_PARKINGS });
  cache.writeQuery({
    query: GET_PARKINGS,
    data: {
      parkings: parkings.filter(n => n.id !== deleteParking.id)
    }
  });
};

class EnhancedTableToolbar extends React.Component {
  deleteOnClick(deleteParking, selected, history) {
    selected.map(id =>
      deleteParking({
        variables: { id }
      })
    );
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
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <Mutation mutation={DELETE_PARKING} update={updateCacheDelete}>
                  {deleteParking => (
                    <DeleteIcon
                      onClick={() => {
                        this.deleteOnClick(deleteParking, selected, history);
                        alert(`Auto(s) registrado(s) eliminado(s)`);
                        return null;
                      }}
                    />
                  )}
                </Mutation>
              </IconButton>
            </Tooltip>
          ) : null
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
      rowsPerPage: 5
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
    let { data } = this.props;
    this.setState({ data });
    this.setState({
      branches: getShiftandBranch(data).branches,
      serviceShifts: getShiftandBranch(data).serviceShifts
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

  onFilterChanged = (branchId, serviceshiftId) => {
    const allParkings = this.props.data;
    let newAllParkings = "";
    if (serviceshiftId === "x" && branchId === "x") {
      newAllParkings = allParkings;
    } else if (branchId === "x" && serviceshiftId !== "x") {
      newAllParkings = allParkings.filter(
        parking => parking.serviceshift.id === serviceshiftId
      );
    } else if (serviceshiftId === "x" && branchId !== "x") {
      newAllParkings = allParkings.filter(
        parking => parking.serviceshift.branch.id === branchId
      );
    } else if (serviceshiftId !== "x" && branchId !== "x") {
      newAllParkings = allParkings
        .filter(parking => parking.serviceshift.id === serviceshiftId)
        .filter(parking => parking.serviceshift.branch.id === branchId);
    }
    this.setState({ data: newAllParkings });
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
      branches,
      serviceShifts,
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      console.log("this.props.data", this.props.data);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          history={this.props.history}
          resetValues={this.resetValues}
        />
        <div className={classes.marginComponent}>
          <BrchSshFilter
            branches={branches}
            serviceShifts={serviceShifts}
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
                      <TableCell
                        padding="checkbox"
                        onClick={!privileges ? null : (event => this.handleClick(event, n.id))}
                      >
                        <Checkbox
                          checked={!privileges ? null : isSelected}
                          disabled={!privileges}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {dbDateTimeToView(n.serviceshift.begindate).dateTime}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.serviceshift.branch.branch}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.owner}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {dbDateTimeToView(n.createdAt).time}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.updatedAt === n.createdAt
                          ? " - "
                          : dbDateTimeToView(n.updatedAt).time}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                      {n.employee.user}
                      </TableCell>
                      <TableCell
                        className={classNames(
                          classes.flexContainerActions,
                          classes.td
                        )}
                      >
                        <Display parking={n} />
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
