function equalToValidator(value, checkValue) {
	return value === checkValue;
}

function minLengthValidator(value, minLength) {
	return value.length >= minLength;
}

function emailValidator(value) {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
		value
	);
}

function validate(value, rules, connectedValue) {
	let isValid = true;

	for (let rule in rules) {
		switch (rule) {
			case 'isEmail':
				isValid = isValid && emailValidator(value);
				break;
			case 'minLength':
				isValid = isValid && minLengthValidator(value, rules[rule]);
				break;
			case 'equalTo':
				isValid = isValid && equalToValidator(value, connectedValue[rule]);
				break;
			default:
				isValid = true;
		}
	}

	return isValid;
}

export default validate;
