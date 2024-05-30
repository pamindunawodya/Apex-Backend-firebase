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
import db from "../firebase";


const app = express();
app.use(bodyParser.json());

app.post('/add-user', async (req, res) => {
    const {contactNo,name} = req.body as {name:string,contactNo:string};
    try {
        await addData('users', contactNo, { name,contactNo });
        res.status(200).send('User added successfully');
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send('Error adding user: ' + error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});



interface UserData {
    contactNo:string;
    name:string;
}


app.put('/update-contact', async (req, res) => {
    const { oldContactNo, newContactNo } = req.body as { oldContactNo: string, newContactNo: string };
    if (!oldContactNo || !newContactNo) {
        res.status(400).send('Invalid input: oldContactNo and newContactNo are required');
        return;
    }

    try {
        // Retrieve the document to update
        const userDoc = db.collection('users').doc(oldContactNo);
        const doc = await userDoc.get();

        if (!doc.exists) {
            res.status(404).send('User not found');
            return;
        }

        const userData = doc.data() as UserData;

        // Update the document with the new contact number
        await db.collection('users').doc(newContactNo).set({ ...userData, contactNo: newContactNo });
        await userDoc.delete();

        res.status(200).send('Contact number updated successfully');
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send('Error updating contact number: ' + error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

