export default function mailOnCreatingFlight(flightObj) {
  const {
    flightNumber,
    airline,
    origin,
    destination,
    daysOfOperation,
    category,
    status,
  } = flightObj;
  const stringMessage = `<b>Dear Admin</b>

<p>
We’re excited to let you know that your flight ${flightNumber} with ${airline} has been successfully registered on our website AirNinja.
</p>

<h3>Flight Details:</h3>

    <ul style="list-style-type:none">
    <li>From: ${origin}</li>

    <li>To : ${destination}</li>

    <li>Days of Operation: ${daysOfOperation.toString()}</li>

    <li>Category: ${category}</li>

    <li>Flight Status: ${status}</li>
    </ul>


<p>You can now manage your flight, update seat availability, or track bookings directly through your dashboard.</p>

<p>If you have any questions or need further assistance, feel free to reach out to our support team at sampleQuery@airninja.com.</p>

<p>Thank you for choosing Us.</p>

Best regards,
<br/>
Air Ninja Team`;

  return stringMessage;
}
