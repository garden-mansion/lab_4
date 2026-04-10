import type { Dispatch, SetStateAction, SubmitEventHandler } from 'react';

import type { ChartType, OXType, OYSettings } from '../types/chartTypes';

import styles from '../css/Chart.module.scss';

interface GetChartSubmitHandlerParams {
	setNoOyValuesErrorClassName: Dispatch<SetStateAction<string>>;
	setOx: Dispatch<SetStateAction<OXType>>;
	setOy: Dispatch<SetStateAction<OYSettings>>;
	setChartType: Dispatch<SetStateAction<ChartType>>;
}

export const getChartSubmitHandler = ({
	setNoOyValuesErrorClassName,
	setOx,
	setOy,
	setChartType,
}: GetChartSubmitHandlerParams) => {
	const handleChartSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
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

	return {
		handleChartSubmit,
	};
};
