import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  const accessToken =
    req.cookies.accessToken ||
    req.headers["x-access-token"];
  // console.log(accessToken);
  if (!accessToken) return res.sendStatus(401);
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      const id = decoded.userId;
      const email = decoded.email;
      const userName = decoded.userName;
      // console.log(
      //   "verify=>",
      //   id,
      //   email,
      //   userName
      // );
      next();
    }
  );
};
