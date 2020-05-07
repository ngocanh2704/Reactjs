import React, { Component } from "react";
import "./App.css";
import TaskForm from "./component/TaskForm";
import Control from "./component/Control";
import TaskList from "./component/TaskList";
import { findIndex, filter } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [], //id: unique, name,status
      isDisplayForm: false,
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

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: [],
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x100000)
      .toString(16)
      .substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + "-" + this.s4();
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

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = this.generateID();
      console.log(tasks);
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taksEditing: "",
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = findIndex(tasks, (task) => {
      return task.id === id;
    });
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = findIndex(tasks, (task) => {
      return task.id === id;
    });
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
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

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
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
      tasks,
      isDisplayForm,
      taksEditing,
      filterStatus,
      keyword,
      sortBy,
      sortValue,
    } = this.state;

    if (filterStatus) {
      if (filterStatus.name) {
        tasks = filter(tasks, (task) => {
          return task.name.toLowerCase().indexOf(filterStatus.name) !== -1;
        });
      }

      tasks = filter(tasks, (task) => {
        if (filterStatus.status === -1) {
          return task;
        } else {
          return task.status === (filterStatus.status === 1 ? true : false);
        }
      });
    }

    tasks = filter(tasks, (task) => {
      return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    if (sortBy === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0;
      });
    }

    var elmTaskForm = isDisplayForm ? (
      <TaskForm
        onCloseForm={this.onCloseForm}
        onSubmit={this.onSubmit}
        taksEditing={taksEditing}
      />
    ) : null;
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
            {elmTaskForm}
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
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
