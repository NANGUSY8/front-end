//引入mock
// import Mock from 'mockjs'
let Mock = require("mockjs")

export default function ranSearchList(){
   return Mock.mock({
        "trademarkList|10": [
            {
                'tmId': '@increment(1)',
                'tmName': "@cword(2,5)"
            }
    
        ],
        "attrsList|5-8": [
            {
                'attrId': '@increment',
                "attrValueList|2-4": [
                    '@cword(2,6)'
                ],
                'attrName': "@ctitle(2,4)"
            }
    
        ],
        "goodsList|5-80": [
            {
                "id":'@increment',
                'defaultImg|1': ["http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg",
                     "http://47.93.148.192:8080/group1/M00/02/DB/rBHu8mGxPcKAZ_qwAAAaCuo69pQ498.jpg",
                     "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-rgfWAVRWzAABUiOmA0ic932.jpg",
                     "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-sklaALrngAAHGDqdpFtU741.jpg",
                     "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-rgfWAbqkuAAENKBtJukQ551.jpg",
                     "http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAIpgZAAIvrX6L9fo612.jpg",
                     "http://47.93.148.192:8080/group1/M00/02/DA/rBHu8mGxO7mAE-3gAACWbB2wj-4610.jpg"
            ],
                'title': "@cword(15,30)",
                "price|0-20000": 0,
                "createTime": null,
                "tmId": null,
                "tmName": null,
                "category1Id": null,
                "category1Name": null,
                "category2Id": null,
                "category2Name": null,
                "category3Id": null,
                "category3Name": null,
                "hotScore": 0,
                "attrs": null
            }
        ],
        "total": 0,
        "pageSize": 8,
        "pageNo|+1": 1,
        "totalPages": 0
    })
}
 