import React, {Component} from 'react';
import './App.css';
import TaskForm from '../src/components/TaskForm';
import Control from '../src/components/Control';
import TaskList from '../src/components/TaskList';


class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      tasks : [],  // id: duy nhat & khong trung nhau, name, status
      isDisplayForm : false,
      taskEditing : null,
      filter : { name : '', status : -1 },
      keyword : '',
      sortBy : 'name',
      sortValue : 1
    }
  }

  // Reset(F5) lai trang web thi ham nay duoc goi
  componentWillMount()
  {
    // console.log('coommmm');
    // Kiem tra local Storage co khac null ko va co lay duoc 'tasks' ko ?
    if(localStorage && localStorage.getItem('tasks'))
    {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      });
    }
  }
  
  // onGenerateData = () =>
  // {
  //   //console.log('generate data');
  //   var tasks =
  //   [
  //     {
  //       id : this.generateID(),
  //       name : 'Hoc Reactjs-Redux',
  //       status : true
  //     },
  //     {
  //       id : this.generateID(),
  //       name : 'Hoc JavaScript',
  //       status : false
  //     },
  //     {
  //       id : this.generateID(),
  //       name : 'Hoc HTML-CSS',
  //       status : true
  //     },
  //   ];
  //   // console.log(tasks);

  //   this.setState({
  //     tasks : tasks
  //   });
  //   // Luu du lieu vao localStorage
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  // Ham random ra chuoi ngau nhien
  s4()
  {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID()
  {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4(); 
  }

  onToggleForm = () =>
  {
    //kiem tra Form co dang mo va taskEditing co thuc su khac rong  
    // Chuyen tu Task sua -> them va nguoc lai
    if( this.state.isDisplayForm && this.state.taskEditing !== null )
    {
      this.setState({
        isDisplayForm : true,
        taskEditing : null
      });
    }
    else
    {
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing : null
      });
    }
  }

  onCloseFormAdd = () =>
  {
    this.setState({
      isDisplayForm : false
    });
  }

  onShowFormEdit = () =>
  {
    this.setState({
      isDisplayForm : true
    });
  }

  // obj la this.state cua thang TaskForm
  onSubmit = (obj) =>
  {
    var { tasks } = this.state;
    if( obj.id === '' )
    {
      // tao moi id cho 1 task moi
      obj.id = this.generateID();
      // console.log(obj);
      // dua task moi vua nhap dua vao obj 
      tasks.push(obj);
    }
    else
    {
      var index = this.findIndex(obj.id);
      tasks[index] = obj;
    }
    // cap nhap lai tasks
    this.setState({
      tasks : tasks,
      taskEditing : null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) =>
  {
    var { tasks } = this.state;
    // console.log(id); 
    var index = this.findIndex(id);
    // console.log(index);
    if(index !== -1)
    {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // tim so thu tu cua tung tasks
  findIndex = (id) =>
  {
    // Lay danh sach cac tasks
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => 
    {
      if(task.id === id)
      {
        result = index;
      }
    });
    return result;
  }
  
  // Xoa 1 item task
  onDelete = (id) =>
  {
    var { tasks } = this.state;
    // console.log(id); 
    var index = this.findIndex(id);
    // console.log(index);
    if(index !== -1)
    {
      tasks.splice(index, 1);
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseFormAdd();
  }

  onUpdate = (id) =>
  {
    // console.log(id);
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    });
    // console.log(this.state.taskEditing)
    this.onShowFormEdit();
  }

  onFilter = (filterName, filterStatus) =>
  {
    // console.log(filterName,'-',filterStatus);
    // Ep kieu cho filterStatus hien thi theo kieu so nguyen
    filterStatus = parseInt(filterStatus, 10);
    // console.log(typeof filterStatus);
    this.setState({
      filter : { name : filterName.toLowerCase(), status : filterStatus }
    });
  }

  onSearch = (keyword) =>
  {
    // console.log(keyword);
    this.setState({
      keyword : keyword
    });
  }

  onSort = (sortBy, sortValue) =>
  {
    // console.log(sortBy + '-' + sortValue);
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
    // console.log(this.state);
  }

  render()
  {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state; // var tasks = this.state.tasks ES6
    // console.log(filter);
    if(filter)
    {
      if(filter.name)
      {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if(filter.status === -1)
        {
          return task;
        }
        else
        {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

    if(keyword)
    {
      tasks =  tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    // Sap Xep
    if( sortBy === 'name' )
    {
      tasks.sort((a, b) => 
      {
        if(a.name > b.name)
          return sortValue;
        else if(a.name < b.name)
          return -sortValue;
        else return 0;
      });
    }
    else
    {
      tasks.sort((a, b) => 
      {
        if(a.status > b.status)
          return -sortValue;
        else if(a.status < b.status)
          return sortValue;
        else return 0;
      });
    }

    var elementTaskForm = isDisplayForm ? <TaskForm onCloseForm={ this.onCloseFormAdd } onSubmit={ this.onSubmit } task={ taskEditing  }></TaskForm> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quan Ly Cong Viec</h1>
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
            { elementTaskForm }
          </div>{/** col-4 */}
          <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
            <button type="button" className="btn btn-warning" onClick={ this.onToggleForm }>
              <span className="fa fa-plus"> Them Cong Viec</span>
            </button>&nbsp;

            {/* <button type="button" className="btn btn-success" onClick={ this.onGenerateData }>
              <span className="fa fa-plus"> Generate Data</span>
            </button> */}
            
            {/** Search va Sort */}
            <Control onSearch={ this.onSearch } onSort={ this.onSort } sortBy={ sortBy } sortValue={ sortValue }></Control>

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks={ tasks } onUpdateStatus={ this.onUpdateStatus } onDelete={ this.onDelete } onUpdate={ this.onUpdate }  onFilter={ this.onFilter }></TaskList>
              </div>
            </div>
          </div>{/** col-8 */}
        </div>
      </div>          

    );
  }
}

export default App;
