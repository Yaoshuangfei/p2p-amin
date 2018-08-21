<template>
	<section style="background: #f7f7f7;">
        
	</section>
</template>
<!-- <script>
    import echarts from 'echarts'
    import { state } from '../../vuex/state'
	import {baseUrl} from '../../api/api';
    export default {
        data() {
            return {
                baobiaoName:'日营业额',
            	addTitle:'添加身份信息',
            	frImgurl:'',
            	frImgurlPointer:'',
            	businessImgurl:'',
            	bankImgurl:'',
            	formData: new FormData(),
            	rules:{
            		legalCardCode: [
				        { required: true, message: '请输入身份证号', trigger: 'blur' },
				        { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '证件号码格式有误！', trigger: 'blur' }
				      ]
            	},
            	sfinfo:{},
            	editFormVisible:false,//上传材料
            	dashVisible:false,//待审核
            	remarkInfo:'',//未通过信息
            	sfinfoId:'',//修改身份信息ID
            	daibanList:[],
            	dingdanList:[],
                radio: 0,
                ruleAll:[{
                	name:'日报表',
                	id:0
                },{
                	name:'周报表',
                	id:1
                },{
                	name:'月报表',
                	id:2
                },{
                	name:'季报表',
                	id:3
                },{
                	name:'年报表',
                	id:4
                }],
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                chartmap: null,
                visitPercentage:'',
                visitCount:'',
                sumTotalMoney:'',
                moneyPercentage:'',
                memberCount:'',
                memberPercentage:'',
                sumTotalQuantity:'',
                quantityPercentage:'',
                type:0,

                listAll:[],//线图
                sj:[],
                cj:[],
                sp:[],
                pj:[],
                parobj:[],//饼图
                parName:[]
            }
        },
        methods: {
        	//图片上传
            upload (index) {
            	// console.log(index)
                this.formData = new FormData()
                let file = event.target.files[0]
                // console.log(file)
                const self = this
                // const flag = this.flag
                if (file) {
                    console.log('存在file', file)
                    this.fileImg = file.name
                    // console.log(this.formData)
                    this.formData.append('file', file);
                    this.submitUpload(index)
                    console.log(this.formData);
                } else {
                    this.fileImg = ''
                    console.log('不存在file', file)
                    this.formData = new FormData()
                }
            },
            submitUpload(index){
                // this.$confirm('确认修改吗？', '提示', {}).then(() => {
                    const _this= this;
                    _this.$http.post(baseUrl+'/api/attachment/upload', _this.formData, {
                        progress(event) {
                        }
                    })
                        .then(response => {
                            const info = JSON.parse(response.bodyText);
                            // const info = response.body
                            console.log(index)
                            if(index === 1){
                            	_this.frImgurl = info.data[0].baseUri+info.data[0].uri;
                            }else if(index === 2){
                            	_this.frImgurlPointer = info.data[0].baseUri+info.data[0].uri;
                            }else if(index === 3){
                            	_this.businessImgurl = info.data[0].baseUri+info.data[0].uri;
                            }else if(index === 4){
                            	_this.bankImgurl = info.data[0].baseUri+info.data[0].uri;
                            } 
							// _this.url = info.data[0].baseUri+info.data[0].uri;
							// console.log(_this.url)
                            // _this.UploadImg();
                        }, error => _this.$emit('complete', 500, error.message))
                // });
            },
            clupLoad(){
            	const _this = this
            	const params = {
            		realName:this.sfinfo.realName,
            		legalCardCode:this.sfinfo.legalCardCode,
            		storeMobile:this.sfinfo.storeMobile,
            		bankName:this.sfinfo.bankName,
            		bankCode:this.sfinfo.bankCode,
            		theAddress:this.sfinfo.theAddress,
            		cardImgF:this.frImgurl,
            		cardImgW:this.frImgurlPointer,
            		businessLicense:this.businessImgurl,
            		bankImgW:this.bankImgurl
            	}
            	console.log(params)
            	let url = ''
            	if(this.sfinfoId === ''){
            		url = '/api/coreUspAuthentication/add'
            	}else{
            		url = '/api/coreUspAuthentication/updateDetails'
            		params.id = this.sfinfoId
            	}
        		$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+"",
                    data:JSON.stringify(params),
                    contentType:'application/json;charset=utf-8',
                    success:function(data){
                    	console.log(data)
                    	if(data.code === 1){
                    		_this.editFormVisible = false
                    	}else{
                    		_this.$message.error(data.msg);
                    	}
                    }
                });
            },
        	getGroup(){
        		const _this = this
        		$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+"/api/notify/selectListGroup",
                    data:JSON.stringify([1,3,6,8,10,11]),
                    contentType:'application/json;charset=utf-8',
                    success:function(data){
                    	const info = data.data
                    	// console.log(data)
                    	_this.daibanList = info
                    	// _this.total = info.total
                    }
                });
        	},
        	getDDWL(){
        		const _this = this
        		$.ajax({
                    type:'POST',
                    dataType:'json',
                    url:baseUrl+"/api/notify/selectListGroup",
                    data:JSON.stringify([2]),
                    contentType:'application/json;charset=utf-8',
                    success:function(data){
                    	console.log(data)
                    	const info = data.data
                    	_this.dingdanList = info
                    	// _this.total = info.total
                    }
                });
        	},
        	getlist(){
        		const _this = this
				$.ajax({
	              type:'POST',
	              dataType:'json',
	              url:baseUrl+"/api/admin/userCashFlow/data/analysis",
	              // url:'http://192.168.0.107:8080/api/admin/userCashFlow/data/analysis',
	              data:{},
	              contentType:'application/json;charset=utf-8',
	              success:function(data){
	                const info = data.data
	                // console.log(data)
	                _this.visitPercentage = (info.visitPercentage*100).toFixed(6)
	                _this.visitCount = info.visitCount
	                _this.sumTotalMoney = info.sumTotalMoney
	                _this.moneyPercentage = (info.moneyPercentage*100).toFixed(6)
	                _this.memberCount = info.memberCount
	                _this.memberPercentage = (info.memberPercentage*100).toFixed(6)
	                _this.sumTotalQuantity = info.sumTotalQuantity
	                _this.quantityPercentage = (info.quantityPercentage*100).toFixed(6)
	              }
	          });
        	},
        	click(val) {
        		this.type = val
                console.log(val)
                if(val === 0){
                    this.baobiaoName = '日营业额'
                }else if(val === 1){
                    this.baobiaoName = '周营业额'
                }else if(val === 2){
                    this.baobiaoName = '月营业额'
                }else if(val === 3){
                    this.baobiaoName = '季营业额'
                }else if(val === 4){
                    this.baobiaoName = '年营业额'
                }
        		this.getline()
			},
        	getline(){
        		const _this = this
        		_this.sj = []
        		_this.cj = []
        		_this.sp = []
        		_this.pj = []
        		_this.parobj = []//初始化饼图数据
        		_this.parName = []
        		_this.listAll = []//初始化线形图数据
        		const params = {
        			type:this.type,
        			storeId:state.storeId
        		}
        		// console.log(params)
        		
        		$.ajax({
	              type:'POST',
	              dataType:'json',
	              url:baseUrl+"/api/orderMall/selectByPayTimeGroup",
	              data:JSON.stringify(params),
	              contentType:'application/json;charset=utf-8',
	              success:function(data){
	                const info = data.data
	                // 线形图
	                console.log(data)
	                const linelist = info.analysisVOList
	                // console.log(linelist)
	                for(var i = 0;i<linelist.length;i++){
	                	// 时间
                        var date=new Date(linelist[i].payTime);
                        if(_this.type === 0){
                             _this.sj.push(date.getHours()+'时')
                        }else if(_this.type === 1 || _this.type === 3){
                             _this.sj.push((date.getMonth()+1)+"月"+date.getDate()+'日')
                        }else if(_this.type === 2 ){

                            _this.sj.push(date.getDate()+'日')
                        }else{
                            _this.sj.push(date.getFullYear()+"-"+(date.getMonth()+1))
                        }
	                	// _this.sj.push( _this.formatterTime(linelist[i].payTime))
	                	_this.cj.push(linelist[i].moneyAll)
	                	_this.sp.push(linelist[i].countAll)
	                	_this.pj.push(linelist[i].avgPrice)
	                }
	                const obj = {}
                	obj.name = '成交额总数'
                	obj.type = 'line'
                	obj.smooth = true
                	obj.data = _this.cj
            		_this.listAll.push(obj)

            		const obj1 = {}
                	obj1.name = '成交商品总数'
                	obj1.type = 'line'
                	obj1.smooth = true
                	obj1.data = _this.sp
            		_this.listAll.push(obj1)

            		const obj2 = {}
                	obj2.name = '成交额平均值'
                	obj2.type = 'line'
                	obj2.smooth = true
                	obj2.data = _this.pj
            		_this.listAll.push(obj2)
            		



					//饼图数据
	                const ordlist= info.orderMalls
	                console.log(ordlist)
	                for(var i = 0;i<ordlist.length;i++){
	                	const obj = {}
	                	if(ordlist[i].orderType === 3){
	                		obj.name = '业务充值'
	                	}else if(ordlist[i].orderType === 4){
	                		obj.name = '余额充值'
	                	}else if(ordlist[i].orderType === 5){
	                		obj.name = '商品购买'
	                	}else if(ordlist[i].orderType === 6){
	                		obj.name = '店铺身份购买'
	                	}else if(ordlist[i].orderType === 7){
	                		obj.name = '平台身份购买 '
	                	}else if(ordlist[i].orderType === 8){
	                		obj.name = '补货'
	                	}else if(ordlist[i].orderType === 9){
	                		obj.name = '金豆充值'
	                	}else if(ordlist[i].orderType === 13){
	                		obj.name = '便付劵充值'
	                	}else{
	                		obj.name = '业务充值'
	                	}
	                	obj.value = ordlist[i].totalMoney
	                	_this.parName.push(obj.name)
	                	_this.parobj.push(obj)
	                }
	                console.log(_this.parobj)
	                console.log(_this.parName)
	                _this.drawColumnChart()
	                _this.drawPieChart()
	              }
	          });
        	},
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    title: { text: this.baobiaoName },
                    tooltip: {},
                    legend: {
                        data:['成交额总数','成交商品总数','成交额平均值']
                    },
                    xAxis: {
                        type : 'category',
                        boundaryGap : false,
                        data: this.sj
                    },
                    yAxis: {
                        type : 'value'
					},
                    series:this.listAll
                });
            },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '店铺收入支出分析图',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        // data: this.nameAll
                         data:this.parName
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data:this.parobj,
                            //  [
                            //     { value: 335, name: '余额充值' },
                            //     { value: 310, name: '商品购买' },
                            //     { value: 234, name: '平台身份购买' },
                            //     { value: 135, name: '补货' },
                            //     { value: 1548, name: '便付劵充值' }
                            // ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            formatterTime(row){
                return  new Date(row).toLocaleString()
            },
            getSHinfo(){
            	const _this = this
            	$.ajax({
	              type:'POST',
	              dataType:'json',
	              url:baseUrl+"/api/coreUspAuthentication/checkDetails",
	              data:{},
	              contentType:'application/json;charset=utf-8',
	              success:function(data){
	                const info = data.data
	                console.log(data)
	                _this.remarkInfo = data.data.remark
	                _this.sfinfoId = data.data.id
	              }
	          });
            }
        },
        mounted: function () {
        	// this.getSHinfo()
        	if(state.storeStatus === 4){
        		this.editFormVisible = true
        	}else if(state.storeStatus === 0){//待审核
        		this.dashVisible = true
        	}else if(state.storeStatus === 2){//审核未通过
        		this.addTitle = '修改身份信息'
        		this.getSHinfo()
        	}
        	this.getlist()
        	this.getline()
        	this.getGroup()
        	this.getDDWL()
            // this.drawPieChart()
            // this.drawPieChart()
        },
        // updated: function () {
        //     this.drawCharts()
        // }
    }
