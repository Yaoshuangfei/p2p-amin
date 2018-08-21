import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Home/indexMain.vue'
import { state } from './vuex/state'

import DeliverGoods from './views/logistics/DeliverGoods.vue'
import StoreInformation from './views/Home/StoreInformation.vue'




// 产品管理
    import release_newPrd from './views/product_management/release_newPrd.vue'
    import release_normalPrd from './views/product_management/release_normalPrd.vue'
    import release_orderedPrd from './views/product_management/release_orderedPrd.vue'

    import ifm_prdReleaseRecord from './views/product_management/ifm_prdReleaseRecord.vue'
    import ifm_orderedPrdKeyword from './views/product_management/ifm_orderedPrdKeyword.vue'
    import ifm_checkOrderedPrd from './views/product_management/ifm_checkOrderedPrd.vue'
    import ifm_prdStatistics from './views/product_management/ifm_prdStatistics.vue'
    import ifm_sellingPrd from './views/product_management/ifm_sellingPrd.vue'
    import ifm_investRecord from './views/product_management/ifm_investRecord.vue'
    import ifm_fictitiousIvRecord from './views/product_management/ifm_fictitiousIvRecord.vue'

    import interest_totalList from './views/product_management/interest_totalList.vue'
    import interest_DetailList from './views/product_management/interest_DetailList.vue'

// 运营管理
    import register_userIfm from './views/operation_management/register_userIfm.vue'
    import register_channelIfm from './views/operation_management/register_channelIfm.vue'
    import register_totalNum from './views/operation_management/register_totalNum.vue'
    import register_numPerDay from './views/operation_management/register_numPerDay.vue'
    import register_investPerDay from './views/operation_management/register_investPerDay.vue'
    import register_accountDetails from './views/operation_management/register_accountDetails.vue'

    import banner_releaseBanner from './views/operation_management/banner_releaseBanner.vue'
    import banner_bannerShow from './views/operation_management/banner_bannerShow.vue'

    import version_releaseVersion from './views/operation_management/version_releaseVersion.vue'
    import version_versionShow from './views/operation_management/version_versionShow.vue'
    import version_startPageUpdate from './views/operation_management/version_startPageUpdate.vue'
    import version_startPageShow from './views/operation_management/version_startPageShow.vue'
    import version_androidPackageUpload from './views/operation_management/version_androidPackageUpload.vue'
    import Projectile_frameUpdate from './views/operation_management/Projectile_frameUpdate.vue'

    import notice_noticeShow from './views/operation_management/notice_noticeShow.vue'
    import notice_releaseNotice from './views/operation_management/notice_releaseNotice.vue'
    import notice_newsList from './views/operation_management/notice_newsList.vue'
    import notice_newsManagement from './views/operation_management/notice_newsManagement.vue'

    import reports_AndroidChannel from './views/operation_management/reports_AndroidChannel.vue'
    import reports_channeIInvestPlan from './views/operation_management/reports_channeIInvestPlan.vue'
    import reports_channelStatistics from './views/operation_management/reports_channelStatistics.vue'
    import Channel_investment_statistics from './views/operation_management/Channel_investment_statistics.vue'
    import ChannelManagement from './views/operation_management/ChannelManagement.vue'
    import reports_channelDetails from './views/operation_management/reports_channelDetails.vue'
    import reports_IOSChannel from './views/operation_management/reports_IOSChannel.vue'
    import reports_channelCost from './views/operation_management/reports_channelCost.vue'
    import reports_investPerDay from './views/operation_management/reports_investPerDay.vue'
    import reports_platformInvest from './views/operation_management/reports_platformInvest.vue'
    import reports_dataStatistics from './views/operation_management/reports_dataStatistics.vue'
    import reports_userChangeData from './views/operation_management/reports_userChangeData.vue'
    import reports_rechargeWithdraw from './views/operation_management/reports_rechargeWithdraw.vue'
    import reports_operationData from './views/operation_management/reports_operationData.vue'
    import reports_channelKeyword from './views/operation_management/reports_channelKeyword.vue'
    import reports_rgInvRchgWtd from './views/operation_management/reports_rgInvRchgWtd.vue'
    import reports_userInvStatistics from './views/operation_management/reports_userInvStatistics.vue'
    import reports_wapUserInvStatistics from './views/operation_management/reports_wapUserInvStatistics.vue'
    import reports_visitorChnInvStatistics from './views/operation_management/reports_visitorChnInvStatistics.vue'
    
    import data_regionalStatistics from './views/operation_management/data_regionalStatistics.vue'
    import data_userDataStatistics from './views/operation_management/data_userDataStatistics.vue'
    import data_userAgeDistribution from './views/operation_management/data_userAgeDistribution.vue'
    import data_userComment from './views/operation_management/data_userComment.vue'
    import data_userInvRecStatistics from './views/operation_management/data_userInvRecStatistics.vue'
    import data_rechargeRanking from './views/operation_management/data_rechargeRanking.vue'
    import data_investRanking from './views/operation_management/data_investRanking.vue'
    import data_sexStatistics from './views/operation_management/data_sexStatistics.vue'
    import data_invAnalysisCurve from './views/operation_management/data_invAnalysisCurve.vue'
    import data_bankCardStatistics from './views/operation_management/data_bankCardStatistics.vue'
    import data_bindCardStatistics from './views/operation_management/data_bindCardStatistics.vue'
    import data_userProvinceStatistics from './views/operation_management/data_userProvinceStatistics.vue'
    import data_userCityStatistics from './views/operation_management/data_userCityStatistics.vue'
    import VerifyingCodeQuery from './views/operation_management/VerifyingCodeQuery.vue'

