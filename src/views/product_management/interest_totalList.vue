<template>
	<section>
		<!--查询工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
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
			<el-table-column type="index" width="80px">
			</el-table-column>
			<el-table-column prop="transMoney"  label="返款总额">
			</el-table-column>
			<el-table-column prop="transDate"  label="返款日期">
				<template scope="scope">
                  <router-link :to="{ name: '付息明细表',params: {time: scope.row.transDate}}"   style="margin: 0 10px;">
                    <el-button  type="text" size="small">{{scope.row.transDate.substring(10,0)}}</el-button>
                  </router-link>
                </template>
			</el-table-column>
			<el-table-column prop="transCount"  label="返款总笔数">
			</el-table-column>
			<el-table-column prop="transUserNumber"  label="返款总人数">
			</el-table-column>
			<el-table-column prop="type"  label="类型" :formatter="formatterType" >
			</el-table-column>
			<el-table-column prop="remark" label="备注">
			</el-table-column>
		</el-table>

		<!--分页工具条-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="50" :total="total" style="float:right;">
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
				filters: {
					stTime:'',
					etTime:''
				},
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
				if(this.value !== '' && this.value[0] !== null){
					const sy = this.value[0].getMonth() + 1
					const ey = this.value[1].getMonth() + 1
					_this.filters.stTime = this.value[0].getFullYear() + '-'+ sy + '-' + this.value[0].getDate()
					_this.filters.etTime = this.value[1].getFullYear() + '-'+ ey + '-' + this.value[1].getDate()
					// _this.filters.payTimeSt = this.value[0].getTime()
					// _this.filters.payTimeEt = this.value[1].getTime()
				}else{
					_this.filters.stTime = ''
					_this.filters.etTime = ''
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pay/paytransstatistics/totalInterest?type=3&token='+_this.token+'&currentPage='+_this.currentPage+'&stTime='+_this.filters.stTime+'&etTime='+_this.filters.etTime,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.data.list;
                            _this.total = data.data.totalCount;

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
				this.currentPage = val;
				this.getlist();
			},
			formatterType(row,column){
				if(row.type === '1'){
					return '充值'
				}else if(row.type === '2'){
					return '提现'
				}else if(row.type === '3'){
					return '返款'
				}
			},
			formatterTime(row,column){
				return row.transDate.substring(10,0)
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