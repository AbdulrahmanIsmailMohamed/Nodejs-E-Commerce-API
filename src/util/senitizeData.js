const senitizeUserLogin = (user) => (
    {
        _id: user._id,
        name: user.name,
        email: user.email,
        addresses: user.addresses,
        wishList: user.wishList
    }
);

const senitizeUserSignup = (user) => (
    {
        _id: user._id,
        name: user.name,
        email: user.email,
    }
)

module.exports = {
    senitizeUserLogin,
    senitizeUserSignup
};