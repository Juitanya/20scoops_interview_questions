function findMaxValue(arr: number[]): number {
	const max = arr.reduce((previousValue, nextValue) => {
		if (previousValue > nextValue) return previousValue;
		return nextValue;
	});
	return max;
}
