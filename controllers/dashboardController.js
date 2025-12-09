// const Order = require('../models/Order');
// const Product = require('../models/Product');
const Customer = require('../models/Users');

// Get dashboard stats
// exports.getStats = async (req, res) => {
//   try {
//     const userId = req.user.userId; // From JWT token

//     const totalOrders = await Order.countDocuments({ shopOwner: userId });
//     const totalRevenue = await Order.aggregate([
//       { $match: { shopOwner: userId } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const totalProducts = await Product.countDocuments({ shopOwner: userId });
//     const totalCustomers = await Customer.countDocuments({ shopOwner: userId });

//     const stats = [
//       { label: 'Total Revenue', value: `$${totalRevenue[0]?.total || 0}`, color: 'bg-blue-100', icon: 'DollarSign' },
//       { label: 'Total Orders', value: totalOrders, color: 'bg-green-100', icon: 'ShoppingCart' },
//       { label: 'Products', value: totalProducts, color: 'bg-purple-100', icon: 'Package' },
//       { label: 'Customers', value: totalCustomers, color: 'bg-yellow-100', icon: 'Users' }
//     ];

//     res.json(stats);
//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// Get shop info
exports.getShopInfo = async (req, res) => {
  try {
    const User = require('../models/Users');
    const user = await User.findById(req.user.userId);
    
    res.json({ 
      name: user.shopName,
      owner: `${user.firstName} ${user.lastName}`,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};