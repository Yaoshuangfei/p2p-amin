<template>
	<section>
		<el-col style="margin-top: 20px;" :span="6">
			<!-- default-expanded-keys default-expand-all-->
			<el-tree :data="MenuData"  @node-click="handleNodeClick"  :check-strictly='true'  @check-change='clic' highlight-current :props="defaultProps" show-checkbox node-key="id"  :expand-on-click-node="true" style="border: none">
			</el-tree>
		</el-col>
		<el-col :span="2" :offset="1" style="margin-top: 20px;">
			<el-col :span="24">
				<el-button type="primary" @click.native="deldetBtn" :loading="editLoading">删除</el-button>
			</el-col>
			<el-col :span="24" style="margin-top: 20px;">
				<el-button type="primary" @click.native="upBtn" :loading="editLoading">上架</el-button>
			</el-col>
			<el-col :span="24" style="margin-top: 20px;">
				<el-button type="primary" @click.native="downBtn" :loading="editLoading">下架</el-button>
			</el-col>
		</el-col>
		<el-col :span="10" :offset="1" style="margin-top: 20px;">
			<el-col :span="14" :offset="8" style="margin-bottom: 40px;">新增菜单</el-col>
			<el-form label-width="150px"  :model="meunForm">
					<el-form-item label="父级名称：">
						<el-input v-model="meunForm.parent" :disabled="true" style="width: 260px;" type="text"></el-input> 
					</el-form-item>
					<el-form-item label="模块名称：">
						<el-input v-model="meunForm.name" style="width: 260px;" type="text"></el-input> 
					</el-form-item>
					<el-form-item label="类型：">
						<el-select v-model="meunForm.type" placeholder="请选择">
						    <el-option
						      v-for="item in optionSotr"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					  </el-select>
					</el-form-item>
					<el-form-item label="路由：">
						<el-input v-model="meunForm.path" style="width: 260px;" type="text"></el-input> 
					</el-form-item>
					<el-form-item label="是否上架：">
						<el-select v-model="meunForm.shelfStatus" placeholder="请选择">
						    <el-option
						      v-for="item in option"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					  </el-select>
					</el-form-item>
					<el-form-item label="顺序：">
						<el-input v-model="meunForm.sort" style="width: 260px;" type="text"></el-input> 
					</el-form-item>
					<el-form-item label="授权：">
						<el-input v-model="meunForm.perms" placeholder="如:sys:menu:list,sys:menu:save" :rows="4" style="width: 260px;" type="textarea"></el-input> 
					</el-form-item>
					<el-form-item label="备注：">
						<el-input v-model="meunForm.remark" style="width: 260px;" type="text"></el-input> 
					</el-form-item>
				<el-col :span='24' style="margin-left:160px;">
					<el-button type="primary" @click.native="submitAdd" :loading="editLoading">确认添加</el-button>
				</el-col>
			    </el-form>
		</el-col>
	</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';
	let id = 1000;
	export default {
		data() {
			return {
				token:'',
				editLoading:false,
				MenuData:[],
				delet:[],
				meunForm:{
					name:'',
					type:'',
					sort:'',
					path:'',
					parent:'',
					parentID:'',
					remark:'',
					icon:'',
					shelfStatus:'1',
					perms:''
				},
				optionSotr:[{
		          value: '0',
		          label: '目录'
		        },{
		          value: '1',
		          label: '菜单'
		        },{
		          value: '2',
		          label: '按钮'
		        }],
		        option:[{
		        	value: '0',
		          	label: '否'
		        },{
		        	value: '1',
		          	label: '是'
		        }],
		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        }
			}
		},
		methods: {
			handleNodeClick(data){
				this.meunForm.parent = data.label
				this.meunForm.parentID = data.id
			},
			addFirst(){
				const _this = this
				if(this.meunForm.type === '0'){

				}
				const params = {
					parentId:'0',
					name:this.meunForm.name,
					url:this.meunForm.path,
					icon:this.meunForm.icon,
					type:this.meunForm.type,
					sort:this.meunForm.sort,
					remark:this.meunForm.remark
				}
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/menu/save?token='+_this.token,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
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
			// 新增菜单
			submitAdd(){
				const _this = this
				const params = {
					parentId:this.meunForm.parentID,
					name:this.meunForm.name,
					url:this.meunForm.path,
					icon:this.meunForm.icon,
					type:this.meunForm.type,
					sort:this.meunForm.parentID,
					remark:this.meunForm.remark,
					shelfStatus:this.meunForm.shelfStatus,
					perms:this.meunForm.perms
				}
				if(this.meunForm.type === '0'){
					params.parentId = '0'
					params.sort = '0'
				}
				$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/menu/save?token='+_this.token,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
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
			// 删除
			deldetBtn(){
				const _this = this
				const menuIds = _this.delet.join(",")
		    	$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/menu/delete?token='+_this.token+'&menuIds='+menuIds,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code === 200){
							_this.delet = []
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
			// 上级
			upBtn(){
				const _this = this
				const menuIds = _this.delet.join(",")
		    	$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/menu/onOrDownShelf?token='+_this.token+'&menuIds='+menuIds+'&shelfStatus=1',
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code === 200){
							_this.delet = []
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
			// 下架
			downBtn(){
				const _this = this
				const menuIds = _this.delet.join(",")
		    	$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/menu/onOrDownShelf?token='+_this.token+'&menuIds='+menuIds+'&shelfStatus=0',
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	if(data.code === 200){
							_this.delet = []
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
			// 获取删除节点ID
			clic(row,index,col){
				if(index){
					// this.delet = []
					this.delet.push(row.id)
					this.delet = this.unique(this.delet)
				}else{
					for (var i = 0; i < this.delet.length; i++) {
						if(this.delet[i] === row.id){
							this.delet.splice(i,1)
						}
					}
				}
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
		    getlist(){
		    	const _this = this
		    	$.ajax({
                    type:'GET',
                    dataType:'json',
                    url:baseUrl+'/sys/menu/list?token='+_this.token,
                    // data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                    	_this.MenuData = []
                    	if(data.code === 200){
                            _this.$message({
                              message: data.message,
                              type: 'success',
                              duration:1000
                            });
	                        const list = data.data
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
		    menus(list,chlid){
				for(var x = 0;x<list.length;x++){
					var childrens = {}
					childrens.id = list[x].id
					if(list[x].shelfStatus === '0'){
						childrens.label = list[x].name+'——————已下架'
					}else{
						childrens.label = list[x].name
					}
					if(list[x].list !== null){
						var chlids = []
						childrens.children = chlids
						this.menus(list[x].list,chlids);
					}
					chlid.push(childrens)
				}
			},

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