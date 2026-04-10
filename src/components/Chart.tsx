import { useState, type FC } from 'react';

import { useBuildingsContext } from '../context/BuildingsContext';
import { createArrGraph } from '../lib/createArrGraph';
import { getChartOyCheckboxesChangeHandler } from '../lib/getChartOyCheckboxesChangeHandler';
import { getChartSubmitHandler } from '../lib/getChartSubmitHandler';
import type { ChartType, OXType, OYSettings } from '../types/chartTypes';
import { ChartDraw } from './ChartDraw';
import { OXRadioButton } from './OXRadioButton';
import { OYCheckbox } from './OYCheckbox';

import styles from '../css/Chart.module.scss';

export const Chart: FC = () => {
	const { currentBuildings } = useBuildingsContext();

	const [ox, setOx] = useState<OXType>('country');
	const [oy, setOy] = useState<OYSettings>({
		maxValue: true,
		minValue: false,
	});

	const [noOyValuesErrorClassName, setNoOyValuesErrorClassName] = useState(
		styles.noOyValuesError_hidden,
	);
	const [chartType, setChartType] = useState<ChartType>('dot');

	const { handleChartSubmit } = getChartSubmitHandler({
		setNoOyValuesErrorClassName,
		setOx,
		setOy,
		setChartType,
	});

	const { handleOyCheckboxesChange } = getChartOyCheckboxesChangeHandler(
		setNoOyValuesErrorClassName,
	);

	return (
		<>
			<h4>Визуализация</h4>
			<form onSubmit={handleChartSubmit}>
				<p> Значение по оси OX: </p>
				<div>
					<OXRadioButton value="country" ox={ox}>
						Страна
					</OXRadioButton>
					<OXRadioButton value="year" ox={ox}>
						Год
					</OXRadioButton>
				</div>

				<p> Значение по оси OY </p>
				<div>
					<OYCheckbox
						defaultChecked={oy.maxValue}
						handleOyCheckboxesChange={handleOyCheckboxesChange}
					>
						Максимальная высота
					</OYCheckbox>
					<OYCheckbox
						defaultChecked={oy.minValue}
						handleOyCheckboxesChange={handleOyCheckboxesChange}
					>
						Минимальная высота
					</OYCheckbox>
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
