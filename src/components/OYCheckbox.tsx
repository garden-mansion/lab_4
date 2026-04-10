import type { ChangeEventHandler, FC, ReactNode } from 'react';

interface OYCheckboxProps {
	defaultChecked: boolean;
	children: ReactNode;
	handleOyCheckboxesChange: ChangeEventHandler<HTMLInputElement>;
}

export const OYCheckbox: FC<OYCheckboxProps> = ({
	defaultChecked,
	children,
	handleOyCheckboxesChange,
}) => (
	<>
		<input
			type="checkbox"
			name="oy"
			defaultChecked={defaultChecked}
			onChange={handleOyCheckboxesChange}
		/>
		{children}
		<br />
	</>
);
