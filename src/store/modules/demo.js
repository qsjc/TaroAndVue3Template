import { defineStore } from "pinia"
export const useDemoStore = defineStore("demo", {
	state:() => {
		return {
			count: 0
		}
	},
	actions: {
		increment() {
			this.count++
		}
	}
})
