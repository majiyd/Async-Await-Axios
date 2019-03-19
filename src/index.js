import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';

	
//async await
var log = console.log

function Loader(props){
	return <h1>"Loading...."</h1>
}
function Users(props){
	return (<div>{props.data.map(user => <li key={user.id}>{user.name}</li>)}</div>)
}
class App extends React.Component{
	constructor(props){
		super (props);
		this.state = {
			users: [], 
			isLoading: false,
			isLoadingFailed: false,
			isDataLoaded: false
		};
	}
	async getUsers() {
		try{
			let response = await axios.get('https://jsonplaceholder.typicode.com/users')
			await this.setState({isLoading: false})
			await this.setState({isDataLoaded: true})
			log('gotten data')
			/*let users = response.data.map( 
				person => ({
					id: person.id,
					name: person.name,
					username: person.username,
					email: person.email,
					phone: person.phone,
					address: person.address,
				})
			)*/
			await this.setState({users: response.data})
			
		} catch (error){
			log(error)
			await this.setState({isLoading: false})
			await this.setState({isLoadingFailed: true})
		}
	}
	async gettingUsers(){
		await log('fetching data')
		await this.setState({isLoading: true})
	}
	componentDidMount(){
		log('element mounted')
		this.getUsers()
		this.gettingUsers()
		
	}
	render(){
		return (
		<div>
			
			{this.state.isLoading ? <Loader />: <Users data={this.state.users}/>}
		</div>
		);
	}
}
ReactDOM.render(<App />, document.getElementById('root'));
