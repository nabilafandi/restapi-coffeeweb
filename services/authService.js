const User = require("../models/user");
const olseraApi = require('./olseraApi')

const createUser = async (data) => {
    try {
        const customer_by_email = await olseraApi.fetchCustomersByEmail(data)
        console.log('customer_by_email', customer_by_email)

        // console.log(customer_by_email)
        return customer_by_email
        // const newUser = await User.create(data)
        // console.log('New User Created', newUser)
        // return newUser
    } catch (error) {
        if (error.code === 11000) {
            console.error("Error: Duplicate not allowed.")
        } else {
            console.error("Error finding email: ", error)
        }
        throw error
    }
}

// createUser({
//     "username": "test",
//     "password": "test",
//     "email": "abdulazizhakinen@gmail.com"
// })

module.exports = {
    createUser,
};
