import fs from 'fs';

export default class ReactIntlCollector {
  private translations: { [key: string]: string } = {};
  private locale: string | undefined = undefined;
  private dir: string | undefined = undefined;

  setDefaultLocale(locale: string) {
    this.locale = locale;
  }

  setTargetDir(dir: string) {
    this.dir = dir;
  }

  collectTranslationPair(id: string, value: string) {
    if (id in this.translations) {
      if (this.translations[id] !== value) {
        return false;
      }
    } else {
      this.translations[id] = value;
    }
    return true;
  }

  flush() {
    if (this.dir) {
      const content = JSON.stringify(this.translations, null, 2);
      fs.writeFileSync(`${this.dir}/${this.locale}.json`, content);
    }
  }
}
