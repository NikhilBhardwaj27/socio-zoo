import React from "react";
import "antd/dist/antd.css";
import { Upload, Modal, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addPost, getAllPosts } from "../../redux/actions/post";
import { connect } from "react-redux";
import Loading from "../others/Loading";
import PostsItems from "./pages/PostsItems";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class MyPost extends React.Component {
  constructor(props) {
    super(props);

    this.imageRef = React.createRef();
    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      text: "",
    };
  }

  componentDidMount() {
    this.props.getAllPosts();
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    fileList = fileList.slice(-1);
    this.setState({ fileList });
  };

  handleText = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = () => {
    if (
      this.imageRef.current.state.fileList.length == 0 ||
      this.state.text == ""
    ) {
      return alert("Image or text must not be empty");
    }
    const image = this.imageRef.current.state.fileList[0].originFileObj;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", this.state.text);
    this.props.addPost(formData);
  };
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return this.props.loading ? (
      <Loading></Loading>
    ) : (
      <div>
        <div className="add-post-container">
          <h3>Add Post</h3>
          <Input
            placeholder="Enter your thoughts here"
            name="text"
            onChange={(e) => this.handleText(e)}
            value={this.state.text}
          ></Input>
          <Upload
            listType="picture-card"
            fileList={this.state.fileList}
            className="upload"
            name="image"
            ref={this.imageRef}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {this.state.fileList.length > 1 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>

          <Button onClick={() => this.handleSubmit()}>Submit</Button>
        </div>
        <div className="post-container">
          {this.props.posts
            ? this.props.posts.map((post) => {
                if (post.user == this.props.auth.id) {
                  return (
                    <PostsItems
                      post={post}
                      userId={this.props.auth.id}
                    ></PostsItems>
                  );
                }
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.user,
    posts: state.post.posts,
    loading: state.post.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (formData) => {
      dispatch(addPost(formData));
    },
    getAllPosts: () => {
      dispatch(getAllPosts());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPost);
