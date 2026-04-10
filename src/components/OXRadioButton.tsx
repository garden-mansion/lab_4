import type { FC, ReactNode } from 'react';

import type { OXType } from '../types/chartTypes';

interface OXRadioButtonProps {
	value: string;
	ox: OXType;
	children: ReactNode;
}

export const OXRadioButton: FC<OXRadioButtonProps> = ({
	value,
	ox,
	children,
}) => (
	<>
		<input type="radio" name="ox" value={value} defaultChecked={ox === value} />
		{children}
		<br />
	</>
);
