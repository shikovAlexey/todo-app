import React, { Component } from "react";
import './search-panel.css';

export default class SearchPanel extends Component {

    onChangeValue = (e) => {
        this.props.searchItem(e.target.value);
    };

    onSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        const { term } = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    className='search-input form-control'
                    placeholder=" Type to search..."
                    onChange={this.onChangeValue}
                    value={term}
                />
            </form>

        );
    };
};

