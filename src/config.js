/**
 * 全局变量
 * @type {[string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string]}
 */

const basePath = '/xdecorate'

/*取一个随机的颜色*/
const colorList = [
    '#F9F900',
    '#6FB7B7',
    '#9999CC',
    '#B766AD',
    '#B87070',
    '#FF8F59',
    '#FFAF60',
    '#FFDC35',
    '#FFFF37',
    '#B7FF4A',
    '#28FF28',
    '#1AFD9C',
    '#00FFFF',
    '#2894FF',
    '#6A6AFF',
    '#BE77FF',
    '#FF77FF',
    '#FF79BC',
    '#FF2D2D',
    '#ADADAD'
]
const colorListLength = 20
function getRandColor () {
    var tem = Math.round(Math.random() * colorListLength)
    return colorList[tem]
}
/*取一个随机的颜色*/

const org_code = '5af4bda6c873448fb757e3b9b8129c39'

/*设置*/

/*设置*/
export default
{
    getRandColor,
    basePath,
    org_code

}


