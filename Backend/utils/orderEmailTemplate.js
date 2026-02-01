const orderEmailTemplate = ({ user, order }) => {
  const itemsHtml = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;">${item.name}</td>
        <td style="padding:8px; text-align:center;">${item.qty}</td>
        <td style="padding:8px; text-align:right;">₹${item.price}</td>
      </tr>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif; background:#f7f7f7; padding:30px;">
    <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
      
      <h2 style="text-align:center; color:#111;">Thank you for your order, ${user.name}!</h2>
      <p style="text-align:center; color:#555;">
        Your order has been successfully placed.
      </p>

      <hr style="margin:20px 0;" />

      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Payment Status:</strong> ${order.isPaid ? "Paid" : "Pending"}</p>

      <table width="100%" style="border-collapse:collapse; margin-top:20px;">
        <thead>
          <tr style="background:#f1f1f1;">
            <th style="padding:10px; text-align:left;">Product</th>
            <th style="padding:10px;">Qty</th>
            <th style="padding:10px; text-align:right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <hr style="margin:20px 0;" />

      <h3 style="text-align:right;">Total: ₹${order.totalPrice}</h3>

      <p style="margin-top:30px; color:#777; font-size:14px;">
        If you have any questions, reply to this email or contact our support.
      </p>

      <p style="text-align:center; margin-top:40px; font-weight:bold;">
        — Shreeji Store
      </p>
    </div>
  </div>
  `;
};

export default orderEmailTemplate;
