const seatContainer = document.getElementById("seatContainer");
const seatInfo = document.getElementById("seatInfo");
const issuedBooksList = document.getElementById("issuedBooks");

const totalSeats = 50;
let bookedSeats = 0;
let issuedBooks = [];

// Create 50 seats
for (let i = 1; i <= totalSeats; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat");
  seat.textContent = i;
  seat.addEventListener("click", () => toggleSeat(seat));
  seatContainer.appendChild(seat);
}

function toggleSeat(seat) {
  if (seat.classList.contains("booked")) {
    seat.classList.remove("booked");
    bookedSeats--;
  } else {
    seat.classList.add("booked");
    bookedSeats++;
  }
  updateSeatInfo();
}

function updateSeatInfo() {
  seatInfo.textContent = `Booked Seats: ${bookedSeats} / ${totalSeats}`;
}
updateSeatInfo();

// Book Issue
document.getElementById("bookForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("bookTitle").value;
  const student = document.getElementById("studentName").value;
  const studentId = document.getElementById("studentId").value;
  const department = document.getElementById("Department").value;

  issuedBooks.push({ title, student, studentId, department });
  renderIssuedBooks();
  this.reset();
});

function renderIssuedBooks() {
  issuedBooksList.innerHTML = "";
  issuedBooks.forEach(book => {
    const li = document.createElement("li");
    li.textContent = `${book.title} issued to ${book.student} (${book.studentId})`;
    issuedBooksList.appendChild(li);
  });
}

// Department-wise Book Issue
const booksByDepartment = {
  engineering: [
    "Computer Science Fundamentals",
    "Mechanical Engineering Design",
    "Civil Engineering Structures",
    "Electrical Circuits",
    "Electronics & Communication Systems"
  ],
  pharmacy: [
    "Pharmacology Essentials",
    "Pharmaceutical Chemistry",
    "Pharmacognosy Guide",
    "Advanced Pharmaceutics"
  ],
  business: [
    "Principles of Management",
    "Financial Accounting",
    "Marketing Strategies",
    "Human Resource Development"
  ],
  law: [
    "Constitutional Law",
    "Criminal Law Handbook",
    "Corporate Law Basics",
    "International Law Treaties"
  ],
  fashion: [
    "Textile Design",
    "Apparel Construction",
    "Fashion Illustration",
    "Merchandising & Retail"
  ]
};

const departmentSelect = document.getElementById("department");
const deptBookList = document.getElementById("deptBookList");

departmentSelect.addEventListener("change", function() {
  const dept = this.value;
  deptBookList.innerHTML = "";

  if (dept && booksByDepartment[dept]) {
    const ul = document.createElement("ul");
    booksByDepartment[dept].forEach(book => {
      const li = document.createElement("li");
      li.textContent = book;

      const issueBtn = document.createElement("button");
      issueBtn.textContent = "Issue";
      issueBtn.addEventListener("click", () => {
        issuedBooks.push({ title: book, student: "Dept-Issue", studentId: dept });
        renderIssuedBooks();
      });

      li.appendChild(issueBtn);
      ul.appendChild(li);
    });
    deptBookList.appendChild(ul);
  } else {
    deptBookList.innerHTML = "<p>Please select a department to view books.</p>";
  }
});

// Library Timings
function showTimings() {
  const day = document.getElementById("dayInput").value.trim();
  if (!day) {
    document.getElementById("timings").textContent = "Please enter a valid day.";
    return;
  }

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const weekends = ["Saturday", "Sunday"];

  let timings;
  if (weekdays.includes(day)) {
    timings = "Library open: 9 AM – 7 PM (Monday to Friday)";
  } else if (weekends.includes(day)) {
    timings = "Library open: 12 PM – 5 PM (Saturday & Sunday)";
  } else {
    timings = "Invalid day entered. Please type a valid day (e.g., Monday).";
  }

  document.getElementById("timings").textContent = timings;
}
