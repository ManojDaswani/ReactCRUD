import React from 'react';
import { Button, Modal } from 'semantic-ui-react'

export default class ListingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            isEditing:false,
    
            serviceList: [],
            EditProductName: '',
            EditPrice: '',
            EditId:0,
            ProductName: '',
            Price: '',
          

            updatedid: 0,
            productid: 0,

        };

        this.addProduct = this.addProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);

        this.deleteProduct = this.deleteProduct.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadData = this.loadData.bind(this);
       
        this.onEditChange = this.onEditChange.bind(this);
        this.handleProductEditClick = this.handleProductEditClick.bind(this);
        this.editSubmit = this.editSubmit.bind(this);
    }
    onEditChange(e) {
        this.setState({[e.target.name]:[e.target.value]})
    }


    componentDidMount() {
       
        this._Ismounted = true;
     
        this.loadData();
    }

    componentWillMount() {
        this._Ismounted = false
    }


    updateProduct(id) {
        this.setState({ updatedid: productId })
    }

    loadData() {
        let id = this.props.updatedid;
        $.ajax({
            url: "/Hom/GetProducts",
            type: "get",
            data: { 'id': id },
            success: function (data) {
                console.log("i m getting data:", data);
                this.setState({ productId: data.productId, ProductName: data.ProductName, Price: data.Price })
            }.bind(this)
           
        });
       
    }



    // get the view data , this event is triggered when we interact with UI
    onChange(event) {
        event.preventDefault();
 
        this.setState({
            [event.target.name]: event.target.value
        });
       
    }
  
    editSubmit(event) {
        event.preventDefault();
        var data = { Id:this.state.EditId, ProductName: this.state.EditProductName, Price: this.state.EditPrice };

        
        $.ajax({
            url: '/Hom/UpdateProduct',
            type: 'POST',
            dataType: 'Json',
            data:data,
            success: function (data) {
                self.setState({
                    serviceList: data
                });
                this.loadData();
            },
            error: function (data) { }
       
    });
    window.location.reload()

    }


    onSubmit(event) {
        event.preventDefault();

        var data = { 'ProductName': this.state.ProductName, 'Price': this.state.Price };
       
        $.ajax({
            url: "/Hom/AddProduct",
            type: "POST",
            dataType: 'json',
            data: data,
            success: function (data) {
                this.setState({ Sucess: data })
            }.bind(this)
        });
        window.location.reload();
        this.props.closeModal();
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    updateProduct() {
        
        var self = this;
        var productName = this.state.productName;
        var price = this.state.price;
        console.log("mikeeee");
        $(document).ready(function () {
            console.log("ho",productName, price);
            $.ajax({
                url: '/Hom/UpdateProduct',
                type: 'POST',
                dataType: 'Json',
                data: { productName, price },
                success: function (data) {
                    self.setState({
                        serviceList: data
                    });
                    this.loadData();
                },
                error: function (data) { }
            });
        });
        window.location.reload()
    }

    addProduct() {
        // ajax is doing the query to the server
        var productName = this.state.productname;
        var price = this.state.price;
        var self = this;

        $(document).ready(function () {
           
            //console.log(productName, price);
            $.ajax({
                url: '/Hom/AddProduct',
                type: 'post',
                dataType: 'Json',
                data: { productName, price },
                success: function (data) {
                    self.setState({
                        serviceList: data
                    });
                    this.loadData();
                },
                error: function (data) { }
            });
        });
        window.location.reload()
    }


    deleteProduct(id) {
        //ajax call logiz   

        $.ajax({
            url: "/Hom/DeleteProduct",
            type: "post",
            data: { 'id': id },
            success: function (data) { this.setState({ Sucess: data }) }.bind(this),
            error: function (res) {

            }
        });   
        window.location.reload()
       
    }

    handleProductEditClick(service) {
       
        this.setState({
            EditId: service.Id,
            EditProductName: service.ProductName,
            EditPrice: service.Price
        })
    }

    handleClick(e) {
        console.log("Edit Product Name", service);
        this.props.handleProductEditClick(e.target.value);
        this.props.setState({ value: e.target.value });
    }


    productID(id) {
        this.setState({
            text: serviceList.text
        })
    }
 

    render() {

        const { isEditing } = this.state.isEditing;
       
        let serviceList = this.props.service;

        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map((service) =>
                <tr key={service.Id}>
                   
                    <td className="two wide">{service.ProductName}</td>
                    <td className="ten wide">{service.Price}</td>
                    <td className="four wide">
                       
                        <i className="remove icon" ></i>
                        
                        <div><Modal trigger={<Button onClick={(e) => this.handleProductEditClick(service)}>Update Product</Button>} centered={false}>
                                                   
                         <Modal.Header>Update Product</Modal.Header>
                            <Modal.Description>
                                <b> Please update your product </b>
                                <div className="ui menu">
                                  
                                    <form  className="ui form" >
                                       
                                        <div className="field">
                                           
                                            <label>ProductName</label>
                                            <input type="text" name="EditProductName" value={this.state.EditProductName} onChange={(e) => this.setState({ EditProductName: e.target.value })} placeholder="ProductName" /> 
                                       
                                        </div>
                                        
                                        <div className="field">
                                            <label>Price</label>
                                            <input type="text" name="EditPrice" value={this.state.EditPrice} onChange={(e) => this.setState({ EditPrice: e.target.value })} placeholder="Price" />
                                        </div>
                                        <button className="ui button" type="submit" onClick={this.editSubmit} >Update</button>
                                        
                                        <button className="ui button" type="submit">Cancel</button>
                                    </form>
                                </div>
                            </Modal.Description>
                        </Modal>
                        </div>

                        <button onClick={this.deleteProduct.bind(this, service.Id)}>Delete Product</button>

                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
            
              
                <hr />
                <div>
                    <div className="ui container">
                        <div className="ui form ">
                            <div className="six wide field">
                                <div className="field">
                                    <label> Product Name</label>
                                    <input type="text" name="ProductName" placeholder="Product Name" onChange={this.onChange} />
                                </div>

                                <div className="field">
                                    <label> Product Price</label>
                                    <input type="text" name="Price" placeholder="Price" onChange={this.onChange} />
                                </div>
                                <div className="modal-header">
 
                                </div>
                                <button className="ui button" type="submit" onClick={this.onSubmit}>Submit</button>
                            </div>

                        </div>
                    </div>


                    <table className="ui striped table">
                        <thead key="thead">
                            <tr key>
                                <th className="two wide">ProductName</th>
                                <th className="ten wide">Price</th>
                                <th className="four wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody key="tbody">
                            {tableData}
                        </tbody>
                 
                    </table>
                   
                </div>
          
            </React.Fragment>
        );
        
      
    }
}

