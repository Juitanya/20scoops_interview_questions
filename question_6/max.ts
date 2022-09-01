// constant variable from challenge-6-input.js

const input = [
	{
		name: "John",
		age: 60,
		salary: 50000,
		children: 3,
	},
	{
		name: "Doe",
		age: 20,
		salary: 30000,
		children: 2,
	},
	{
		name: "Will",
		age: 40,
		salary: 20000,
		children: 1,
	},
	{
		name: "Smith",
		age: 69,
		salary: 25000,
		children: 0,
	},
	{
		name: "Mayer",
		age: 56,
		salary: 60000,
		children: 1,
	},
];

// solution for this question
type DataType = {
	name: string;
	age: number;
	salary: number;
	children: number;
};

function maximum(data: DataType[], fn: (person: DataType) => number): DataType {
	return data.reduce((previousData, nextData) => {
		if (fn(previousData) > fn(nextData)) return previousData;
		return nextData;
	});
}

const maximumByAge: DataType = maximum(input, (person) => person.age);
const maximumBySalary: DataType = maximum(input, (person) => person.salary);
const maximumByChildren: DataType = maximum(input, (person) => person.children);
