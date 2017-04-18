import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {TextInput} from '../../common/TextInput'
import styles from './index.css';

export class PostCreateWidget extends Component {
  constructor() {
    super();
    this.state = {
      title: ''
    }
    this.loadFile = this.loadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  addPost = () => {
    const titleRef = this.state.title;
    const fileRef = this.state.file;
    const category = this.refs.category;
    console.log(titleRef, fileRef);
    if (titleRef && fileRef) {
      this.props.addPost(titleRef, category.value, fileRef)
    }
  };

  loadFile(e){
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(1);
    reader.onloadend = () => {
      this.setState({
        file
      });
    };
    reader.readAsDataURL(file);
  }
  handleChange(e){
    this.setState({title: e.target.value})
  }
  render() {
    const cls = `${styles.form} ${(this.props.showElement === 'post' ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Đăng bài mới</h2>
          <div className={styles['form-group']}>
            <TextInput
              ref="title"
              type="text"
              placeholder="Tiêu đề"
              class={styles['form-field']}
              onChange={this.handleChange}
            />

          </div>
         <div className={styles['form-group']}>
           <TextInput
             type="file"
             ref="file"
             placeholder="Tiêu đề"
             class={styles['form-field']}
             onChange={this.loadFile}
           />
         </div >
          <div className={styles['form-group']}>
            <select ref="category" className={styles['form-field']}>
              <option value="GIF">GIF</option>
              <option value="Comic">Comic</option>
              <option value="Cool">Cool</option>
              <option value="Cute">Cute</option>
              <option value="Food">Food</option>
              <option value="Geeky">Geeky</option>
              <option value="Meme">Meme</option>
              <option value="WTF">WTF</option>
            </select>
          </div>
          <a className={styles['post-submit-button']} onClick={this.props.closeElement}>Hủy bỏ</a>
          <a className={styles['post-submit-button']}
             onClick={this.addPost}
             >Đăng bài</a>
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
