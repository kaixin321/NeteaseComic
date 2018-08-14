/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :　服务器url定义
 */

// 服务器主机ip
const server_host = 'http://192.168.0.158:1234/api'
const netease = '/163'
const tencent = '/tencent'
const object = {
    // 网易漫画
    netease:{
        getComic:server_host + netease + '/getComic'
    },
    //　腾讯漫画
    tencent:{
        getComic:server_host + tencent + '/getComic'
    }
}
export default object