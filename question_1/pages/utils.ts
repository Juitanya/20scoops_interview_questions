export const validateByRegex = (word: string, regex: RegExp): boolean => {
	return regex.test(word);
};
