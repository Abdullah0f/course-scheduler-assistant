import { ref } from "vue"
import { auth } from "../../firebase/confing"
import { sendPasswordResetEmail } from "firebase/auth"

const error = ref(null)

const resetPassword = async (email) => {
    error.value = null

    try {
        await sendPasswordResetEmail(auth,email)
        
    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }

}

const useResetPasword = () => {
    return { error, resetPassword}
}

export default useResetPasword