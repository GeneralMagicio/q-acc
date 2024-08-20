export const UPDATE_USER = `mutation(
    $email: String
	$firstName: String
    $lastName: String
    $avatar: String
    $newUser: Boolean
  ) {
    updateUser(
      email: $email
      lastName: $lastName
      firstName: $firstName
      avatar: $avatar
      newUser: $newUser
    )
  }`;
