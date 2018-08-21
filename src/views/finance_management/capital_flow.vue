<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="用户名">
				    <el-input v-model="username" @keyup.enter.native="keyLogin"></el-input>
				</el-form-item>
				<!-- <el-form-item label="状态">
					<el-select v-model="type" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker
				      v-model="value"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="80px">
			</el-table-column>
			<el-table-column prop="username" width="150px" label="用户名">
			</el-table-column>
			<el-table-column prop="leftMoney" width="150px" label="账户余额">
			</el-table-column>
			<el-table-column prop="type" width="150px" label="交易类型">
			</el-table-column>
			<el-table-column prop="money" width="150px" label="交易金额">
			</el-table-column>
			<el-table-column prop="status" width="100px" label="状态">
			</el-table-column>
			<el-table-column prop="insertTime" width="200px" label="流水产生时间">
			</el-table-column>
			<el-table-column prop="remark"  label="备注">
			</el-table-column>
			<!-- <el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="handEnabled(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column> -->
		</el-table>

		<!--工具条-->
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
				id:'',
				username:'',
				type:'',
				value:'',
				list: [],
				options: [{
		          value: '0',
		          label: '处理中'
		        }, {
		          value: '1',
		          label: '交易成功'
		        }, {
		          value: '2',
		          label: '交易失败'
		        }],
				total: 0,
				page: 1,
				listLoading: false,
				payTimeSt:'',
				payTimeEt:''
			}
		},
        computed: {
            // 实时更新上传图片的名字，仅读取，值只须为函数
            imageChange: function () {
                return this.fileImg
            }
        },
		methods: {
			keyLogin(ev){
             if (ev.keyCode==13){
                 this.getlist()
             }
            },
			getlist(){
				const _this = this
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/admin/userFundRecord/UserFundRecordRecord?token='+_this.token+'&username='+_this.username,
                    data:"",
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	// console.log(data)
                        	_this.total = data.data.totalCount
                        	_this.page = data.data.currPage
                        	_this.list = data.data.list
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
			},
            fstatus(row,column){
                if(row.status === '0'){
                	return '处理中'
                }else if(row.status === '1'){
                	return '交易成功'
                }else if(row.status === '2'){
                	return '交易失败'
                }
            },
            formatterType(row,column){
                if(row.rechargeTyp === '10'){
                	return '快捷支付'
                }else if(row.rechargeTyp === '20'){
                	return '网银支付'
                }else if(row.rechargeTyp === '30'){
                	return '后台管理员手动充值'
                }
                
            },
            formatterpoType(row,column) {
            	return row.poType === 1 ?'首页':'店铺内'
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