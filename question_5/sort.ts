// constant from challenge-4-input.js
const input: DataType[] = [
	{
		name: "John",
		age: 60,
	},
	{
		name: "Doe",
		age: 20,
	},
	{
		name: "Will",
		age: 40,
	},
	{
		name: "Smith",
		age: 69,
	},
	{
		name: "Mayer",
		age: 56,
	},
];

// solution for this question
type DataType = {
	name: string;
	age: number;
};

function sortByAge(arr: DataType[]): void {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = 0; j < arr.length - 1 - i; j++) {
			if (arr[j]["age"] > arr[j + 1]["age"]) {
				const tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}
}

sortByAge(input);
