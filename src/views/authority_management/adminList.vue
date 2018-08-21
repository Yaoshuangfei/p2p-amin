<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="100px;">
			</el-table-column>
			<el-table-column prop="username"  label="登录账号">
			</el-table-column>
			<el-table-column prop="mobile"  label="联系电话">
			</el-table-column>
			<el-table-column prop="email"  label="电子邮箱">
			</el-table-column>
			<el-table-column prop="insertTime"  label="时间">
			</el-table-column>
			<el-table-column prop="status" :formatter='formatterStatus' label="状态">
			</el-table-column>
			<el-table-column prop="type" :formatter='formatterType' label="账号类型">
			</el-table-column>
			<el-table-column prop="remark"  label="备注">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<!-- <el-button type="text" size="small" @click="seeBtn(scope.$index, scope.row)">查看</el-button> -->
					<el-button type="text" size="small" @click="showBtn(scope.$index, scope.row)">修改</el-button>
					<el-button type="text" size="small" @click="deleteBtn(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="50" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!-- 列表end -->
		<!-- 修改 -->
		<el-dialog title="修改管理员信息" v-model="changeshow" size='tiny' :close-on-click-modal="false">
			<el-form :model="changeFrom" label-width="90px">
				<el-form-item label="登录账号：">
					<el-input v-model="changeFrom.username" :disabled="true" type="text" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系电话：">
					<el-input v-model="changeFrom.mobile" :disabled="true" type="text" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="时间：">
					<el-input v-model="changeFrom.insertTime" :disabled="true" type="text" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="管理员类型">
                        <el-select v-model="status" clearable disabled >
                          <el-option v-for="item in types" :label="item.name" :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
				<el-form-item label="角色列表：">
                    <el-checkbox-group v-model="roles" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.label}}</el-checkbox>
                    </el-checkbox-group> 
                </el-form-item>
				<el-form-item label="电子邮箱：">
					<el-input v-model="changeFrom.email" type="text" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码：">
					<el-input v-model="password" type="text" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button type="primary" @click.native="changeBtn">提交</el-button>
				<el-button type="primary" @click.native="changeshow = false">取消</el-button>
			</div>
		</el-dialog>
		<!-- 查看 -->
		<el-dialog title="查看管理员信息" v-model="seeshow" size='tiny' :close-on-click-modal="false">
			<el-form :model="seeForm" label-width="90px">
				<el-form-item label="登录账号：">{{seeForm.username}}</el-form-item>
				<el-form-item label="联系电话：">{{seeForm.mobile}}</el-form-item>
				<el-form-item label="电子邮箱：">{{seeForm.email}}</el-form-item>
				<el-form-item label="时间：">{{seeForm.insertTime}}</el-form-item>
				<el-form-item label="状态：">{{seeForm.status}}</el-form-item>
				<el-form-item label="备注：">{{seeForm.remark}}</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button type="primary" @click.native="seeshow = false">取消</el-button>
			</div>
		</el-dialog>
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
				password:'',
				list: [],
				total: 0,
				page: 1,
				listLoading: false,
				editLoading:false,
				changeshow:false,
				seeshow:false,
				seeForm:{},
				changeFrom:{},
				checkedCities:[],
				cities:[],
				roles:[],
				roleIdList:[],
				type:'',
				status:'',
				types:[{
                    id:'-2',
                    name:'超级管理员'
                },{
                    id:'-1',
                    name:'管理员'
                },{
                    id:'0',
                    name:'普通人员'
                },{
                    id:'1',
                    name:'访客'
                }]
			}
		},
		methods: {
			// 获取管理员列表
			getlist(){
				const _this = this;
				let url = baseUrl+'/sys/user/list?token='+_this.token+'&LoginType='+_this.type+'&currentPage='+_this.page;
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.data.list
                            _this.total = data.data.totalCount
                            _this.page = data.data.currPage
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
			// 显示修改页面
			showBtn(index,row){
				const _this = this;
				this.status = row.type
				this.roles = []
				this.changeFrom = row
				this.changeshow = true
				this.checkedCities = row.roleId.split(',')
				for (var i = 0; i < this.checkedCities.length; i++) {
					this.roles.push(parseInt(this.checkedCities[i]))
					// console.log(parseInt(this.checkedCities[i]))
				}
				// console.log(this.checkedCities)
			},
			handleCheckedCitiesChange(value){
                this.roleIdList = value
                // console.log(this.checkedCities)
            },
			// 修改管理员信息
			changeBtn(){
				// cities
				const _this = this
				if(_this.roleIdList.length === 0){
					_this.roleIdList = _this.roles
				}
				const params = {
					userId:_this.changeFrom.userId.toString(),
					password:_this.password,
					email:_this.changeFrom.email,
					roleIdList:_this.roleIdList,
					type:_this.status,
					LoginType:_this.type
				}
				if(_this.roleIdList.length === 0){
					_this.$message({
                          message: '角色列表必传',
                          type: 'error',
                          duration:1000
                        });
				}else{
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/sys/user/update?token='+_this.token,
	                    data:JSON.stringify(params),
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                        // console.log(data)
	                        if(data.code === 200){
	                            _this.$message({
	                              message: data.message,
	                              type: 'success',
	                              duration:1000
	                            });
	                            _this.changeshow = false
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
				}
			},
			// 查看管理员信息
			seeBtn(index,row){
				this.seeshow = true
				this.seeForm = row
			},
			// 删除管理员
			deleteBtn(index,row){
				this.$confirm('确认删除吗?', '提示', {
                }).then(() => {
                	const _this = this;
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/sys/user/delete?token='+_this.token+'&userIds='+row.userId,
	                    // data:JSON.stringify(params),
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                        // console.log(data)
	                        if(data.code === 200){
	                            _this.$message({
	                              message: data.message,
	                              type: 'success',
	                              duration:1000
	                            });
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
                }).catch(() => {

                });
			},
			// 格式化状态
            formatterStatus(row,column){
                let type = ''
                if(row.status === '1'){
                	type = '正常'
                }else{
                	type = '禁用'
                }
                return type
            },
            formatterType(row,column){
				if(row.type === '-2'){
                	return '超级管理员'
                }else if(row.type === '-1'){
                	return '管理员'
                }else if(row.type === '0'){
                	return '普通人员'
                }else{
                	return '访客'
                }
            },
            getrole(){
            	const _this = this
            	$.ajax({
                type:'GET',
                dataType:'json',
                url:baseUrl+'/sys/role/list?token='+_this.token+'&LoginType='+_this.type,
                // data:JSON.stringify(params),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    // console.log(data)
                    if(data.code === 200){
                        const list = data.page.list
                        _this.cities = []
                        for (var i = 0; i < list.length; i++) {
                            const obj = {}
                            obj.id = list[i].roleId
                            obj.label = list[i].roleName
                            _this.cities.push(obj)
                        }
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
            this.type = sessionStorage.getItem('type')
            this.type = JSON.parse(this.type)
			this.getlist();
			this.getrole()
		}
	}
</script>

<style>
</style>