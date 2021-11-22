import React, { Component } from "react";
import AppHeader from '../app-header'
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItemBtn from "../add-item-btn";
import './app.css'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make React App', true),
            this.createTodoItem('Have A Lunch')
        ],
        term: '',
        filter: 'active'
    };

    createTodoItem(label, important = false) {
        return {
            label,
            important,
            done: false,
            id: this.maxId++
        };
    };

    toggleProperty = (arr, id, prop) => {
        const index = arr.findIndex((item) => id === item.id);
        const oldItem = arr[index];
        const newItem = { ...oldItem, [prop]: !oldItem[prop] }
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((item) => id === item.id);
            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ];
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newTodoData = [...todoData, newItem];
            return {
                todoData: newTodoData
            }
        });
    };

    searchItem = (text) => {
        this.setState(() => {
            return {
                term: text
            }
        });
    }

    filter = (items, filter) => {
        if (filter === 'all') {
            return items;
        }
        if (filter === 'active') {
            return items.filter((item) => !item.done);
        }
        if (filter === 'done') {
            return items.filter((item) => item.done)
        }
        else return items;
    };

    onToggleFilter = (filterName) => {
        this.setState({ filter: filterName })
    };

    search = (items, term) => {
        if (term === '') {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };

    render() {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-panel' >
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className='top-panel'>
                    <SearchPanel searchItem={this.searchItem} term={term} />
                    <ItemStatusFilter
                        onToggleFilter={this.onToggleFilter}
                        filter={filter} />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant} />
                <AddItemBtn addItem={this.addItem} />
            </div>
        );
    };
};