// 活动管理
    import activity_valentineDay from './views/activity_management/activity_valentineDay.vue'
    import activity_prize from './views/activity_management/activity_prize.vue'

// 财务管理
    import finance_obligateMoney from './views/finance_management/finance_obligateMoney.vue'
    import finance_unmovableWeekly from './views/finance_management/finance_unmovableWeekly.vue'
    import finance_usableMoney from './views/finance_management/finance_usableMoney.vue'
    import finance_freezingDetail from './views/finance_management/finance_freezingDetail.vue'
    import finance_weekReimbursementStatistics from './views/finance_management/finance_weekReimbursementStatistics.vue'
    import capital_flow from './views/finance_management/capital_flow.vue'

    import recharge_rechargeRecord from './views/finance_management/recharge_rechargeRecord.vue'
    import recharge_companyRecord from './views/finance_management/recharge_companyRecord.vue'
    import recharge_recordStatistics from './views/finance_management/recharge_recordStatistics.vue'
    import recharge_userRecharge from './views/finance_management/recharge_userRecharge.vue'

    import withdraw_companyRecord from './views/finance_management/withdraw_companyRecord.vue'
    import withdraw_withdrawRecord from './views/finance_management/withdraw_withdrawRecord.vue'
    import withdraw_abnormalWtdRecord from './views/finance_management/withdraw_abnormalWtdRecord.vue'
    import withdraw_wtdRecordStatistics from './views/finance_management/withdraw_wtdRecordStatistics.vue'
    import withdraw_withdrawFee from './views/finance_management/withdraw_withdrawFee.vue'
    import withdraw_manualWithdraw from './views/finance_management/withdraw_manualWithdraw.vue'
    import withdraw_actualWtdRate from './views/finance_management/withdraw_actualWtdRate.vue'
    import withdraw_manualWtdRecord from './views/finance_management/withdraw_manualWtdRecord.vue'

    import loan_loanApply from './views/finance_management/loan_loanApply.vue'


// 权限管理 
    import departmentList from './views/authority_management/departmentList.vue'
    import addDepartment from './views/authority_management/addDepartment.vue'
    import adminList from './views/authority_management/adminList.vue'
    import addAdmin from './views/authority_management/addAdmin.vue'
    import moduleListShow from './views/authority_management/moduleListShow.vue'
    import addModule from './views/authority_management/addModule.vue'
    import roleListShow from './views/authority_management/roleListShow.vue'
    import addRole from './views/authority_management/addRole.vue'

