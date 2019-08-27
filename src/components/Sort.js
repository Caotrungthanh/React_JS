import React, {Component} from 'react';

class Sort extends Component { 

    onClick = ( sortBy, sortValue ) =>
    {
        // console.log(sortBy + '-' + sortValue);
        this.props.onSort(sortBy, sortValue);
    } 

  render()
  {
    return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button id="dLabel" className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sap Xep <span className="fa fa-calendar"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dLabel">
                        <li onClick={ () => this.onClick('name', 1) }>
                            <a role="button" className={ (this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'sort_selected' : '' }> 
                                <span className="fa fa-sort-alpha-asc"> Ten A-Z</span>
                            </a>
                        </li>
                        <li onClick={ () => this.onClick('name', -1) }>
                            <a role="button" className={ (this.props.sortBy === 'name' && this.props.sortValue === -1) ? 'sort_selected' : '' }>
                                <span className="fa fa-sort-alpha-desc"> Ten Z-A</span>
                            </a>
                        </li>
                        <li onClick={ () => this.onClick('status', 1) }>
                            <a role="button" className={ (this.props.sortBy === 'status' && this.props.sortValue === 1) ? 'sort_selected' : '' }>
                                Trang thai kich hoat
                            </a>
                        </li>
                        <li onClick={ () => this.onClick('status', -1) }>
                            <a role="button" className={ (this.props.sortBy === 'status' && this.props.sortValue === -1) ? 'sort_selected' : '' }>
                                An
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
    );
  }
}

export default Sort;
