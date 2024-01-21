import { validationResultHandler } from '@middlewares/request-handlers';
import type { RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';

/**
 * 라우터에 사용될 요청 처리기 배열을 만든다.
 * @param params 매개변수 객체
 * @param params.validations 먼저 실행될 유효성 검사들 (선택 사항)
 * @param params.requestHandler 마지막에 실행될 요청 처리기 (비동기도 가능)
 * @returns 요청 처리기 배열
 */
function createRequestHandlers(params: Params): RequestHandlers {
    const { validations, requestHandler } = params;

    if (validations === undefined) return [expressAsyncHandler(requestHandler)];
    return [
        ...validations,
        validationResultHandler,
        expressAsyncHandler(requestHandler),
    ];
}

interface Params {
    requestHandler: (
        ...arg: Parameters<RequestHandler>
    ) => void | Promise<void>;
    validations?: RequestHandlers;
}

type RequestHandlers = Array<Array<RequestHandler> | RequestHandler>;

export { createRequestHandlers };
export type { RequestHandlers };
