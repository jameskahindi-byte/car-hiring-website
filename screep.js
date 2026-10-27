
const carPrices = {
camaro: 12000,
mercedes: 10000,
suv: 8000,
economy: 4000
};

const carNames = {
camaro: "Chevrolet Camaro",
mercedes: "Mercedes-Benz",
suv: "Family SUV",
economy: "Economy Car"
};

const carSelect = document.getElementById("car");
const daysInput = document.getElementById("days");
const totalDisplay = document.getElementById("bookingTotal");
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

function calculateTotal() {
if (!carSelect || !daysInput || !totalDisplay) return;

const price = carPrices[carSelect.value] || 0;
const days = Number(daysInput.value) || 0;

totalDisplay.textContent =
"Estimated Total: KSh " + (price * days).toLocaleString("en-KE");
}

if (carSelect && daysInput) {
carSelect.addEventListener("change", calculateTotal);
daysInput.addEventListener("input", calculateTotal);

const selectedCar = new URLSearchParams(window.location.search).get("car");
if (selectedCar && carPrices[selectedCar]) {
carSelect.value = selectedCar;
}

calculateTotal();
}

if (bookingForm) {
bookingForm.addEventListener("submit", function(event) {
event.preventDefault();

const name = document.getElementById("customerName").value.trim();
const email = document.getElementById("customerEmail").value.trim();
const car = carSelect.value;
const pickupDate = document.getElementById("pickupDate").value;
const days = Number(daysInput.value);

if (!name || !email || !car || !pickupDate || days < 1) {
bookingMessage.textContent = "Please complete all fields correctly.";
return;
}

const booking = {
name: name,
email: email,
car: carNames[car],
pickupDate: pickupDate,
days: days,
total: carPrices[car] * days
};

const bookings = JSON.parse(
localStorage.getItem("mbrBookings") || "[]"
);

bookings.push(booking);
localStorage.setItem("mbrBookings", JSON.stringify(bookings));

bookingMessage.textContent =
"Booking saved! Estimated total: KSh " +
booking.total.toLocaleString("en-KE");

bookingForm.reset();
calculateTotal();
});
}

const savedBookings = document.getElementById("savedBookings");

if (savedBookings) {
const bookings = JSON.parse(
localStorage.getItem("mbrBookings") || "[]"
);

if (bookings.length === 0) {
savedBookings.textContent = "No bookings saved yet.";
} else {
savedBookings.innerHTML = bookings.map(function(booking) {
return `
<article class="car-card">
<h3>${booking.car}</h3>
<p>Customer: ${booking.name}</p>
<p>Pickup: ${booking.pickupDate}</p>
<p>Days: ${booking.days}</p>
<strong>KSh ${booking.total.toLocaleString("en-KE")}</strong>
</article>
`;
}).join("");
}
}

