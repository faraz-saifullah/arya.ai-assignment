import React, { Component } from "react";
import FileBase from 'react-file-base64';
import withContext from "../../withContext";
import axios from "axios";

const BASE_URL = 'http://localhost:5000'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    }
  }

  handleUpload = (files) => {
    const images = this.state.images;
    const imageObject = {
      name: `uploaded-${files.name}-${Date.now()}`,
      base64Image: files.base64,
    }
    images.push(imageObject);
    this.setState({
      images: images
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = this.props.context.user;
    axios.post(`${BASE_URL}/users/${username}/images`, this.state.images[0]).then((response) => {
      alert(`Image Upload Successful\nImage Name: ${response.data.imageName}\nId: ${response.data._id}`);
    }).catch(() => {
      alert('An unexpected error occured, Image Upload Unsuccessful!')
    })
  }

  render() {
    return (
      <div className=" column is-half">
        <form onSubmit={this.handleSubmit} encType="multipart/form-imageData">
          <FileBase type="file" multiple={false} onDone={this.handleUpload} />
          <button type="submit" className="button is-primary is-medium" onClick={this.handleSubmit}>
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default withContext(User);
