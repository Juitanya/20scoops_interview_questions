import {
	ref,
	push,
	child,
	update,
	query,
	orderByChild,
	equalTo,
	get,
} from "firebase/database";
import { database } from "./index";
export const writeData = async (data: Object) => {
	const newPostKey = push(child(ref(database), "users")).key;
	const updates = {};
	updates["/users/" + newPostKey] = data;
	return update(ref(database), updates);
};

export const fetchData = async (email: string) => {
	const que = query(
		ref(database, "users"),
		orderByChild("email"),
		equalTo(email)
	);
	const result = await get(que);
	let data: any = [];
	try {
		result.forEach((childSnapshot) => data.push(childSnapshot.val()));
	} catch (err) {
		throw new Error("Something went wrong while fetching data.");
	}
	return data;
};
