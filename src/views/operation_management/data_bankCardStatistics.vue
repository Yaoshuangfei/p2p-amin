<template>
	<section>
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="100px;">
			</el-table-column>
			<el-table-column prop="bankName" label="银行名称">
			</el-table-column>
			<el-table-column prop="bangdingCount" label="绑定人数">
			</el-table-column>
			<el-table-column prop="investMoney"  label="投资金额(单位元)">
			</el-table-column>
			<el-table-column prop="inverstSuccessCount"  label="投资成功次数">
			</el-table-column>
			<el-table-column prop="inverstFailCount"  label="投资失败次数">
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				token:'',
				list:[],
				listLoading: false
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this
				_this.listLoading = true
                var url = baseUrl+"/data/bankCardAnalysis/bankCardAnalysisList?token="+_this.token
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            // _this.total = data.data.totalCount
                            // _this.page = data.data.currPage
                            _this.list = data.data
                            _this.listLoading = false
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.listLoading = false
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.listLoading = false
                        }
                    }
                });
			}
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
			this.getlist()
		}
	}
</script>

<style>
</style>