import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import TodoItems from './TodoItems'

class App extends React.Component{

    constructor(props) {
        super(props);
            this.state = {
                items:[]
            };
        this.addItem = this.addItem.bind(this);
    }
    addItem(e) {
        console.log(this.state.items)
        if(this._inputElement.value !=="") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };
            console.log(newItem)
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
            
        }
        console.log(this.state.items);
        e.preventDefault();
    }


    render() {
        return(
            <div>
                <form onSubmit={this.addItem}>
                        <div className="form-group">
                            <label htmlFor="exampleTextarea">Example textarea</label>
                            <input className="formControl" id="exampleTextarea" rows="3" ref={(a) => this._inputElement= a}></input>  
                        </div>
                        <button type="submit" className="btn btn-danger">ADD TASK</button>
                        <h1> Your Todos!</h1>
                        <div className="progress">
                                <div className="progress-bar bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                </form>
                <TodoItems entries={this.state.items} />
                
            </div>
        );
    }

}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);