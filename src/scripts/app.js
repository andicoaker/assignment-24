import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';


const ToDoContainerComponent = React.createClass({
  getInitialState: function(){
    console.log('only firing once?')
		return {
			toDoItems: [{item: "things to do", isImportant: false}, {item: "more things to do", isImportant: true}],

		}
  },

  _handleAddNewToDoItem: function(newItem){
    let toDoArrCopy = this.state.toDoItems.map(function(copy){return copy})
    toDoArrCopy.push(newItem)
    console.log(toDoArrCopy)
    this.setState({
      toDoItems: toDoArrCopy
    })
  },

  _handleRemoveToDoItem: function(itemToRemove){
    //  remove that item by index use filter here
    console.log(itemToRemove)
    // when onclick evt is executed, return filtered list array items
    // if clicked item does NOT equal indexed item being passed as argument, then return item to list?
    // if clicked item DOES equal the indexed item being passed as argument, then don't return item to the list?

      let toDoCompleted = this.state.toDoItems.filter(function(item, index){
        if (itemToRemove !== index) {
          console.log('what up', index);

          return true
        } else {
          return false
        }
      })
      // console.log(toDoCompleted);
      this.setState({
        toDoItems: toDoCompleted
      })
  },

  render: function(){

    return (
      <div className="new-list-items">
        <ToDoItemInputComponent addToDoItem={this._handleAddNewToDoItem}/>
        <hr></hr>
        <ToDoListComponent toDoList={this.state.toDoItems}   removeItem={this._handleRemoveToDoItem}/>
      </div>
    )
  }
})

const ToDoItemInputComponent = React.createClass({

  _addNewItem: function(evt){
    evt.preventDefault()
    console.log(this.refs.todoItem.value, "?")
    console.log("firing off relay message")
      this.props.addToDoItem({item: this.refs.todoItem.value})
  },

  render: function(){

    return(
      <div className="container">
        <h2>To Do List</h2>
        <form className="form-inline">
          <div className="form-group">
            <label for="toDoInput" className="sr-only"></label>
            <div className="col-md-12">
              <input type="" ref='todoItem' className="form-control" id="toDoInput" placeholder="New To Do Item"/>
              <button type="submit" className="btn btn-default" onClick={this._addNewItem}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

const ToDoListComponent = React.createClass({

  _createJsxToDoList: function(arrOfToDoItems){
    let component = this
		let jsxArr = arrOfToDoItems.map(function(toDoObj, index){
			return (
          <div className="grid-container list-item">
            <div className="sm-8-of-12 md-10-of-12">
             <label className="radiocheck-group">
               <input type="checkbox" value="on"/>
               <span>{toDoObj.item}</span>
             </label>
            </div>
            <div className="sm-4-of-12 md-2-of-12 text-right">
              <button onClick={function(){component.props.removeItem(index)}}>
                <i className="fa fa-remove fa-2x"></i>
              </button>
            </div>
          </div>
			)
		})
		return jsxArr
	},

  render: function(){

		return (
			<div className="ToDos">

				{this._createJsxToDoList(this.props.toDoList)}
			</div>
		)
	}
})

let appContainerEl = document.querySelector('#app-container')
ReactDOM.render( <ToDoContainerComponent/>, appContainerEl )
