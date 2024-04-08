const fs = require("fs");
const path = require("path");

const users = [
  {
    id: "1",
    username: {
      firstName: "John",
      lastName: "Doe",
    },
    email: "johndoe@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-m-1.jpg",
    timezone: "UTC",
    roles: ["user"],
    appointmentIds: ["a1", "a2"],
    createdAt: "2024-03-17T12:00:00Z",
  },
  {
    id: "2",
    username: {
      firstName: "Jane",
      lastName: "Doe",
    },
    email: "janedoe@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-w-1.jpg",
    timezone: "UTC-5",
    roles: ["user"],
    appointmentIds: ["a3", "a4"],
    createdAt: "2024-03-16T11:00:00Z",
  },
  {
    id: "3",
    username: {
      firstName: "Alex",
      lastName: "Smith",
    },
    email: "alexsmith@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-m-2.jpg",
    timezone: "UTC+1",
    roles: ["user", "expert"],
    bio: "Experienced business consultant with over 10 years in the industry.",
    specialization: ["Business Consulting", "Strategic Planning"],
    availability: "Weekdays 9am - 5pm",
    rating: 4.5,
    reviews: [
      {
        userId: "1",
        content: "Very insightful consultation, helped my business grow!",
        rating: 5,
      },
    ],
    address: {
      country: "France",
      city: "Paris",
      street: "Champs-Élysées",
      houseNumber: "100",
    },
    appointmentIds: ["a5", "a6"],
    createdAt: "2024-03-15T09:00:00Z",
  },
  {
    id: "4",
    username: {
      firstName: "Emily",
      lastName: "Johnson",
    },
    email: "emilyjohnson@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-w-2.jpg",
    timezone: "UTC+2",
    roles: ["user", "expert"],
    bio: "Renowned software architect and speaker at various tech conferences.",
    specialization: ["Software Architecture", "Public Speaking"],
    availability: "Mondays and Thursdays 2pm - 4pm",
    rating: 4.8,
    reviews: [
      {
        userId: "2",
        content: "Emily's insights on system design were eye-opening.",
        rating: 5,
      },
    ],
    address: {
      country: "Germany",
      city: "Berlin",
      street: "Unter den Linden",
      houseNumber: "5",
    },
    appointmentIds: ["a7", "a8"],
    createdAt: "2024-03-14T08:00:00Z",
  },
  {
    id: "5",
    username: {
      firstName: "Michael",
      lastName: "Brown",
    },
    email: "michaelbrown@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-m-3.jpg",
    timezone: "UTC+9",
    roles: ["user", "admin"],
    appointmentIds: ["a9", "a10"],
    createdAt: "2024-03-13T07:00:00Z",
  },
  {
    id: "6",
    username: {
      firstName: "Sara",
      lastName: "Miller",
    },
    email: "saramiller@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-w-3.jpg",
    timezone: "UTC-8",
    roles: ["user"],
    appointmentIds: ["a11", "a12"],
    createdAt: "2024-03-12T10:00:00Z",
  },
  {
    id: "7",
    username: {
      firstName: "Lucas",
      lastName: "Garcia",
    },
    email: "lucasgarcia@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-m-4.jpg",
    timezone: "UTC-3",
    roles: ["user"],
    appointmentIds: ["a13", "a14"],
    createdAt: "2024-03-11T09:30:00Z",
  },
  {
    id: "8",
    username: {
      firstName: "Olivia",
      lastName: "Martinez",
    },
    email: "oliviamartinez@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-w-4.jpg",
    timezone: "UTC+3",
    roles: ["user", "expert"],
    bio: "Dedicated nutritionist with a focus on sustainable eating habits.",
    specialization: ["Nutrition", "Sustainable Eating"],
    availability: "Tuesdays and Fridays 10am - 3pm",
    rating: 4.9,
    reviews: [
      {
        userId: "3",
        content:
          "Olivia helped me improve my diet in a sustainable way, highly recommended!",
        rating: 5,
      },
    ],
    address: {
      country: "Spain",
      city: "Barcelona",
      street: "Passeig de Gracia",
      houseNumber: "50",
    },
    appointmentIds: ["a15", "a16"],
    createdAt: "2024-03-10T07:45:00Z",
  },
  {
    id: "9",
    username: {
      firstName: "Ethan",
      lastName: "Wilson",
    },
    email: "ethanwilson@example.com",
    profilePicturePath: "assets/images/mockAvatars/avatar-m-5.jpg",
    timezone: "UTC+5:30",
    roles: ["user", "expert"],
    bio: "Tech entrepreneur and angel investor with a passion for startups.",
    specialization: ["Startup Growth", "Angel Investing"],
    availability: "Weekdays 4pm - 6pm",
    rating: 4.7,
    reviews: [
      {
        userId: "4",
        content: "Ethan's advice on securing investment was invaluable.",
        rating: 4.5,
      },
    ],
    address: {
      country: "India",
      city: "Mumbai",
      street: "Bandra West",
      houseNumber: "75",
    },
    appointmentIds: ["a17", "a18"],
    createdAt: "2024-03-09T06:00:00Z",
  },
];
const formatUsers = (users) => {
  const formatedUsers = users.map((obj) => {
    if (obj.roles.includes("expert")) {
      return {
        username: obj.username,
        email: obj.email,
        password: "Aa!12345",
        isExpert: true,
        specialization: obj.specialization.join(", "),
        bio: obj.bio,
        contactPhone: "0533333333",
        adsress: {
          ...obj.address,
          houseNum: obj.address.houseNumber,
        },
      };
    } else {
      return {
        username: obj.username,
        email: obj.email,
        password: "Aa!12345",
        isExpert: false,
      };
    }
  });
  return formatedUsers;
};

const jsonData = JSON.stringify(formatUsers(users), null, 2);
const filePath = path.join(__dirname, "./mockData/users.json");
fs.writeFile(filePath, jsonData, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("json has been written");
  }
});
