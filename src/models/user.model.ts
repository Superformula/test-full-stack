interface User {
  id: string,
  name: string,
  dob?: string,
  address: string,
  description: string,
  createdAt?: string,
  updatedAt?: string
}

const UserEmpty: User = {
  id: "",
  name: "",
  dob: "",
  address: "",
  description: "",
  createdAt: "",
  updatedAt: ""
}

export default User;
export {
  UserEmpty
}