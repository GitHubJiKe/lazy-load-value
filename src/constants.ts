import lazyLoadValue from "./lazyLoadValue";

export const AppTexts = {
  title: title,
  someText: someText,
};

export type Locale = "zh" | "en";

function title(locale: Locale) {
  return lazyLoadValue({
    value: () => "Lazy Load Value",
    optionalValue: "懒加载值",
    condition: () => {
      return locale === "zh";
    },
  });
}

function someText(locale: Locale) {
  return lazyLoadValue({
    value: "this is a text",
    optionalValue: "这是一个文案",
    condition: () => {
      return locale === "zh";
    },
  });
}

export const youGuessWhatIamDoing = lazyLoadValue({
  value: "you guess what i am doing",
  optionalValue: "你猜猜看?",
  condition: true,
});
