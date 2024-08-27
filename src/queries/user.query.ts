export const GET_USER_BY_ADDRESS = `
	query UserByAddress($address: String!) {
		userByAddress(address: $address) {
			__typename
			id
			avatar
			email
			name
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

export const UPDATE_USER = `mutation(
    $email: String
	  $fullName: String
    $avatar: String
  ) {
    updateUser(
      email: $email
      fullName: $fullName
      avatar: $avatar
    )
  }`;
