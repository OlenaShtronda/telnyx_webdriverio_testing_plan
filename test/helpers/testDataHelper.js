import { browser } from '@wdio/globals';
import fs from 'fs';
import path from 'path';

class TestDataHelper {
  static loadTestData() {
    const relativePath = browser.options.params.testDataFile;

    if (!relativePath) {
      throw new Error('testDataFile is not defined in WDIO params');
    }

    const absolutePath = path.resolve(process.cwd(), relativePath);

    return JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
  }
}

export default TestDataHelper;
