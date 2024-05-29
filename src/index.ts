/*import express from 'express';

//invoke
const app=express();

//start the server
app.listen(8085,()=>{
    console.log("server started port 8085")
})*/

import express from 'express';
import bodyParser from 'body-parser';
import { addData } from '../firestoreService'

const app = express();
app.use(bodyParser.json());

app.post('/add-user', async (req, res) => {
    const { name, email, age } = req.body as { name: string; email: string; age: number };
    try {
        await addData('users', name, { name, email, age });
        res.status(200).send('User added successfully');
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send('Error adding user: ' + error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

