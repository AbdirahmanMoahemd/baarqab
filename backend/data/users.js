import bctypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bctypt.hashSync('123456',10),
        isAdmin: true,
        phone: '1213124',
        street: 'street',
        apartment: 'apartment',
        zip :'zip',
        city: 'city',
        country:'country',
    },
    {
        name: 'Abdirahman',
        email: 'abdi@example.com',
        password: bctypt.hashSync('123456', 10),
        phone: '1213124',
        street: 'street',
        apartment: 'apartment',
        zip :'zip',
        city: 'city',
        country:'country',
    },
    {
        name: 'Siyaad',
        email: 'siyaad@example.com',
        password: bctypt.hashSync('123456', 10),
        phone: '1213124',
        street: 'street',
        apartment: 'apartment',
        zip :'zip',
        city: 'city',
        country:'country',
    }


]

export default users