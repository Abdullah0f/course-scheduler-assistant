import { ref, watchEffect } from 'vue'
import { db } from '../../firebase/confing'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const getCollection = (c, q) => {
    const documents = ref(null)

    let colRef = collection(db, c)

    if (q) {
        colRef = query(colRef, where(...q));
    }

    const unsub = onSnapshot(colRef, snapshot => {
        let results = [];
        snapshot.docs.forEach(doc => {

            let docData = { ...doc.data(), id: doc.id }
            
            // Parse the 'schedule' field if it exists and we're in the 'favourite_schedules' collection
            if (c === 'favourite_schedules' && docData.schedule) {
                try {
                    docData.schedule = JSON.parse(docData.schedule)
                } catch (error) {
                    console.error('Error parsing schedule JSON for document', doc.id, error)
                }
            }

            results.push(docData)
        })

        documents.value = results
    })

    // Unsubscribe from real-time listener when no longer in use
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents }
}

export default getCollection
