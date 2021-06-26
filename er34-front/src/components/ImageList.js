import React, { Component } from 'react'
import { API_ENDPOINT, BOORU } from '../config.json';

import Image from './Image';

const isImage = file => file.endsWith('jpeg') || file.endsWith('png') || file.endsWith('jpg') 

export default class ImageList extends Component {

    state = {
        images: [],
        iSelected: 0
    }

    async componentDidMount() {
        this.fetchThumbnails("")
        window.addEventListener('keydown', (event) => {
            console.log(event, this.state.iSelected)
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
        })
    }

    fetchThumbnails = async (tag) => {
        let req = await fetch(`${API_ENDPOINT}/images?tag=${tag}`);
        let json = await req.json();
        this.setState({
            images: json
        })
    }

    render() {
        return (
            <div>
                {this.state.images.map((fimg, i) => <a href={`${BOORU}/index.php?page=post&s=view&id=${fimg.id}`}><Image full={`${API_ENDPOINT}/image?url=${fimg.sample_url}`} key={i} index={i} imageList={this} style={isImage(fimg.image) ? {} : {border: "3px solid #0000ff"}} alt={fimg.tags} src={fimg.preview_url}/></a>)}
            </div>
        )
    }

}