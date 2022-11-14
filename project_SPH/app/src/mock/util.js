//获取用户的用户和购物车信息
export function getUserCartInfo() {
    const token = localStorage.getItem("TOKEN") || ""
    const uuid_token = localStorage.getItem("UUIDTOKEN")
    let List = JSON.parse(localStorage.getItem("List")) || []
    let userCartInfo, userId

    //如果有登录,获取id和对应的item
    for (let item of List) {
        if (item.token == token) {
            userId = item.userId
            userCartInfo = item
            break
        }
    }
    //如果没登录,id为uuid
    if (!userId) {
        userId = uuid_token
        userCartInfo = List.filter(item => item.userId == uuid_token)[0]
        //如果List中没uuid身份的信息,添加
        if (!userCartInfo) {
            userCartInfo={
                userId: uuid_token,
                cartList: []
            }
            List.push(userCartInfo)
            localStorage.setItem("List",JSON.stringify(List))
        }
    }
    return { List, userCartInfo, userId }
}

//将更改后的信息重新写入
export function updateList(List, cartList, userId) {
    // console.log(cartList);
    //将改变后的cartList重新写入
    for (let item of List) {
        if (item.userId == userId) {
            item.cartList = cartList
            break
        }
    }
    // console.log(List);
    localStorage.setItem("List", JSON.stringify(List))
}