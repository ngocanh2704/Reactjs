import React, {Component} from 'react'

export default class Sort extends Component{
    render(){
        return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              id="dropdownMenu1"
            >
              Sắp Xếp
              <span className="fa fa-caret-square-o-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li>
                <a href="button" className="sort_selected">
                  <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                </a>
              </li>
              <li>
                <a href="button" className="sort_selected">
                  <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
                </a>
              </li>
              <li href="separator" className="divider"></li>
              <li>
                <a href="button">Trạng thái kích hoạt</a>
              </li>
              <li>
                <a href="button">Trạng thái ẩn</a>
              </li>
            </ul>
          </div>
        </div>
        )
    }
}