exports.resolvers = {
  Query: {
    getUsers: (root, args) => {
      return [{ id: 'u', name: 'n', 'dob': 'd', address: 'd', description: 'd', createdAt: 'a', updatedAt: 'createdAt' }]
    },
  },
}
