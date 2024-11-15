type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  priority: "low" | "medium" | "high";
};

const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
    priority: "low",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
    priority: "medium",
  },
  {
    id: "a1b2c3d4",
    amount: 150,
    status: "success",
    email: "user1@example.com",
    priority: "low",
  },
  {
    id: "e5f6g7h8",
    amount: 200,
    status: "failed",
    email: "user2@example.com",
    priority: "high",
  },
  {
    id: "i9j0k1l2",
    amount: 175,
    status: "pending",
    email: "user3@example.com",
    priority: "low",
  },
  {
    id: "m3n4o5p6",
    amount: 300,
    status: "processing",
    email: "user4@example.com",
    priority: "medium",
  },
  {
    id: "q7r8s9t0",
    amount: 250,
    status: "success",
    email: "user5@example.com",
    priority: "low",
  },
  {
    id: "u1v2w3x4",
    amount: 100,
    status: "failed",
    email: "user6@example.com",
    priority: "high",
  },
  {
    id: "y5z6a7b8",
    amount: 225,
    status: "pending",
    email: "user7@example.com",
    priority: "low",
  },
  {
    id: "c9d0e1f2",
    amount: 275,
    status: "processing",
    email: "user8@example.com",
    priority: "medium",
  },
  {
    id: "g3h4i5j6",
    amount: 125,
    status: "success",
    email: "user9@example.com",
    priority: "low",
  },
  {
    id: "k7l8m9n0",
    amount: 180,
    status: "pending",
    email: "user10@example.com",
    priority: "low",
  },
  {
    id: "o1p2q3r4",
    amount: 220,
    status: "processing",
    email: "user11@example.com",
    priority: "medium",
  },
  {
    id: "s5t6u7v8",
    amount: 260,
    status: "success",
    email: "user12@example.com",
    priority: "low",
  },
  {
    id: "w9x0y1z2",
    amount: 310,
    status: "failed",
    email: "user13@example.com",
    priority: "high",
  },
  {
    id: "a3b4c5d6",
    amount: 140,
    status: "pending",
    email: "user14@example.com",
    priority: "low",
  },
  {
    id: "e7f8g9h0",
    amount: 190,
    status: "processing",
    email: "user15@example.com",
    priority: "medium",
  },
  {
    id: "i1j2k3l4",
    amount: 230,
    status: "success",
    email: "user16@example.com",
    priority: "low",
  },
  {
    id: "m5n6o7p8",
    amount: 270,
    status: "failed",
    email: "user17@example.com",
    priority: "high",
  },
  {
    id: "q9r0s1t2",
    amount: 320,
    status: "pending",
    email: "user18@example.com",
    priority: "low",
  },

  // ...
];

export async function fetchMockPayments(): Promise<Payment[]> {
  // Fetch data from your API here.
  return payments;
}
