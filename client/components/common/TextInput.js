export function TextInput(props) {

  let state = {
    isEmpty: true,
    value: null,
    valid: false,
    errorMessage: "Input is invalid",
    errorVisible: false
  }
  const handleChange =(event)=>{
    //validate the field locally
    validation(event.target.value);

  }

  const validation =(value)=>{
    //The valid variable is optional, and true if not passed in:
    if (value.length == 0) {
      valid = true;
    }


  }

  const handleBlur =(event) =>{
    //Complete final validation from parent element when complete
    let valid = this.props.validate(event.target.value);
    //pass the result to the local validation element for displaying the error
    this.validation(event.target.value, valid);
  }
    return (
      <div className={props.uniqueName}>
        <input
          placeholder={props.text}
          className={'input input-' + props.uniqueName}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={props.value} />
      </div>
    );
  }
