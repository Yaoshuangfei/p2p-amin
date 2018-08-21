<template>
	<section>
		<!--工具条-->
		<el-col :span="16" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<el-form-item label="关键字">
				    <el-input v-model="filters.keyword"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="filters.status" clearable>
				      <el-option v-for="item in statusList" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="8" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="submit">
				<el-form-item label="预约关键字">
				    <el-input v-model="submit.keyword"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="saveKeyword">提交</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index"  label="序号" width="70px">
			</el-table-column>
			<el-table-column prop="keyword"  label="关键字">
			</el-table-column>
			<el-table-column prop="status" :formatter="formatterStatus"  label="状态">
			</el-table-column>
			<el-table-column prop="type" :formatter="formatterType"  label="类型">
			</el-table-column>
			<el-table-column prop="insertTime" label="插入时间">
			</el-table-column>
			<el-table-column prop="updateTime" label="修改时间">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" v-if="scope.row.status === '0' " size="small" @click="start(scope.$index, scope.row)">启动</el-button>
					<el-button type="text" v-if="scope.row.status === '1' " size="small" @click="stop(scope.$index, scope.row)">禁用</el-button>
				</template>
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
				filters: {
					keyword: '',
					status:''
				},
				submit: {
					keyword: ''
				},
				statusList:[{
		          value: '0',
		          label: '未启动'
		        }, {
		          value: '1',
		          label: '已启动'
		        }],
				total: 1,
				page: 1,
				listLoading: false
			}
		},
        computed: {
        	
        },
		methods: {
			getlist(){
				const _this = this;
				const params = {
					currentPage:_this.page,
					keyword:_this.filters.keyword,
					status:_this.filters.status
				}
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pro/probookingkeyword/pageBookingkeyword?token='+_this.token+'&currentPage='+_this.page+'&keyword='+_this.filters.keyword+'&status='+_this.filters.status,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	// console.log(data)
                    	if(data.code === 200){
                            _this.list = data.data.list;
                            _this.total = data.data.totalCount;
                            _this.page = data.data.currPage
                            _this.$message({
                                message: '成功',
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
			saveKeyword(){
				const _this = this;
				const params = {
					keyword:_this.submit.keyword
				}
				$.ajax({
                    type:'POST',
                    url:baseUrl+'/pro/probookingkeyword/saveKeyword?token='+_this.token+'&keyword='+_this.submit.keyword,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	// console.log(data)
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
                        	_this.getlist();
                        }
                    }
                });
			},
			start(index,row){
				const _this = this;
				// console.log(row.id);
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pro/probookingkeyword/updateKeyword?token='+_this.token+'&status=1'+'&keywordId='+row.id,
                    contentType:'application/x-www-form-urlencoded;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	// console.log(data)
                    	if(data.code === 200){
                            _this.getlist()
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
			stop(index,row){
				const _this = this;
				// console.log(row.id);
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/pro/probookingkeyword/updateKeyword?token='+_this.token+'&status=0'+'&keywordId='+row.id,
                    contentType:'application/x-www-form-urlencoded;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	// console.log(data)
                    	if(data.code === 200){
                            _this.getlist()
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
			formatterStatus(row,column) {
            	if(row.status === '0'){
                	return '未启用'
                }else if(row.status === '1'){
                	return '已启用'
                }
            },
            formatterType(row,column){
                if(row.type === '0'){
                	return '默认'
                }
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