const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token não enviado' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email, typeUser: payload.typeUser };
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};