import React, { Component } from "react";
import "./App.css";
import TaskForm from "./component/TaskForm";
import Control from "./component/Control";
import TaskList from "./component/TaskList";
import { findIndex, filter } from "lodash";
import { connect } from "react-redux";
import { toggleForm, closeForm } from "./actions";
// import demo from './trainning/demo'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taksEditing: null,
      filterStatus: {
        name: "",
        status: -1,
      },
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taksEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taksEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taksEditing: null,
      });
    }
  };

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = findIndex(tasks, (task) => {
      return task.id === id;
    });
    var taksEditing = tasks[index];
    this.setState({
      taksEditing: taksEditing,
    });
    this.onShowForm();
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filterStatus: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
  };

  render() {
    var {
      taksEditing,
      // filterStatus,
      // keyword,
      sortBy,
      sortValue,
    } = this.state;

    var { isDisplayForm } = this.props;

    // if (filterStatus) {
    //   if (filterStatus.name) {
    //     tasks = filter(tasks, (task) => {
    //       return task.name.toLowerCase().indexOf(filterStatus.name) !== -1;
    //     });
    //   }

    //   tasks = filter(tasks, (task) => {
    //     if (filterStatus.status === -1) {
    //       return task;
    //     } else {
    //       return task.status === (filterStatus.status === 1 ? true : false);
    //     }
    //   });
    // }

    // tasks = filter(tasks, (task) => {
    //   return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    // });

    // if (sortBy === "name") {
    //   tasks.sort((a, b) => {
    //     if (a.name > b.name) return sortValue;
    //     else if (a.name < b.name) return -sortValue;
    //     else return 0;
    //   });
    // } else {
    //   tasks.sort((a, b) => {
    //     if (a.status > b.status) return -sortValue;
    //     else if (a.status < b.status) return sortValue;
    //     else return 0;
    //   });
    // }
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1>
        </div>

        <div className="row">
          <div
            className={
              isDisplayForm
                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                : "col-xs-0 col-sm-0 col-md-0 col-lg-0"
            }
          >
            {/* Form */}
            <TaskForm taksEditing={taksEditing} />
          </div>

          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>
              Thêm công việc
            </button>
            {/* Search - Sort */}

            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            {/* List */}

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList onUpdate={this.onUpdate} onFilter={this.onFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
  };
};

const mapDispatchToProp = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(toggleForm());
    },
    onCloseForm: () => {
      dispatch(closeForm());
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(App);
