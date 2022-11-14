//利用mock模拟数据
//引入mock
import Mock from 'mockjs'
//引入数据
import banners from './trueJs/banners.json'
import floors from './trueJs/floors.json'
import categoryList from './trueJs/categoryList.json'
import searchList from './trueJs/searchList.json'
import addressInfoList from './trueJs/addressInfoList.json'

//引入随机生成的数据
import ranSearchList from './randomJs/ranSearchList.js'
import ranStr from './randomJs/ranStr.js'

//引入封装函数
import { getUserCartInfo, updateList } from './util'

//模拟轮播图数据
Mock.mock('/mock/banners', 'get', {
    code: 200,
    data: banners
})

//模拟楼层数据
Mock.mock('/mock/floors', 'get', {
    code: 200,
    data: floors
})

//模拟三级分类数据
Mock.mock('/mock/categoryList', 'get', {
    code: 200,
    data: categoryList
})

let map = new Map()

//拦截搜索商品请求
Mock.mock('/mock/list', 'post', function (params) {
    // console.log(params);
    const { category1Id, category2Id, category3Id, categoryName,
        pageNo, pageSize, keyword, order, trademark, props } = JSON.parse(params.body)
    //判断id是否存在and哪个存在
    const categoryId = category1Id || category2Id || category3Id || ''
    const result = {
        code: 200
    }

    // console.log(searchList.goodsList.length);
    //手机则返回真实的数据,id都为空也默认为手机
    if (category3Id === '61' || category2Id === '13' || category1Id === '2' || !categoryId) {
        //直接将list赋值给result.data是引用赋值,data改变list就会变
        result.data = JSON.parse(JSON.stringify(searchList))
    } else {
        //不是则返回随机生成的,map中有则在map中取,没有则调用随机生成
        const key = `${categoryId}${categoryName}`
        // console.log(key);
        if (map.get(key)) {
            result.data = JSON.parse(JSON.stringify(map.get(key)))
        } else {
            result.data = JSON.parse(JSON.stringify(ranSearchList()))
            result.data.total = result.data.goodsList.length
            result.data.totalPages = Math.ceil(result.data.total / result.data.pageSize)
            map.set(key, JSON.parse(JSON.stringify(result.data)))
        }
    }
    // console.log(Array.isArray(result.data.goodsList));
    //处理关键字和品牌
    const trademarkName = trademark ? trademark.split(':')[1] : ''
    const keyword1 = keyword || ''
    if (keyword1 || trademarkName) {
        //筛选符合的
        result.data.goodsList = result.data.goodsList.filter(item =>
            item.title.includes(keyword1) && item.title.includes(trademarkName))
        //重新设置list的总页数和总数
        result.data.total = result.data.goodsList.length
        result.data.totalPages = Math.ceil(result.data.total / result.data.pageSize)
    }

    //处理排序
    const split_order = order.split(":")
    if (split_order[0] === '2') {
        result.data.goodsList = result.data.goodsList.sort((a, b) => {
            return b.price - a.price
        })
    }
    if (split_order[1] === 'asc') {
        result.data.goodsList = result.data.goodsList.reverse()
    }

    //截取对应页码的数据返回
    const start = (pageNo - 1) * pageSize;
    const end = pageSize * pageNo;

    //  pageNo:1 pageSize:10 返回0-9条数据  2-10-（10-19） 3-10（20-29）
    // 数据的起始位置：（pageNo-1）*pageSize 结束位置：pageNo*pageSize
    // console.log(pageNo,result.data.totalPages,result.data.goodsList);
    const list = pageNo > result.data.totalPages ? [] : result.data.goodsList.slice(start, end);
    result.data.goodsList = list
    result.data.pageNo = pageNo
    // console.log(result);
    return result
})

//拦截请求商品详情
Mock.mock(/\/mock\/item/, 'get', function (params) {
    //获取url中的skuid
    const skuid = /\/mock\/item\/(\d+)/.exec(params.url)[1]
    const goodsList = searchList.goodsList.filter(item => item.id == skuid)[0]
    const result = {
        code: 200,
        data: {
            price: goodsList.price,
            categoryView: goodsList.categoryView,
            spuSaleAttrList: goodsList.spuSaleAttrList,
            skuInfo: goodsList.skuInfo
        }
    }
    return result
})


