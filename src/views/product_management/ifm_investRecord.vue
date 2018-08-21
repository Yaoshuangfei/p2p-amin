<template>
	<section>
		<!--工具条-->
		<el-col :span="24" style="text-align: center;margin-top: 10px;">投资记录</el-col>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="用户名：">
				    <el-input v-model="filters.username"></el-input>
				</el-form-item>
				<el-form-item label="产品名称：">
				    <el-input v-model="filters.productTitle"></el-input>
				</el-form-item>
				<!-- <el-form-item label="是否查询首投：">
				    <el-select v-model="isFirst" clearable>
				      <el-option v-for="item in optionF" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item> -->
				<el-form-item label="状态：">
				    <el-select v-model="filters.status" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="开始时间：">
					<el-date-picker
				      v-model="value"
				      type="daterange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index">
			</el-table-column>
			<el-table-column prop="username"  label="用户名" width="130px;">
			</el-table-column>
			<el-table-column prop="realName"  label="真实姓名">
			</el-table-column>
			<el-table-column prop="productTitle"  label="产品名称">
			</el-table-column>
			<el-table-column prop="yearRate"  label="年化收益率">
			</el-table-column>
			<el-table-column prop="investDay"  label="理财期限">
			</el-table-column>
			<el-table-column prop="productFinancingDay" label="投资期限">
			</el-table-column>
			<el-table-column prop="status" :formatter="formatterType"  label="状态 ">
			</el-table-column>
			<el-table-column prop="inMoney"  label="本金">
			</el-table-column>
			<el-table-column prop="coupon"  label="理财券">
			</el-table-column>
			<el-table-column prop="couponEarnings" label="理财券利息">
			</el-table-column>
			<el-table-column prop="hongbao"  label="红包">
			</el-table-column>
			<el-table-column prop="rate"  label="加息券额度">
			</el-table-column>
			<el-table-column prop="rateEarnings"  label="加息券利息">
			</el-table-column>
			<el-table-column prop="totalInterest"  label="	总利息">
			</el-table-column>
			<el-table-column prop="payTime"  label="支付时间">
			</el-table-column>
			<el-table-column prop="interestStartTime"  label="	计息时间">
			</el-table-column>
			<el-table-column prop="finishTime"  label="结束时间">
			</el-table-column>
			<!-- <el-table-column prop="remark"  label="备注">
			</el-table-column> -->
			<!-- <el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="handEnabled(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column> -->
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="size" :total="total" style="float:right;">
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
				value:'',
				size:0,
				isFirst:'',
				filters: {
					username: '',
					productTitle:'',
					status:'',
					payTimeSt:'',
					payTimeEt:''
				},
				optionF:[
					{value:'1',label:'仅首投'},
					{value:'',label:'全部'}
				],
				options: [{
		          value: '-1',
		          label: '付款失败'
		        }, {
		          value: '0',
		          label: '待付款'
		        }, {
		          value: '1',
		          label: '已付款'
		        }, {
		          value: '2',
		          label: '结算中'
		        }, {
		          value: '3',
		          label: '已还款'
		        }, {
		          value: '-2',
		          label: '支付超时'
		        }, {
		          value: '1,2,3',
		          label: '投资成功'
		        }],
				total: 0,
				page: 1,
				listLoading: false
			}
		},
        computed: {

        },
		methods: {
			getlist(){
				const _this = this;
				if( this.value !== undefined && this.value !== '' && this.value[0] !== null){
					const sy = this.value[0].getMonth() + 1
					const ey = this.value[1].getMonth() + 1
					_this.filters.payTimeSt = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
					_this.filters.payTimeEt = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
				}else{
					_this.filters.payTimeSt = ''
					_this.filters.payTimeEt = ''
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pro/proinvest/pageListInvestAdmin?token='+_this.token+'&currentPage='+_this.page+'&username='+_this.filters.username+'&productTitle='+_this.filters.productTitle+'&status='+_this.filters.status+'&payTimeSt='+_this.filters.payTimeSt+'&payTimeEt='+_this.filters.payTimeEt+'&isFirst=&pageSize=10',
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        // console.log(data)
                        if(data.code === 200){
                            _this.list = data.data.investPageUtils.list
                            _this.total = data.data.investPageUtils.totalCount
                            _this.size = data.data.investPageUtils.pageSize
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
            formatterTime(row,column){
                let curTime = row.createTime;
                curTime = new Date(curTime).toLocaleString()
                return curTime
            },
            formatterType(row,column){
                if(row.status === '-1'){
                	return '付款失败'
                }else if(row.status === '0'){
                	return '待付款'
                }else if(row.status === '1'){
                	return '已付款'
                }else if(row.status === '2'){
                	return '结算中'
                }else if(row.status === '3'){
                	return '已还款'
                }else if(row.status === '-2'){
                	return '支付超时'
                }
            }
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
            if(this.$route.params.time === '00'){
            	this.filters.status = ''
            	this.filters.payTimeSt = ''
				this.filters.payTimeEt = ''
            }else{
            	this.filters.status = '1,2,3'
            	let date = new Date(this.$route.params.time)
           		this.value = [date,date]
            }
            if(this.$route.params.user === '00'){
            	this.filters.username = ''
            }else{
            	this.filters.username = this.$route.params.user
            	this.filters.status = '1,2,3'
            }
            this.getlist()
		}
	}
</script>

<style>
</style>