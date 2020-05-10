import React, { Component } from "react";
import { connect } from "react-redux";
import { addTask } from "../actions";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }

  componentWillMount() {
    if (this.props.taksEditing) {
      this.setState({
        id: this.props.taksEditing.id,
        name: this.props.taksEditing.name,
        status: this.props.taksEditing.status,
      });
    }
  }

  //khi them cong viec Task Form render muon edit
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taksEditing) {
      this.setState({
        id: nextProps.taksEditing.id,
        name: nextProps.taksEditing.name,
        status: nextProps.taksEditing.status,
      });
    } else if (!nextProps.taksEditing) {
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // this.props.onSubmit(this.state);
    this.props.onAddTask(this.state)
    this.onClear();
    this.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };

  render() {
    var { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id !== "" ? "Cập Nhật Công Việc" : "Thêm Công Việc"}
            <span
              className="fa fa-times-circle text-right"
              onClick={this.onCloseForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng thái:</label>
            <select
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <div className="text-center mt-15">
              <button type="submit" className="btn btn-warning">
                <span className="fa fa-plus mr-5"></span>Lưu lại
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onClear}
              >
                <span className="fa fa-close mr-5"></span>Hủy bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {};
};

const mapDispatchToProp = (dispatch, props) => {
  return {
    onAddTask: (task) => {
      dispatch(addTask(task));
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(TaskForm);
