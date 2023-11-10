import { ref } from 'vue'

import { auth } from '../../firebase/confing'
import { signInWithEmailAndPassword } from 'firebase/auth'

const error = ref(null)

const login = async (email,password) => {
    error.value = null

    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('حدث خطأ ما أثناء تسجيل الدخول')
        }

        error.value = null
    }
    catch(err) {
        console.log(err.message)
        error.value = err.message
    }

}

const useLogin = () => {
    return { error, login}
}

export default useLogin