// 功能管理
    import threadManagement from './views/function_management/threadManagement.vue'

    import unbund_unbundBankCard from './views/function_management/unbund_unbundBankCard.vue'
    import unbund_ubBCNoAuth from './views/function_management/unbund_ubBCNoAuth.vue'
    import urgently_untie from './views/function_management/urgently_untie.vue'

    import change_actChangeList from './views/function_management/change_actChangeList.vue'
    import change_actChangeNoAuth from './views/function_management/change_actChangeNoAuth.vue'

    import message_sendMessage from './views/function_management/message_sendMessage.vue'
    import message_sendCouponMessage from './views/function_management/message_sendCouponMessage.vue'
    import message_messageList from './views/function_management/message_messageList.vue'

    import coupon_sendCoupon from './views/function_management/coupon_sendCoupon.vue'
    import coupon_usedCoupon from './views/function_management/coupon_usedCoupon.vue'
    import coupon_sendCoupons from './views/function_management/coupon_sendCoupons.vue'
    import coupon_sendGroupCoupons from './views/function_management/coupon_sendGroupCoupons.vue'
    import coupon_couponRecord from './views/function_management/coupon_couponRecord.vue'

    import blacklist_addBlacklist from './views/function_management/blacklist_addBlacklist.vue'
    import blacklist_blacklistList from './views/function_management/blacklist_blacklistList.vue'

// 模块管理
    import piggybank_userPBInformation from './views/module_management/piggybank_userPBInformation.vue'
    import piggybank_PBIntoRecord from './views/module_management/piggybank_PBIntoRecord.vue'
    import piggybank_PBOutRecord from './views/module_management/piggybank_PBOutRecord.vue'
    import piggybank_unmovableMoney from './views/module_management/piggybank_unmovableMoney.vue'
    import piggybank_dataReport from './views/module_management/piggybank_dataReport.vue'
    import piggybank_abnormalRecord from './views/module_management/piggybank_abnormalRecord.vue'

    import invite_rewardRecord from './views/module_management/invite_rewardRecord.vue'
    import invite_friendList from './views/module_management/invite_friendList.vue'

// 历史下载
    import productReport from './views/historyDownload/productReport.vue'
    import operationReport from './views/historyDownload/operationReport.vue'
    import financeReport from './views/historyDownload/financeReport.vue'
    import couponReport from './views/historyDownload/couponReport.vue'

// 系统管理
    import systemControl from './views/system_management/systemControl.vue'
    import operateLog from './views/system_management/operateLog.vue'
    import projectConfigure from './views/system_management/projectConfigure.vue'




