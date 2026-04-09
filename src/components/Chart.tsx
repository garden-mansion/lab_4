import { useState, type FC, type SubmitEventHandler } from 'react';

import type { Building } from '../data';
import { ChartDraw } from './ChartDraw';

// interface ChartProps {}

// export const Chart: FC<ChartProps> = () => {
export const Chart: FC = () => {
	const [ox, setOx] = useState<keyof Building>('country');
	const [oy, setOy] = useState<{ maxValue: boolean; minValue: boolean }>({
		maxValue: true,
		minValue: false,
	});

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		setOx(event.target['ox'].value);
		setOy({
			maxValue: event.target['oy'][0].checked,
			minValue: event.target['oy'][1].checked,
		});
	};

	return (
		<>
			<h4>Визуализация</h4>
			<form onSubmit={handleSubmit}>
				<p> Значение по оси OX: </p>
				<div>
					<input
						type="radio"
						name="ox"
						value="country"
						defaultChecked={ox === 'country'}
					/>
					Страна
					<br />
					<input
						type="radio"
						name="ox"
						value="year"
						defaultChecked={ox === 'year'}
					/>
					Год
				</div>

				<p> Значение по оси OY </p>
				<div>
					<input type="checkbox" name="oy" defaultChecked={oy.maxValue} />
					Максимальная высота <br />
					<input type="checkbox" name="oy" defaultChecked={oy.minValue} />
					Минимальная высота
				</div>

				<p>
					<button type="submit">Построить </button>
				</p>
			</form>

			<ChartDraw />
		</>
	);
};
