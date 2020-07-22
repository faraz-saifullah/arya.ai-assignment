import React, { Fragment, Component } from "react";
import { Redirect } from "react-router-dom";
import FileBase from "react-file-base64";
import withContext from "../../withContext";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";

const BASE_URL = "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      newImages: [],
      isLoading: true,
      isUploading: false,
    };
  }

  async componentDidMount() {
    setImmediate(async () => {
      if (this.props.context.user) {
        this.setState({
          isLoading: true,
        })
        const { username } = this.props.context.user;
        const resp = await axios.get(`${BASE_URL}/users/${username}/images`);
        const uploadedImages = [];
        resp.data.map((image) => {
          const imageObj = {
            name: image.imageName,
            base64Image: image.imageData,
          };
          uploadedImages.push(imageObj);
        });
        this.setState({
          images: uploadedImages,
          isLoading: false,
        });
      }
    });
  }

  handleUpload = (files) => {
    const images = this.state.images;
    const newImages = this.state.newImages;
    const imageObject = {
      name: `uploaded-${files.name}-${Date.now()}`,
      base64Image: files.base64,
    };
    images.push(imageObject);
    newImages.push(imageObject);
    this.setState({
      images: images,
      newImages: newImages,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = this.props.context.user;
    const imagesToUpload = this.state.newImages;
    this.setState({
      newImages: [],
      isUploading: true,
    });
    imagesToUpload.map((image) => {
      axios
        .post(`${BASE_URL}/users/${username}/images`, image)
        .then((response) => {
          this.setState({
            isUploading: false
          })
          alert(
            `Image Upload Successful\nImage Name: ${response.data.imageName}\nId: ${response.data._id}`
          );
        })
        .catch(() => {
          alert(
            `An unexpected error occured, Image ${image.name} Upload Unsuccessful!`
          );
        });
    });
  };

  render() {
    const { user } = this.props.context;
    return !user ? (
      <Redirect to="/login" />
    ) : (
        <Fragment>
          <div className="hero is-primary">
            <div className="hero-body container">
              <h4 className="title">Your Images</h4>
            </div>
          </div>
          {this.state.isUploading && (<LinearProgress />)}
          <br />
          <div className="container">
            <center>
              <form
                onSubmit={this.handleSubmit}
                encType="multipart/form-imageData"
              >
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={this.handleUpload}
                />
                <button
                  type="submit"
                  className="button is-primary is-medium"
                  onClick={this.handleSubmit}
                >
                  Upload
              </button>
              </form>
            </center>
            <br />
            <div className="column columns is-multiline">
              {this.state.images && this.state.images.length ? (
                this.state.images.map((image, index) => (
                  <div key={image.name}>
                    <br />
                    <img src={`${image.base64Image}`} />
                    <br />
                    <p>{image.name}</p>
                    <br />
                  </div>
                ))
              ) : (
                  <div>
                    {this.state.isLoading ? (
                      <CircularProgress />
                    ) : (
                        <div className="column">
                          <span className="title has-text-grey-light">
                            No Images found!
                          </span>
                        </div>
                      )}
                  </div>
                )}
            </div>
          </div>
        </Fragment>
      );
  }
}

export default withContext(User);
