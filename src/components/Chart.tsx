import {
	useState,
	type ChangeEventHandler,
	type FC,
	type SubmitEventHandler,
} from 'react';

import { useBuildingsContext } from '../context/BuildingsContext';
import { createArrGraph } from '../lib/createArrGraph';
import { ChartDraw } from './ChartDraw';

import styles from '../css/Chart.module.scss';

export const Chart: FC = () => {
	const { currentBuildings } = useBuildingsContext();

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

		setChartType(event.target['chart-type'].value);
	};

	const handleOyCheckboxesChange: ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const { checked } = event.currentTarget;

		if (checked) {
			setNoOyValuesErrorClassName(styles.noOyValuesError_hidden);
		}
	};

	const [chartType, setChartType] = useState<'bar' | 'dot'>('dot');

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
					<label htmlFor="chart-type">тип диаграммы</label>
					<select name="chart-type" id="chart-type" defaultValue={chartType}>
						<option value="bar">Гистограмма</option>
						<option value="dot">Точечная</option>
					</select>
				</p>

				<p>
					<button type="submit">Построить </button>
				</p>

				<p className={noOyValuesErrorClassName}>
					выберите хотя бы одно значение по оси Y!
				</p>
			</form>

			<ChartDraw
				chartType={chartType}
				data={createArrGraph(currentBuildings, ox)}
				isMaxValuesDrawEnabled={oy.maxValue}
				isMinValuesDrawEnabled={oy.minValue}
			/>
		</>
	);
};