//拦截请求加入购物车||更新购物车
Mock.mock(/\/mock\/cart\/addToCart/, 'post', function (params) {
    //获取url中的skuid
    let paramlist = /\/mock\/cart\/addToCart\/(\d+)\/((-)?\d+)/.exec(params.url)
    const skuId = +paramlist[1], skuNum = +paramlist[2]

    //如果cartList有对应id的产品,flag为1
    let flag = 0
    let { List, userCartInfo, userId } = getUserCartInfo()
    //获取对应的购物车列表
    let cartList = userCartInfo.cartList || []
    for (let item of cartList) {
        // console.log(item);
        //查找是否有对应的产品,有的话改变产品的数量
        if (item.skuId == skuId) {
            item.skuNum += skuNum
            // console.log(cartList);
            flag = 1
            break
        }
    }
    //如果存储中没有对应id的产品,从json中获取
    if (!flag) {
        //查找对应的id的产品:
        let good = searchList.goodsList.filter(item => item.id == skuId)[0]
        // console.log(good);
        let cartGoods = {
            id: skuId,
            skuId: skuId,
            skuNum: skuNum,
            isChecked: 0,
            cartPrice: good.price,
            imgUrl: good.defaultImg,
            skuName: good.skuInfo.skuName,
            skuPrice: good.price * skuNum
        }
        cartList.push(cartGoods)
        // console.log(cartList);
    }
    //将改变后的cartList重新写入
    updateList(List, cartList, userId)

    // console.log(skuId,skuNum);
    return {
        code: 200,
        message: "成功",
        data: null
    }
})

//拦截请求购物车列表
Mock.mock('/mock/cart/cartList', 'get', function (params) {
    // console.log(localStorage.getItem("cartList"));
    //获取对应id的用户购物车信息
    const { userCartInfo } = getUserCartInfo()
    // console.log(userCartInfo);
    // console.log(userCartInfo.cartList);
    return {
        code: 200,
        message: "成功",
        data: userCartInfo.cartList //返回购物车列表
    }
})

//拦截请求删除购物车产品的接口
Mock.mock(/\/mock\/cart\/deleteCart/, 'delete', function (params) {
    const skuId = /\/mock\/cart\/deleteCart\/(\d+)/.exec(params.url)[1]
    const { userCartInfo, userId, List } = getUserCartInfo()
    let cartList = userCartInfo.cartList || []
    let index
    for (let i in cartList) {
        if (cartList[i].skuId == skuId) {
            //保存索引
            index = i
            break
        }
    }
    //删除索引对应的产品
    cartList.splice(index, 1)
    //将改变后的cartList重新写入
    updateList(List, cartList, userId)


    return {
        code: 200,
        message: "成功",
        data: null
    }
})

//拦截请求更新购物车产品勾选状态的接口
Mock.mock(/\/mock\/cart\/checkCart/, 'get', function (params) {
    const paramlist = /\/mock\/cart\/checkCart\/(\d+)\/(\d+)/.exec(params.url)
    const skuId = paramlist[1], isChecked = paramlist[2]
    const { userCartInfo, userId, List } = getUserCartInfo()
    let cartList = userCartInfo.cartList || []
    for (let item of cartList) {
        if (item.skuId == skuId) {
            item.isChecked = isChecked
            break
        }
    }
    //将改变后的cartList重新写入
    updateList(List, cartList, userId)
    return {
        code: 200,
        message: "成功",
        data: null
    }
})

//拦截获取注册验证码接口
Mock.mock(/\/mock\/user\/passport\/sendCode/, 'get', function (params) {
    //生成随机6位验证码并存入
    const code = ranStr(6)
    sessionStorage.setItem("code", code)
    return {
        code: 200,
        message: "成功",
        data: code
    }
})

//拦截请求注册用户的接口
Mock.mock(/\/mock\/user\/passport\/register/, 'post', function (params) {
    const { phone, code, password } = JSON.parse(params.body)
    let List = JSON.parse(localStorage.getItem("List")) || []
    const vertifyCode = sessionStorage.getItem("code")
    if (code != vertifyCode) {
        return {
            code: 206,
            message: "验证码错误",
            data: null
        }
    }
    for (let user of List) {
        if (user.phone == phone) {
            return {
                code: 223,
                message: "手机号已被注册",
                data: null
            }
        }
    }
    //将用户账号密码存入
    const user = Mock.mock({
        userId: Mock.Random.id(),
        phone: phone,
        password: password,
        cartList: []
    })
    List.push(user)
    //更改后的List重新写入
    localStorage.setItem("List", JSON.stringify(List))
    //206:验证码错误,223:手机号已被注册
    return {
        code: 200,
        message: "成功",
        data: null
    }
})

