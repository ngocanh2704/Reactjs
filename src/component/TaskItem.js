import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleForm, updateStatus } from "../actions";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };

  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };

  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
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
            onClick={this.onUpdate}
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
  return {
    
  };
};

const mapDispatchToProp = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(updateStatus(id))
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(TaskItem);
