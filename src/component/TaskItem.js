import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateStatus,
  deleteTask,
  closeForm,
  toggleForm,
  openForm,
  editTask,
} from "../actions";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };

  onDelete = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm();
  };

  onEditTask = () => {
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  };

  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={
              task.status === true
                ? "label label-danger"
                : "label label-success"
            }
            onClick={this.onUpdateStatus}
          >
            {task.status === true ? "Kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.onEditTask}
          >
            <span className="fa fa-pencil mr-5"></span> Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.onDelete}
          >
            <span className="fa fa-trash mr-5"></span> Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProp = (state) => {
  return {};
};

const mapDispatchToProp = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(updateStatus(id));
    },
    onDeleteTask: (id) => {
      dispatch(deleteTask(id));
    },
    onCloseForm: () => {
      dispatch(closeForm());
    },
    onOpenForm: () => {
      dispatch(openForm());
    },
    onEditTask: (task) => {
      dispatch(editTask(task));
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(TaskItem);
