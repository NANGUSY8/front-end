//利用mock模拟数据

//引入mock
import Mock from 'mockjs'

//引入json数据
import banners from './banners.json'
import floors from './floors.json'

//模拟轮播图数据
Mock.mock('/mock/banners',{
    code:200,
    data:banners
})
//模拟楼层数据
Mock.mock('/mock/floors',{
    code:200,
    data:floors
})