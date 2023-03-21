import { defineStore } from "pinia"
export const useCommonStore = defineStore("common", {
	state: () => {
		return {
			loginRoute: ""
		}
	},
	actions: {
		setLoginRoute(route) {
			this.loginRoute = route
		}
	}
})
