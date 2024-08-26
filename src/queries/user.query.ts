export const GET_USER_BY_ADDRESS = `
	query UserByAddress($address: String!) {
		userByAddress(address: $address) {
			__typename
			id
			avatar
			email
		}
	}
`;

export const GET_GIVETH_USER_BY_ADDRESS = `
	query UserByAddress($address: String!) {
		userByAddress(address: $address) {
			__typename
			id
			avatar
			email
			firstName
			lastName
			name
		}
	}
`;