//拦截请求登录的接口
Mock.mock(/\/mock\/user\/passport\/login/, 'post', function (params) {
    const { phone, password } = JSON.parse(params.body)
    // console.log(phone,password);
    let List = JSON.parse(localStorage.getItem("List")) || []
    const uuid_token = localStorage.getItem("UUIDTOKEN")

    //如果账号不存在
    if (!List.filter(item => item.phone == phone).length) {
        return {
            code: 201,
            message: "账号不存在",
            data: null
        }
    }
    for (let item of List) {
        //如果账号密码正确
        if (item.phone == phone && item.password == password) {
            //随机生成16位字符串,存入
            const token = ranStr(16)
            item.token = token
            //将游客身份的购物车合并到登录后的
            let uuid_item = List.filter(item => item.userId == uuid_token)[0]
            // console.log(uuid_item);
            if (uuid_item && uuid_item.cartList && uuid_item.cartList.length) {
                for (let uuid_cart of uuid_item.cartList) {
                    //如果登录后中的产品有游客中的产品,产品数量叠加,没有则添加产品
                    let sameItem = item.cartList.filter(ele => ele.skuId == uuid_cart.skuId)[0]
                    if (sameItem) {
                        sameItem.skuNum += uuid_cart.skuNum
                    } else {
                        item.cartList.push(uuid_cart)
                    }
                }
            }
            localStorage.setItem("List", JSON.stringify(List))
            return {
                code: 200,
                message: "成功",
                data: {
                    token,
                    phone,
                    name: phone,
                    nickName: phone
                }
            }
        } else if (item.phone == phone) {
            return {
                code: 202,
                message: "密码错误",
                data: null
            }
        }
    }
})
//拦截获取用户登录信息的接口
Mock.mock(/\/mock\/user\/passport\/auth\/getUserInfo/, 'get', function (params) {
    // console.log(params);
    const token = localStorage.getItem("TOKEN") || ""
    const uuid_token = localStorage.getItem("UUIDTOKEN")
    const List = JSON.parse(localStorage.getItem("List")) || []

    //如果有登录,返回对应的信息
    for (let item of List) {
        if (item.token == token) {
            return {
                code: 200,
                message: "成功",
                data: {
                    userId: item.userId,
                    name: item.phone,
                    nickName: item.phone
                }
            }
        }
    }
    //没登录,List中有游客身份,返回
    for (let item of List) {
        if (item.userId == uuid_token) {
            return {
                code: 200,
                message: "成功",
                data: null
            }
        }
    }
    //没游客身份,添加
    List.push({
        userId: uuid_token,
        cartList: []
    })
    localStorage.setItem("List", JSON.stringify(List))
    // console.log(List);
    return {
        code: 200,
        message: "成功",
        data: null
    }
})
//拦截设置退出登录的接口:让服务器清除token
Mock.mock(/\/mock\/user\/passport\/logout/, 'get', function (params) {
    const token = localStorage.getItem("TOKEN")
    const List = JSON.parse(localStorage.getItem("List")) || []
    for (let item of List) {
        //找到token对应的用户,清除token
        if (item.token == token) {
            delete item.token
            // console.log(userList);
            localStorage.setItem("List", JSON.stringify(List))
            return {
                code: 200,
                message: "成功",
                data: null
            }
        }
    }
    return {
        code: 201,
        message: "失败",
        data: null
    }
})

