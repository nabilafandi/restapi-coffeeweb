const { create } = require("connect-mongo");
const User = require("../models/user");
const olseraApi = require("./olseraApi");

// const userExist = User.find();
// const createCustomer = await olseraApi.createCustomer(data);
// return createCustomer;
// console.log("createCustomer", createCustomer);
// if (createCustomer.error?.status_code == 406) {
//     console.log("user already exist");
// }
// console.log(createCustomer);
// const cancelOrder = await olseraApi.cancelOrder(createCustomer.data.id);
// console.log("cancelOrder", cancelOrder);
// // const newUser = new User({
// //   username: createCustomer.data.customer_name,
// //   email: createCustomer.data.customer_email,
// //   olseraId: createCustomer.data.customer_id,
// //   password: data.password
// // })
// // await newUser.save()

// // return newUser;

const createUser = async (data) => {
  try {
    const phoneCleaned = convertPhoneIndonesian(data.phone);
    const isUserEmailExist = await checkDuplicateEmail(data.email);
    if (isUserEmailExist) throw new Error("Email already exist");
    const isUserPhoneExist = await checkDuplicatePhone(phoneCleaned);
    if (isUserPhoneExist) throw new Error("Phone number already exist");

    let olseraId;

    const olseraPhoneExist = await olseraApi.fetchCustomersByPhone(
      phoneCleaned
    );
    console.log("olseraPhoneExist", olseraPhoneExist);
    console.log(olseraPhoneExist.error?.status_code);
    if (olseraPhoneExist.error?.status_code == 404) {
      const customerData = {
        email: data.email,
        name: data.name,
        phone: data.phone,
      };
      const createCustomer = await olseraApi.createCustomerByOrder( customerData );
      if (createCustomer.error.message == "Pelanggan dengan email yang sama ditemukan") {
        const olseraEmailExist = await olseraApi.fetchCustomersByEmail(data.email)
        
        const updateCustomer =  await olseraApi.updateCustomerByOrder(olseraEmailExist.data.id, customerData)
        console.log('updateCustomer', updateCustomer)
        console.log(createCustomer.error)
      }
      if (createCustomer.data) {
        olseraApi.cancelOrder(createCustomer.data.id)
        olseraId = createCustomer.data.customer_id
    }
      console.log("createCustomer", createCustomer);
    }
    if (olseraPhoneExist.data) {
      console.log("here");
      olseraId = olseraPhoneExist.data[0].id;
    }

    if (!olseraId) {
        console.log("error no olserair")
      throw new Error("Olsera id not found");
    }
    console.log("olseraIdxxxxxx", olseraId);
    const newUser = new User({
      username: data.name,
      email: data.email,
      olseraId: olseraId,
      password: data.password,
      phone: phoneCleaned,
    });

    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    if (error.code === 11000) {
      console.error("Error: Duplicate not allowed.");
    } else {
      console.error("Error finding email: ", error);
    }
    throw error;
  }
};



function convertPhoneIndonesian(phoneNumber) {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");
  if (cleanedNumber.startsWith("0")) {
    return "+62" + cleanedNumber.slice(1);
  }
  if (cleanedNumber.startsWith("62")) {
    return "+" + cleanedNumber;
  }
  return "+62" + cleanedNumber;
}

async function checkDuplicateEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user !== null;
  } catch (error) {
    console.error("Error checking for duplicate email:", error);
    return false;
  }
}
async function checkDuplicatePhone(phone) {
  try {
    const user = await User.findOne({ phone });
    return user !== null;
  } catch (error) {
    console.error("Error checking for duplicate phone:", error);
    return false;
  }
}

module.exports = {
  createUser,
  getUserList,
};
