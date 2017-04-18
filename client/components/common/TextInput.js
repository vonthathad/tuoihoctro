import React, { Component, PropTypes } from 'react';
export class TextInput extends Component{
  constructor(){
    super();
    this.state = {
      msgError : {
        requied: '',
        size: '',
        type: ''
      }
    }
  }
  render(){
    const props = this.props;
    let loadFile =(e)=> {
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
    const onValidate = (e) => {
      props.onChange(e);
      if(props.type == 'file') {

        if(e.target.files[0].size > 5000000){
          this.setState({msgError: {size: 'Kích thước file phải dưới 5mb'}});
        }
        if(['image/png','image/jpg','image/gif','image/jpeg'].filter(function (item) {
            console.log(item,e.target.files[0].type);
            return(item == e.target.files[0].type)
          }).length == 0){
          this.setState({msgError: {type: 'Chỉ chấp nhận ảnh dạng : jpg, jpeg, png, gif'}});
        }
        loadFile(e);
      }
      if(e.target.value.length == 0){
        this.setState({msgError: {requied: 'Tiêu đề là bắt buộc'}});
      }
    };
    return (
      <div>
        <div>
          <input
            ref={props.ref}
            type={props.type}
            placeholder={props.placeholder}
            className={props.class}
            onChange={(e)=> {onValidate(e)}}
            value={props.value} />
        </div>
        <span>{this.state.msgError.requied}</span>
        <span>{this.state.msgError.size}</span>
        <span>{this.state.msgError.type}</span>
        {
          this.state.imgSrc ?  <img src={this.state.imgSrc} alt=""/> : null
        }
      </div>
    );
  }
}
