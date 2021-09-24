/* tslint:disable */
/* eslint-disable */
/**
 * Message Server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @enum {string}
 */

export enum DeliveryMethod {
    WEBSITE = 'WEBSITE',
    EMAIL = 'EMAIL',
    SMS = 'SMS'
}

/**
 * 
 * @export
 * @interface Message
 */
export interface Message {
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    method: string;
    /**
     * 
     * @type {MessageType}
     * @memberof Message
     */
    type: MessageType;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    text: string;
    /**
     * 
     * @type {any}
     * @memberof Message
     */
    data?: any | null;
    /**
     * 
     * @type {boolean}
     * @memberof Message
     */
    delivered: boolean;
    /**
     * 
     * @type {Error}
     * @memberof Message
     */
    error?: Error;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    deliverAt?: string;
    /**
     * 
     * @type {string}
     * @memberof Message
     */
    createdAt: string;
}
/**
 * 
 * @export
 * @interface MessageInput
 */
export interface MessageInput {
    /**
     * The arbitrary user id to deliver a message to
     * @type {string}
     * @memberof MessageInput
     */
    userId: string;
    /**
     * 
     * @type {DeliveryMethod}
     * @memberof MessageInput
     */
    method: DeliveryMethod;
    /**
     * a template string to evaluate and use for message
     * @type {string}
     * @memberof MessageInput
     */
    template?: string;
    /**
     * 
     * @type {TemplateName}
     * @memberof MessageInput
     */
    name?: TemplateName;
    /**
     * 
     * @type {any}
     * @memberof MessageInput
     */
    data?: any | null;
    /**
     * The timestamp at which to deliver the message
     * @type {string}
     * @memberof MessageInput
     */
    deliverAt?: string;
    /**
     * if text is present, no template will be compiled and this will be the message body
     * @type {string}
     * @memberof MessageInput
     */
    text?: string;
}
/**
 * 
 * @export
 * @enum {string}
 */

export enum MessageType {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

/**
 * 
 * @export
 * @interface ModelError
 */
export interface ModelError {
    /**
     * 
     * @type {number}
     * @memberof ModelError
     */
    code: number;
    /**
     * 
     * @type {string}
     * @memberof ModelError
     */
    message: string;
}
/**
 * 
 * @export
 * @interface Template
 */
export interface Template {
    /**
     * 
     * @type {DeliveryMethod}
     * @memberof Template
     */
    method?: DeliveryMethod;
    /**
     * 
     * @type {TemplateName}
     * @memberof Template
     */
    name?: TemplateName;
    /**
     * 
     * @type {object}
     * @memberof Template
     */
    variables: object;
    /**
     * 
     * @type {string}
     * @memberof Template
     */
    text?: string;
}
/**
 * 
 * @export
 * @enum {string}
 */

export enum TemplateName {
    BASIC = 'basic'
}


/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary List all templates by delivery method
         * @param {DeliveryMethod} method The delivery method for which to return the template
         * @param {TemplateName} name The template name to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTemplate: async (method: DeliveryMethod, name: TemplateName, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'method' is not null or undefined
            assertParamExists('getTemplate', 'method', method)
            // verify required parameter 'name' is not null or undefined
            assertParamExists('getTemplate', 'name', name)
            const localVarPath = `/templates/{method}/{name}`
                .replace(`{${"method"}}`, encodeURIComponent(String(method)))
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary List all templates by delivery method
         * @param {DeliveryMethod} method The delivery method for which to list available templates
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTemplates: async (method: DeliveryMethod, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'method' is not null or undefined
            assertParamExists('listTemplates', 'method', method)
            const localVarPath = `/templates/{method}`
                .replace(`{${"method"}}`, encodeURIComponent(String(method)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Send a message
         * @param {MessageInput} [messageInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendMessage: async (messageInput?: MessageInput, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/messages`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(messageInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary List all templates by delivery method
         * @param {DeliveryMethod} method The delivery method for which to return the template
         * @param {TemplateName} name The template name to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTemplate(method: DeliveryMethod, name: TemplateName, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Template>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTemplate(method, name, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary List all templates by delivery method
         * @param {DeliveryMethod} method The delivery method for which to list available templates
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listTemplates(method: DeliveryMethod, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Template>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listTemplates(method, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Send a message
         * @param {MessageInput} [messageInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sendMessage(messageInput?: MessageInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Message>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.sendMessage(messageInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary List all templates by delivery method
         * @param {DeliveryMethod} method The delivery method for which to return the template
         * @param {TemplateName} name The template name to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTemplate(method: DeliveryMethod, name: TemplateName, options?: any): AxiosPromise<Template> {
            return localVarFp.getTemplate(method, name, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary List all templates by delivery method
         * @param {DeliveryMethod} method The delivery method for which to list available templates
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTemplates(method: DeliveryMethod, options?: any): AxiosPromise<Array<Template>> {
            return localVarFp.listTemplates(method, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Send a message
         * @param {MessageInput} [messageInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendMessage(messageInput?: MessageInput, options?: any): AxiosPromise<Message> {
            return localVarFp.sendMessage(messageInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary List all templates by delivery method
     * @param {DeliveryMethod} method The delivery method for which to return the template
     * @param {TemplateName} name The template name to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getTemplate(method: DeliveryMethod, name: TemplateName, options?: any) {
        return DefaultApiFp(this.configuration).getTemplate(method, name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary List all templates by delivery method
     * @param {DeliveryMethod} method The delivery method for which to list available templates
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public listTemplates(method: DeliveryMethod, options?: any) {
        return DefaultApiFp(this.configuration).listTemplates(method, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Send a message
     * @param {MessageInput} [messageInput] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public sendMessage(messageInput?: MessageInput, options?: any) {
        return DefaultApiFp(this.configuration).sendMessage(messageInput, options).then((request) => request(this.axios, this.basePath));
    }
}


