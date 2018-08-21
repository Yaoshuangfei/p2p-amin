<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index"  label="序号" width="70px">
			</el-table-column>
			<el-table-column prop="userId"  label="用户id">
			</el-table-column>
			</el-table-column>
			<el-table-column prop="userName"  label="用户名">
			</el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="totalTransMoney" label="充值总额(元)">
			</el-table-column>
		</el-table>

		<!--翻页-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
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
				total:0,
				currentPage: 1,
				listLoading: false
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this;
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pay/PayRecord/queryPayRechargeRecord?token='+_this.token+'&currentPage='+_this.currentPage,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	//console.log(data)
                    	if(data.code !== 200){
                            _this.$message({
                                message: data.message,
                                type: 'error',
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
                        	_this.list = data.data.list;
                        	_this.total = data.data.totalCount;
                            _this.page = data.data.currPage
                            _this.$message({
                                message: '成功',
                                type: 'success',
                                duration:1000
                            });
                        }
                    }
                });
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getlist();
			},

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