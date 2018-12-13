const formatMessage = require('format-message');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
//const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHN0eWxlPi5zdDJ7ZmlsbDpyZWR9LnN0M3tmaWxsOiNlMGUwZTB9LnN0NHtmaWxsOm5vbmU7c3Ryb2tlOiM2NjY7c3Ryb2tlLXdpZHRoOi41O3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PHBhdGggZD0iTTM1IDI4SDVhMSAxIDAgMCAxLTEtMVYxMmMwLS42LjQtMSAxLTFoMzBjLjUgMCAxIC40IDEgMXYxNWMwIC41LS41IDEtMSAxeiIgZmlsbD0iI2ZmZiIgaWQ9IkxheWVyXzYiLz48ZyBpZD0iTGF5ZXJfNCI+PHBhdGggY2xhc3M9InN0MiIgZD0iTTQgMjVoMzJ2Mi43SDR6TTEzIDI0aC0yLjJhMSAxIDAgMCAxLTEtMXYtOS43YzAtLjYuNC0xIDEtMUgxM2MuNiAwIDEgLjQgMSAxVjIzYzAgLjYtLjUgMS0xIDF6Ii8+PHBhdGggY2xhc3M9InN0MiIgZD0iTTYuMSAxOS4zdi0yLjJjMC0uNS40LTEgMS0xaDkuN2MuNSAwIDEgLjUgMSAxdjIuMmMwIC41LS41IDEtMSAxSDcuMWExIDEgMCAwIDEtMS0xeiIvPjxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjIyLjgiIGN5PSIxOC4yIiByPSIzLjQiLz48Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIzMC42IiBjeT0iMTguMiIgcj0iMy40Ii8+PHBhdGggY2xhc3M9InN0MiIgZD0iTTQuMiAyN2gzMS45di43SDQuMnoiLz48L2c+PGcgaWQ9IkxheWVyXzUiPjxjaXJjbGUgY2xhc3M9InN0MyIgY3g9IjIyLjgiIGN5PSIxOC4yIiByPSIyLjMiLz48Y2lyY2xlIGNsYXNzPSJzdDMiIGN4PSIzMC42IiBjeT0iMTguMiIgcj0iMi4zIi8+PHBhdGggY2xhc3M9InN0MyIgZD0iTTEyLjUgMjIuOWgtMS4yYy0uMyAwLS41LS4yLS41LS41VjE0YzAtLjMuMi0uNS41LS41aDEuMmMuMyAwIC41LjIuNS41djguNGMwIC4zLS4yLjUtLjUuNXoiLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNNy4yIDE4Ljd2LTEuMmMwLS4zLjItLjUuNS0uNWg4LjRjLjMgMCAuNS4yLjUuNXYxLjJjMCAuMy0uMi41LS41LjVINy43Yy0uMyAwLS41LS4yLS41LS41ek00IDI2aDMydjJINHoiLz48L2c+PGcgaWQ9IkxheWVyXzMiPjxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0zNS4yIDI3LjlINC44YTEgMSAwIDAgMS0xLTFWMTIuMWMwLS42LjUtMSAxLTFoMzAuNWMuNSAwIDEgLjQgMSAxVjI3YTEgMSAwIDAgMS0xLjEuOXoiLz48cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMzUuMiAyNy45SDQuOGExIDEgMCAwIDEtMS0xVjEyLjFjMC0uNi41LTEgMS0xaDMwLjVjLjUgMCAxIC40IDEgMVYyN2ExIDEgMCAwIDEtMS4xLjl6Ii8+PC9nPjwvc3ZnPg==';
const blockIconURI = 'data:image/png;base64,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';


/**
 * Length of the buffer to store key presses for the "when keys pressed in order" hat
 * @type {number}
 */
const KEY_BUFFER_LENGTH = 100;

/**
 * Timeout in milliseconds to reset the completed flag for a sequence.
 * @type {number}
 */
const SEQUENCE_HAT_TIMEOUT = 100;

/**
 * An id for the space key on a keyboard.
 */
const KEY_ID_SPACE = 'SPACE';

/**
 * An id for the left arrow key on a keyboard.
 */
const KEY_ID_LEFT = 'LEFT';

/**
 * An id for the right arrow key on a keyboard.
 */
const KEY_ID_RIGHT = 'RIGHT';

/**
 * An id for the up arrow key on a keyboard.
 */
const KEY_ID_UP = 'UP';

/**
 * An id for the down arrow key on a keyboard.
 */
const KEY_ID_DOWN = 'DOWN';

/**
 * Names used by keyboard io for keys used in scratch.
 * @enum {string}
 */
const SCRATCH_KEY_NAME = {
    [KEY_ID_SPACE]: 'space',
    [KEY_ID_LEFT]: 'left arrow',
    [KEY_ID_UP]: 'up arrow',
    [KEY_ID_RIGHT]: 'right arrow',
    [KEY_ID_DOWN]: 'down arrow'
};

/**
 * Class for the makey makey blocks in Scratch 3.0
 * @constructor
 */
