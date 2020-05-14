import {flags} from '@oclif/command';

import BaseCommand from '../../base.command';
import {OpenModule} from '../../modules/app/open.module';
import {DBMS_FLAGS, REQUIRED_FOR_SCRIPTS} from '../../constants';

export default class OpenCommand extends BaseCommand {
    commandClass = OpenCommand;

    commandModule = OpenModule;

    static args = [
        {
            name: 'appName',
            required: REQUIRED_FOR_SCRIPTS,
        },
    ];

    static flags = {
        ...DBMS_FLAGS,
        dbmsId: flags.string({
            char: 'D',
            description: 'The DBMS to automatically connect to',
            required: false,
        }),
        log: flags.boolean({
            char: 'L',
            description: 'If set, log the path instead',
            required: false,
        }),
        principal: flags.string({
            char: 'P',
            description: 'The DBMS user to automatically connect with, assuming an access token exists',
            required: false,
        }),
    };
}
