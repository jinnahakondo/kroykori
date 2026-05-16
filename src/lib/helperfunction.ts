type TResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    statusCode: number;
};

export const response = <T>({
    success,
    message,
    statusCode,
    data,
}: TResponse<T>) => {
    return Response.json(
        {
            success,
            message,
            data,
        },
        {
            status: statusCode,
        }
    );
};