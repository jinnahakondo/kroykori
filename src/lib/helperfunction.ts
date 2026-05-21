type TResponse<T> = {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T;
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

export const catchError = (error: any, customMessage?: string) => {

    // handle duplicate key error 
    if (error.code == 11000) {

        const keys = Object.keys(error.keyValue).join(", ");

        error.message = `Duplicate key error: ${keys} already exists. These fields must be unique.`;

        error.code = 409;
    }

    let errorObj = {};

    if (process.env.NODE_ENV === "development") {

        errorObj = {
            message: error.message,
            error,
        };

    } else {

        errorObj = {
            message: customMessage || "Internal Server Error",
        };
    }

    return Response.json({
        success: false,
        statusCode: error.code || 500,
        ...errorObj,
    });
};