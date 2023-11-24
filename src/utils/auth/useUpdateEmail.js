import { ref } from 'vue'
import { updateEmail } from 'firebase/auth'
import { translateErrorCode } from '../msgs'

const error = ref(null)

const updateUserEmail = async (user,newEmail) => {
    error.value = null
    try {
        await updateEmail(user, newEmail)
    } catch (err) {
        console.log(err.message)
        error.value = translateErrorCode(err.code)
    }

}

const useUpdateEmail = () => {
    return { error, updateUserEmail}
}

export default useUpdateEmail