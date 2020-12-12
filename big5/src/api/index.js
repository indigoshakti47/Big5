import axios from "axios";

const requestParams = (url) => ({
	url,
	method: "get",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export async function getUsers() {
	const { data } = await axios(requestParams("/api/user"));
	const rawUsers = data.data.users;
	const users = [];
	for (const key in rawUsers) {
		users.push({
			id: key,
			...rawUsers[key]
		});
	}
	return users;
}

export async function getUsersWithResults() {
	const users = await getUsers();	

	const promises = users.map(async user => {
		const { data } = await axios(requestParams( `/api/bfi/${user.id}`));
		const bfi = Object.values(data.data)[0] || {};
		return { bfi, user };
	});

	return Promise.all(promises);
}