<template>
	<section>
		<el-col  :xs="24" :sm="24" :md="24" :lg="24" style="margin:20px auto;margin-left: 18%;color: #20a0ff;font-size: 16px;">添加新角色</el-col>
		<el-col :offset="1" :xs="10" :sm="10" :md="10" :lg="10" style="margin-top: 20px;">
			<el-form label-width="150px"  :model="userFrom">
				<el-form-item label="角色名称：">
					<el-input v-model="userFrom.roleName" style="width: 260px;" type="text"></el-input> 
				</el-form-item>
				<el-form-item label="备注：">
					<el-input v-model="userFrom.remark" style="width: 260px;" type="text"></el-input> 
				</el-form-item>
                <el-form-item label="角色权限列表："> <!-- :check-strictly='jiedian'    选中时父子关联--> 
                    <el-tree :data="MenuData" :default-expand-all = 'false' @node-click="handleNodeClick"  @check-change='clic' highlight-current :props="defaultProps" show-checkbox node-key="id"  :expand-on-click-node="true" style="border: none">
                    </el-tree>
                </el-form-item>
			<el-col :span='24' style="margin-left:250px;">
				<el-button type="primary" @click.native="submitUpload" :loading="editLoading">点击提交</el-button>
			</el-col>
		    </el-form>
		</el-col>
       <!--  <el-col :span="8">
            <el-form label-width="150px"  :model="userFrom">
                <el-form-item label="是否父子互联">
                    <el-button type="primary" @click.native="jiedian = false">是</el-button>
                    <el-button type="primary" @click.native="jiedian = true">否</el-button>
                </el-form-item>
            </el-form>
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
                jiedian:true,
                type:'',
                userFrom:{
                    roleName:'',
                    remark:''
                },
                meunForm:{
                    parent:'',
                    parentID:''
                },
                MenuData:[],
                menuIdList:[],
				editLoading: false,
                defaultProps: {
                  children: 'children',
                  label: 'label'
                },
                fuid:[],
                allfid:[]
			}
		},
		methods: {
            // 逻辑 
            // 组件选中子节点时无法获取父节点
            // @check-change方法选取节点时会返回当前节点本身是否被选中 index 当前节点是否有子节点被选择 col
            // 把本身选择的节点存入一个数组  把本身有子节点选择的id 也就是获取子节点的父节点存入数组
            // 把子节点数组和全部菜单数组循环判断  若子节点在带单数组中存在 则返回当前节点的父id
            //  把父节点数组遍历菜单 把id对应的对象找出来  跟子节点数组遍历 若存在则把id保存  
            //  最后把父id和子节点保存 
            handleNodeClick(data){
                this.meunForm.parent = data.label
                this.meunForm.parentID = data.id
            },
            // 获取选中节点ID
            clic(row,index,col){
                // 获取当前本身选中的ID
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
                // 当前节点是否有子节点被选种 有就把当前ID添加到fuid数组
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
            getlist(){
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
                            _this.$message({
                              message: data.message,
                              type: 'success',
                              duration:1000
                            });
                            const list = data.data[0].list
                            // 循环后台返回的菜单列表 并按菜单格式排序
                            for (var i = 0; i < list.length; i++) {
                                let first = {}
                                first.label = list[i].name
                                first.id = list[i].id
                                // 判断当前数组是否存在  若存在调递归function 
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
            },
            // 递归解析数组
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
            // 递归解析数组 若当前父数组中子数组存在  则把父id存入数组
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
            // 递归解析数组 若当前父数组中子数组存在  则把父id存入数组
            twoTree(list,id,fId,ffid){
                for (var i = 0; i < list.length; i++) {
                    if(list[i].id === id){
                        // console.log(fId)
                        // console.log(ffid)
                        this.allfid.push(fId,ffid)
                    }
                }
            },
            // 保存当前角色
            submitUpload(){
                const _this = this
                this.allfid = []
                // 获取属性菜单id并push到fuid
                for (var i = 0; i < this.MenuData.length; i++) {
                    this.fuid.push(this.MenuData[i].id)
                }
                // 循环菜单  
                for (var i = 0; i < this.MenuData.length; i++) {
                    for (var x = 0; x < this.fuid.length; x++) {
                        // 如果菜单id === 父id 
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
                _this.menuIdList.push(1)
                const params = {
                    roleName:_this.userFrom.roleName,
                    remark:_this.userFrom.remark,
                    menuIdList:_this.menuIdList,
                    LoginType:_this.type
                }
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+'/sys/role/save?token='+_this.token+'&LoginType='+_this.type,
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {},
                    success:function(data){
                        if(data.code === 200){
                            _this.$message({
                              message: data.message,
                              type: 'success',
                              duration:1000
                            });
                            for (var i = 0; i < state.tagArry.length; i++) {
                                if(state.tagArry[i].path === '角色列表展示'){
                                    state.id = i
                                    break;
                                }
                            }
                            _this.$router.push({ path: '/roleListShow' });
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
		mounted() {
            this.token = sessionStorage.getItem('token')
            this.token = JSON.parse(this.token)
            this.type = sessionStorage.getItem('type')
            this.type = JSON.parse(this.type)
            this.getlist()
            this.jiedian = false
		}
	}
</script>

<style>

</style>