//拦截获取用户地址信息的接口
Mock.mock(/\/mock\/user\/userAddress\/auth\/findUserAddressList/, 'get', function () {
    const { userId } = getUserCartInfo()
    // console.log(userId,addressInfoList);
    const addressInfo = addressInfoList.filter(item => item.userId == userId)[0].addressInfoList || []
    // console.log(addressInfo);
    return {
        code: 200,
        message: "成功",
        data: addressInfo
    }
})
//拦截获取订单交易页的接口
Mock.mock(/\/mock\/order\/auth\/trade/, 'get', function () {
    let { userId, userCartInfo,List } = getUserCartInfo()
    //获取勾选状态为1的订单
    let tradeInfo = userCartInfo.cartList.filter(item => item.isChecked == 1)
    //计算商品数和商品总价,
    let totalNum = tradeInfo.length, totalAmount = 0
    for (let item of tradeInfo) {
        totalAmount += item.skuNum * item.cartPrice
    }
    const tradeDetailInfo = {
        tradeNo: Mock.Random.id(),
        userId,
        totalNum,
        totalAmount,
        detailArrayList: tradeInfo
    }
    // console.log(tradeDetailInfo);

    const tradeInfoList = JSON.parse(localStorage.getItem("tradeInfoList")) || []
    
    // console.log(tradeInfoList);
    //标记本地是否有该ID的交易信息,有的话则替换没有则添加
    let flag = 0
    for (let item of tradeInfoList) {
        if (item.userId == userId) {
            item = tradeDetailInfo
            flag = 1 
        }
    }
    // console.log(tradeDetailInfo);
    if (!flag) tradeInfoList.push(tradeDetailInfo)
    
    //重新写入
    localStorage.setItem("tradeInfoList", JSON.stringify(tradeInfoList))
    
    //将提交后的产品从购物车删除
    let index;//保存要删除的索引id
    for(let item of tradeInfo){
        for(let i in userCartInfo.cartList){
            if(item.skuId==userCartInfo.cartList[i].skuId){
                index=i;
                break;
            }
        }
        userCartInfo.cartList.splice(index,1)
    }
    updateList(List,userCartInfo.cartList,userId)

    return {
        code: 200,
        message: "成功",
        data: tradeDetailInfo
    }
})
//拦截提交订单的接口
Mock.mock(/\/mock\/order\/auth\/submitOrder/, 'post', function (params) {
    // console.log(params);
    const { userId } = getUserCartInfo()
    // console.log(params.url);
    //获取url中的query参数
    const tradeNo = +(/\/mock\/order\/auth\/submitOrder\?tradeNo\=(\d+)/.exec(params.url)[1])

    const orderInfoList = JSON.parse(localStorage.getItem("orderInfoList")) || []
    const orderId = Mock.Random.id()
    orderInfoList.push({
        orderId,
        userId,
        tradeNo,
        createTime:new Date().toLocaleString(),
        orderDetailInfo: JSON.parse(params.body)
    })
    localStorage.setItem("orderInfoList", JSON.stringify(orderInfoList))
    return {
        code: 200,
        message: '成功',
        data: orderId //订单号
    }
})

//拦截获取交易订单的接口
Mock.mock(/\/mock\/payment\/weixin\/createNative/, 'get', function (params) {
    const orderId = +(/\/mock\/payment\/weixin\/createNative\/(\d+)/.exec(params.url)[1])
    // console.log(orderId);
    //获取对应orderId的订单
    const orderInfo = JSON.parse(localStorage.getItem("orderInfoList"))
        .filter(item => item.orderId == orderId)[0]
        // console.log(orderInfo);
    //获取订单的支付总价
    let totalFee=0
    for(let item of orderInfo.orderDetailInfo.orderDetailList){
        totalFee+=item.skuNum*item.skuPrice
    }
    return{
        code:200,
        message:'成功',
        data:{
            codeUrl:'wxp://f2f0PAgbT8FH1XZDb588N-4KglJA3zqslrmP4B40mSinyGs',
            orderId,
            totalFee,
            resultCode:'success'
        }     
    }
})
//拦截获取订单状态的接口
Mock.mock(/\/mock\/payment\/weixin\/queryPayStatus/, 'get', function (params) {
    // const orderId = +(/\/mock\/payment\/weixin\/queryPayStatus\/(\d+)/.exec(params.url)[1])
    return {
        code:200,
        message:'支付成功',
        data:null
    }
})
//拦截获取我的订单的接口
Mock.mock(/\/mock\/order\/auth/, 'get', function (params) {
    // console.log(params.url);
     const paramsList = /\/mock\/order\/auth\/(\d+)\/(\d+)/.exec(params.url)
    //  console.log(paramsList);
    //page:当前页码,limit:每页数量
     const page=paramsList[1],limit=+paramsList[2]
     const orderInfoList =JSON.parse(localStorage.getItem("orderInfoList"))||[]
     const records=[]
     for(let item of orderInfoList){
        //计算每一项商品的总价
        item.orderDetailInfo.orderDetailList.forEach(ele=>ele.splitTotalAmount=ele.skuNum*ele.skuPrice)
        records.push({
            id:item.orderId,
            consignee:item.orderDetailInfo.consignee,
            orderStatusName:'已支付',
            createTime:item.createTime,
            outTradeNo:item.tradeNo,
            imgUrl:null,
            orderDetailList:item.orderDetailInfo.orderDetailList
        })
     }
     const totalPages =Math.ceil(orderInfoList.length/limit)
     //截取对应页码的数据返回
    const start = (page - 1) * limit;
    const end = page * limit;
    const list = page > totalPages ? [] : records.slice(start, end);
     const myOrderInfo ={
        total : orderInfoList.length,
        current :page,
        size:limit,
        pages:totalPages,
        records:list,
     }

     return {
        code:200,
        message:'成功',
        data:myOrderInfo
     }
})