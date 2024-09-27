export const messages = [
  {
    id: 1,
    participants: [
      {
        id: 1,
        username: "Matei",
        isOwner: true,
        profilePic:
          "https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
        isRead: false, // Unread message
      },
      {
        senderId: 2,
        content:
          "It's a wine-tasting event, and we expect around 200 guests. We need live music for the evening.",
        date: "15 minutes ago",
        isRead: false, // Unread message
      },
      {
        senderId: 1,
        content: "That sounds great! I'd love to be a part of it.",
        date: "10 minutes ago",
        isRead: false, // Unread message
      },
    ],
  },
];
