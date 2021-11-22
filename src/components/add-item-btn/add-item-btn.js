import React, { Component } from "react";
import './add-item-btn.css';

export default class AddItemBtn extends Component {

    state = {
        label: ''
    };

    onLableChange = (e) => {
        this.setState({ label: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({ label: '' })
    };

    render() {
        return (
            <form className="item-add-form d-flex"
                onSubmit={this.onSubmit}>
                <input
                    type='text'
                    className='form-control'
                    placeholder='What needs to be done...'
                    onChange={this.onLableChange}
                    value={this.state.label}
                />
                <button
                    className='btn btn-outline-secondary'>
                    Add
                </button>
            </form>
        );
    }

};