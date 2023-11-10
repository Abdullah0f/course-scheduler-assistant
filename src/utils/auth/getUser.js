import { ref } from "vue";
import { auth } from '../../firebase/confing'
import { onAuthStateChanged } from "firebase/auth";


const user = ref(auth.currentUser)

// auth changes
onAuthStateChanged(auth, (_user) => {
    console.log("user state changed , current User is : ", _user)
    user.value = _user

})

const getUser = () => {
    return { user }
}

export default getUser
