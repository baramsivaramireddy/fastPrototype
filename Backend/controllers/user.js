const path = require('path');
const User = require(path.resolve(DB_MODEL, 'user'));
const Role = require(path.resolve(DB_MODEL, 'role'));
const dbconnect = require(path.resolve(__dirname, '..', 'dbconnect'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * User controller
 * 
 * signup 
 *       first one to signup is given admin role
 *       all others user role
 */

const defaultRole = 'user';
const ADMINROLE = 'admin';
module.exports = {
  signup: async (req, res) => {
    try {
      await dbconnect();
      const { name, email, password, roleId } = req.body;


      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      let userCount = await User.find({}).countDocuments();

      if (userCount == 0) {


        let adminRole = await Role.findOne({ name: ADMINROLE });

        if (adminRole == null) {
          adminRole = new Role({ name: ADMINROLE })
          await adminRole.save()
        }



        // Create user with specified role
        const user = new User({
          name,
          email,
          password: hashedPassword,
          role: adminRole._id,
        });

        await user.save();


        return res.status(201).json({message:'admin is created'})
      }




      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }




      let role = await Role.findOne({ name: defaultRole });

      if (!role) {
        role = new Role({ name: defaultRole });
        await role.save();
      }



      // Create user with specified role
      const user = new User({
        name,
        email,
        password: hashedPassword,
   
        role: role._id,
      });

      await user.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      await dbconnect();
      const { email, password } = req.body;
      const user = await User.findOne({ email }).populate('role');

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token with user ID and role, set to expire in 7 days
      const token = jwt.sign(
        { userId: user._id, role: user.role.name },
        __configurations.SECRETKEY,
        { expiresIn: '7d' }
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  create: async (req, res) => {
    try {
      await dbconnect();
      const { name, email, password, roleId } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const role = await Role.findById(roleId);

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user with specified role
      const user = new User({
        name,
        email,
        password: hashedPassword,
    
        role: role._id,
      });

      await user.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  find: async (req, res) => {
    try {
      await dbconnect();
      const userId = req.params.id;

      const user = await User.findById(userId).populate('role');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    try {
      await dbconnect();
      const userId = req.params.id;
      const { name, email, password,  roleId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const role = await Role.findById(roleId);

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      // Update user details
      user.name = name;
      user.email = email;
      user.password = password ? await bcrypt.hash(password, 10) : user.password;
      
      user.role = role._id;

      await user.save();

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    try {
      await dbconnect();
      const userId = req.params.id;

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  search: async (req, res) => {
    try {
      await dbconnect();
      const users = await User.find().populate('role');
      res.status(200).json({ count: users.length, data: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
