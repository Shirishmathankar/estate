const errorhandler=(massage,statusCode)=>{
    const error=new Error();
    error.massage=massage;
    error.statusCode=statusCode;
    return error
}
export default errorhandler