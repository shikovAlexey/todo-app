import React, { Component } from "react";
import './todo-list-item.css';

export default class TodoListItem extends Component {

    render() {

        const { label, onDeleted, onToggleDone, onToggleImportant, done, important } = this.props;

        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important'
        }

        return (
            <div className={classNames}  >
                <span className='todo-list-item-label'
                    onClick={onToggleDone}>
                    {label}
                </span>
                <div className='btns'>
                    <button onClick={onDeleted}
                        type='button'
                        className='btn btn-outline-danger btn-sm'>
                        <i className='fa fa-trash-o' />
                    </button>
                    <button onClick={onToggleImportant}
                        type='button'
                        className='btn btn-outline-success btn-sm'>
                        <i className='fa fa-exclamation' />
                    </button>
                </div>
            </div>
        );
    };
};

