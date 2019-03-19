import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';

const promise1 = new Promise(
	(resolve, reject) => {
		const request = new XMLHttpRequest();
		
		request.open('GET', 'https://api.icndb.com/jokes/random');
		request.onload = ()=>{
			if (request.status === 200){
				resolve(request.response);
			} else {
				reject(Error(request.statusText))
			}
		}
		request.onerror = () => {
			reject(Error('Error fetching data.'));
	}
	request.send();
	})


console.log('Asynchronous request made.');
const consumePromise = () => {
	
	promise1
		.then(data => {
			console.log(data)
		})
		.catch(err => {
			console.error(err, 'promise rejected')
		})
}
//consumePromise()

const status = response => {
	if (response.status >= 200 && response.status < 300){
		return Promise.resolve(response)
	}
	return Promise.reject(new Error(response.statusText))
}

const json = response => response.json()

fetch('https://api.icndb.com/jokes/random')
	.then(status)
	.then(json)
	.then(data => {
		console.log(data)
	})
	.catch(error => {
		console.log('Request failed', error)
	})
	
//async await
async function getJokeAsync() {
	try{
		const response = await axios.get('https://api.icndb.com/jokes/random')	
		console.log(response)
	} catch (error){
		console.error(error)
	}
}

getJokeAsync()
async function getUsersAsync() {
	try{
		const response = await axios.get('https://jsonplaceholder.typicode.com/users')	
		console.log(response)
	} catch (error){
		console.error(error)
	}
}
async getUsers() {
		try{
			let response = await axios.get('https://jsonplaceholder.typicode.com/users')
			log(response)
			await this.setState({isLoading: false})
			await this.setState({isDataLoaded: true})
			let names = response.data.map( 
				person => ({
					name: person.name,
					email: person.email,
				})
			)
			await log(names)
		} catch (error){
			log(error)
			await this.setState({isLoading: false})
			await this.setState({isLoadingFailed: true})
		}
	}