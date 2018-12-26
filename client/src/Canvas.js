import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {
    
    componentDidMount() {
         this.updateCanvas();
    }

    componentDidUpdate() {
         this.updateCanvas();
    }

    updateCanvas = () => {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.stroke()
        ctx.closePath();
        
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        this.props.drones.map(({x, y}) => {
            ctx.rect(x, y, 2, 2)
        });
        ctx.stroke()
        ctx.closePath();
    }

    render() {
        return(
            <div>
                <canvas className="canvas" ref="canvas" width={100} height={100} />
            </div>
        )
    }
}
export default Canvas

