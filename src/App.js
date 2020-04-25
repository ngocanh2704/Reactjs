import React, { Component } from "react";
import "./App.css";
import TaskForm from "./component/TaskForm";
import Control from "./component/Control";
import TaskList from "./component/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [], //id: unique, name,status
      isDisplayForm: false,
      taksEditing: null,
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
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
    var index = this.findIndex(id);
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
    var index = this.findIndex(id);
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
    var index = this.findIndex(id);
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

  render() {
    var { tasks, isDisplayForm, taksEditing } = this.state;
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

            <Control />
            {/* List */}

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
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
