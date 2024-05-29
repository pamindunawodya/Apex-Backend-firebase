import db from './firebase';

interface UserData {
    name: string;
    email: string;
    age: number;
}

export async function addData(collectionName: string, documentId: string, data: UserData): Promise<void> {
    try {
        const docRef = db.collection(collectionName).doc(documentId);
        await docRef.set(data);
        console.log('Document written successfully');
    } catch (error) {
        console.error('Error adding document: ', error);
        throw error;
    }
}
