// const Order = require('../models/Order');
// const Product = require('../models/Product');
const User = require('../models/Users');

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
    // Get user ID from the verified token (set by authMiddleware)
    const userId = req.user.uid;

    // Find user in database
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return shop information
    res.json({
      name: user.shopName,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      telephone: user.telephone,
      address: user.address
    });

  } catch (error) {
    console.error('❌ Error fetching shop info:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