</script> -->

<!-- <style scoped lang="scss">
	.main_top {
		text-align: center;
		padding: 40px 0 35px 0;
		font-family: "Microsoft YaHei";
		.Finance {
			p {
				margin: 0;
				padding: 0;
				color: #6a7c8f;
			}
			p:nth-child(1) {  font-size: 14px;  }
			p:nth-child(2) {  font-size: 36px;font-weight: 900  }
			p:nth-child(3) {
				font-size: 14px;
				span:nth-child(1){
					color: #1abb9c;
				}
			}
		}
		.el-row {
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.el-col {
			border-radius: 4px;
		}
		.bg-purple-dark {
			/*background: #99a9bf;*/
		}
		.bg-purple {
			/*background: #d3dce6;*/
		}
		.bg-purple-light {
			/*background: #e5e9f2;*/
		}
		.grid-content {
			border-radius: 4px;
			min-height: 36px;
		}
		.row-bg {
			padding: 10px 0;
			background-color: #f9fafc;
		}
	}
	.statistics {
		font-family: "Microsoft YaHei";
		border: 1px solid #cdcdcd;
		box-shadow: 0 2px 10px rgba(0,0,0,.1);
		.statistics_img , .statistics_title {
			margin-top: 0;
		}
		.statistics_title {
			height:70px;
			border-bottom: 1px solid #cdcdcd;
			line-height: 70px;
			.statistics_title_left {
				height:70px;
				span:nth-child(1) {
					font-size: 30px;
					font-weight: 900;
					color: #6a7c8f;
					margin: 0 20px;
				}
				span:nth-child(2) {
					font-size: 18px;
					color: #6a7c8f;
				}
			}
			.statistics_title_right {
				height:70px;
			}
		}
	}
	.statistics_bottom {
		font-family: "Microsoft YaHei";
		margin-top: 30px;
		height:720px;
		margin-bottom: 100px;
		.grid-content {
			border: 1px solid #cdcdcd;
			box-shadow: 0 2px 10px rgba(0,0,0,.1);
			height:720px;
			.statistics_bottom_left_top {
				height:70px;
				font-size: 30px;
				font-weight: 900;
				color: #6a7c8f;
				padding: 0 5%;
				border-bottom: 1px solid #cdcdcd;
				line-height: 70px;
			}
			.statistics_bottom_main {
				ul ,li {
					list-style-type: none;
					margin: 0;
					padding: 0;
				}
				ul {
					width:90%;
					margin: auto;
				}
				li {
					height:64px;
					line-height: 64px;
					font-size: 18px;
					color: #333;
					white-space:nowrap;
					text-overflow:ellipsis;
					-o-text-overflow:ellipsis;
					overflow: hidden;
					width:100%;
					border-bottom: 1px solid #cdcdcd;
				}
			}
		}
	}
</style> -->
<style>
	/*.el-radio-button:first-child .el-radio-button__inner {border: none;}
	.el-radio-button:first-child .el-radio-button__inner {border-radius: 10px;}
	.el-radio-button:last-child .el-radio-button__inner {border-radius: 10px;}
	.el-radio-button__orig-radio:checked+.el-radio-button__inner {background-color:#22ac38;}
	.el-radio-button__inner {background: #f7f7f7;font-size: 18px;color: #6a7c8f;}
	.el-radio-button__inner:hover {color: #22ac38;}
	.wrapper_btn span {
		border: transparent;
		border-radius: 10px;
		margin: 0 10px;
	}*/
</style>