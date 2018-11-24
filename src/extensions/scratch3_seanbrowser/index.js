const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const Clone = require('../../util/clone');
const Color = require('../../util/color');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');
const RenderedTarget = require('../../sprites/rendered-target');
const log = require('../../util/log');
const StageLayering = require('../../engine/stage-layering');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
//const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==';
const blockIconURI = 'data:image/png;base64,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';

/**
 * @typedef {object} PenState - the pen state associated with a particular target.
 * @property {Boolean} penDown - tracks whether the pen should draw for this target.
 * @property {number} color - the current color (hue) of the pen.
 * @property {PenAttributes} penAttributes - cached pen attributes for the renderer. This is the authoritative value for
 *   diameter but not for pen color.
 */

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3HelloWorldBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // this._onTargetCreated = this._onTargetCreated.bind(this);
        // runtime.on('targetWasCreated', this._onTargetCreated);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'helloWorld',
            name: formatMessage({
                id: 'helloWorld.categoryName',
                default: 'Hello World',
                description: 'Label for the hello world extension category'
            }),
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'hello',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'helloWorld.hello',
                        default: 'hello world!',
                        description: 'example extension block'
                    })
                },
                // {
                //     opcode: 'pull_data',
                //     blockType: BlockType.Reporter,
                //     text: formatMessage({
                //         id: 'pull_data',
                //         default: 'Pull entries from project [PROJECT_ID] of type [DATA_TYPE]',
                //         description: 'prototype for pulling data'
                //     }),
                //     arguments: {
                //         PROJECT_ID: {
                //             type: 'number',
                //             default: 1
                //         },
                //         DATA_TYPE: {
                //             type: 'string',
                //             default: 'tempC'
                //         }
                //     }
                // },
                {
                    opcode: 'set_local_var',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'set_local_var',
                        default: 'Set variable [VAR_NAME] to value [VAR_VALUE]',
                        description: 'set a local variable'
                    }),
                    arguments: {
                        VAR_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'helloWorld.defaultVarNameValue',
                                default: 'foo',
                                description: 'The default variable name to be stored in localStorage.'
                            })
                        },
                        VAR_VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'helloWorld.defaultVarValue',
                                default: 'bar',
                                description: 'The default variable value to be stored in localStorage.'
                            })  
                        }
                    }
                },
                {
                    opcode: 'get_local_var',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'get_local_var',
                        default: 'Get value of local variable [VAR_NAME].',
                        description: 'get the value of a local variable'
                    }),
                    arguments: {
                        VAR_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'helloWorld.defaultVarNameValue',
                                default: 'foo',
                                description: 'The default variable name to be retrieved from localStorage.'
                            })
                        }
                    }
                }
            ],
            menus: {
                method: ['POST', 'GET']
            }
        };
    }

    /**
     * Something to do with cloning Targets using this extension.
     * @listens Runtime#event:targetWasCreated
     * @private
     */
    _onTargetCreated (newTarget, sourceTarget) {
        if (sourceTarget) {
            const helloWorldState = true;
        }  
    }

    /**
     * Example Block function
     */
    hello () {
        // This message contains ICU placeholders, not Scratch placeholders
        const message = formatMessage({
            id: 'hello.result',
            defaultMessage: 'Hello World!',
            description: 'Text for example block'
        });

        // Note: this implementation is not Unicode-clean; it's just here as an example.
        // const result = args.TEXT.charAt(args.LETTER_NUM);

        return "hello world!";
    }

    pull_data(args) {
        const message = formatMessage({
            id: 'myReporter.result',
            defaultMessage: 'Pulling {DATA_TYPE} from project {PROJECT_ID}.',
            description: 'Text template for data_pull prototype'
        });

        return message;
    }

    set_local_var(args) {
        localStorage.setItem(args.VAR_NAME, args.VAR_VALUE);
    }

    get_local_var(args) {
        if (localStorage.getItem(args.VAR_NAME)) {
            // console.log("Local variables supported, variable " + var_name + " has a value of " + localStorage.getItem(var_name));
            return localStorage.getItem(args.VAR_NAME);
        } else {
            console.log("Variable " + args.VAR_NAME + " does not exist. ;(")
        }
    }
}


module.exports = Scratch3HelloWorldBlocks;
