import { ref } from 'vue'

import { auth } from '../../firebase/confing'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { translateErrorCode } from '../msgs'

const error = ref(null)


const sendVerificationEmail = async (user) => {
    error.value = null
    try {
        await sendEmailVerification(user)
    } catch (err) {
        error.value = translateErrorCode(err.code)
    }
}

const signup = async (email,password,username) => {
    error.value = null

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(res.user, {
            displayName: username
        });
        await sendEmailVerification(res.user);


        error.value = null
    }
    catch(err) {
        error.value = translateErrorCode(err.code)
    }

}

const useSignup = () => {
    return {error, signup, sendVerificationEmail}
}

export default useSignup