import React, { Component } from 'react'

export default class Image extends Component {

    state = {
        selected: this.props.selected
    }

    constructor(props) {
        super(props)
        this.myRef = React.createRef()  
    }
    
    componentDidUpdate() {
        if(this.props.imageList.state.iSelected === this.props.index) {
            this.executeScroll();
        }
    }

    render() {
        
        let { style, src, alt, full, imageList, index } = this.props;
        console.log(this.props)
        return (
            <img ref={this.myRef} src={imageList.state.iSelected === index ? full : src} style={style} alt={alt}/>
            )
    }

    executeScroll = () => this.myRef.current.scrollIntoView()

}