const codModel = require("../../models/codModel");

async function updatePaymentStatusController(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await codModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = updatePaymentStatusController;
