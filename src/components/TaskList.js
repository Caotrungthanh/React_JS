import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props)
    {
        super(props);
        this.state =
        {
            filterName : '',
            filterStatus : -1
        }
    }

    onChange = (event) =>
    {
        // console.log(event.target);
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(name === 'filterName' ? value : this.state.filterName, name === 'filterStatus' ? value : this.state.filterStatus);
        this.setState({
            [ name ] : value
        });
    }

  render()
  {
      var { tasks } = this.props;
      var { filterName, filterStatus } = this.state;
      var elementTasks = tasks.map((task, index) => {
        return <TaskItem key={ task.id } index={ index } task={task} onUpdateStatus={ this.props.onUpdateStatus } onDelete={ this.props.onDelete } onUpdate={ this.props.onUpdate }></TaskItem>
      });

    return (  
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Ten</th>
                    <th className="text-center">Trang Thai</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text" className="form-control" name="filterName" value={ filterName } onChange={ this.onChange }/>
                    </td>
                    <td>
                        <select className="form-control" name="filterStatus" value={ filterStatus } onChange={ this.onChange }>
                            <option value={-1}>Tat ca</option>
                            <option value={0}>An</option>
                            <option value={1}>Kich hoat</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                
                { elementTasks }
            </tbody>
        </table>
    );
  }
}

export default TaskList;
