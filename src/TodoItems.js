import React, { Component } from 'react';

class TodoItems extends Component {
    createTasks(item){
        return <li key={item.key}>{item.text}</li>
    }
    render() { 
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return ( 
                
                <div class="card text-white bg-primary mb-3" style={{width: "20rem" }}>
                    <div class="card-header"></div>
                    <div class="card-body">
                    <h4 class="card-title">Primary Card</h4>
                    <p class="card-text">{listItems}</p>
                    </div>
                </div>
         );
    }
};
 
export default TodoItems;