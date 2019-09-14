export const generalStore = {
    state: {
        loading: false
    },
    mutations: {
        showLoading: (state) => {
            state.loading = !state.loading
        }
    }
}