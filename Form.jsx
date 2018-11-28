import React from 'react'


export default class Form extends React.Component {
    render() {
        return () => {

            <React.Fragment>

                <form className="ui form" >

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

            </React.Fragment>

        }
    }
}

