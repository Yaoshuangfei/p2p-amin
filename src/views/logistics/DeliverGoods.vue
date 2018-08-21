<template>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {
			
		}
	}

</script>

<style>

</style>