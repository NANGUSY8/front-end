//随机生成n位字符串
export default function ranStr(num){
    const vertify = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = '';
    for (let i = 0; i < num; i++) {
        //向下取整,生成随机索引
        const ranIdx = Math.floor(Math.random() * (vertify.length));
        result += vertify[ranIdx];
    }
    return result
}