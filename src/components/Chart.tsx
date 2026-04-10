import {
	useState,
	type ChangeEventHandler,
	type FC,
	type SubmitEventHandler,
} from 'react';

import type { Building } from '../data';
import { createArrGraph } from '../lib/createArrGraph';
import { ChartDraw } from './ChartDraw';

import styles from '../css/Chart.module.scss';

interface ChartProps {
	data: Building[];
}

export const Chart: FC<ChartProps> = ({ data }) => {
	const [ox, setOx] = useState<'country' | 'year'>('country');
	const [oy, setOy] = useState<{ maxValue: boolean; minValue: boolean }>({
		maxValue: true,
		minValue: false,
	});

	const [noOyValuesErrorClassName, setNoOyValuesErrorClassName] = useState(
		styles.noOyValuesError_hidden,
	);

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		if (!event.target['oy'][0].checked && !event.target['oy'][1].checked) {
			setNoOyValuesErrorClassName(styles.noOyValuesError);
		}

		setOx(event.target['ox'].value);
		setOy({
			maxValue: event.target['oy'][0].checked,
			minValue: event.target['oy'][1].checked,
		});
	};

	const handleOyCheckboxesChange: ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const { checked } = event.currentTarget;

		if (checked) {
			setNoOyValuesErrorClassName(styles.noOyValuesError_hidden);
		}
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
					<input
						type="checkbox"
						name="oy"
						defaultChecked={oy.maxValue}
						onChange={handleOyCheckboxesChange}
					/>
					Максимальная высота <br />
					<input
						type="checkbox"
						name="oy"
						defaultChecked={oy.minValue}
						onChange={handleOyCheckboxesChange}
					/>
					Минимальная высота
				</div>

				<p>
					<button type="submit">Построить </button>
				</p>

				<p className={noOyValuesErrorClassName}>
					выберите хотя бы одно значение по оси Y!
				</p>
			</form>

			<ChartDraw
				data={createArrGraph(data, ox)}
				isMaxValuesDrawEnabled={oy.maxValue}
				isMinValuesDrawEnabled={oy.minValue}
			/>
		</>
	);
};
