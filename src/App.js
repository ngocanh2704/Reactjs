import React, { Component } from "react";
import "./App.css";
import TaskForm from "./component/TaskForm";
import Control from "./component/Control";
import TaskList from "./component/TaskList";
import { findIndex, filter } from "lodash";
import { connect } from "react-redux";
import { toggleForm, closeForm, editTask, openForm } from "./actions";
// import demo from './trainning/demo'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (this.props.itemEditing && this.props.itemEditing.id !== "") {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: "",
      name: "",
      status: false,
    });
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

    //   
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
            <TaskForm />
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
              onClick={this.onToggleForm}
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
                <TaskList onFilter={this.onFilter} />
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
    itemEditing: state.itemEditing,
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
    onClearTask: (task) => {
      dispatch(editTask(task));
    },
    onOpenForm: () => {
      dispatch(openForm());
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(App);
