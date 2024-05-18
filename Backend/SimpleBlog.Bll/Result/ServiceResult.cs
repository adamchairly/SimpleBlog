namespace SimpleBlog.Bll.Result
{
    public class ServiceResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public static ServiceResult SuccessResult(string message = "", object data = null)
        {
            return new ServiceResult { Success = true, Message = message, Data = data };
        }

        public static ServiceResult FailureResult(string message)
        {
            return new ServiceResult { Success = false, Message = message };
        }
    }
}
