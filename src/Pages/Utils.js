export function parseDays(value) {
	const YEAR = 365,
		MONTH = 30,
		WEEK = 7;
	let year, months, week, days;
	let str = "";
	year = value >= YEAR ? Math.floor(value / YEAR) : 0;
	value = year ? value - year * YEAR : value;
	months = value >= MONTH ? Math.floor((value % YEAR) / MONTH) : 0;
	value = months ? value - months * MONTH : value;
	week = value >= WEEK ? Math.floor((value % YEAR) / WEEK) : 0;
	value = week ? value - week * WEEK : value;
	days = value < WEEK ? Math.floor((value % YEAR) % WEEK) : 0;
	if (year !== 0) str = str + `${year}-Y`;
	if (months !== 0) str = str + `, ${months}-M`;
	if (week !== 0) str = str + `, ${week}-W`;
	if (days !== 0) str = str + `, ${days}-Days`;
	return str;
}

export const validateTIN = (value) => {
	const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
	const einRegex = /^\d{2}-\d{7}$/;
	const itinRegex = /^\d{3}-\d{2}-\d{4}$/;

	if (!ssnRegex.test(value) && !einRegex.test(value) && !itinRegex.test(value)) {
		return false;
	} else {
		return true;
	}
};
