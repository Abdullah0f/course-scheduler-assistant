import { ref } from 'vue'

import { auth } from '../../firebase/confing'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { translateErrorCode } from '../msgs'
const error = ref(null)

const login = async (email,password) => {
    error.value = null

    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('حدث خطأ ما أثناء تسجيل الدخول')
        }

        if (!res.user.emailVerified) {
            throw new Error('unverifiedEmail')
        }
        error.value = null
    }
    catch(err) { 
        if (err.message === 'unverifiedEmail') 
            error.value = translateErrorCode('auth/unverified-email')
        else  
        error.value = translateErrorCode(err.code)
    }

}

const useLogin = () => {
    return { error, login}
}

export default useLogin