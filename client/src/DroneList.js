import React, { Component } from 'react';

class DroneList extends Component {

    handleClick = (e) => this.props.handleDelete(e.target.id);

    render () {
        return (
            <div>
                {this.props.drones.map(({id, x, y}) => 
                    <div>
                        <button id={id} onClick={this.handleClick}>delete</button>
                        x: {x} y: {y}
                    </div>)}
            </div>
        )
    }
}

DroneList.defaultProps = {
    drones: [{x: 1, y:2}]
};

export default DroneList;
