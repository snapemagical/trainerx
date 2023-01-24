export function timeFormat(val) {
    val = val.toString()
    if (!val) {
        return;
    }
    let split = val?.split(':')?.length === 1 ?  val+':00:00':val?.split(':')?.length === 2 ?  val+':00':val
    return split
}
export function randomRgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}