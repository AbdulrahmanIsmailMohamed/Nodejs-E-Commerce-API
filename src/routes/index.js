// routes
const categoryRoute = require('./category.routes');
const subcategoryRoute = require('./subCategory.routes');
const brandRoute = require('./brand.routes');
const productRoute = require('./product.routes');
const userRoute = require('./user.routes');
const authRoute = require('./auth.routes');
const reviewRoute = require('./review.routes');
const wishlistRoute = require('./wishlist.routes');
const addressRoute = require('./address.routes');
const couponRoute = require('./coupon.routes');
const cartRoute = require('./cart.routes');
const orderRoute = require('./order.routes');

const mounter = (app, api) => {
    app.use(`${api}/categories`, categoryRoute);
    app.use(`${api}/sub-categories`, subcategoryRoute);
    app.use(`${api}/brands`, brandRoute);
    app.use(`${api}/products`, productRoute);
    app.use(`${api}/users`, userRoute);
    app.use(`${api}/auth`, authRoute);
    app.use(`${api}/reviews`, reviewRoute);
    app.use(`${api}/wishlists`, wishlistRoute);
    app.use(`${api}/addresses`, addressRoute);
    app.use(`${api}/coupons`, couponRoute);
    app.use(`${api}/carts`, cartRoute);
    app.use(`${api}/orders`, orderRoute);
}

module.exports = mounter;