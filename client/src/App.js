import React, { Component } from 'react';
import DroneList from './DroneList';
import Canvas from './Canvas';

class App extends Component {
  state = {
    drones: [],
    width: 100,
    height: 100,
    form: {
        x: 0,
        y: 0,
    },
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ drones: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/drones');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

    handleChange = (e) => {
        let form = {
            [e.target.name] : e.target.value,
        }
        form = Object.assign({}, this.state.form, form)
        this.setState({form: form})
    }

    handleSubmit = async e => {
        e.preventDefault();
        const x = this.state.form.x;
        const y = this.state.form.y;
        if (x < 0 || 
            x > this.state.width ||
            y < 0 ||
            y > this.state.height) {
            alert("Drone out of bounds");
            return;
        } 
        const response = await fetch('/drones', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.form),
        });
        const body = await response.json();
        const newDrone = Object.assign({}, this.state.form, body);
        this.setState({ drones: [...this.state.drones, newDrone] });
    };

    handleDelete = async id => {
        // Send delete request to the server
        const response = await fetch(`/drones/${id}`, {
            method: 'DELETE'
        })
        const status = await response.status
        // Remove from local state if the delete succeeded on the server
        if (status === 200) {
            const newList = this.state.drones.filter((drone) => drone.id !== id)
            this.setState({drones: newList});
        }
    }

  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Create new drone</strong>
          </p>
          <p>x</p>
          <input
            type="text"
            value={this.state.form.x}
            name="x"
            onChange={this.handleChange}
          />
          <p>y</p>
          <input
            type="text"
            value={this.state.form.y}
            name="y"
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
        <DroneList drones={this.state.drones} handleDelete={this.handleDelete}/>
        <Canvas drones={this.state.drones} width={this.state.width} height={this.state.height}/>
      </div>
    );
  }
}

export default App;
