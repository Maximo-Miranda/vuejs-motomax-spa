import store from '@/store/store'

// GetHeaders ...
export default function GetHeaders() {

    return {
        'Content-Type': 'application/json',
        'Authorization': store.state.userStore.user.token
    }
}