import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// Import Style
import styles from './index.css';

export class PostCreateWidget extends Component {
  constructor() {
    super();
    this.state = {
      imgSrc: '',
      showError : false,
      showErrorSize : false,
      disabled: true
    };
  }
  addPost = () => {
    console.log(1)
    const titleRef = this.refs.title;
    const fileRef = this.state.file;
    const category = this.refs.category;
    if (titleRef.value && fileRef) {
      this.props.addPost(titleRef.value, category.value, fileRef);
      titleRef.value = ''; fileRef.value = null
    } else if(!titleRef.value && !fileRef) {
      this.setState({showError: true,showErrorSize: true});
    } else if(titleRef.value && !fileRef) {
      this.setState({showErrorSize: true});
    }
  };

  loadFile(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(e.target.files[0].size);
    if(e.target.files[0].size > 4000000){
      this.setState({showErrorSize : true})
    } else {
      this.setState({showErrorSize : false})
    }
    reader.onloadend = () => {
      this.setState({
        file,
        imgSrc: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
  handleChange(e){
    console.log(e);
    if(e.target.value.length == 0){
      this.setState({showError: true});
    } else {
      this.setState({showError: false, disabled: false});
    }
}
  handleBlur(e){
    if(e.target.value.length == 0){
      this.setState({showError: true});
    }else {
      this.setState({showError: false, disabled: false});
    }
  }
  render() {
    const cls = `${styles.form} ${(this.props.showElement === 'post' ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Đăng bài mới</h2>
          <div className={styles['form-group']}>
            <input placeholder="Tiêu đề" className={styles['form-field']} style={this.state.showError ? {border: '1px solid red'}: null} ref="title" onChange={(e) => this.handleBlur(e)} />
            {
              this.state.showError ? <span>Tiêu đề không được trống</span> : null
            }
          </div>
         <div className={styles['form-group']}>
           <input type="file" ref="file" className={styles['form-field']} onChange={(e) => this.loadFile(e)} />
           {
             this.state.showErrorSize ? <span>Chọn ảnh là yêu cầu bắt buộc và kích thước file không được quá 5Mb</span> : null
           }
           {
             this.state.imgSrc !== '' ? <img src={this.state.imgSrc} alt="" />: null
           }
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
          <a className={styles['post-submit-button']} style={this.state.showError || this.state.showErrorSize ? {background: 'rgba(89, 120, 54, 0.53)'}: null}
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
