import userMusician from "../assets/Musician.png";

export const messages = [
  {
    id: 1,
    participants: [
      {
        id: 1,
        username: "Matei",
        isOwner: true,
        profilePic: userMusician,
      },
      {
        id: 2,
        username: "Castel Mimi",
        isOwner: false,
        profilePic:
          "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
    ],
    messages: [
      {
        senderId: 2,
        content:
          "Hello Matei, I am interested in booking your services for an event next month. Can we discuss the details?",
        date: "2 hours ago",
        isRead: true,
      },
      {
        senderId: 1,
        content:
          "Sure! I'd be happy to help. Let's talk about your requirements.",
        date: "1 hour ago",
        isRead: true,
      },
      {
        senderId: 2,
        content:
          "We are planning a large event at Castel Mimi, and we want to know if you're available during the second week of next month.",
        date: "50 minutes ago",
        isRead: true,
      },
      {
        senderId: 1,
        content:
          "I am available that week. Could you share more information on the event?",
        date: "30 minutes ago",
        isRead: true,
      },
      {
        senderId: 2,
        content:
          "It's a wine-tasting event, and we expect around 200 guests. We need live music for the evening.",
        date: "15 minutes ago",
        isRead: false,
      },
    ],
  },
  {
    id: 2,
    participants: [
      {
        id: 1,
        username: "Matei",
        isOwner: true,
        profilePic: userMusician,
      },
      {
        id: 3,
        username: "Loredana Events",
        isOwner: false,
        profilePic:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
    ],
    messages: [
      {
        senderId: 3,
        content:
          "Hi Matei, are you available for a private birthday party performance next Saturday?",
        date: "3 days ago",
        isRead: true,
      },
      {
        senderId: 1,
        content:
          "Hello, Loredana! Let me check my schedule and get back to you.",
        date: "2 days ago",
        isRead: true,
      },
      {
        senderId: 3,
        content:
          "Thanks! It’s a small gathering, and we’d love some acoustic music.",
        date: "1 day ago",
        isRead: false,
      },
    ],
  },
  {
    id: 3,
    participants: [
      {
        id: 1,
        username: "Matei",
        isOwner: true,
        profilePic: userMusician,
      },
      {
        id: 4,
        username: "Gala Concerts",
        isOwner: false,
        profilePic:
          "https://images.pexels.com/photos/1684727/pexels-photo-1684727.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
    ],
    messages: [
      {
        senderId: 4,
        content:
          "Matei, we loved your performance last time! Are you interested in performing at our New Year's Gala?",
        date: "1 week ago",
        isRead: true,
      },
      {
        senderId: 1,
        content:
          "Hi! Thank you for the kind words. I’d love to hear more about the event.",
        date: "6 days ago",
        isRead: true,
      },
      {
        senderId: 4,
        content:
          "It’s a formal event with a mix of classical and modern music. Around 500 attendees are expected.",
        date: "5 days ago",
        isRead: false,
      },
    ],
  },
  {
    id: 4,
    participants: [
      {
        id: 1,
        username: "Matei",
        isOwner: true,
        profilePic: userMusician,
      },
      {
        id: 5,
        username: "Artiste Lounge",
        isOwner: false,
        profilePic:
          "https://images.pexels.com/photos/374819/pexels-photo-374819.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
    ],
    messages: [
      {
        senderId: 5,
        content:
          "Hey Matei, we’re hosting an art exhibition next month and would love to feature your music.",
        date: "2 weeks ago",
        isRead: true,
      },
      {
        senderId: 1,
        content:
          "Hello! That sounds wonderful. Could you tell me more about the event?",
        date: "2 weeks ago",
        isRead: true,
      },
      {
        senderId: 5,
        content:
          "Sure! It’s a mix of visual and performance arts. We’re expecting an audience of around 300 people.",
        date: "2 weeks ago",
        isRead: true,
      },
    ],
  },
  {
    id: 5,
    participants: [
      {
        id: 1,
        username: "Matei",
        isOwner: true,
        profilePic: userMusician,
      },
      {
        id: 6,
        username: "Eventia",
        isOwner: false,
        profilePic:
          "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
    ],
    messages: [
      {
        senderId: 6,
        content:
          "Hello Matei, we are organizing a corporate dinner and would like to book you for some live music.",
        date: "4 days ago",
        isRead: true,
      },
      {
        senderId: 1,
        content:
          "Hi, I’d love to be a part of it. What’s the date and location of the event?",
        date: "3 days ago",
        isRead: true,
      },
      {
        senderId: 6,
        content:
          "It’s on December 15th at the Grand Hall downtown. Let me know if that works for you.",
        date: "3 weeks ago",
        isRead: true,
      },
    ],
  },
];
