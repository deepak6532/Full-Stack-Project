export const bookingReceivedEmail = (bookingId: string, userName: string): string => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e3a5f, #0ea5e9); padding: 30px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 24px; }
    .body { padding: 30px; color: #333; }
    .booking-id { background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 18px; font-weight: bold; color: #1e3a5f; }
    .footer { background: #1e3a5f; color: #94a3b8; padding: 20px; text-align: center; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚗 Sharma Car Rental</h1>
    </div>
    <div class="body">
      <h2>Thank You, ${userName}!</h2>
      <p>Thank you for choosing <strong>Sharma Car Rental</strong>! Your booking request has been received successfully.</p>
      <div class="booking-id">Booking ID: ${bookingId}</div>
      <p>Your request is currently <strong>under review</strong> by our team. We will notify you once it has been processed.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
    </div>
    <div class="footer">
      <p>© 2024 Sharma Car Rental. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const bookingApprovedEmail = (bookingId: string, userName: string, carName: string, startDate: string): string => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #065f46, #10b981); padding: 30px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 24px; }
    .body { padding: 30px; color: #333; }
    .status { background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 18px; font-weight: bold; color: #065f46; }
    .footer { background: #065f46; color: #94a3b8; padding: 20px; text-align: center; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Booking Approved!</h1>
    </div>
    <div class="body">
      <h2>Great News, ${userName}!</h2>
      <p>Your car booking has been <strong>Approved</strong>!</p>
      <div class="status">Booking ID: ${bookingId}</div>
      <p><strong>Car:</strong> ${carName}</p>
      <p><strong>Pickup Date:</strong> ${startDate}</p>
      <p>We look forward to seeing you! Please arrive on time for your pickup.</p>
    </div>
    <div class="footer">
      <p>© 2024 Sharma Car Rental. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const bookingDeclinedEmail = (bookingId: string, userName: string): string => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #991b1b, #ef4444); padding: 30px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 24px; }
    .body { padding: 30px; color: #333; }
    .status { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 18px; font-weight: bold; color: #991b1b; }
    .footer { background: #991b1b; color: #fca5a5; padding: 20px; text-align: center; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>❌ Booking Declined</h1>
    </div>
    <div class="body">
      <h2>We Apologize, ${userName}</h2>
      <p>We're sorry, but the selected car is currently <strong>Not Available</strong>. Your booking has been declined.</p>
      <div class="status">Booking ID: ${bookingId}</div>
      <p>Please try booking another vehicle or contact our support team for assistance.</p>
    </div>
    <div class="footer">
      <p>© 2024 Sharma Car Rental. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
