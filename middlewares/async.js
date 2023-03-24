module.exports = (routeHandler) => {
    return async (req, res, nxt) => {
        try {
            await routeHandler(req, res)
        } catch (err) {
            nxt(err)
        }
    }
}