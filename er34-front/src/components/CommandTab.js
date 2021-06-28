import React, { Component } from 'react'
import './CommandTab.css';

//function encode(e){return e.replace(/[^]/g,function(e){return"&#"+e.charCodeAt(0)+";"})}
import Commands from '../commands/Commands';

export default class CommandTab extends Component {

    state = {
        disabled: true,
        command: "> Command Tab"
    }


    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    processCommand = command => {
        let processedCommand = Commands.filter(defCmds => command.toLowerCase().startsWith(defCmds.chars + " ") || command.toLowerCase() === defCmds.chars)[0];
        if(processedCommand) {
            let args = command.split(' ');
            args.shift();
            processedCommand.execute(this, args, processedCommand);
        }
        
    }

    componentDidMount() {
        window.addEventListener("keydown", event => { // eslint-disable-next-line
            switch(event.key.toLowerCase()) { 
                case "b":
                    if(this.state.disabled) {
                        this.setState({
                            disabled: false
                        })
                        this.props.imageList.setState({
                            commandTabDisabled: false
                        })
                        this.myRef.current.children[0].focus();
                        // very hacky but works
                        setTimeout(() => this.myRef.current.children[0].value = this.myRef.current.children[0].value.slice(0, -1));
                    }
                    
                    
                    break; 
                case "control":
                    if(!this.state.disabled) {
                        this.processCommand(this.myRef.current.children[0].value);
                        this.myRef.current.children[0].blur();
                        this.myRef.current.children[0].value = "";
                        this.setState({
                            disabled: true
                        })
                        this.props.imageList.setState({
                            commandTabDisabled: true
                        })
                    }
                    
                    
                    break;/*
                case "backspace":
                    this.setState({
                        command: this.state.command.slice(0, -1)
                    })
                    break;
                case "space":
                    event.preventDefault()
                    this.setState({
                        command: this.state.command + " "
                    })
                    break;
                default: 
                    if(!this.state.disabled) {
                        this.setState({
                            command: this.state.command + event.key
                        })
                    }
                    break;*/
            }
        })
    }

    render() {
      return <div ref={this.myRef} className={`command-tab ${this.state.disabled ? "hide" : ""}`}>
          <input type="text"/>
      </div>  
    }

    

}