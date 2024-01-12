const success = async (message: string, statusCode: number, data?: any) => {
  return {
    message,
    statusCode,
    status: "success",
    data,
  };
};

const failure = async (message: string, statusCode: number) => {
  return {
    message,
    statusCode,
    status: "failure",
  };
};

export default { success, failure };
