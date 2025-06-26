import express from 'express';
import mongoose from 'mongoose';
import User from './crud.js';
import cors from 'cors';


mongoose.connect("mongodb+srv://sarthaknerasoft:tggVh40CkQsmXnY5@cluster0.zgnldkh.mongodb.net/user").then(() => {
    console.log("Connected to MongoDB successfully");
}
).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
}
);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         let htmlResponse = '<h1>Users List</h1><ul>';
//         users.forEach(user => {
//             htmlResponse += `<li>${user.name} - ${user.email}</li>`;
//         });
//         htmlResponse += '</ul>';
//         res.send(htmlResponse); // Sending the data as HTML
//     } catch (error) {
//         res.status(500).send('<h1>Error occurred</h1><p>' + error.message + '</p>');
//     }
// });

app.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);


app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.age = req.body.age || user.age;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {

        const deleteUser = User.findByIdAndDelete(req.params.id);

        if (deleteUser) {
            return res.status(200).json({ message: 'User deleted successfully' });

        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

app.get('/', (req, res) => {
    const user = new User({
        name: 'John Does',
        age: 30,
        password: '123',
        email: "fhreudj"
    })
    user.save();
    res.send('Hello World!');
})

app.listen(4000, () => {
    console.log('Server is running on port 3000');
}
);
