import React, { Component } from 'react';
import lottery from './lottery';
import web3 from './web3';
import './App.css';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';

class App extends Component {

  	constructor(props) {
    	super(props);
		
		this.state = {
			manager: '',
			balance: '',
			value: '',
			message: '',
			color: '',
			players: [],
			isManager: false
		};
  	}

	componentDidMount() {
		setInterval(this.updateStats, 15000);
	}

	updateStats = async () => {
		const manager = await lottery.methods.manager().call();
		const players = await lottery.methods.getPlayers().call();
		const balance = await web3.eth.getBalance(lottery.options.address);

		this.setState({ manager, players, balance: web3.utils.fromWei(balance, 'ether') });
		this.checkManager();
	}

	setMessage = (message, color, duration) => {
		this.setState({message, color});

		if (duration)
			setTimeout(() => { this.setState({message: ''}) }, duration * 1000);
	}

	checkManager = async () => {
		const accounts = await web3.eth.getAccounts();
		const manager = await lottery.methods.manager().call();
		
		this.setState({isManager: manager === accounts[0]});
	}

	enterLottery = async (event) => {
		event.preventDefault();

		const accounts = await web3.eth.getAccounts();

		this.setMessage('Esperando que la transacción se complete ...', 'primary');

		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei(this.state.value, 'ether')
		});

		this.setMessage('La transacción se completó correctamente. Estás participando de la lotería', 'success', 5);

		this.updateStats();
	};

	closeLottery = async (event) => {
		const accounts = await web3.eth.getAccounts();

		this.setMessage('Esperando que la transacción se complete ...', 'primary');

		await lottery.methods.selectWinner().send({
			from: accounts[0]
		});

		const winner = await lottery.methods.lastWinner().call();

		this.setMessage('Se ha elegido un ganador! Felicitaciones a ' + winner, 'success', 10);
		this.updateStats();
	};

	render() {
    	return (
      		<div>
        		<Container className="my-5">
          			<Row>
            			<Col className="text-center">
							<h1>Lottery Smart Contract - Neoris Innovation Lab</h1>
							<p className="lead">
								El administrador de este contrato es <strong>{ this.state.manager }</strong>.<br/>
								En este momento hay <strong>{ this.state.players.length }</strong> persona/s compitiendo por 
								un total de <strong>{ this.state.balance }</strong> ether.
							</p>
							<small>
								<a starget="_blank" rel="noopener noreferrer" href="https://github.com/br1code">br1code - Github</a>
							</small>
            			</Col>
          			</Row>

          			<hr/>

					<Row>
						<Col className="text-center">
							<Form onSubmit={ this.enterLottery }>
								<FormGroup className="mx-3">
									<Label className="mr-3 my-2 lead">Cantidad de Ether que quieres apostar</Label>
									<Input 
										value = { this.state.value }
										onChange={ event => this.setState({ value: event.target.value }) }
										type="text" placeholder="Ether"
										className="w-25 mx-auto my-2"
									required/>
								</FormGroup>
								<Button className="my-2" color="primary">Participar</Button>
							</Form>
						</Col>
					</Row>

          			<hr/>

					<Row style={{display: this.state.isManager ? 'block' : 'none'}} className="my-3">
						<Col className="text-center">
							<h4 className="my-2">Listo para elegir un ganador?</h4>
							<p className="lead">Solo el administrador puede iniciar la lotería</p>
							<Button color="danger" onClick={ this.closeLottery }>Iniciar la lotería</Button>
						</Col>
					</Row>

          			<Alert color={this.state.color} style={{display: this.state.message ? 'block' : 'none' }}>{this.state.message}</Alert>
        		</Container>
      		</div>
    	);
  	}
}

export default App;
