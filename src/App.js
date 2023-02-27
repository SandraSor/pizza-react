import React from 'react';

import Card from './component/Card';
import Categories from './component/Categories';
import Header from './component/Header';
import Sort from './component/Sort';

// import pizzas from './assets/pizza.json';

import './scss/app.scss';

function App() {
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		fetch('http://localhost:3001/pizzas')
			.then((res) => res.json())
			.then((json) => setItems(json))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{items.map((obj) => (
							<Card key={obj.id} {...obj} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
