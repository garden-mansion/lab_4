import type { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

import styles from '../css/Chart.module.scss';

export const getChartOyCheckboxesChangeHandler = (
	setNoOyValuesErrorClassName: Dispatch<SetStateAction<string>>,
) => {
	const handleOyCheckboxesChange: ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const { checked } = event.currentTarget;

		if (checked) {
			setNoOyValuesErrorClassName(styles.noOyValuesError_hidden);
		}
	};

	return {
		handleOyCheckboxesChange,
	};
};
