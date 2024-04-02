const authenticateToken = async (req, res, next)=> {
    try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({message: "Unauthorized"})
    }
  
    const token = authHeader.split(' ')[1];
     jwt.verify(token, process.env.JWT_SECRET, (err, customer)=> {
      if(err) {
        return res.status(403).json({message: 'Authentication Error'})
      }
      req.customer = customer;
      next();
     });
  
  } catch (err) {
    return res.status(400).json({message: "error occurred"});
  }
  
  }