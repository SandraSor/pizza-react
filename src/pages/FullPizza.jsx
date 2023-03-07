import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [pizza, setPizza] = React.useState();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('http://localhost:3001/pizzas/' + id);
				setPizza(data);
			} catch (error) {
				alert('ERROR');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return 'Загрузка...';
	}

	return (
		<div className='content'>
			<div className='container'>
				<img src={pizza.imageUrl} alt='imageUrl' />
				<h2>{pizza.title}</h2>
				<h4>{pizza.price} руб.</h4>
			</div>
		</div>
	);
};

export default FullPizza;
