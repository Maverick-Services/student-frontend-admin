import { STATUS } from "../utils/constants"

export const users = [
    {
      "_id": "65f001abcde1234567aaa001",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "hashedpassword1",
      "role": "employee",
      "team": "65f101abcde2345678team01",
      "teamLeader": null,
      "tasks": ["65f301abcde4567890task01", "65f301abcde4567890task02"],
      "createdAt": "2025-02-27T10:00:00.000Z",
      "updatedAt": "2025-02-27T10:00:00.000Z"
    },
    {
      "_id": "65f002abcde1234567aaa002",
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "password": "hashedpassword2",
      "role": "employee",
      "team": "65f101abcde2345678team01",
      "teamLeader": "65f005abcde1234567lead01",
      "tasks": ["65f301abcde4567890task03"],
      "createdAt": "2025-02-27T10:05:00.000Z",
      "updatedAt": "2025-02-27T10:05:00.000Z"
    },
    {
      "_id": "65f003abcde1234567aaa003",
      "name": "Michael Johnson",
      "email": "michaelj@example.com",
      "password": "hashedpassword3",
      "role": "employee",
      "team": "65f102abcde2345678team02",
      "teamLeader": "65f006abcde1234567lead02",
      "tasks": ["65f301abcde4567890task04"],
      "createdAt": "2025-02-27T10:10:00.000Z",
      "updatedAt": "2025-02-27T10:10:00.000Z"
    },
    {
      "_id": "65f004abcde1234567aaa004",
      "name": "Emily Brown",
      "email": "emilyb@example.com",
      "password": "hashedpassword4",
      "role": "employee",
      "team": "65f101abcde2345678team01",
      "teamLeader": "65f005abcde1234567lead01",
      "tasks": ["65f301abcde4567890task05", "65f301abcde4567890task06"],
      "createdAt": "2025-02-27T10:15:00.000Z",
      "updatedAt": "2025-02-27T10:15:00.000Z"
    },
    {
      "_id": "65f005abcde1234567lead01",
      "name": "David Wilson",
      "email": "davidw@example.com",
      "password": "hashedpassword5",
      "role": "admin",
      "team": "65f102abcde2345678team02",
      "teamLeader": null,
      "tasks": ["65f301abcde4567890task07"],
      "createdAt": "2025-02-27T10:20:00.000Z",
      "updatedAt": "2025-02-27T10:20:00.000Z"
    }
  ]

export const teamsData = [
    {
      "_id": "65f101abcde2345678team01",
      "teamLeader": "65f005abcde1234567lead01",
      "teamName": "Alpha Innovators",
      "description": "A team focused on AI and machine learning innovations.",
      "members": ["65f001abcde1234567aaa001", "65f002abcde1234567aaa002", "65f004abcde1234567aaa004"],
      "tasks": ["65f301abcde4567890task03", "65f301abcde4567890task05", "65f301abcde4567890task06"],
      "createdAt": "2025-02-27T09:00:00.000Z",
      "updatedAt": "2025-02-27T09:00:00.000Z"
    },
    {
      "_id": "65f102abcde2345678team02",
      "teamLeader": "65f006abcde1234567lead02",
      "teamName": "Tech Pioneers",
      "description": "Experts in cloud computing and DevOps solutions.",
      "members": ["65f003abcde1234567aaa003", "65f005abcde1234567lead01"],
      "tasks": ["65f301abcde4567890task04", "65f301abcde4567890task07"],
      "createdAt": "2025-02-27T09:30:00.000Z",
      "updatedAt": "2025-02-27T09:30:00.000Z"
    }
  ]
  
export const tasksData = [
  {
    _id: 121,
    name: "ERP",
    description: "Maverick ERP",
    clientName:"Maverick",
    deadline: "12 Feb 2025",
    status: STATUS.PENDING,
    steps:[
      {
        name: "Design",
        description: "UI and UX",
        deadline: "12 Feb 2025",
        status: STATUS.PENDING,
      }
    ]
  }
]