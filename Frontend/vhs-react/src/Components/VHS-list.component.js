import React, { Component } from "react";
import VHSDataService from "../Services/vhs.service";
import { Link } from "react-router-dom";

export default class VHSList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveVHS = this.retrieveVHS.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveVHS = this.setActiveVHS.bind(this);
    this.removeVHS = this.removeVHS.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      vhs: [],
      currentVHS: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }
  componentDidMount() {
    this.retrieveVHS();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.title;
    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveVHS() {
    VHSDataService.getAll()
      .then((response) => {
        this.setState({
          vhs: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshList() {
    this.retrieveVHS();
    this.setState({
      currentVHS: null,
      currentIndex: -1,
    });
  }

  setActiveVHS(vhs, index) {
    this.setState({
      currentVHS: vhs,
      currentIndex: index,
    });
  }

  removeVHS() {
    VHSDataService.delete(this.state.currentVHS.id)
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchTitle() {
    VHSDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          vhs: response.data,
        });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(console.log(err));
      });
  }

  render() {
    const { searchTitle, vhs, currentVHS, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                {" "}
                Search{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>VHS List</h4>
          <ul className="list-group">
            {vhs &&
              vhs.map((vhs, index) => (
                <li
                  className={
                    "list-group-item" + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveVHS(vhs, index)}
                  key={index}
                >
                  {vhs.title}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeVHS}
          >
            Remove VHS
          </button>
        </div>
        <div className="col-md-6">
          {currentVHS ? (
            <div>
              <h4>VHS</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentVHS.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentVHS.description}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentVHS.price}
              </div>

              <Link
                to={"/vhs/" + currentVHS.id}
                className="badge badge-warning"
              >
                {" "}
                Edit{" "}
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a VHS</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
