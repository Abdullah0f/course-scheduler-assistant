import { ref } from 'vue';
import { db } from '../../firebase/confing';
import { collection, getDocs, query, where } from 'firebase/firestore';

const getCollection = async (collectionName, queryConstraints) => {
    const documents = ref([]);

    let collectionRef = collection(db, collectionName);

    if (queryConstraints) {
        collectionRef = query(collectionRef, where(...queryConstraints));
    }

    try {
        const snapshot = await getDocs(collectionRef);
        snapshot.docs.forEach(doc => {
            let docData = { ...doc.data(), id: doc.id };
            if (collectionName === 'favourite_schedules' && docData.schedule) {
                try {
                    docData.schedule = JSON.parse(docData.schedule);
                } catch (error) {
                    console.error('Error parsing schedule JSON for document', doc.id, error);
                }
            }
            documents.value.push(docData);
        });
    } catch (error) {
        console.error('Error fetching documents:', error);
    }

    return documents;
};

export default getCollection;
