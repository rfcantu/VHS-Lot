import React, { Component } from "react";
import VHSDataService from "../Services/vhs.service";

export default class VHS extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getVHS = this.getVHS.bind(this);
    this.updateVHS = this.updateVHS.bind(this);
    this.deleteVHS = this.deleteVHS.bind(this);

    this.state = {
      currentVHS: {
        id: null,
        title: "",
        description: "",
        price: null,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getVHS(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentVHS: {
          ...prevState.currentVHS,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentVHS: {
        ...prevState.currentVHS,
        description: description,
      },
    }));
  }

  getVHS(id) {
    VHSDataService.get(id)
      .then((response) => {
        this.setState({
          currentVHS: response.data,
        });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateVHS() {
    VHSDataService.update(this.state.currentVHS.id, this.state.currentVHS)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The VHS was updated",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteVHS() {
    VHSDataService.delete(this.state.currentVHS.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/vhs");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { currentVHS } = this.state;

    return (
      <div>
        {currentVHS ? (
          <div className="edit-form">
            <h4>VHS</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentVHS.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentVHS.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="title"
                  value={currentVHS.price}
                  onChange={this.onChangePrice}
                />
              </div>
            </form>
          </div>
        ) : (
          // <button
          //  className="badge badge-danger mr-2"
          //  onClick={this.deleteVHS}
          //  >Delete</button>

          // <button
          // type="submit"
          //  className="badge badge-success"
          //  onClick={this.updateVHS}
          //  >Update</button>
          //  <p>{this.state.message}</p>
          <div>
            <br />
            <p>Please select a VHS</p>
          </div>
        )}
      </div>
    );
  }
}
