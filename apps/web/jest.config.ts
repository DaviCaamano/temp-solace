const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
  moduleDirectories: ['node_modules', '<rootDir>'],
  publicFolder: '<rootDir>/public',

  moduleNameMapper: {
    //tsconfig aliases
    '^root/(.*)': ['../$1'],
    '^~/(.*)': ['../api/src/$1'],

    //Jests module resolution is kinda stupid. So we cannot declare this alias
    //'^@/(.*)': ['<rootDir>/apps/web/src/$1'],
    // or libraries like "@testing-library/jest-dom" will have their '@' turned into '<rootDir>/apps/web/src/'
    //So we need to declare each subdirectory of <rootDir>/apps/web/src/ explicitly
    '^@components/(.*)': ['./src/components/$1'],
    '^@constants/(.*)': ['./src/constants/$1'],
    '^@context/(.*)': ['./src/context/$1'],
    '^@hooks/(.*)': ['./src/hooks/$1'],
    '^@interface/(.*)': ['./src/interface/$1'],
    '^@styles/(.*)': ['./src/styles/$1'],
    '^@tests/(.*)': ['./src/tests/$1'],
    '^@utils/(.*)': ['./src/utils/$1'],

    '^#/(.*)': ['./packages/shared/$1'],
    '^@pages/(.*)': ['./pages/$1'],
    '^@images/(.*)': ['./public/images/$1'],
    '^@fonts/(.*)': ['./public/fonts/$1'],
    '^@public/(.*)': ['./src/public/$1'],
    '^~interfaces/(.*)': ['../api/interfaces/$1'],
    '^~utils/(.*)': ['../api/utils/$1'],
  },
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
};

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // For some reason this should be added after createJestConfig
      '\\.svg$': require.resolve('./src/tests/mocks/svg.js'),
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = jestConfig;
