const packageJson = require('../package.json') as any;

describe('Dependencies should be described strictly', () => {
  it('Expects dependencies to be correct', () => {
    const { dependencies } = packageJson;

    // @ts-ignore
    Object.values(dependencies).map((value) => {
      const hasCaret = value.includes('^');

      expect(hasCaret).toBe(false);
    });
  });
});
