import React, { Component } from "react";
import { connect } from "react-redux";
import { sortTask } from "../actions";

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    var sort = {
      by: sortBy,
      value: sortValue,
    };
    this.props.onSort(sort);
  };

  render() {
    var { sort } = this.props;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp xếp <span className="fa fa-caret-square-o-down ml-5"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li
              onClick={() => {
                this.onClick("name", 1);
              }}
            >
              <a
                role="button"
                className={
                  (sort.by === "name" && sort.value) === 1
                    ? "sort_selected"
                    : null
                }
              >
                <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
              </a>
            </li>
            <li
              onClick={() => {
                this.onClick("name", -1);
              }}
            >
              <a
                role="button"
                className={
                  (sort.by === "name" && sort.value) === -1
                    ? "sort_selected"
                    : null
                }
              >
                <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
              </a>
            </li>
            <li role="separator" className="divider"></li>
            <li
              onClick={() => {
                this.onClick("status", 1);
              }}
            >
              <a
                role="button"
                className={
                  (sort.by === "status" && sort.value) === 1
                    ? "sort_selected"
                    : null
                }
              >
                Trạng thái kích hoạt
              </a>
            </li>
            <li
              onClick={() => {
                this.onClick("status", -1);
              }}
            >
              <a
                role="button"
                className={
                  (sort.by === "status" && sort.value) === -1
                    ? "sort_selected"
                    : null
                }
              >
                Trạng thái ẩn
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapToStateProps = (state) => {
  return {
    sort: state.sort,
  };
};

const mapToDispatchProps = (dispatch, action) => {
  return {
    onSort: (sort) => {
      dispatch(sortTask(sort));
    },
  };
};

export default connect(mapToStateProps, mapToDispatchProps)(Sort);