let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    // {
    //     path: '/mian',
    //     component: Main,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        hidden: true,
        children: [
            { path: '/StoreInformation', component: StoreInformation, name: '首页' ,  hidden: true  }
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 产品管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {  path: '/DeliverGoods', component:DeliverGoods, name: '产品发布' ,children:[
                { path: '/release_newPrd', component:release_newPrd, name: '发布新手产品' },
                { path: '/release_normalPrd', component:release_normalPrd, name: '发布常规产品' },
                { path: '/release_orderedPrd', component:release_orderedPrd, name: '发布预约产品' }
            ]},
            {  path: '/DeliverGoods', component:DeliverGoods,name: '产品信息' ,children:[
                { path: '/ifm_prdReleaseRecord', component: ifm_prdReleaseRecord, name: '产品发布记录' },
                { path: '/ifm_orderedPrdKeyword', component: ifm_orderedPrdKeyword, name: '预约产品关键字' },
                { path: '/ifm_checkOrderedPrd', component: ifm_checkOrderedPrd, name: '查看预约产品' },
                { path: '/ifm_prdStatistics', component: ifm_prdStatistics, name: '产品统计' },
                { path: '/ifm_sellingPrd', component: ifm_sellingPrd, name: '在售产品' },
                { path: '/ifm_investRecord/:time/:user', component: ifm_investRecord, name: '投资记录' },
                { path: '/ifm_fictitiousIvRecord', component: ifm_fictitiousIvRecord, name: '虚拟投资列表' }
            ]},
            { path: '/DeliverGoods', component:DeliverGoods, name: '产品结算' ,children:[
                { path: '/interest_totalList', component: interest_totalList, name: '付息总表' },
                { path: '/interest_DetailList/:time', component: interest_DetailList, name: '付息明细表' }
            ]}
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 运营管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {  path: '/DeliverGoods', component:DeliverGoods, name: '注册管理' ,children:[
                { path: '/register_userIfm/:id/:time', component:register_userIfm, name: '注册用户信息' },
                { path: '/register_channelIfm', component:register_channelIfm, name: '渠道注册信息' },
                { path: '/register_totalNum', component:register_totalNum, name: '平台注册人数' },
                { path: '/register_numPerDay', component:register_numPerDay, name: '注册人数日统计' },
                { path: '/register_investPerDay', component:register_investPerDay, name: '注册当日投资统计' },
                { path: '/register_accountDetails/:id', component:register_accountDetails, name: '用户账户详情' }
            ]},
            {  path: '/DeliverGoods', component:DeliverGoods,name: 'Banner管理' ,children:[
                { path: '/banner_releaseBanner', component: banner_releaseBanner, name: '发布Banner' },
                { path: '/banner_bannerShow', component: banner_bannerShow, name: 'Banner展示' },
            ]},
            { path: '/DeliverGoods', component:DeliverGoods, name: '版本管理' ,children:[
                { path: '/version_releaseVersion', component: version_releaseVersion, name: '发布版本' },
                { path: '/version_versionShow', component: version_versionShow, name: '版本展示' },
                { path: '/version_startPageUpdate', component: version_startPageUpdate, name: '启动页上传' },
                { path: '/version_startPageShow', component: version_startPageShow, name: '启动页展示' },
                { path: '/version_androidPackageUpload', component: version_androidPackageUpload, name: '安卓包上传' },
                { path: '/Projectile_frameUpdate', component: Projectile_frameUpdate, name: '弹窗和浮标配置' },
            ]},
            {  path: '/DeliverGoods', component:DeliverGoods, name: '新闻公告' ,children:[
                { path: '/notice_noticeShow', component:notice_noticeShow, name: '公告展示' },
                { path: '/notice_releaseNotice', component:notice_releaseNotice, name: '发布公告' },
                { path: '/notice_newsList', component:notice_newsList, name: '新闻列表' },
                { path: '/notice_newsManagement', component:notice_newsManagement, name: '新闻管理' }
            ]},
            {  path: '/DeliverGoods', component:DeliverGoods,name: '报表统计' ,children:[
                { path: '/reports_AndroidChannel', component: reports_AndroidChannel, name: '安卓渠道汇总' },
                { path: '/reports_channeIInvestPlan', component: reports_channeIInvestPlan, name: '渠道投资计划(新)' },
                { path: '/reports_channelStatistics/:type/:time', component: reports_channelStatistics, name: '渠道统计汇总表' },
                { path: '/Channel_investment_statistics', component: Channel_investment_statistics, name: '渠道投资统计' },
                { path: '/ChannelManagement', component: ChannelManagement, name: '渠道管理' },
                { path: '/reports_channelDetails/:id/:name', component:reports_channelDetails, name: '单个渠道统计详情' },
                { path: '/reports_IOSChannel', component: reports_IOSChannel, name: 'IOS渠道统计汇总' },
                { path: '/reports_channelCost', component: reports_channelCost, name: '渠道成本' },
                { path: '/reports_investPerDay', component: reports_investPerDay, name: '每日投资统计' },
                { path: '/reports_platformInvest', component: reports_platformInvest, name: '平台投资情况' },
                { path: '/reports_dataStatistics', component: reports_dataStatistics, name: '数据统计' },
                { path: '/reports_userChangeData', component: reports_userChangeData, name: '用户转换数据' },
                { path: '/reports_rechargeWithdraw', component: reports_rechargeWithdraw, name: '充值提现数据报表' },
                { path: '/reports_operationData', component: reports_operationData, name: '运营数据' },
                { path: '/reports_channelKeyword', component: reports_channelKeyword, name: '渠道关键字查询' },
                { path: '/reports_rgInvRchgWtd', component: reports_rgInvRchgWtd, name: '注册投资充值提现' },
                { path: '/reports_userInvStatistics', component: reports_userInvStatistics, name: '用户投资统计' },
                { path: '/reports_wapUserInvStatistics', component: reports_wapUserInvStatistics, name: 'wap用户投资统计' },
                { path: '/reports_visitorChnInvStatistics', component: reports_visitorChnInvStatistics, name: '访客渠道投资统计' }
            ]},
            { path: '/DeliverGoods', component:DeliverGoods, name: '数据分析' ,children:[
                { path: '/data_regionalStatistics', component: data_regionalStatistics, name: '地域统计' },
                { path: '/VerifyingCodeQuery', component: VerifyingCodeQuery, name: '验证码查询' },
                { path: '/data_userDataStatistics', component: data_userDataStatistics, name: '用户数据分析' },
                { path: '/data_userAgeDistribution', component: data_userAgeDistribution, name: '用户年龄分布表' },
                { path: '/data_userComment', component: data_userComment, name: '用户评论' },
                { path: '/data_userInvRecStatistics', component: data_userInvRecStatistics, name: '用户投资记录分析' },
                { path: '/data_rechargeRanking', component: data_rechargeRanking, name: '充值排行统计' },
                { path: '/data_investRanking', component: data_investRanking, name: '投资排行统计' },
                { path: '/data_sexStatistics', component: data_sexStatistics, name: '性别统计' },
                { path: '/data_invAnalysisCurve', component: data_invAnalysisCurve, name: '投资分析曲线' },
                { path: '/data_bankCardStatistics', component: data_bankCardStatistics, name: '银行卡数据统计' },
                { path: '/data_bindCardStatistics', component: data_bindCardStatistics, name: '绑卡用户信息统计' },
                { path: '/data_userProvinceStatistics', component: data_userProvinceStatistics, name: '用户所在省份统计' },
                { path: '/data_userCityStatistics/:phoneProv', component: data_userCityStatistics, name: '用户所在城市统计' }
            ]}
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 活动管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {  path: '/DeliverGoods', component:DeliverGoods, name: '情人节' ,children:[
                // { path: '/activity_valentineDay', component:activity_valentineDay, name: '情人节活动' },
                { path: '/activity_prize', component:activity_prize, name: '情人节活动' }
            ]}
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 财务管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {  path: '/DeliverGoods', component:DeliverGoods, name: '财务数据' ,children:[
                { path: '/finance_obligateMoney', component:finance_obligateMoney, name: '预留金额' },
                { path: '/finance_unmovableWeekly', component:finance_unmovableWeekly, name: '一周不可动金额' },
                { path: '/finance_usableMoney', component:finance_usableMoney, name: '平台可用金额' },
                { path: '/capital_flow', component:capital_flow, name: '资金流水记录' },
                { path: '/finance_freezingDetail', component:finance_freezingDetail, name: '资金速冻明细' },
                { path: '/finance_weekReimbursementStatistics', component:finance_weekReimbursementStatistics, name: '每周还款统计' }
            ]},
            {  path: '/DeliverGoods', component:DeliverGoods,name: '充值管理' ,children:[
                { path: '/recharge_rechargeRecord/:time/:user', component: recharge_rechargeRecord, name: '充值记录' },
                { path: '/recharge_companyRecord', component: recharge_companyRecord, name: '企业充值记录' },
                { path: '/recharge_recordStatistics', component: recharge_recordStatistics, name: '充值记录统计' },
                { path: '/recharge_userRecharge', component: recharge_userRecharge, name: '用户充值' },
            ]},
            { path: '/DeliverGoods', component:DeliverGoods, name: '提现管理' ,children:[
                { path: '/withdraw_companyRecord', component: withdraw_companyRecord, name: '企业提现记录' },
                { path: '/withdraw_withdrawRecord/:user', component: withdraw_withdrawRecord, name: '提现记录' },
                { path: '/withdraw_abnormalWtdRecord', component: withdraw_abnormalWtdRecord, name: '异常提现记录' },
                { path: '/withdraw_wtdRecordStatistics', component: withdraw_wtdRecordStatistics, name: '提现记录统计' },
                { path: '/withdraw_withdrawFee', component: withdraw_withdrawFee, name: '提现手续费' },
                { path: '/withdraw_manualWithdraw', component: withdraw_manualWithdraw, name: '手动提现' },
                { path: '/withdraw_actualWtdRate', component: withdraw_actualWtdRate, name: '实际提现率' },
                { path: '/withdraw_manualWtdRecord', component: withdraw_manualWtdRecord, name: '手动提现记录' }
            ]},
            {  path: '/DeliverGoods', component:DeliverGoods, name: '借款业务' ,children:[
                { path: '/loan_loanApply', component:loan_loanApply, name: '借款申请' }
            ]}
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 权限管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/departmentList', component: departmentList, name: '部门列表' },
            { path: '/addDepartment', component: addDepartment, name: '添加部门' },
            { path: '/adminList', component: adminList, name: '管理员列表' },
            { path: '/addAdmin', component: addAdmin, name: '添加管理员' },
            { path: '/moduleListShow', component: moduleListShow, name: '模块列表展示' },
            { path: '/addModule', component: addModule, name: '添加新模块' },
            { path: '/roleListShow', component: roleListShow, name: '角色列表展示' },
            { path: '/addRole', component: addRole, name: '添加新角色' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 功能管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/threadManagement', component:threadManagement, name: '线程管理' },
            { path: '/unbund_unbundBankCard', component:unbund_unbundBankCard, name: '解绑银行卡' },
            { path: '/urgently_untie', component:urgently_untie, name: '紧急解绑银行卡' },
            {  path: '/DeliverGoods', component:DeliverGoods, name: '解绑管理' ,children:[
                { path: '/unbund_ubBCNoAuth', component:unbund_ubBCNoAuth, name: '手动解绑银行卡' },
            ]},
            {  path: '/DeliverGoods', component:DeliverGoods,name: '更改账号' ,children:[
                { path: '/change_actChangeList', component: change_actChangeList, name: '账号变更列表' },
                { path: '/change_actChangeNoAuth', component: change_actChangeNoAuth, name: '无验证更改账号' },
            ]},
            { path: '/DeliverGoods', component:DeliverGoods, name: '短信管理' ,children:[
                { path: '/message_sendMessage', component: message_sendMessage, name: '发送短信' },
                { path: '/message_sendCouponMessage', component: message_sendCouponMessage, name: '发送理财券短信' },
                { path: '/message_messageList', component: message_messageList, name: '短信列表' }
            ]},
            { path: '/DeliverGoods', component:DeliverGoods, name: '券包管理' ,children:[
                { path: '/coupon_sendCoupon', component: coupon_sendCoupon, name: '发送投资券' },
                { path: '/coupon_usedCoupon', component: coupon_usedCoupon, name: '已使用的投资券' },
                { path: '/coupon_sendCoupons', component: coupon_sendCoupons, name: '发送投资券(多个)' },
                { path: '/coupon_sendGroupCoupons', component: coupon_sendGroupCoupons, name: '发送群体投资券' },
                { path: '/coupon_couponRecord', component: coupon_couponRecord, name: '用户券包查询' }
            ]},
            { path: '/DeliverGoods', component:DeliverGoods, name: '黑名单管理' ,children:[
                { path: '/blacklist_addBlacklist', component: blacklist_addBlacklist, name: '添加黑名单' },
                { path: '/blacklist_blacklistList', component: blacklist_blacklistList, name: '黑名单列表' }
            ]},
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 模块管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {  path: '/DeliverGoods', component:DeliverGoods, name: '零钱包' ,children:[
                { path: '/piggybank_userPBInformation', component:piggybank_userPBInformation, name: '用户零钱包信息' },
                { path: '/piggybank_PBIntoRecord', component:piggybank_PBIntoRecord, name: '零钱包转入记录' },
                { path: '/piggybank_PBOutRecord', component:piggybank_PBOutRecord, name: '零钱包转出记录' },
                { path: '/piggybank_unmovableMoney', component:piggybank_unmovableMoney, name: '零钱包不可动金额' },
                { path: '/piggybank_dataReport', component:piggybank_dataReport, name: '零钱包数据报表' },
                { path: '/piggybank_abnormalRecord', component:piggybank_abnormalRecord, name: '异常转出记录' }
            ]},
            {  path: '/DeliverGoods', component:DeliverGoods,name: '邀请好友' ,children:[
                { path: '/invite_rewardRecord', component: invite_rewardRecord, name: '邀请投资奖励记录' },
                { path: '/invite_friendList', component: invite_friendList, name: '邀请好友列表' },
            ]}
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 历史下载',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/productReport', component: productReport, name: '产品报表' },
            { path: '/operationReport', component: operationReport, name: '运营报表' },
            { path: '/financeReport', component: financeReport, name: '财务报表' },
            { path: '/couponReport', component: couponReport, name: '券报表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 系统管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/systemControl', component: systemControl, name: '系统监控' },
            { path: '/operateLog', component: operateLog, name: '操作日志' },
            { path: '/projectConfigure', component: projectConfigure, name: '系统配置' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;