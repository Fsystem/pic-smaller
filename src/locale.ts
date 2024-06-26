// https://www.techonthenet.com/js/language_tags.php
import getUserLocale from "get-user-locale";
import { gstate } from "./global";
import { MenuProps } from "antd";
import { locales } from "./modules";

const localeCacheKey = "Pic-Smaller-Locale";
const defaultLang = "en-US";

export const langList: MenuProps["items"] = [
  { key: "en-US", label: "English" },
  { key: "ko-KR", label: "한국인" },
  { key: "ja-JP", label: "日本語" },
  { key: "zh-TW", label: "繁體中文" },
  { key: "zh-CN", label: "简体中文" },
];

export function getLang() {
  let lang = window.localStorage.getItem(localeCacheKey);
  if (!lang) {
    lang = getUserLocale();
  }
  gstate.lang = lang ?? defaultLang;
}

export async function setLocaleData() {
  let importer: any = locales[`/src/locales/${gstate.lang}.ts`];
  if (!importer) {
    importer = locales[`/src/locales/${defaultLang}.ts`];
  }
  gstate.locale = (await importer()).default;
}

export async function changeLang(lang: string) {
  gstate.lang = lang;
  window.localStorage.setItem(localeCacheKey, gstate.lang);
  await setLocaleData();
}

export async function initLangSetting() {
  getLang();
  await setLocaleData();
}
