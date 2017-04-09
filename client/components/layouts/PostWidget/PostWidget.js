import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './index.css';

export class PostCreateWidget extends Component {
  constructor() {
    super();
    this.state = {
      imgSrc: '',
    };
  }
  addPost = () => {
    const titleRef = this.refs.title;
    const fileRef = this.state.file;
    const category = 'funny';
    if (titleRef.value && fileRef) {
      this.props.addPost(titleRef.value, category, fileRef);
      titleRef.value = ''; fileRef.value = null
    }
  };
  loadFile(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imgSrc: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
  render() {
    const cls = `${styles.form} ${(this.props.showElement === 'post' ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Đăng bài mới</h2>
          <input placeholder="Tiêu đề" className={styles['form-field']} ref="title" />
          <input type="file" ref="file" onChange={(e) => this.loadFile(e)} />
          <Link to={this.state.imgSrc} target="_blank">
            <img src={this.state.imgSrc} alt="" />
          </Link>
          <a className={styles['post-submit-button']} onClick={this.props.closeElement}>Cancel</a>
          <a className={styles['post-submit-button']} onClick={this.addPost}>Submit</a>
        </div>
        <div className={styles.backgroundPost} onClick={this.props.closeElement}>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showElement: PropTypes.string,
  closeElement: PropTypes.func.isRequired,
};

export default PostCreateWidget;
