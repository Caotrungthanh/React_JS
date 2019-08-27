import React, {Component} from 'react';


class TaskForm extends Component {
  constructor(props)
  {
    super(props);
    this.state = 
    {
      id : '',
      name : '',
      status : false
    }
  }

  onChange = (event) =>
  {
    
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status')
    {
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name] : value
    });
    // console.log(event.target.value);
  }

  onSubmit = (event) =>
  {
    event.preventDefault();
    // Truyen state ra App.js va nhan lai obj
    this.props.onSubmit(this.state); 
    //cancel & close Form
    this.onClear();
    this.onCloseFormAdd();
  }

  onCloseFormAdd = () =>
  {
    this.props.onCloseForm();
  }

  onClear = () =>
  {
    this.setState({
      name : '',
      status : false
    }); 
  }

  componentWillMount()
  {
    // console.log("elloh");
    if(this.props.task)
    {
      this.setState({
        id : this.props.task.id,
        name : this.props.task.name,
        status : this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps)
  {
    // console.log(nextProps);
    if(nextProps && nextProps.task)
    {
      this.setState({
        id : nextProps.task.id,
        name : nextProps.task.name,
        status : nextProps.task.status
      });
    }
    else if (!nextProps.task)
    {
      this.setState({
        id : '',
        name : '',
        status : false
      });
    }
  }

  render()
  {
    var { id } = this.state;
    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <p className="panel-title">
                  { id !== '' ? 'Cap nhap cong viec' : 'Them cong viec' }   
                  <span className="fa fa-times text-right" onClick={ this.onCloseFormAdd }></span> 
                </p>
            </div>
            <div className="panel-body">
                <form onSubmit={ this.onSubmit }>
                  <div className="form-group">
                    <label>Ten: </label>
                    <input type="text" className="form-control" placeholder="Nhap ten" name="name" value={ this.state.name } onChange={ this.onChange }/>
                  </div>
                  <div className="form-group">
                    <label>Trang Thai: </label>
                    <select className="form-control" name="status" value={ this.state.status } onChange={ this.onChange }>
                      <option value={true}>Kich hoat</option>
                      <option value={false}>An</option>
                    </select>
                  </div> 
                  <div className="text-center">
                    <button type="submit" className="btn btn-success"><i className="fa fa-plus"> Luu Lai</i></button>&nbsp;
                    <button type="button" className="btn btn-primary" onClick={ this.onClear }><i className="fa fa-trash-o"> Huy Bo</i></button>
                  </div>
                </form>
            </div>
        </div>  
    );
  }
}
 
export default TaskForm;
