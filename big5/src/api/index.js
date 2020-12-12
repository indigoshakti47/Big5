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
	return data.data.users;
}

export async function getUsersWithResults() {
	const rawUsers = await getUsers();
	const users = [];
	for (const key in rawUsers) {
		users.push({
			id: key,
			...rawUsers[key]
		});
	}

	const promises = users.map(async user => {
		const { data } = await axios(requestParams( `/api/bfi/${user.id}`));
		const bfi = Object.values(data.data)[0] || {};
		return { bfi, user };
	});

	return Promise.all(promises);
}