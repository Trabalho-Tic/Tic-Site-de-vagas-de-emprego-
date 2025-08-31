module.exports = role => (req, res, next) => {
  if (!req.user || req.user.typeUser !== role) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();
};