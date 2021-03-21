import bctypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bctypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Abdirahman',
        email: 'abdi@example.com',
        password: bctypt.hashSync('123456',10),
    },
    {
        name: 'Siyaad',
        email: 'siyaad@example.com',
        password: bctypt.hashSync('123456',10),
    }


]

export default users