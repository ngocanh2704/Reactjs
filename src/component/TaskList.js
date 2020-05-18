import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import { filterTask } from "../actions";
import { filter } from "lodash";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, //All -1, active 1, deactive: 0
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status: name === "filterStatus" ? value : this.state.filterStatus,
    };
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { tasks, filterTable } = this.props;
    console.log(filterTable);
    var { filterName, filterStatus } = this.state;
    if (filterTable.name) {
      tasks = tasks.filter((task) => {
        return (
          task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
        );
      });
    }

    if (filterTable.status) {
      tasks = filter((task) => {
        if (filterTable.status === -1) {
          return task;
        } else {
          console.log(task.status)
          return task.status === (filterTable.status === 1 ? true : false);
        }
      });
    }
    var elmTask = tasks
      ? tasks.map((task, index) => {
          return <TaskItem key={task.id} index={index} task={task} />;
        })
      : null;

    return (
      <table className="table table-hover table-bordered mt-15">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elmTask}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
  };
};

const mapDispatchToProps = (dispath, props) => {
  return {
    onFilterTable: (filter) => {
      dispath(filterTask(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
