 <template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="平台类型类型">
				    <el-select v-model="filters.type" clearable>
				      <el-option v-for="item in types" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column type="index">
			</el-table-column>
			<el-table-column prop="ageRange" label="年龄分布">
			</el-table-column>
			<el-table-column prop="registCount"  label="注册人数">
			</el-table-column>
			<el-table-column prop="totalMoney" label="投资总额">
			</el-table-column>
			<el-table-column prop="investCount"  label="投资次数">
			</el-table-column>
			<!-- <el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" v-if='scope.row.status === "0"' size="small" @click="showBtn(scope.$index, scope.row)">启用</el-button>
					<el-button type="text" v-if='scope.row.status === "1"' size="small" @click="hiddenBtn(scope.$index, scope.row)">禁用</el-button>
					<el-button type="text" size="small" @click="deletBtn(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column> -->
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
				filters: {
					type:''
				},
				types:[{
		          value: '0',
		          label: 'android'
		        }, {
		          value: '1',
		          label: 'ios'
		        }, {
		          value: '2',
		          label: 'pc'
		        }, {
		          value: '3',
		          label: 'wap'
		        }],
		        list:[],
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
                var url = baseUrl+"/admin/user/userAgeDistribution?token="+_this.token+'&platform='+_this.filters.type;
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.data
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
				// console.log(val)
				this.page = val;
				this.getlist();
			},
            formatterpoType(row,column) {
            	if(row.type === '0'){
                	return '网站'
                }else if(row.type === '1'){
                	return '手机'
                }else if(row.type === '2'){
                	return 'WAP'
                }
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