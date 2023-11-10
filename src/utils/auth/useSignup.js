import { ref } from 'vue'

import { auth } from '../../firebase/confing'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const error = ref(null)

const signup = async (email,password) => {
    error.value = null

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('حدث خطأ ما أثناء إنشاء الحساب')
        }

        error.value = null
    }
    catch(err) {
        console.log(err.message)
        error.value = err.message
    }

}

const useSignup = () => {
    return {error, signup}
}

export default useSignup