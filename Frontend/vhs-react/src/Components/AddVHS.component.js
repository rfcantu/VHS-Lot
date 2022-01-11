import React, { Component } from "react";
import VHSDataService from "../Services/vhs.service";

export default class AddVHS extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind();
    this.saveVHS = this.saveVHS.bind();
    this.newVHS = this.newVHS.bind();

    this.state = {
      id: null,
      title: "",
      description: "",
      price: null,
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.description,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.price,
    });
  }

  saveVHS() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
    };

    VHSDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newVHS() {
    this.setState({
      id: null,
      title: "",
      description: "",
      price: null,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully</h4>
            <button className="btn btn-success" onClick={this.newVHS}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
