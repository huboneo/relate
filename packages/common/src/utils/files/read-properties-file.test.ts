import {readPropertiesFile} from './read-properties-file';

jest.mock('fs-extra', () => {
    const MOCKS = {
        comments: `# hurr
            bar.bam=baz
            # durr
            bom.boz=true
            # burr
            bir.biz=bim.bam=true`,
        plain: `bar.bam=baz
            bom.boz=true
            bir.biz=bim.bam=true`,
        whitespace: `
            bar.bam=baz



            bom.boz=true

            bir.biz=bim.bam=true`,
    };

    return {
        readFile: (path: 'plain' | 'comments' | 'whitespace'): Promise<string> => Promise.resolve(MOCKS[path]),
    };
});

describe('readPropertiesFile', () => {
    test('Parses properties file', async () => {
        const expected = [
            ['bar.bam', 'baz'],
            ['bom.boz', 'true'],
            ['bir.biz', 'bim.bam=true'],
        ];

        const properties = await readPropertiesFile('plain');

        expect(properties).toEqual(expected);
    });
    test('Preserves comments', async () => {
        const expected = [
            ['# hurr', ''],
            ['bar.bam', 'baz'],
            ['# durr', ''],
            ['bom.boz', 'true'],
            ['# burr', ''],
            ['bir.biz', 'bim.bam=true'],
        ];

        const properties = await readPropertiesFile('comments');

        expect(properties).toEqual(expected);
    });
    test('preserves whitespace', async () => {
        const expected = [
            ['', ''],
            ['bar.bam', 'baz'],
            ['', ''],
            ['', ''],
            ['', ''],
            ['bom.boz', 'true'],
            ['', ''],
            ['bir.biz', 'bim.bam=true'],
        ];

        const properties = await readPropertiesFile('whitespace');

        expect(properties).toEqual(expected);
    });
});
