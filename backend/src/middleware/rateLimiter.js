
const rateLimiter = async (_, res, next) => {
    try {
        const {success} = await rateLimit("my-rate-limit")
        if (!success){
            return res.status(429).json({message: "Too many requests, please try again later"})
        }
        next()
    } catch (error) {
        console.log("Error in rateLimiter middleware", error)
        // res.status(500).json({message: "Internal server error"})
        next(error)
    }
}

export default rateLimiter