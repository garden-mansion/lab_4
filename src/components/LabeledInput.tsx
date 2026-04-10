import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

interface LabeledInputProps {
	name: string;
	label: string;
	type: HTMLInputTypeAttribute;

	rest?: InputHTMLAttributes<HTMLInputElement>;
}

export const LabeledInput = ({
	name,
	label,
	type,
	rest,
}: LabeledInputProps) => (
	<p>
		<label htmlFor={name}>{label}</label>
		<input type={type} name={name} id={name} {...rest} />
	</p>
);
