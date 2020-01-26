import { KiiTranslatePipe } from './kii-translate.pipe';

describe('KiiTranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new KiiTranslatePipe(null,null);
    expect(pipe).toBeTruthy();
  });
});
