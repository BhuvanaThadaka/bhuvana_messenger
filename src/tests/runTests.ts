
import { execSync } from 'child_process';

// Function to run tests with jest
const runTests = () => {
  try {
    console.log('Running auth service tests...');
    execSync('npx jest src/services/__tests__/authService.test.ts', { stdio: 'inherit' });
    
    console.log('\nRunning law firm service tests...');
    execSync('npx jest src/services/__tests__/lawFirmService.test.ts', { stdio: 'inherit' });
    
    console.log('\nRunning master data tests...');
    execSync('npx jest src/services/__tests__/master-data.test.ts', { stdio: 'inherit' });
    
    console.log('\nRunning journey service tests...');
    execSync('npx jest src/services/__tests__/journey.test.ts', { stdio: 'inherit' });
    
    console.log('\nRunning auth context tests...');
    execSync('npx jest src/contexts/__tests__/AuthContext.test.tsx', { stdio: 'inherit' });
    
    console.log('\nRunning organization service tests...');
    execSync('npx jest src/services/__tests__/organizationService.test.ts', { stdio: 'inherit' });
    
    console.log('\nRunning plan service tests...');
    execSync('npx jest src/services/__tests__/planService.test.ts', { stdio: 'inherit' });
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  }
};

runTests();
