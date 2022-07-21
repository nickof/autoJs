const grade = 0
const rlog = {}

const getStackTrace = () => {
    let obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
}

//const log = console.log;
rlog.Debug = (str) => {
    if (grade >= 0) {
        let stack = getStackTrace() || ""
        let matchResult = stack.match(/\(.*?\)/g) || []
        let line = matchResult[1] || ""
        log("【DEBUG】" + line + ":" + str)
    }
}
rlog.Info = (str) => {
    if (grade >= 1) {
        let stack = getStackTrace() || ""
        let matchResult = stack.match(/\(.*?\)/g) || []
        let line = matchResult[1] || ""
        log("【INFO】" + line + ":" + str)
    }
}
rlog.Warn = (str) => {
    if (grade >= 2) {
        let stack = getStackTrace() || ""
        let matchResult = stack.match(/\(.*?\)/g) || []
        let line = matchResult[1] || ""
        log("【WARN】" + line + ":" + str)
    }
}
rlog.Error = (str) => {
    if (grade >= 3) {
        let stack = getStackTrace() || ""
        let matchResult = stack.match(/\(.*?\)/g) || []
        let line = matchResult[1] || ""
        log("【ERROR】" + line + ":" + str)
    }
}
rlog.Panic = (str) => {
    if (grade >= 4) {
        let stack = getStackTrace() || ""
        let matchResult = stack.match(/\(.*?\)/g) || []
        let line = matchResult[1] || ""
        log("【Panic】" + line + ":" + str)
    }
}
rlog.log_function = (str) => {
    log("===" + str + "===")
}
module.exports = rlog