import React, { Component } from 'react'
import { API_ENDPOINT, BOORU } from '../config.json';

import Image from './Image';
import CommandTab from './CommandTab';


const isImage = file => file.endsWith('jpeg') || file.endsWith('png') || file.endsWith('jpg') 

export default class ImageList extends Component {

    state = {
        images: [],
        iSelected: 0,
        commandTabDisabled: true,
        tag: ""
    }

    async componentDidMount() {
        this.fetchThumbnails("")
        window.addEventListener('keydown', event => {
            //console.log(event, this.state.iSelected)
            if(this.state.commandTabDisabled) {
                if(event.key === "z" && this.state.iSelected !== 0) {
                
                    this.setState({
                        iSelected: this.state.iSelected - 1
                    })
                }
                if(event.key === "x" && this.state.iSelected !== (this.state.images.length-1)) {
                    this.setState({
                        iSelected: this.state.iSelected + 1
                    })
                }
            }
            
        })
    }

    fetchThumbnails = async (tag) => {
        if(typeof tag == "undefined") tag = this.state.tag;
        let req = await fetch(`${API_ENDPOINT}/images?tag=${tag}`);
        let json = await req.json();
        this.setState({
            images: json,
            iSelected: 0,
            tag
        })
        console.log(json);
    }

    render() {
        return (
            <div>
                <CommandTab imageList={this} key="ill give you your fucken key"/>
                {this.state.images.map((fimg, i) => <a key={i} href={`${BOORU}/index.php?page=post&s=view&id=${fimg.id}`}><Image full={`${API_ENDPOINT}/image?url=${fimg.sample_url}`} key={i+1} index={i} imageList={this} style={isImage(fimg.image) ? {} : {border: "3px solid #0000ff"}} alt={fimg.tags} src={fimg.preview_url}/></a>)}
            </div>
        )
    }

}