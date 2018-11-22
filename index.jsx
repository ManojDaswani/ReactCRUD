import React from 'react';
import ReactDOM from 'react-dom';
import ListingTable from './Components/ListingTable.jsx';

import TableData from './Components/TableData.jsx';





export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term: '', serviceList: [] };
      
       // this.update = this.update.bind(this);
       
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var self = this;
        //ajax call logic
        $(document).ready(function () {
            $.ajax({
                url: '/Hom/GetProducts',
                type: 'post',
                data: { Products: 'ListingTable' },
                success: function (data) {
                    self.setState({
                        serviceList: data
                    });
                },
                error: function (data) { }
            });
        });
    }

    render() {
        return (
            <div>

                <ListingTable service={this.state.serviceList} serviceList={this.serviceList} />
                <TableData service={this.state.serviceList} serviceList={this.serviceList} />

            </div>
        );
    }
}

const app = document.getElementById('main');

ReactDOM.render(<Index />, app);

