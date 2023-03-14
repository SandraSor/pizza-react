import React from 'react';
import ContentLoader from 'react-content-loader';

type SkeletonProps = {
	key: number;
};

export const Skeleton: React.FC<SkeletonProps> = (props) => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={460}
		viewBox='0 0 280 460'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<circle cx='140' cy='125' r='125' />
		<rect x='0' y='271' rx='10' ry='10' width='280' height='24' />
		<rect x='0' y='317' rx='10' ry='10' width='280' height='85' />
		<rect x='0' y='426' rx='8' ry='8' width='89' height='27' />
		<rect x='125' y='419' rx='30' ry='30' width='155' height='40' />
	</ContentLoader>
);
