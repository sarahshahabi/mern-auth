import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    console.log("Verufing is loading....");
    const token = req.cookies.access_token;
    if (!token) {
        console.log("there is not token");
        console.log(token);
        res.fail("You are not authenticated!", 401);
    } else {
        try {
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) {
                    res.fail("Token is not valid", 403);
                } else {
                    req.user = user;
                    next();
                }
            });
        } catch (e) {
            res.fail("Error", 403);
        }
    }
}
