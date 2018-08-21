<template>
	<section>
		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index" width="100px;">
			</el-table-column>
			<el-table-column prop="roleName"  label="角色名">
			</el-table-column>
			<el-table-column prop="remark"  label="备注">
			</el-table-column>
			<el-table-column prop="insertTime"  label="创建时间">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<!-- <el-button type="text" size="small" @click="seeBtn(scope.$index, scope.row)">查看</el-button> -->
					<el-button type="text" size="small" @click="showBtn(scope.$index, scope.row)">修改</el-button>
					<el-button type="text" size="small" @click="deleteBtn(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	
		<!--工具条 分页-->
		<el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<el-dialog title="修改管理员信息" v-model="changeshow" size='tiny' :close-on-click-modal="false">
			<el-form :model="changeFrom" label-width="120px">
				<el-form-item label="角色名称：">
					<el-input v-model="changeFrom.roleName" type="text" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注：">
					<el-input v-model="changeFrom.remark"  type="text" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="是否父子互联">
                    <el-button type="primary" @click.native="jiedian = false">是</el-button>
                    <el-button type="primary" @click.native="jiedian = true">否</el-button>
                </el-form-item> -->
				<el-form-item label="权限菜单：">
					<el-tree :data="MenuData" :default-expand-all= 'false' :default-checked-keys="imageChange" @node-click="handleNodeClick"  @check-change='clic' highlight-current :props="defaultProps" show-checkbox node-key="id" ref="tree" :expand-on-click-node="true" style="border: none">
                    </el-tree>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button type="primary" @click.native="changeBtn">提交</el-button>
				<el-button type="primary" @click.native="changeshow = false">取消</el-button>
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
				MenuData:[],
				jiedian:true,
				token:'',
				userName:'',
				value:'',
				list: [],
				total: 0,
				page: 1,
                type:'',
				defaultProps: {
                  children: 'children',
                  label: 'label'
                },
				listLoading: false,
				changeshow:true,
				changeFrom:{
					roleName:'',
					remark:'',
					menuIdList:'',
					roleId:''
				},
				meunForm:{
                    parent:'',
                    parentID:''
                },
                fuid:[],
                allfid:[],
                menuIdList:[],
                menuId:[],
                menufuId:[],
                menuCFId:[],
                deldetId:[],
                menuupId:[]
			}
		},
		computed: {
			imageChange: function () {
                return this.menuId
            }
        },
		methods: {
			// 把菜单全部的父节点id遍历出来保存  
			// 当前角色拥有的id跟父节点id对比 把父节点在拥有的id数组中删除
			// 在修改时把取消的id保存起来 并更没有删选过父id的数循环 把删除的id从拥有的菜单id中删除
			// 修改时把原有的角色id跟当前获取的id合并 去重
			// 选节点跟新增角色逻辑一样
			handleNodeClick(data){
                this.meunForm.parent = data.label
                this.meunForm.parentID = data.id
            },
            // 获取选中节点ID
            clic(row,index,col){
            	// 节点取消选择是存入数组 deldetId
            	if(index === false && col === false){
                    this.deldetId.push(row.id)
                    this.deldetId = this.unique(this.deldetId)
                }
                // 本身选中时存入数组 并去重 如果没选中 在已有数组中循环 删除
                if(index){
                    this.menuIdList.push(row.id)
                    this.menuIdList = this.unique(this.menuIdList)
                }else{
                    for (var i = 0; i < this.menuIdList.length; i++) {
                        if(this.menuIdList[i] === row.id){
                            this.menuIdList.splice(i,1)
                        }
                    }
                }
				// 本身子节点选中时存入数组 并去重 如果没选中 在已有数组中循环 删除
                if(col){
                    this.fuid.push(row.id)
                    this.fuid = this.unique(this.fuid)
                }else{
                    for (var i = 0; i < this.fuid.length; i++) {
                        if(this.fuid[i] === row.id){
                            this.fuid.splice(i,1)
                        }
                    }
                }
                // console.log(this.deldetId)
            },
           
            // 数组去重
            unique(array){ 
                var r = []; 
                for(var i = 0, l = array.length; i < l; i++) { 
                     for(var j = i + 1; j < l; j++) 
                        if (array[i] === array[j]) j = ++i; 
                         r.push(array[i]); 
                 } 
                 return r; 
            },
            // 获取菜单列表
            getMenulist(){
                const _this = this
                let url = ''
                if(this.type === '-2'){
                    url = baseUrl+'/sys/menu/list?token='+_this.token
                }else{
                    url = baseUrl+'/sys/menu/menuAndRoleListByUserId?token='+_this.token
                }
                $.ajax({
                    type:'GET',
                    dataType:'json',
                    url:url,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        _this.MenuData = []
                        if(data.code === 200){
                            // console.log(data)
                            const list = data.data[0].list
                            // console.log(list)
                            for (var i = 0; i < list.length; i++) {
                                let first = {}
                                first.label = list[i].name
                                first.id = list[i].id
                                if(list[i].list !== null){
                                    let child = []
                                    first.children = child
                                    _this.menus(list[i].list,child);
                                }
                                    _this.MenuData.push(first)
                            }
                            // _this.MenuData = _this.MenuData
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
                _this.changeshow = false
            },
            // 递归 解析菜单数组
            menus(list,chlid){
                for(var x = 0;x<list.length;x++){
                    var childrens = {}
                    childrens.id = list[x].id
                    childrens.label = list[x].name
                    if(list[x].list !== null){
                        var chlids = []
                        childrens.children = chlids
                        this.menus(list[x].list,chlids);
                    }
                    chlid.push(childrens)
                }
            },
            // 数组中是否存在子节点  
            allId(list,ffid){
                for(var x = 0;x<list.length;x++){
                    for (var i = 0; i < this.menuIdList.length; i++) {
                        if(list[x].id === this.menuIdList[i]) {
                            // console.log(fid)
                            this.allfid.push(ffid)
                        }else{
                            // console.log(list[x].children)
                            this.twoTree(list[x].children,this.menuIdList[i],list[x].id,ffid)
                        }
                    }
                }
            },
            // 第二层循环
            twoTree(list,id,fId,ffid){
                for (var i = 0; i < list.length; i++) {
                    if(list[i].id === id){
                        this.allfid.push(fId,ffid)
                    }
                }
            },
            changeBtn(){
				const _this = this
				this.allfid = []
				// this.deldetId  已删除的
				// this.menuupId   之前的
				// 角色原本拥有的id 跟已删除的id比较 把已删除的在menuupId删掉
				for (var i = 0; i < this.menuupId.length; i++) {
					for (var x = 0; x < this.deldetId.length; x++) {
						if(this.menuupId[i] === this.deldetId[x]){
							this.menuupId.splice(i,1)
							i = 0
						}
					}
				}
				// 把过滤过得menuupId 和当前节点数组合并
				for (var i = 0; i < this.menuupId.length; i++) {
					this.allfid.push(this.menuupId[i])
				}

                for (var i = 0; i < this.MenuData.length; i++) {
                    this.fuid.push(this.MenuData[i].id)
                }
                for (var i = 0; i < this.MenuData.length; i++) {
                    for (var x = 0; x < this.fuid.length; x++) {
                        if(this.MenuData[i].id === this.fuid[x]){
                            // console.log(this.MenuData[i].id)
                            this.allId(this.MenuData[i].children,this.MenuData[i].id)
                            // this.allfid.push(this.MenuData[i].id)
                        }
                    }  
                }
                // console.log(this.allfid)
                for (var i = 0; i < this.allfid.length; i++) {
                    this.menuIdList.push(this.allfid[i])
                }
                this.menuIdList = this.unique(this.menuIdList)
				const params = {
					roleName:_this.changeFrom.roleName,
					remark:_this.changeFrom.remark,
					menuIdList:this.menuIdList
				}
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/role/update?token='+_this.token+'&roleId='+_this.changeFrom.roleId,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                        	_this.getlist()
							_this.changeshow = false
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
                              type: 'error'
                            });
                        }
                    }
                });
			},
			showBtn(index,row){
				// console.log(row)
				this.getfIDarr()
				this.menuId = []
				this.menuupId = []
				this.changeshow = true
				// console.log(this.menuId)
				this.changeFrom.roleName = row.roleName
				this.changeFrom.remark = row.remark
				this.changeFrom.roleId = row.roleId
				const arr = row.menuId.split(',')
				for (var i = 0; i < arr.length; i++) {
					this.menuId.push(parseInt(arr[i]))
					this.menuupId.push(parseInt(arr[i]))
				}
				// console.log(this.menuId)
				this.treefun()
				// console.log(this.menuId)
				this.$refs.tree.setCheckedKeys(this.menuId)
			},
			getfIDarr(){
				this.menufuId = []
				this.menuCFId = []
				for (var i = 0; i < this.MenuData.length; i++) {
					this.menufuId.push(this.MenuData[i].id)
					if(this.MenuData[i].children.length !== 0){
						for(var x = 0;x<this.MenuData[i].children.length;x++){
							this.menufuId.push(this.MenuData[i].children[x].id)
							if(this.MenuData[i].children[x].children.length === 0){
								this.menuCFId.push(this.MenuData[i].children[x].id)
							}
						}
					}
				}
				this.qucfun()
			},
			qucfun(){
				for (var i = 0; i < this.menufuId.length; i++) {
					for (var x = 0; x < this.menuCFId.length; x++) {
						if(this.menufuId[i] === this.menuCFId[x]){
							this.menufuId.splice(i,1)
						}
					}
				}
			},
			treefun(){
				// console.log(this.menuId)
				// console.log(this.menufuId)
				for (var i = 0; i < this.menuId.length; i++) {
					for (var x = 0; x < this.menufuId.length; x++) {
						if(this.menuId[i] === this.menufuId[x]){
							this.menuId.splice(i,1)
							i = 0
						}
					}
				}
				// console.log(this.menuId)
			},
			deleteBtn(index,row){
				this.$confirm('确认删除吗?', '提示', {
                }).then(() => {
					const _this = this
					$.ajax({
	                    type:'POST',
	                    dataType:'json',
	                    url:baseUrl+'/sys/role/delete?token='+_this.token+'&roleIds='+row.roleId,
	                    contentType:'application/json;charset=utf-8',
	                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
	                    success:function(data){
	                        if(data.code === 200){
	                        	_this.getlist()
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
	                              type: 'error'
	                            });
	                        }
	                    }
	                });
	            }).catch(() => {

                });
			},
			getlist(){
				const _this = this;
				$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/sys/role/list?token='+_this.token+'&LoginType='+_this.type+'&currentPage='+_this.page,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.list = data.page.list
                            _this.page = data.page.currPage
                            _this.total = data.page.totalCount
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
                              type: 'error'
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
			this.getMenulist()
		}
	}
</script>

<style>
</style>