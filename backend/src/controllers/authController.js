const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

// In production these operations should use repository/data access layers.
const users = [];
const drivers = [];

const signUp = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    res.status(409);
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    name,
    email,
    phone,
    passwordHash,
    role: 'customer'
  };

  users.push(user);

  return res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: generateToken({ id: user.id, role: user.role })
  });
};

const login = async (req, res) => {
  const { email, password, role = 'customer' } = req.body;
  const collection = role === 'driver' ? drivers : users;
  const account = collection.find((u) => u.email === email);

  if (!account || !(await bcrypt.compare(password, account.passwordHash))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  return res.status(200).json({
    user: { id: account.id, name: account.name, email: account.email, role: account.role },
    token: generateToken({ id: account.id, role: account.role })
  });
};

const registerDriver = async (req, res) => {
  const { name, email, password, vehicleType, vehicleNumber, licenseDocumentUrl } = req.body;

  if (!name || !email || !password || !vehicleType || !vehicleNumber) {
    res.status(400);
    throw new Error('Missing required driver details');
  }

  const driverExists = drivers.find((d) => d.email === email);
  if (driverExists) {
    res.status(409);
    throw new Error('Driver already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const driver = {
    id: drivers.length + 1,
    name,
    email,
    role: 'driver',
    passwordHash,
    vehicleType,
    vehicleNumber,
    licenseDocumentUrl: licenseDocumentUrl || 'upload-pending',
    isApproved: false,
    isOnline: false,
    walletBalance: 0
  };

  drivers.push(driver);

  return res.status(201).json({
    message: 'Driver registered. Approval pending admin review.',
    driverId: driver.id
  });
};

module.exports = {
  signUp,
  login,
  registerDriver,
  users,
  drivers
};
