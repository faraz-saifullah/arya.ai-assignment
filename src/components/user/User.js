import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault();

  }
  render() {
    const user = {
      name: 'this user',

    }
    return (
      <div className=" column is-half">
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input type="file" accept="image/*" name="photo" onChange={this.handleSubmit} />
          <button type="submit" className="button is-primary is-medium">
            Upload
          </button>
        </form>
      </div>
    );
  }
}
export default User;
