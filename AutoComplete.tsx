import * as React from 'react';
import DropdownDataPair from '../../../models/DropdownDataPair';
// tslint:disable-next-line: import-name
import AsyncSelect from 'react-select/async';
import { isNullOrUndefined } from '../../../core/Utils';
import { Option } from 'react-select/src/filters';
import './Autocomplete.less';
import { InputActionMeta } from 'react-select/src/types';
import '../../../../node_modules/react-select-css/dist/react-select-css.css';
import '../../../../node_modules/react-select-css/dist/react-select-css';
import { Key } from 'ts-keycode-enum';

// tslint:disable-next-line:variable-name
const Autocomplete = (props: AutocompleteProps) => {
	const shouldPairRender = (input: string) => {
		//	console.log(props.options.filter(i => i.label.toLowerCase().includes(input.toLowerCase())).slice(0, 10));
		return props.options.filter(i => i.label.toLowerCase().includes(input.toLowerCase())).slice(0, 10);
	};

	const theme = props.theme || 'light'; // theme can currently be either dark or light
	const otherClassNames = props.className || '';
	const classNamePrefix = 'ipAutocomplete';
	const className = [classNamePrefix, theme, otherClassNames].join(' ').trim();

	// if the data options are null, it is assumed that the component is loading
	const isLoading = isNullOrUndefined(props.isLoading) ? isNullOrUndefined(props.options) : props.isLoading;

	const promiseOptions = (input: string) =>
		new Promise(resolve => {
			resolve(shouldPairRender(input));
		});

	const onKeyDown = () => {};

	// TODO: UX enhancement: use the isLoading feature for every single place where we use autocomplete (most notable is the tickets board filters)
	return (
		<AsyncSelect
			filterOptions={promiseOptions}
			defaultOptions={
				props.options != null && props.options.length > 100 ? props.options.slice(0, 30) : props.options || []
			}
			value={props.value}
			onChange={props.onSelect}
			options={props.options || []}
			maxHeight={props.maxHeight}
			loadOptions={promiseOptions}
			//	onInputChange={props.onInputChange}
			searchable={true}
			placeholder={props.placeholder || ' '}
			clearable={false}
			tabSelectsValue
			isLoading={isLoading}
			ignoreAccents={true}
			className={className}
			onKeyDown={onKeyDown}
			styles={{}}
		/>
	);
};

// TODO: Move entire DropdownDataPair handling into here, Type the Autocomplete to a specific type, pass in the options, and specify a function that returns what the value for each label should be.
// props.value should just be the VALUE of the data pair, as you can easily find the DataPair value by using this function:
// function getSelectedDataPair(dataPairs: DropdownDataPair<string>[], value: string): DropdownDataPair<string> {
// 	return dataPairs.find(dataPair => dataPair.value === value);
// }
// Will save a lot of repeated code in other places
// e.g. value will become (value?: any)
export interface AutocompleteProps {
	className?: string;
	autoFocus?: boolean;
	theme?: string;
	maxHeight?: number;
	options: DropdownDataPair<any>[];
	value?: DropdownDataPair<any>;
	onSelect: (dropDownPair: DropdownDataPair<any>) => void;
	onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
	placeholder?: string;
	isClearable?: boolean;
	defaultValue?: DropdownDataPair<any>;
	isDisabled?: boolean;
	isLoading?: boolean;
}

export default Autocomplete;
