import React from 'react';

import { Button, Header, Modal } from 'semantic-ui-react'
import Form1 from './Form.jsx';

export default class Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModel: false,
            showUpdateModel: false,
            isEditing: false,
            serviceList: '',
            EditProductName: '',
            EditPrice: '',
            EditId: 0,
            ProductName: '',
            Price: '',
            Updatedid: 0,
            updatedid: 0,
            productid: 0,
        }
        this.addProduct = this.addProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
        this.handleProductEditClick = this.handleProductEditClick.bind(this);
        this.editSubmit = this.editSubmit.bind(this);

    }
    onEditChange(e) {
        this.setState({ [e.target.name]: [e.target.value] })
    }

    onSubmit(event) {
        event.preventDefault();
        var data = { 'ProductName': this.state.ProductName, 'Price': this.state.Price };
        console.log("addproduct", data);
        $.ajax({
            url: "/Homm/AddProduct",
            type: "POST",
            data: data,
            success: function (data) { this.setState({ Sucess: data }) }.bind(this)
        });

       // this.props.closeModal();
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    closeModal(e) {

        if (this._Ismounted) {
            this.loadData();
            this.setState({ showModel: false });
        }
    }
    showUpdateModal(e) {
        if (this._Ismounted) {
            this.setState({ showUpdateModel: true });
        }
    }
    closeUpdateModal(e) {
        if (this._Ismounted) {

            this.loadData();

            this.setState({ showUpdateModel: false });

        }

    }
    showModal(e) {
        this.setState({ showModel: true });
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
    editSubmit(event) {
        event.preventDefault();
        var data = { Id: this.state.EditId, ProductName: this.state.EditProductName, Price: this.state.EditPrice };


        $.ajax({
            url: '/Hom/UpdateProduct',
            type: 'POST',
            dataType: 'Json',
            data: data,
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

    updateProduct() {

        var self = this;
        var productName = this.state.productName;
        var price = this.state.price;
        console.log("mikeeee");
        $(document).ready(function () {
            console.log("ho", productName, price);
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

    deleteProduct(id) {


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


    render() {

        const { isEditing } = this.state.isEditing;

        let serviceList = this.props.service;

        let tableData = null;

        if (serviceList != undefined) {
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

                                    <Form1/>
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
