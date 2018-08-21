<template>
	<section>
		<!-- <el-col :span="22" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true">
				<el-form-item label="用户名">
				    <el-input v-model="username" @keyup.enter.native="keyLogin"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="type" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker
				      v-model="value"
				      type="datetimerange"
				      placeholder="选择时间范围">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col> -->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="60px">
			</el-table-column>
			<el-table-column prop="username" width="130px" label="黑名单用户">
				<template scope="scope">
					<router-link :to="{ name: '注册用户信息',params: { id: '01', time: scope.row.username}}"   style="margin: 0 10px;">
						<el-button  type="text" size="small">{{scope.row.username}}</el-button>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column prop="insertTime" width="170px" label="创建时间">
			</el-table-column>
			<el-table-column prop="updateTime" width="170px" label="更新时间">
			</el-table-column>
			<el-table-column prop="reason"  label="原因">
			</el-table-column>
			<el-table-column prop="isRegist"  label="是否注册">
			</el-table-column>
			<el-table-column prop="status" width="110px" label="黑名单状态">
			</el-table-column>
			<el-table-column prop="remark" width="100px" label="描述">
			</el-table-column>
			<el-table-column label="操作" width="100px">
				<template scope="scope">
					<el-button type="text" v-if="scope.row.status === '有效' " size="small" @click="Release(scope.$index, scope.row)">解除黑名单</el-button>
				</template>
			</el-table-column>
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
				list:[],
				total:0,
				page:0,
				listLoading:false
			}
		},
		methods: {
			getlist(){
				const _this = this
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/pro/sysblacklist/blacklistRecord?token='+_this.token+'&currentPage='+_this.page,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.total = data.data.totalCount
                        	_this.page = data.data.currPage
                        	_this.list = data.data.list
                        }else if(data.code === 403){
                            _this.$message({
                              message: data.message,
                              type: 'error',
                              duration:2000
                            });
                            _this.$router.push({ path: '/login' });
                        }else{
                            _this.$message({
                                message: data.message,
                                type: 'error',
                                duration:2000
                            });
                        }
                    }
                });
			},
			Release(index, row){
				this.$confirm('确认解除黑名单吗?', '提示', {
                }).then(() => {
    				const _this = this
    				$.ajax({
                        type:'POST',
                        dataType:'json',
                        url:baseUrl+'/pro/sysblacklist/relieveBlackList?token='+_this.token+'&username='+row.username,
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(data.code === 200){
                            	_this.getlist()
                            	_this.$message({
                                    message: data.message,
                                    type: 'success',
                                    duration:2000
                                });
                            }else if(data.code === 403){
                                _this.$message({
                                  message: data.message,
                                  type: 'error',
                                  duration:2000
                                });
                                _this.$router.push({ path: '/login' });
                            }else{
                                _this.$message({
                                    message: data.message,
                                    type: 'error',
                                    duration:2000
                                });
                            }
                        }
                    });
                }).catch(() => {

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