<template>
	<section>
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="80px">
			</el-table-column>
			<el-table-column prop="returnTime"  label="到期日期">
			</el-table-column>
			<el-table-column prop="totalMoney"  label="零钱罐余额">
			</el-table-column>
			<el-table-column prop="leftMoney"  label="预留资金 账户余额">
			</el-table-column>
			<el-table-column prop="payMoney"  label="到期本金">
			</el-table-column>
			<el-table-column prop="payInterest"  label="到期利息">
			</el-table-column>
			<el-table-column prop="reserveFund"  label="预留金额">
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->
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
				list: [],
				total: 0,
				page: 1,
				listLoading: false
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pro/prointerestdetail/reserveFundList?token='+_this.token,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.list = data.data.reserveFundList
                        	_this.$message({
                                message: data.message,
                                type: 'success',
                                duration:1000
                            });
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:1000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:1000
                            });
                        }
                    }
                });
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			}
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
			this.getlist();
		}
	}
</script>

<style>
</style>