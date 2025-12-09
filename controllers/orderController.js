const Order = require('../models/Orders');

exports.getOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get user's email from the decoded token
    const userEmail = req.user.email;
    
    console.log('🔍 Fetching orders for:', userEmail);

    // Find orders for this user's shop
    const orders = await Order.find({ shopemail: userEmail })
      .sort({ createdAt: -1 })
      .limit(limit);

    console.log('✅ Found orders:', orders.length);

    // Transform data for frontend
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      orderId: order.orderId,
      customerName: order.user,
      products: order.products,
    }));

    res.json(formattedOrders);

  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    const order = await Order.findOne({ _id: id, shopemail: userEmail });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);

  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};