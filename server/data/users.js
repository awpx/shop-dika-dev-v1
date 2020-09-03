import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin 1',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('12341234', 10),
    isAdmin: true,
  },
  {
    name: 'user 1',
    email: 'user1@mail.com',
    password: bcrypt.hashSync('12341234', 10),
  },
  {
    name: 'user 2',
    email: 'user2@mail.com',
    password: bcrypt.hashSync('12341234', 10),
  },
]

export default users