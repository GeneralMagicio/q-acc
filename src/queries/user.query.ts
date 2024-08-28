export const GET_USER_BY_ADDRESS = `
	query UserByAddress($address: String!) {
		userByAddress(address: $address) {
			__typename
			id
			fullName: name
			avatar
			email
			isSignedIn
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
			isSignedIn
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
