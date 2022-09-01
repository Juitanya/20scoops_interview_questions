// constant variable from challenge-4-input.js
const input = [
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

function findHighestAgeObject(data: DataType[]): DataType {
	return data.reduce((previousData, nextData) => {
		if (previousData.age > nextData.age) return previousData;
		return nextData;
	});
}

const result: DataType = findHighestAgeObject(input);
