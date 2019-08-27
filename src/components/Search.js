import React, {Component} from 'react';

class Search extends Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      keyword : ''
    }
  }

  onChange = (event) =>
  {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [ name ] : value
    });
  }

  onSearch = () =>
  {
    // console.log(this.state);
    this.props.onSearch(this.state.keyword);
  }

  render()
  {
    var { keyword } = this.state;
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group ">
                <input type="text" className="form-control" placeholder="Nhap tu khoa.." name="keyword" value={ keyword } onChange={ this.onChange }/>
                <span className="input-group-btn">
                    <button type="button" className="btn btn-success" onClick={ this.onSearch } ><i className="fa fa-search"> Tim Kiem</i></button>
                </span>
            </div>
        </div>
    );
  }
}

export default Search;