class Scratch3MakeyMakeyBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        /**
         * A toggle that alternates true and false each frame, so that an
         * edge-triggered hat can trigger on every other frame.
         * @type {boolean}
         */
        this.frameToggle = false;

        // Set an interval that toggles the frameToggle every frame.
        setInterval(() => {
            this.frameToggle = !this.frameToggle;
        }, this.runtime.currentStepTime);

        this.keyPressed = this.keyPressed.bind(this);
        this.runtime.on('KEY_PRESSED', this.keyPressed);

        this._clearkeyPressBuffer = this._clearkeyPressBuffer.bind(this);
        this.runtime.on('PROJECT_STOP_ALL', this._clearkeyPressBuffer);

        /*
         * An object containing a set of sequence objects.
         * These are the key sequences currently being detected by the "when
         * keys pressed in order" hat block. Each sequence is keyed by its
         * string representation (the sequence's value in the menu, which is a
         * string of KEY_IDs separated by spaces). Each sequence object
         * has an array property (an array of KEY_IDs) and a boolean
         * completed property that is true when the sequence has just been
         * pressed.
         * @type {object}
         */
        this.sequences = {};

        /*
         * An array of the key codes of recently pressed keys.
         * @type {array}
         */
        this.keyPressBuffer = [];
    }

    /*
    * Localized short-form names of the space bar and arrow keys, for use in the
    * displayed menu items of the "when keys pressed in order" block.
    * @type {object}
    */
    get KEY_TEXT_SHORT () {
        return {
            [KEY_ID_SPACE]: formatMessage({
                id: 'makeymakey.spaceKey',
                default: 'space',
                description: 'The space key on a computer keyboard.'
            }),
            [KEY_ID_LEFT]: formatMessage({
                id: 'makeymakey.leftArrowShort',
                default: 'left',
                description: 'Short name for the left arrow key on a computer keyboard.'
            }),
            [KEY_ID_UP]: formatMessage({
                id: 'makeymakey.upArrowShort',
                default: 'up',
                description: 'Short name for the up arrow key on a computer keyboard.'
            }),
            [KEY_ID_RIGHT]: formatMessage({
                id: 'makeymakey.rightArrowShort',
                default: 'right',
                description: 'Short name for the right arrow key on a computer keyboard.'
            }),
            [KEY_ID_DOWN]: formatMessage({
                id: 'makeymakey.downArrowShort',
                default: 'down',
                description: 'Short name for the down arrow key on a computer keyboard.'
            })
        };
    }

    /*
     * An array of strings of KEY_IDs representing the default set of
     * key sequences for use by the "when keys pressed in order" block.
     * @type {array}
     */
    get DEFAULT_SEQUENCES () {
        return [
            `${KEY_ID_LEFT} ${KEY_ID_UP} ${KEY_ID_RIGHT}`,
            `${KEY_ID_RIGHT} ${KEY_ID_UP} ${KEY_ID_LEFT}`,
            `${KEY_ID_LEFT} ${KEY_ID_RIGHT}`,
            `${KEY_ID_RIGHT} ${KEY_ID_LEFT}`,
            `${KEY_ID_UP} ${KEY_ID_DOWN}`,
            `${KEY_ID_DOWN} ${KEY_ID_UP}`,
            `${KEY_ID_UP} ${KEY_ID_RIGHT} ${KEY_ID_DOWN} ${KEY_ID_LEFT}`,
            `${KEY_ID_UP} ${KEY_ID_LEFT} ${KEY_ID_DOWN} ${KEY_ID_RIGHT}`,
            `${KEY_ID_UP} ${KEY_ID_UP} ${KEY_ID_DOWN} ${KEY_ID_DOWN} ` +
                `${KEY_ID_LEFT} ${KEY_ID_RIGHT} ${KEY_ID_LEFT} ${KEY_ID_RIGHT}`
        ];
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'makeymakey',
            name: 'Makey Makey',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'whenMakeyKeyPressed',
                    text: 'when [KEY] key pressed',
                    blockType: BlockType.HAT,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            menu: 'KEY',
                            defaultValue: KEY_ID_SPACE
                        }
                    }
                },
                {
                    opcode: 'whenCodePressed',
                    text: 'when [SEQUENCE] pressed in order',
                    blockType: BlockType.HAT,
                    arguments: {
                        SEQUENCE: {
                            type: ArgumentType.STRING,
                            menu: 'SEQUENCE',
                            defaultValue: this.DEFAULT_SEQUENCES[0]
                        }
                    }
                }
            ],
            menus: {
                KEY: [
                    {
                        text: formatMessage({
                            id: 'makeymakey.spaceKey',
                            default: 'space',
                            description: 'The space key on a computer keyboard.'
                        }),
                        value: KEY_ID_SPACE
                    },
                    {
                        text: formatMessage({
                            id: 'makeymakey.leftArrow',
                            default: 'left arrow',
                            description: 'The left arrow key on a computer keyboard.'
                        }),
                        value: KEY_ID_LEFT
                    },
                    {
                        text: formatMessage({
                            id: 'makeymakey.rightArrow',
                            default: 'right arrow',
                            description: 'The right arrow key on a computer keyboard.'
                        }),
                        value: KEY_ID_RIGHT
                    },
                    {
                        text: formatMessage({
                            id: 'makeymakey.downArrow',
                            default: 'down arrow',
                            description: 'The down arrow key on a computer keyboard.'
                        }),
                        value: KEY_ID_DOWN
                    },
                    {
                        text: formatMessage({
                            id: 'makeymakey.upArrow',
                            default: 'up arrow',
                            description: 'The up arrow key on a computer keyboard.'
                        }),
                        value: KEY_ID_UP
                    },
                    {text: 'w', value: 'w'},
                    {text: 'a', value: 'a'},
                    {text: 's', value: 's'},
                    {text: 'd', value: 'd'},
                    {text: 'f', value: 'f'},
                    {text: 'g', value: 'g'}
                ],
                SEQUENCE: this.buildSequenceMenu(this.DEFAULT_SEQUENCES)
            }
        };
    }

    /*
     * Build the menu of key sequences.
     * @param {array} sequencesArray an array of strings of KEY_IDs.
     * @returns {array} an array of objects with text and value properties.
     */
    buildSequenceMenu (sequencesArray) {
        return sequencesArray.map(
            str => this.getMenuItemForSequenceString(str)
        );
    }

    /*
     * Create a menu item for a sequence string.
     * @param {string} sequenceString a string of KEY_IDs.
     * @return {object} an object with text and value properties.
     */
    getMenuItemForSequenceString (sequenceString) {
        let sequenceArray = sequenceString.split(' ');
        sequenceArray = sequenceArray.map(str => this.KEY_TEXT_SHORT[str]);
        return {
            text: sequenceArray.join(' '),
            value: sequenceString
        };
    }

    /*
     * Check whether a keyboard key is currently pressed.
     * Also, toggle the results of the test on alternate frames, so that the
     * hat block fires repeatedly.
     * @param {object} args - the block arguments.
     * @property {number} KEY - a key code.
     * @param {object} util - utility object provided by the runtime.
     */
    whenMakeyKeyPressed (args, util) {
        let key = args.KEY;
        // Convert the key arg, if it is a KEY_ID, to the key name used by
        // the Keyboard io module.
        if (SCRATCH_KEY_NAME[args.KEY]) {
            key = SCRATCH_KEY_NAME[args.KEY];
        }
        const isDown = util.ioQuery('keyboard', 'getKeyIsDown', [key]);
        return (isDown && this.frameToggle);
    }

    /*
     * A function called on the KEY_PRESSED event, to update the key press
     * buffer and check if any of the key sequences have been completed.
     * @param {string} key A scratch key name.
     */
    keyPressed (key) {
        // Store only the first word of the Scratch key name, so that e.g. when
        // "left arrow" is pressed, we store "LEFT", which matches KEY_ID_LEFT
        key = key.split(' ')[0];
        key = key.toUpperCase();
        this.keyPressBuffer.push(key);
        // Keep the buffer under the length limit
        if (this.keyPressBuffer.length > KEY_BUFFER_LENGTH) {
            this.keyPressBuffer.shift();
        }
        // Check the buffer for each sequence in use
        for (const str in this.sequences) {
            const arr = this.sequences[str].array;
            // Bail out if we don't have enough presses for this sequence
            if (this.keyPressBuffer.length < arr.length) {
                continue;
            }
            let missFlag = false;
            // Slice the buffer to the length of the sequence we're checking
            const bufferSegment = this.keyPressBuffer.slice(-1 * arr.length);
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== bufferSegment[i]) {
                    missFlag = true;
                }
            }
            // If the miss flag is false, the sequence matched the buffer
            if (!missFlag) {
                this.sequences[str].completed = true;
                // Clear the completed flag after a timeout. This is necessary because
                // the hat is edge-triggered (not event triggered). Multiple hats
                // may be checking the same sequence, so this timeout gives them enough
                // time to all trigger before resetting the flag.
                setTimeout(() => {
                    this.sequences[str].completed = false;
                }, SEQUENCE_HAT_TIMEOUT);
            }
        }
    }

    /**
     * Clear the key press buffer.
     */
    _clearkeyPressBuffer () {
        this.keyPressBuffer = [];
    }

    /*
     * Add a key sequence to the set currently being checked on each key press.
     * @param {string} sequenceString a string of space-separated KEY_IDs.
     * @param {array} sequenceArray an array of KEY_IDs.
     */
    addSequence (sequenceString, sequenceArray) {
        // If we already have this sequence string, return.
        if (this.sequences.hasOwnProperty(sequenceString)) {
            return;
        }
        this.sequences[sequenceString] = {
            array: sequenceArray,
            completed: false
        };
    }

    /*
     * Check whether a key sequence was recently completed.
     * @param {object} args The block arguments.
     * @property {number} SEQUENCE A string of KEY_IDs.
     */
    whenCodePressed (args) {
        const sequenceString = Cast.toString(args.SEQUENCE).toUpperCase();
        const sequenceArray = sequenceString.split(' ');
        if (sequenceArray.length < 2) {
            return;
        }
        this.addSequence(sequenceString, sequenceArray);

        return this.sequences[sequenceString].completed;
    }
}
module.exports = Scratch3MakeyMakeyBlocks;
