import Dispute from "../models/Dispute.js";

export const createDispute = async (req, res) => {
  const dispute = await Dispute.create({
    order: req.body.orderId,
    buyer: req.user.id,
    message: req.body.message
  });

  res.json(dispute);
};

export const getDisputes = async (req, res) => {
  const disputes = await Dispute.find().populate("order");
  res.json(disputes);
};