import classNames from "classnames";

import Icon, { IconName } from "./Icon";
import { FieldError } from "react-hook-form";
import { ChangeEventHandler, FocusEventHandler, ForwardRefRenderFunction, forwardRef } from "react";

type InputProps = {
	placeholder?: string;
	type?: 'text' | 'email' | 'password' | 'date' | 'time' | 'number';
	name?: string;
	id?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	value?: string;
	disabled?: boolean;
	max?: string | number;
	maxLength?: number;
	min?: string | number;
	minLength?: number;
	pattern?: string;
	required?: boolean;
	prefixIcon?: {
		iconName: IconName;
	};
	error?: FieldError;
	label?: string;
	format?: string;
}

const InputFowardedFunction: ForwardRefRenderFunction<any, React.PropsWithChildren<InputProps>> = ({
	children,
	type = 'text',
	prefixIcon,
	...props
}, ref) => {

	const prefixIconCnames = classNames('absolute left-4 transition-colors', {
		'text-error': props.error,
	});

	const inputCnames = classNames('bg-backgroundInput rounded border border-black/25 pl-11 pr-2 py-2 w-72 m-0', {
		'outline-error': props.error,
		'opacity-50 cursor-not-allowed': props.disabled,
	});

	return (
		<>
			{props.label && <label htmlFor={props.id}>{props.label}</label>}
			<div className="relative pt-2 flex items-center">
				{prefixIcon?.iconName && (
					<span className={prefixIconCnames} >
						<Icon iconName={prefixIcon.iconName} />
					</span>
				)}
				<input
					{...props}
					ref={ref}
					type={type}
					className={inputCnames}
				/>
			</div>
			<div className="h-5 flex items-start">
				{props.error && (
					<span className="text-xs text-error ml-1" >{props.error.message}</span>
				)}
			</div>
		</>
	);
}

export default forwardRef(InputFowardedFunction);