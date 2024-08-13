// // /app/api/user/route.js

// import { NextApiRequest, NextApiResponse } from 'next';
// import { getUser, createUser, updateUser, deleteUser } from '../../../services/userService';

// export default async function handler(req = NextApiRequest, res = NextApiResponse) {
//     try {
//         switch (req.method) {
//             case 'GET':
//                 const user = await getUser(req.query.id);
//                 return res.status(200).json(user);

//             case 'POST':
//                 const newUser = await createUser(req.body);
//                 return res.status(201).json(newUser);

//             case 'PUT':
//                 const updatedUser = await updateUser(req.query.id, req.body);
//                 return res.status(200).json(updatedUser);

//             case 'DELETE':
//                 await deleteUser(req.query.id);
//                 return res.status(204).end();

//             default:
//                 res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//                 return res.status(405).end(`Method ${req.method} Not Allowed`);
//         }
//     } catch (error) {
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
